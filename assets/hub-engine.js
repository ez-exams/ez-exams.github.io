/* ══════════════════════════════════════════════════════════════════════════
   EZ Exam — shared study-hub engine
   Ported from the Nocturne design (AZ-900 Study Hub.dc.html) to plain JS and
   generalised so every hub runs the same code with its own config.

   Screens: home · setup · pbqSetup · flashSetup · flash · run · results
            deckSetup · deck · lessons · lesson
   Item kinds: mcq · pbq(grid | dragdrop | logselect | mcq)

   A hub boots with:  EZHub.init({ ...config })  — see any hub's index.html.
   ══════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var GOOD = "oklch(0.74 0.13 152)";
  var BAD = "oklch(0.68 0.17 25)";
  var PART = "oklch(0.8 0.13 85)";

  var C = null;      /* live config */
  var S = null;      /* live state  */
  var main, dlgHost, hdrTimer, hdrProg, hdrExit;

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function shuf(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function sec(d) {
    for (var i = 0; i < C.sections.length; i++) if (C.sections[i].n === (d || 1)) return C.sections[i];
    return C.sections[0];
  }
  function secLabel(d) { var s = sec(d); return s.num + " · " + s.name; }
  function pad(n) { return n < 10 ? "0" + n : String(n); }
  function fmt(t) {
    t = Math.max(0, Math.round(t));
    var m = Math.floor(t / 60), s = t % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
  }
  function mcqOptions(q) {
    var o = q.options || {};
    return Object.keys(o).sort().map(function (k) { return { key: k, text: o[k] }; });
  }
  function extraById(id) {
    for (var i = 0; i < (C.extras || []).length; i++) if (C.extras[i].id === id) return C.extras[i];
    return null;
  }
  function exhibitTag(src) {
    if (!src) return "";
    return '<img src="' + esc((C.exhibitBase || "") + src) + '" alt="Exhibit" loading="lazy" ' +
      'style="max-width:100%;border-radius:10px;border:1px solid var(--color-divider);margin:0 0 16px" />';
  }

  /* ---------- item construction ---------- */
  function mkMcq(q, shuffleOpts) {
    var opts = mcqOptions(q);
    if (shuffleOpts) opts = shuf(opts);
    return {
      kind: "mcq", id: q.id, domain: q.domain || 1, stem: q.question,
      stemPre: q.stemPre || "", stemPost: q.stemPost || "", exhibit: q.exhibit || "",
      options: opts, correct: (q.correct || []).slice(),
      multi: (q.correct || []).length > 1,
      explanation: q.explanation || "", resp: [], graded: false, score: 0, pts: 1
    };
  }
  function mkPbq(p, pts) {
    var base = {
      kind: "pbq", id: p.id, domain: p.domain || 1, type: p.type,
      title: p.title || "Performance-based question", scenario: p.scenario || "",
      explanation: p.explanation || "", graded: false, score: 0, pts: pts,
      exhibits: p.exhibits || (p.exhibit ? [p.exhibit] : [])
    };
    if (p.type === "grid") {
      base.stem = p.scenario || "Complete the answer area."; base.scenario = "";
      base.columns = p.columns || []; base.rows = p.rows || [];
      base.resp = (p.rows || []).map(function () { return {}; });
      return base;
    }
    if (p.type === "dragdrop") {
      base.stem = p.scenario || "Place the correct options."; base.scenario = "";
      base.items = p.items || []; base.zones = p.zones || [];
      base.resp = (p.zones || []).map(function () { return []; });
      return base;
    }
    if (p.type === "logselect") {
      base.stem = p.scenario || "Review the log and identify the attack."; base.scenario = "";
      base.lines = p.lines || [];
      base.attackOptions = p.attackOptions || [];
      base.attackAnswer = p.attackAnswer || "";
      base.resp = { lines: [], attack: "" };
      return base;
    }
    base.type = "mcq";
    base.stem = p.question || p.scenario || "";
    base.options = mcqOptions(p);
    base.correct = (p.correct || []).slice();
    base.multi = (p.correct || []).length > 1;
    base.resp = [];
    return base;
  }

  /* ---------- grading ---------- */
  function gradeItem(it) {
    if (it.kind === "mcq" || it.type === "mcq") {
      var a = it.resp.slice().sort().join(","), b = it.correct.slice().sort().join(",");
      return a && a === b ? 1 : 0;
    }
    if (it.type === "grid") {
      var got = 0, cells = 0;
      it.rows.forEach(function (row, ri) {
        Object.keys(row.answer || {}).forEach(function (k) {
          cells++;
          var want = row.answer[k], have = it.resp[ri][k];
          var hv = String(have == null ? "" : have).trim().toLowerCase();
          if (Array.isArray(want)) {
            if (want.some(function (w) { return String(w).trim().toLowerCase() === hv; })) got++;
          } else if (hv && hv === String(want).trim().toLowerCase()) got++;
        });
      });
      return cells ? got / cells : 0;
    }
    if (it.type === "dragdrop") {
      var sum = 0;
      it.zones.forEach(function (z, zi) {
        var want = z.answer || [], have = it.resp[zi] || [];
        var hits = have.filter(function (h) { return want.indexOf(h) !== -1; }).length;
        sum += hits / Math.max(want.length, have.length, 1);
      });
      return it.zones.length ? sum / it.zones.length : 0;
    }
    if (it.type === "logselect") {
      var badIdx = [];
      it.lines.forEach(function (ln, i) { if (ln.bad) badIdx.push(i); });
      var hits2 = it.resp.lines.filter(function (i) { return badIdx.indexOf(i) !== -1; }).length;
      var lineScore = hits2 / Math.max(badIdx.length, it.resp.lines.length, 1);
      var attackScore = it.resp.attack === it.attackAnswer ? 1 : 0;
      return (lineScore + attackScore) / 2;
    }
    return 0;
  }
  function answered(it) {
    if (it.kind === "mcq" || it.type === "mcq") return it.resp.length > 0;
    if (it.type === "grid") return it.resp.some(function (c) { return Object.keys(c).length > 0; });
    if (it.type === "dragdrop") return it.resp.some(function (z) { return z.length > 0; });
    if (it.type === "logselect") return it.resp.lines.length > 0 || !!it.resp.attack;
    return false;
  }

  /* ---------- persistence ---------- */
  function persist() {
    var r = S.run;
    if (!r || r.kind !== "exam") return;
    try {
      localStorage.setItem(C.storageKey, JSON.stringify({
        deadline: r.deadline, startedAt: r.startedAt, idx: S.idx,
        items: r.items.map(function (it) { return { kind: it.kind, id: it.id, resp: it.resp }; })
      }));
    } catch (e) {}
  }
  function clearSaved() { try { localStorage.removeItem(C.storageKey); } catch (e) {} }

  /* ---------- style builders ---------- */
  function optStyle(state) {
    var s = "display:flex;gap:12px;align-items:flex-start;width:100%;text-align:left;font:inherit;" +
      "font-size:14.5px;line-height:1.5;color:var(--color-text);cursor:pointer;background:var(--color-bg);" +
      "border:1.5px solid var(--color-divider);border-radius:10px;padding:13px 15px;min-height:48px;" +
      "transition:border-color .12s ease,background .12s ease;";
    if (state === "sel") s += "border-color:var(--color-accent);background:color-mix(in srgb,var(--color-accent) 12%,var(--color-bg));";
    if (state === "right") s += "border-color:" + GOOD + ";background:color-mix(in srgb," + GOOD + " 12%,var(--color-bg));cursor:default;";
    if (state === "wrong") s += "border-color:" + BAD + ";background:color-mix(in srgb," + BAD + " 12%,var(--color-bg));cursor:default;";
    if (state === "locked") s += "cursor:default;opacity:.75;";
    return s;
  }
  function chipStyle(on, mark) {
    var s = "font:inherit;font-size:14px;cursor:pointer;color:var(--color-text);background:var(--color-bg);" +
      "border:1.5px solid var(--color-divider);border-radius:9px;padding:10px 16px;min-height:44px;";
    if (on) s += "border-color:var(--color-accent);background:color-mix(in srgb,var(--color-accent) 16%,var(--color-bg));color:var(--color-accent-200);";
    if (mark === "right") s += "border-color:" + GOOD + ";background:color-mix(in srgb," + GOOD + " 14%,var(--color-bg));color:var(--color-text);cursor:default;";
    if (mark === "wrong") s += "border-color:" + BAD + ";background:color-mix(in srgb," + BAD + " 14%,var(--color-bg));color:var(--color-text);cursor:default;";
    if (mark === "miss") s += "border-color:" + GOOD + ";border-style:dashed;cursor:default;";
    return s;
  }
  function pillStyle(on) {
    var c = on ? "var(--color-accent)" : "var(--color-divider)";
    return "font:inherit;font-size:13px;cursor:pointer;color:" + (on ? "var(--color-accent)" : "var(--color-neutral-400)") +
      ";background:" + (on ? "color-mix(in srgb,var(--color-accent) 12%,transparent)" : "transparent") +
      ";border:1px solid " + c + ";border-radius:999px;padding:6px 14px;min-height:34px;";
  }
  var CARD_BASE = "position:relative;text-align:left;font:inherit;color:var(--color-text);cursor:pointer;" +
    "border-radius:14px;padding:18px 18px 16px;background:var(--color-surface);border:1.5px solid var(--color-divider);" +
    "display:flex;flex-direction:column;gap:7px;";
  var CARD_ON = "border-color:var(--color-accent);background:color-mix(in srgb,var(--color-accent) 9%,var(--color-surface));";
  var PANEL = "padding:18px 20px;border-radius:12px;background:var(--color-surface);border:1px solid var(--color-divider);";
  var KICKER = "font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--color-accent);";
  var H2MINI = "font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-neutral-500);font-weight:500;";
  var BIGBTN = "font-size:16px;padding:12px 26px;border-radius:10px;";
  var NAVBTN = "font-size:15px;padding:11px 22px;border-radius:10px;";
  var CARDBOX = "background:var(--color-surface);border:1px solid var(--color-divider);border-radius:16px;";

  /* ══════════════════════════════════════════════════════════════════════
     HEADER
     ══════════════════════════════════════════════════════════════════ */
  function renderHeader() {
    var showTimer = false, showProg = false, showExit = false;
    if (S.screen === "run" && S.run) {
      showProg = true;
      hdrProg.textContent = (S.idx + 1) + " / " + S.run.items.length;
      showExit = true;
      hdrExit.textContent = S.run.kind === "exam" ? "Submit" : "End";
      if (S.run.deadline) { showTimer = true; paintTimer(); }
    } else if ((S.screen === "flash" || S.screen === "deck") && S.flash) {
      showProg = true;
      hdrProg.textContent = (S.flash.i + 1) + " / " + S.flash.deck.length;
      showExit = true;
      hdrExit.textContent = "End";
    }
    hdrTimer.hidden = !showTimer;
    hdrProg.hidden = !showProg;
    hdrExit.hidden = !showExit;
  }
  function paintTimer() {
    if (!(S.screen === "run" && S.run && S.run.deadline)) return;
    var left = Math.max(0, Math.round((S.run.deadline - Date.now()) / 1000));
    var low = left <= 300;
    hdrTimer.textContent = fmt(left);
    hdrTimer.style.border = "1px solid " + (low ? BAD : "var(--color-divider)");
    hdrTimer.style.color = low ? BAD : "var(--color-text)";
    hdrTimer.style.animation = low ? "azPulse 1s steps(2,end) infinite" : "none";
  }

  /* ══════════════════════════════════════════════════════════════════════
     SCREENS
     ══════════════════════════════════════════════════════════════════ */
  function modeCard(action, kicker, title, desc, cta, extraAttr) {
    return '<button class="hub-card-btn" type="button" data-a="' + action + '"' + (extraAttr || "") +
      ' style="' + CARD_BASE + 'padding:20px 20px 18px;min-height:190px">' +
      '<span style="' + KICKER + '">' + kicker + '</span>' +
      '<span style="font-family:var(--font-heading);font-size:21px;font-weight:500">' + title + '</span>' +
      '<span style="font-size:13.5px;color:var(--color-neutral-400);flex:1">' + desc + '</span>' +
      '<span style="color:var(--color-accent);font-size:13px">' + cta + '</span></button>';
  }

  function screenHome() {
    var mcq = S.bank.length || "…", pbq = S.pbqs.length || "…";
    var h = '<div class="az-in">' +
      '<p style="' + KICKER + 'margin:0 0 10px">' + esc(C.eyebrow) + '</p>' +
      '<h1 style="font-size:clamp(30px,7vw,44px);line-height:1.08;letter-spacing:-.02em;margin:0 0 12px;font-weight:500">How do you want to study?</h1>' +
      '<p style="max-width:56ch;color:var(--color-neutral-400);margin:0 0 6px">' + C.blurb + '</p>' +
      '<div style="display:flex;flex-wrap:wrap;gap:8px;margin:18px 0 4px">' +
        '<span class="tag tag-neutral">' + mcq + ' multiple-choice</span>' +
        (C.hasPbqs ? '<span class="tag tag-neutral">' + pbq + ' performance-based</span>' : "") +
        '<span class="tag tag-outline">' + C.sections.length + ' exam sections</span></div>';

    if (S.resume) {
      var left = Math.max(0, Math.round((S.resume.deadline - Date.now()) / 1000));
      h += '<div style="margin:26px 0 0;padding:16px 18px;border-radius:14px;border:1px solid var(--color-accent);' +
        'background:color-mix(in srgb,var(--color-accent) 10%,transparent);display:flex;flex-wrap:wrap;gap:12px;align-items:center">' +
        '<span style="width:8px;height:8px;border-radius:50%;background:var(--color-accent);animation:azPulse 1.4s steps(2,end) infinite"></span>' +
        '<div style="flex:1 1 220px;min-width:0"><div style="font-family:var(--font-heading);font-weight:500">Live exam in progress</div>' +
        '<div id="resume-detail" style="font-size:13px;color:var(--color-neutral-400)">' +
          fmt(left) + ' remaining · ' + S.resume.items.length + ' questions · answers saved</div></div>' +
        '<button class="btn btn-secondary" type="button" data-a="discardResume">Discard</button>' +
        '<button class="btn btn-primary" type="button" data-a="doResume">Resume exam</button></div>';
    }

    h += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:14px;margin-top:28px">';
    h += modeCard("goSetup", "Test yourself", "Practice Exam",
      'Randomized multiple choice. Choose <b style="color:var(--color-text);font-weight:500">Practice Mode</b> for instant feedback, or <b style="color:var(--color-text);font-weight:500">Exam Mode</b> for a timed simulation' +
      (C.hasPbqs ? " with PBQs up front." : "."), "Choose a mode →");
    h += modeCard("goFlashSetup", "Drill the pool", "Exam Flashcards",
      "Flip through real questions from the pool — recall the answer, reveal it, grade yourself. Missed cards come back at the end.",
      "Start drilling →");
    if (C.hasPbqs) {
      h += modeCard("goPbqSetup", "Master the hard part", "PBQ Practice Exam", C.pbqBlurb, "Build a PBQ set →");
    }
    (C.extras || []).forEach(function (x) {
      h += modeCard(x.kind === "lessons" ? "goLessons" : "goDeckSetup",
        x.kicker, x.title, x.desc, x.cta, ' data-v="' + esc(x.id) + '"');
    });
    h += '</div>';

    h += '<h2 style="' + H2MINI + 'margin:44px 0 14px">' + esc(C.sectionsHeading || "Skills at a glance") + '</h2><div style="display:grid;gap:10px">';
    C.sections.forEach(function (s) {
      h += '<div style="display:flex;gap:14px;align-items:baseline;padding:13px 16px;border-radius:10px;background:var(--color-surface);border:1px solid var(--color-divider)">' +
        '<span style="color:var(--color-accent);font-size:12px;font-variant-numeric:tabular-nums">' + pad(s.n) + '</span>' +
        '<span style="flex:1;min-width:0">' + esc(s.name) + '</span>' +
        '<span style="font-size:12.5px;color:var(--color-neutral-500);white-space:nowrap">' + esc(s.weight) + '</span></div>';
    });
    return h + '</div><p style="color:var(--color-neutral-600);font-size:12.5px;margin-top:26px">' + C.footer + '</p></div>';
  }

  function backBtn() {
    return '<button class="btn btn-ghost" type="button" data-a="goHome" style="margin-bottom:14px">‹ Back to modes</button>';
  }
  function h1(text) {
    return '<h1 style="font-size:clamp(26px,6vw,38px);line-height:1.1;letter-spacing:-.02em;margin:0 0 10px;font-weight:500">' + text + '</h1>';
  }

  function screenSetup() {
    var ex = S.mode === "exam";
    var notReady = S.loading || !S.bank.length;
    function check(act) {
      return 'position:absolute;top:14px;right:14px;width:20px;height:20px;border-radius:50%;display:grid;place-items:center;font-size:11px;' +
        'border:1.5px solid ' + (act ? "var(--color-accent)" : "var(--color-divider)") + ';' +
        'background:' + (act ? "var(--color-accent)" : "transparent") + ';color:' + (act ? "var(--color-bg)" : "transparent") + ';';
    }
    var h = '<div class="az-in">' + backBtn() + h1("Build your practice exam") +
      '<p style="max-width:56ch;color:var(--color-neutral-400);margin:0 0 24px">Pick how you want to be tested. Both modes draw from the same pool of ' +
        (S.bank.length || "…") + ' questions.</p>' +
      '<div role="radiogroup" aria-label="Exam mode" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px;margin-bottom:26px">' +
        '<button type="button" role="radio" aria-checked="' + (!ex) + '" data-a="pickPractice" style="' + CARD_BASE + (ex ? "" : CARD_ON) + '">' +
          '<span style="' + check(!ex) + '">✓</span><span style="' + KICKER + '">Learn as you go</span>' +
          '<span style="font-family:var(--font-heading);font-size:20px;font-weight:500">Practice Mode</span>' +
          '<span style="font-size:13.5px;color:var(--color-neutral-400)">Real-time feedback: every answer is graded the moment you pick it, with the explanation and its exam section shown right away.</span></button>' +
        '<button type="button" role="radio" aria-checked="' + ex + '" data-a="pickExam" style="' + CARD_BASE + (ex ? CARD_ON : "") + '">' +
          '<span style="' + check(ex) + '">✓</span><span style="' + KICKER + '">Simulate exam day</span>' +
          '<span style="font-family:var(--font-heading);font-size:20px;font-weight:500">Exam Mode</span>' +
          '<span style="font-size:13.5px;color:var(--color-neutral-400)">The real thing: ' + C.exam.total + ' questions, a ' + C.exam.minutes +
            '-minute countdown, ' + (C.hasPbqs ? "3–5 random PBQ scenarios up front, " : "") + 'and no feedback until you submit.</span></button></div>';

    if (!ex) {
      h += '<div style="' + PANEL + 'margin-bottom:22px">' +
        '<label for="ez-size" style="display:block;font-size:12px;color:var(--color-neutral-400);margin-bottom:10px">Number of questions</label>' +
        '<div style="display:flex;align-items:center;gap:16px">' +
          '<input id="ez-size" type="range" min="' + C.practice.min + '" max="' + C.practice.max + '" step="1" value="' + S.size +
            '" data-a="setSize" style="flex:1;accent-color:var(--color-accent);height:26px" />' +
          '<output id="ez-size-out" style="font-variant-numeric:tabular-nums;font-size:22px;min-width:2.4ch;text-align:right">' + S.size + '</output></div>' +
        '<label style="display:flex;gap:10px;align-items:flex-start;margin-top:18px;cursor:pointer;font-size:13.5px">' +
          '<input type="checkbox"' + (S.shuffle ? " checked" : "") + ' data-a="toggleShuffle" style="accent-color:var(--color-accent);width:17px;height:17px;margin-top:2px" />' +
          '<span>Shuffle answer choices within each question <span style="color:var(--color-neutral-600)">— letters stay attached to their text, so explanations still line up.</span></span>' +
        '</label></div>';
    } else {
      var cell = function (label, val) {
        return '<div><div style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-neutral-500);margin-bottom:4px">' + label +
          '</div><div style="font-size:20px;font-variant-numeric:tabular-nums">' + val + '</div></div>';
      };
      h += '<div style="' + PANEL + 'margin-bottom:22px;display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:16px">' +
        cell("Questions", C.exam.total) + cell("Time limit", C.exam.minutes + " min") +
        (C.hasPbqs ? cell("PBQs first", "3–5") : "") + cell("Pass line", C.exam.pass + "%") +
        '<div style="grid-column:1/-1;font-size:13px;color:var(--color-neutral-400);border-top:1px solid var(--color-divider);padding-top:14px">' +
        (C.hasPbqs ? 'PBQs are worth <b style="color:var(--color-text);font-weight:500">' + C.exam.weight +
          ' points</b> each with partial credit; multiple-choice items are worth 1. ' : "") +
        'No feedback until you submit — and the attempt is saved, so a refresh won’t lose your answers or your clock.</div></div>';
    }

    h += '<button class="btn btn-primary" type="button" data-a="startExam"' + (notReady ? " disabled" : "") + ' style="' + BIGBTN + '">' +
      (ex ? "Begin live exam →" : "Start practice exam →") + '</button>';
    if (S.loading) h += '<p style="color:var(--color-neutral-600);font-size:13px;margin-top:12px">Loading question bank…</p>';
    return h + '</div>';
  }

  function pickerGrid(list, action, current, minw) {
    var h = '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(' + minw + 'px,1fr));gap:10px;margin-bottom:24px">';
    list.forEach(function (c) {
      h += '<button type="button" data-a="' + action + '" data-v="' + esc(c[0]) + '" style="' + CARD_BASE + 'padding:14px 16px;gap:0;' +
        (String(current) === String(c[0]) ? CARD_ON : "") + '">' +
        '<span style="font-family:var(--font-heading);font-size:16px;font-weight:500;display:block">' + c[1] + '</span>' +
        '<span style="font-size:12.5px;color:var(--color-neutral-500);display:block;margin-top:3px">' + c[2] + '</span></button>';
    });
    return h + '</div>';
  }

  function screenPbqSetup() {
    var h = '<div class="az-in">' + backBtn() + h1("Build your PBQ practice exam") +
      '<p style="max-width:58ch;color:var(--color-neutral-400);margin:0 0 24px">Randomized performance-based questions from a pool of ' +
        (S.pbqs.length || "…") + ' items — instant feedback, partial credit, and a full review at the end.</p>';
    if (C.pbqCats && C.pbqCats.length > 1) {
      h += '<div style="font-size:12px;color:var(--color-neutral-400);margin-bottom:10px">Focus area</div>' +
        pickerGrid(C.pbqCats, "setPbqCat", S.pbqCat, 150);
    }
    h += '<div style="font-size:12px;color:var(--color-neutral-400);margin-bottom:10px">Number of questions</div>' +
      pickerGrid(C.pbqSizes, "setPbqSize", S.pbqSize, 120) +
      '<button class="btn btn-primary" type="button" data-a="startPbq" style="' + BIGBTN + '">Start PBQ exam</button></div>';
    return h;
  }

  function screenFlashSetup() {
    var notReady = S.loading || !S.bank.length;
    return '<div class="az-in">' + backBtn() + h1("Build your flashcard set") +
      '<p style="max-width:56ch;color:var(--color-neutral-400);margin:0 0 24px">Cards are drawn at random from the ' +
        (S.bank.length || "…") + '-question pool. Reveal the answer, then say whether you knew it.</p>' +
      '<div style="' + PANEL + 'margin-bottom:22px">' +
        '<label for="ez-deck" style="display:block;font-size:12px;color:var(--color-neutral-400);margin-bottom:10px">Number of cards</label>' +
        '<div style="display:flex;align-items:center;gap:16px">' +
          '<input id="ez-deck" type="range" min="' + C.deck.min + '" max="' + C.deck.max + '" step="' + C.deck.step + '" value="' + S.deckSize +
            '" data-a="setDeck" style="flex:1;accent-color:var(--color-accent);height:26px" />' +
          '<output id="ez-deck-out" style="font-variant-numeric:tabular-nums;font-size:22px;min-width:3ch;text-align:right">' + S.deckSize + '</output>' +
        '</div></div>' +
      '<button class="btn btn-primary" type="button" data-a="startFlash"' + (notReady ? " disabled" : "") + ' style="' + BIGBTN + '">Start studying</button></div>';
  }

  /* --- extra decks (Ports & Protocols, Acronyms) --- */
  function screenDeckSetup() {
    var x = extraById(S.extraId);
    if (!x) return "";
    var n = (x.load() || []).length;
    var size = Math.min(S.xdeckSize, n) || n;
    var h = '<div class="az-in">' + backBtn() + h1(esc(x.title)) +
      '<p style="max-width:58ch;color:var(--color-neutral-400);margin:0 0 24px">' + x.setupBlurb + '</p>';
    if (x.quiz) {
      h += '<div style="font-size:12px;color:var(--color-neutral-400);margin-bottom:10px">How do you want to run it?</div>' +
        pickerGrid([["cards", "Flashcards", "Reveal and self-grade"], ["quiz", "Quiz", "Multiple choice, scored"]], "setDeckMode", S.deckMode, 150);
    }
    h += '<div style="' + PANEL + 'margin-bottom:22px">' +
      '<label for="ez-xdeck" style="display:block;font-size:12px;color:var(--color-neutral-400);margin-bottom:10px">Number of ' +
        (S.deckMode === "quiz" ? "questions" : "cards") + ' <span style="color:var(--color-neutral-600)">(pool of ' + n + ')</span></label>' +
      '<div style="display:flex;align-items:center;gap:16px">' +
        '<input id="ez-xdeck" type="range" min="5" max="' + Math.max(5, n) + '" step="1" value="' + size +
          '" data-a="setXDeck" style="flex:1;accent-color:var(--color-accent);height:26px" />' +
        '<output id="ez-xdeck-out" style="font-variant-numeric:tabular-nums;font-size:22px;min-width:3ch;text-align:right">' + size + '</output></div></div>' +
      '<button class="btn btn-primary" type="button" data-a="startDeck" style="' + BIGBTN + '">' +
        (S.deckMode === "quiz" ? "Start quiz" : "Start studying") + '</button></div>';
    return h;
  }

  /* --- flashcard runner (pool cards and deck cards) --- */
  function screenFlash() {
    var f = S.flash, isDeck = f.kind === "deck";
    var card = f.deck[f.i];
    var head = isDeck ? esc(f.title) : esc(secLabel(card.domain));
    var h = '<div><div style="display:flex;justify-content:space-between;align-items:baseline;font-size:12.5px;color:var(--color-neutral-500);margin-bottom:14px">' +
      '<span>Card ' + (f.i + 1) + ' of ' + f.deck.length + '</span><span>' + head + '</span></div>' +
      '<div style="' + CARDBOX + 'padding:clamp(20px,5vw,34px);min-height:300px;display:flex;flex-direction:column">' +
      '<p style="' + KICKER + 'margin:0 0 14px">' + (isDeck ? esc(card.kicker || "Term") : "Question") + '</p>' +
      '<p style="font-size:clamp(16px,3.6vw,19px);line-height:1.5;margin:0 0 18px">' + esc(isDeck ? card.front : card.question) + '</p>';

    if (!isDeck) {
      h += '<ul style="list-style:none;padding:0;margin:0 0 16px;display:grid;gap:7px">';
      mcqOptions(card).forEach(function (o) {
        var hit = f.revealed && (card.correct || []).indexOf(o.key) !== -1;
        h += '<li style="list-style:none;padding:10px 13px;border-radius:9px;font-size:14px;line-height:1.45;border:1px solid ' +
          (hit ? GOOD : "var(--color-divider)") + ';background:' + (hit ? "color-mix(in srgb," + GOOD + " 12%,var(--color-bg))" : "var(--color-bg)") + '">' +
          '<b style="color:var(--color-accent);font-weight:500;margin-right:9px">' + esc(o.key) + '</b>' + esc(o.text) + '</li>';
      });
      h += '</ul>';
    }

    if (f.revealed) {
      var label = isDeck ? esc(card.backLabel || "Answer") : "Answer · " + esc((card.correct || []).join(", "));
      var body = isDeck ? (card.back + (card.extra ? "\n\n" + card.extra : "")) : (card.explanation || "No explanation recorded for this item.");
      h += '<div style="margin-top:auto;border-top:1px solid var(--color-divider);padding-top:16px">' +
        '<p style="' + KICKER + 'margin:0 0 8px">' + label + '</p>' +
        '<p style="font-size:14px;line-height:1.6;color:var(--color-neutral-300);margin:0;white-space:pre-wrap">' + esc(body) + '</p></div>';
    }
    h += '</div><div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:18px">';
    if (!f.revealed) {
      h += '<button class="btn btn-primary" type="button" data-a="revealCard" style="' + NAVBTN + 'flex:1 1 200px">Reveal answer</button>';
    } else {
      h += '<button class="btn btn-secondary" type="button" data-a="gradeMiss" style="' + NAVBTN + 'flex:1 1 160px;border-color:' + BAD + ';color:oklch(0.75 0.15 25)">Didn’t know it</button>' +
        '<button class="btn btn-secondary" type="button" data-a="gradeKnown" style="' + NAVBTN + 'flex:1 1 160px;border-color:oklch(0.72 0.13 152);color:oklch(0.78 0.12 152)">I knew it</button>';
    }
    return h + '<button class="btn btn-ghost" type="button" data-a="askEnd" style="flex:0 0 auto">End session</button></div></div>';
  }

  /* --- lessons (Security+) --- */
  function screenLessons() {
    var x = extraById(S.extraId);
    var list = (x && x.list()) || [];
    var h = '<div class="az-in">' + backBtn() + h1(esc(x ? x.title : "Lessons")) +
      '<p style="max-width:58ch;color:var(--color-neutral-400);margin:0 0 24px">' + (x ? x.setupBlurb : "") + '</p>' +
      '<div style="display:grid;gap:12px">';
    list.forEach(function (l) {
      h += '<button class="hub-card-btn" type="button" data-a="openLesson" data-v="' + esc(l.id) + '" style="' + CARD_BASE + 'padding:16px 18px">' +
        '<span style="' + KICKER + '">' + esc(l.eyebrow || "Lesson") + (l.minutes ? " · " + l.minutes + " min" : "") + '</span>' +
        '<span style="font-family:var(--font-heading);font-size:18px;font-weight:500">' + esc(l.title) + '</span>' +
        '<span style="font-size:13.5px;color:var(--color-neutral-400)">' + esc(l.summary || "") + '</span></button>';
    });
    return h + '</div></div>';
  }
  function screenLesson() {
    var x = extraById(S.extraId);
    var list = (x && x.list()) || [];
    var meta = null;
    for (var i = 0; i < list.length; i++) if (list[i].id === S.lessonId) meta = list[i];
    var idx = list.indexOf(meta);
    var h = '<div class="az-in">' +
      '<button class="btn btn-ghost" type="button" data-a="goLessons" style="margin-bottom:14px">‹ All lessons</button>' +
      '<p style="' + KICKER + 'margin:0 0 8px">' + esc(meta ? (meta.eyebrow || "Lesson") : "Lesson") +
        (meta && meta.minutes ? " · " + meta.minutes + " min" : "") + '</p>' +
      h1(esc(meta ? meta.title : "")) +
      '<div style="' + CARDBOX + 'padding:clamp(18px,4.5vw,30px);margin-top:18px">' + (x ? x.render(S.lessonId) : "") + '</div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:24px">';
    if (idx > 0) h += '<button class="btn btn-secondary" type="button" data-a="openLesson" data-v="' + esc(list[idx - 1].id) + '" style="' + NAVBTN + '">‹ Previous lesson</button>';
    if (idx > -1 && idx < list.length - 1) h += '<button class="btn btn-primary" type="button" data-a="openLesson" data-v="' + esc(list[idx + 1].id) + '" style="' + NAVBTN + '">Next lesson ›</button>';
    return h + '</div></div>';
  }

  /* --- question runner --- */
  function screenRun() {
    var run = S.run, it = run.items[S.idx], done = it.graded;
    var h = '<div>';

    if (run.dots) {
      h += '<div aria-label="Question navigator" style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:20px">';
      run.items.forEach(function (x, i) {
        h += '<button type="button" aria-label="Question ' + (i + 1) + '" data-a="jump" data-v="' + i +
          '" style="width:18px;height:18px;border-radius:5px;padding:0;cursor:pointer;border:1px solid ' +
          (i === S.idx ? "var(--color-accent)" : "var(--color-divider)") + ';background:' +
          (answered(x) ? "color-mix(in srgb,var(--color-accent) 45%,transparent)" : "transparent") + ';box-shadow:' +
          (i === S.idx ? "0 0 0 2px color-mix(in srgb,var(--color-accent) 40%,transparent)" : "none") + '"></button>';
      });
      h += '</div>';
    }

    var kicker = it.kind === "pbq" ? "PBQ · " + it.title : "Question " + (S.idx + 1) + " of " + run.items.length;
    h += '<div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-bottom:12px">' +
      '<span style="' + KICKER + '">' + esc(kicker) + '</span>' +
      '<span style="font-size:11.5px;color:var(--color-neutral-500);border:1px solid var(--color-divider);border-radius:6px;padding:3px 9px">' +
        esc(secLabel(it.domain)) + '</span></div>';

    h += '<div style="' + CARDBOX + 'padding:clamp(18px,4.5vw,30px)">';
    if (it.kind === "pbq" && it.scenario) {
      h += '<p style="font-size:14px;line-height:1.6;color:var(--color-neutral-400);margin:0 0 16px">' + esc(it.scenario) + '</p>';
    }
    if (it.stemPre) h += '<p style="font-size:14px;line-height:1.6;color:var(--color-neutral-400);margin:0 0 16px">' + esc(it.stemPre) + '</p>';
    (it.exhibits || []).forEach(function (src) { h += exhibitTag(src); });
    if (it.exhibit) h += exhibitTag(it.exhibit);
    h += '<h2 style="font-size:clamp(16.5px,3.6vw,20px);line-height:1.5;font-weight:500;margin:0 0 18px;text-wrap:pretty">' + esc(it.stem) + '</h2>';
    if (it.stemPost) h += '<p style="font-size:14px;line-height:1.6;color:var(--color-neutral-400);margin:-8px 0 18px">' + esc(it.stemPost) + '</p>';

    var hint = "";
    if (it.multi) hint = "Select " + it.correct.length + " answers.";
    if (it.type === "dragdrop") hint = "Tap every option that belongs in the answer area.";
    if (it.type === "logselect") hint = "Select every log line that looks malicious, then identify the attack.";
    if (hint) h += '<p style="font-size:12.5px;color:var(--color-neutral-500);font-style:italic;margin:0 0 14px">' + esc(hint) + '</p>';

    if (it.kind === "mcq" || it.type === "mcq") {
      h += '<div style="display:grid;gap:8px">';
      it.options.forEach(function (o) {
        var sel = it.resp.indexOf(o.key) !== -1;
        var isRight = it.correct.indexOf(o.key) !== -1;
        var state = sel ? "sel" : "", mark = "", markColor = "transparent";
        if (done) {
          if (isRight) { state = "right"; mark = "✓"; markColor = GOOD; }
          else if (sel) { state = "wrong"; mark = "✕"; markColor = BAD; }
          else state = "locked";
        }
        h += '<button type="button" data-a="pickOption" data-v="' + esc(o.key) + '"' + (done ? " disabled" : "") +
          ' aria-pressed="' + sel + '" style="' + optStyle(state) + '">' +
          '<span style="flex:0 0 auto;width:26px;height:26px;border-radius:50%;display:grid;place-items:center;font-size:12.5px;border:1px solid ' +
            (sel ? "var(--color-accent)" : "var(--color-divider)") + ';background:' + (sel ? "var(--color-accent)" : "transparent") +
            ';color:' + (sel ? "var(--color-bg)" : "var(--color-neutral-400)") + '">' + esc(o.key) + '</span>' +
          '<span style="flex:1;min-width:0">' + esc(o.text) + '</span>' +
          '<span style="color:' + markColor + ';font-size:15px;flex:0 0 auto">' + mark + '</span></button>';
      });
      h += '</div>';
    } else if (it.type === "grid") {
      h += '<div style="display:grid;gap:12px">';
      it.rows.forEach(function (row, ri) {
        var rowOk = done && Object.keys(row.answer || {}).every(function (k) {
          var want = row.answer[k], have = String(it.resp[ri][k] || "").trim().toLowerCase();
          return Array.isArray(want)
            ? want.some(function (w) { return String(w).trim().toLowerCase() === have; })
            : have === String(want).trim().toLowerCase();
        });
        h += '<div style="padding:15px 16px;border-radius:12px;background:var(--color-bg);border:1px solid ' +
          (done ? (rowOk ? GOOD : BAD) : "var(--color-divider)") + '">' +
          '<div style="font-size:14.5px;line-height:1.5;margin-bottom:11px">' + esc(row.prompt) + '</div>';
        (it.columns || []).forEach(function (col) {
          var val = it.resp[ri][col.key] || "";
          var rowOpts = (row.options || {})[col.key];
          var opts = (rowOpts && rowOpts.length ? rowOpts : col.options) || [];
          var want = (row.answer || {})[col.key];
          var wantTxt = Array.isArray(want) ? want.join(" / ") : String(want == null ? "" : want);
          h += '<div>';
          if (opts.length && opts.length <= 3) {
            h += '<div style="display:flex;flex-wrap:wrap;gap:8px">';
            opts.forEach(function (o) {
              var sel = val === o, mark = "";
              if (done) {
                var isRight = Array.isArray(want) ? want.indexOf(o) !== -1 : o === want;
                if (sel && isRight) mark = "right"; else if (sel) mark = "wrong"; else if (isRight) mark = "miss";
              }
              h += '<button type="button" data-a="pickCell" data-ri="' + ri + '" data-ck="' + esc(col.key) + '" data-v="' + esc(o) + '"' +
                (done ? " disabled" : "") + ' aria-pressed="' + sel + '" style="' + chipStyle(sel, mark) + '">' + esc(o) + '</button>';
            });
            h += '</div>';
          } else {
            h += '<select data-a="changeCell" data-ri="' + ri + '" data-ck="' + esc(col.key) + '"' + (done ? " disabled" : "") +
              ' aria-label="' + esc((col.label || "Answer") + " for statement " + (ri + 1)) + '"' +
              ' style="width:100%;font:inherit;font-size:14px;color:var(--color-text);min-height:44px;background:var(--color-surface);border:1px solid var(--color-divider);border-radius:9px;padding:9px 11px">' +
              '<option value=""' + (val === "" ? " selected" : "") + '>— select —</option>';
            opts.forEach(function (o) {
              h += '<option value="' + esc(o) + '"' + (val === o ? " selected" : "") + '>' + esc(o) + '</option>';
            });
            h += '</select>';
          }
          if (done && String(val).trim().toLowerCase() !== String(wantTxt).trim().toLowerCase()) {
            h += '<div style="font-size:13px;color:' + GOOD + ';margin-top:9px">Correct: ' + esc(wantTxt) + '</div>';
          }
          h += '</div>';
        });
        h += '</div>';
      });
      h += '</div>';
    } else if (it.type === "dragdrop") {
      h += '<div style="display:grid;gap:16px">';
      it.zones.forEach(function (z, zi) {
        var want = z.answer || [], have = it.resp[zi] || [];
        var zoneOk = done && want.length === have.length && want.every(function (w) { return have.indexOf(w) !== -1; });
        h += '<div style="padding:15px 16px;border-radius:12px;background:var(--color-bg);border:1px solid ' +
          (done ? (zoneOk ? GOOD : BAD) : "var(--color-divider)") + '">' +
          '<div style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-neutral-500);margin-bottom:11px">' +
            esc(z.prompt || "Answer area") + '</div><div style="display:flex;flex-wrap:wrap;gap:8px">';
        (it.items || []).forEach(function (label) {
          var sel = have.indexOf(label) !== -1, mark = "";
          if (done) {
            var isRight = want.indexOf(label) !== -1;
            if (sel && isRight) mark = "right"; else if (sel) mark = "wrong"; else if (isRight) mark = "miss";
          }
          h += '<button type="button" data-a="toggleChip" data-zi="' + zi + '" data-v="' + esc(label) + '"' + (done ? " disabled" : "") +
            ' aria-pressed="' + sel + '" style="' + chipStyle(sel, mark) + '">' + esc(label) + '</button>';
        });
        h += '</div>';
        if (done && !zoneOk) {
          h += '<div style="font-size:13px;color:var(--color-neutral-400);margin-top:12px;border-top:1px dashed var(--color-divider);padding-top:10px">Correct: ' +
            '<b style="color:var(--color-text);font-weight:500">' + esc(want.join(", ")) + '</b></div>';
        }
        h += '</div>';
      });
      h += '</div>';
    } else if (it.type === "logselect") {
      h += '<div style="display:grid;gap:6px;margin-bottom:18px">';
      it.lines.forEach(function (ln, li) {
        var on = it.resp.lines.indexOf(li) !== -1;
        var border = "var(--color-divider)", bg = "var(--color-bg)";
        if (on) { border = "var(--color-accent)"; bg = "color-mix(in srgb,var(--color-accent) 12%,var(--color-bg))"; }
        if (done) {
          if (ln.bad && on) { border = GOOD; bg = "color-mix(in srgb," + GOOD + " 12%,var(--color-bg))"; }
          else if (ln.bad) { border = GOOD; bg = "var(--color-bg)"; }
          else if (on) { border = BAD; bg = "color-mix(in srgb," + BAD + " 12%,var(--color-bg))"; }
        }
        h += '<button type="button" data-a="toggleLine" data-v="' + li + '"' + (done ? " disabled" : "") +
          ' aria-pressed="' + on + '" style="display:flex;gap:10px;align-items:baseline;width:100%;text-align:left;cursor:' +
          (done ? "default" : "pointer") + ';font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12.5px;line-height:1.5;' +
          'color:var(--color-text);background:' + bg + ';border:1px solid ' + border + ';border-radius:8px;padding:9px 12px' +
          (done && ln.bad ? ';border-style:dashed' : "") + '">' +
          '<span style="flex:0 0 auto;color:var(--color-neutral-500)">' + (li + 1) + '</span>' +
          (ln.level ? '<span style="flex:0 0 auto;color:' + (ln.level === "ALERT" ? BAD : "var(--color-neutral-500)") + '">[' + esc(ln.level) + ']</span>' : "") +
          '<span style="flex:1;min-width:0;word-break:break-word">' + esc(ln.text) + '</span></button>';
      });
      h += '</div><div style="padding:15px 16px;border-radius:12px;background:var(--color-bg);border:1px solid ' +
        (done ? (it.resp.attack === it.attackAnswer ? GOOD : BAD) : "var(--color-divider)") + '">' +
        '<div style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-neutral-500);margin-bottom:11px">Attack type observed</div>' +
        '<select data-a="setAttack"' + (done ? " disabled" : "") + ' aria-label="Attack type observed"' +
        ' style="width:100%;font:inherit;font-size:14px;color:var(--color-text);min-height:44px;background:var(--color-surface);border:1px solid var(--color-divider);border-radius:9px;padding:9px 11px">' +
        '<option value=""' + (it.resp.attack ? "" : " selected") + '>— select —</option>';
      it.attackOptions.forEach(function (o) {
        h += '<option value="' + esc(o) + '"' + (it.resp.attack === o ? " selected" : "") + '>' + esc(o) + '</option>';
      });
      h += '</select>';
      if (done && it.resp.attack !== it.attackAnswer) {
        h += '<div style="font-size:13px;color:' + GOOD + ';margin-top:9px">Correct: ' + esc(it.attackAnswer) + '</div>';
      }
      h += '</div>';
    }

    if (run.feedback && done) {
      var s = it.score, full = s === 1, none = s === 0;
      var col = full ? GOOD : none ? BAD : PART;
      h += '<div style="margin-top:20px;padding:16px 18px;border-radius:12px;border:1px solid var(--color-divider);' +
        'border-left:3px solid ' + col + ';background:color-mix(in srgb,' + col + ' 7%,var(--color-bg))">' +
        '<div style="display:flex;gap:10px;align-items:baseline;margin-bottom:8px">' +
          '<span style="color:' + col + ';font-size:16px">' + (full ? "✓" : none ? "✕" : "◐") + '</span>' +
          '<span style="font-family:var(--font-heading);font-size:16px;font-weight:500">' +
            (full ? "Correct" : none ? "Not quite" : Math.round(s * 100) + "% credit") + '</span>' +
          '<span style="margin-left:auto;font-size:12px;color:var(--color-neutral-500);white-space:nowrap">' + esc(secLabel(it.domain)) + '</span>' +
        '</div><p style="font-size:14px;line-height:1.6;color:var(--color-neutral-300);margin:0;white-space:pre-wrap">' +
        esc(it.explanation || "No explanation recorded for this item.") + '</p></div>';
    }
    h += '</div>';

    var last = S.idx === run.items.length - 1;
    h += '<div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:18px">';
    if (run.dots || run.kind === "pbq") {
      h += '<button class="btn btn-secondary" type="button" data-a="prevQ"' + (S.idx === 0 ? " disabled" : "") + ' style="' + NAVBTN + '">‹ Previous</button>';
    }
    if (!done && (it.type === "grid" || it.type === "dragdrop" || it.type === "logselect")) {
      h += '<button class="btn btn-secondary" type="button" data-a="resetQ" style="' + NAVBTN + '">Reset</button>';
    }
    h += '<span style="flex:1"></span>';
    if (run.feedback && !done) {
      h += '<button class="btn btn-primary" type="button" data-a="submitQ"' + (answered(it) ? "" : " disabled") + ' style="' + NAVBTN + 'flex:1 1 180px">Submit answer</button>';
    } else {
      h += '<button class="btn btn-primary" type="button" data-a="nextQ" style="' + NAVBTN + 'flex:1 1 180px">' + (last ? "Finish &amp; see results" : "Next ›") + '</button>';
    }
    return h + '</div></div>';
  }

  /* --- results --- */
  function screenResults() {
    var R = S.results, items = R.items, pct = R.pct;
    var pass = pct >= C.exam.pass, col = pass ? GOOD : BAD;
    var bySection = R.kind !== "deck" && R.kind !== "quiz";
    var h = '<div class="az-in">';
    if (R.auto) {
      h += '<p style="font-size:13px;color:' + PART + ';border:1px solid ' + PART + ';border-radius:10px;padding:11px 15px;margin:0 0 20px">⏱ Time expired — the exam was submitted automatically.</p>';
    }
    var verdict = R.kind === "exam"
      ? (pass ? "Above the " + C.exam.pass + "% pass line" : "Below the " + C.exam.pass + "% pass line")
      : (pct >= 80 ? "Strong" : pct >= 65 ? "Getting there" : "Needs work");
    h += '<p style="' + KICKER + 'margin:0 0 10px">' + esc(R.eyebrow) + '</p>' +
      '<div style="display:flex;flex-wrap:wrap;gap:clamp(16px,4vw,40px);align-items:flex-end;margin-bottom:8px">' +
        '<div style="font-size:clamp(54px,14vw,84px);line-height:.95;font-variant-numeric:tabular-nums;font-family:var(--font-heading);font-weight:500">' + pct + '%</div>' +
        '<div style="padding-bottom:8px">' +
          '<div style="display:inline-block;font-size:13px;padding:5px 13px;border-radius:999px;border:1px solid ' + col + ';color:' + col + '">' + verdict + '</div>' +
          '<div style="font-size:13.5px;color:var(--color-neutral-400);margin-top:8px">' +
            R.earned.toFixed(1) + ' of ' + R.possible + ' points across ' + items.length + ' answered question' + (items.length === 1 ? "" : "s") +
            (R.skipped ? " · " + R.skipped + " left unanswered and not scored" : "") + '</div></div></div>' +
      '<div style="height:6px;border-radius:999px;background:var(--color-neutral-900);overflow:hidden;margin:18px 0 26px">' +
        '<div style="height:100%;width:' + pct + '%;background:' + col + ';border-radius:999px;transition:width .5s ease"></div></div>';

    var mcqItems = items.filter(function (i) { return i.kind === "mcq"; });
    var pbqItems = items.filter(function (i) { return i.kind === "pbq"; });
    var stats = [[mcqItems.filter(function (i) { return i.score === 1; }).length + " / " + mcqItems.length, "multiple choice correct"]];
    if (pbqItems.length) {
      stats.push([pbqItems.reduce(function (a, i) { return a + i.score; }, 0).toFixed(1) + " / " + pbqItems.length,
        "PBQ credit (×" + C.exam.weight + " points)"]);
    }
    if (R.elapsed) stats.push([fmt(R.elapsed), "used of " + C.exam.minutes + ":00"]);
    h += '<div style="display:flex;flex-wrap:wrap;gap:10px 30px;font-size:13.5px;color:var(--color-neutral-400);border-top:1px solid var(--color-divider);padding-top:16px;margin-bottom:34px">';
    stats.forEach(function (st) {
      h += '<span><b style="color:var(--color-text);font-weight:500">' + esc(st[0]) + '</b> ' + esc(st[1]) + '</span>';
    });
    h += '</div>';

    if (bySection) {
      h += '<h2 style="' + H2MINI + 'margin:0 0 6px">How you did by section</h2>' +
        '<p style="font-size:13px;color:var(--color-neutral-600);margin:0 0 16px">Compared against the real exam’s section weighting.</p>' +
        '<div style="display:grid;gap:12px;margin-bottom:18px">';
      var worst = null;
      C.sections.forEach(function (s) {
        var list = items.filter(function (i) { return (i.domain || 1) === s.n; });
        var e = list.reduce(function (a, i) { return a + i.score * i.pts; }, 0);
        var p = list.reduce(function (a, i) { return a + i.pts; }, 0);
        var sp = p ? Math.round((e / p) * 100) : 0;
        var share = items.length ? Math.round((list.length / items.length) * 100) : 0;
        var scol = !p ? "var(--color-neutral-600)" : sp >= 80 ? GOOD : sp >= C.exam.pass ? PART : BAD;
        if (p && (!worst || sp < worst.sp)) worst = { name: s.name, sp: sp, num: s.num, weight: s.weight };
        h += '<div style="padding:16px 18px;border-radius:12px;background:var(--color-surface);border:1px solid var(--color-divider)">' +
          '<div style="display:flex;flex-wrap:wrap;gap:10px;align-items:baseline;margin-bottom:10px">' +
            '<span style="color:var(--color-accent);font-size:12px">' + pad(s.n) + '</span>' +
            '<span style="flex:1;min-width:140px;font-size:14.5px">' + esc(s.name) + '</span>' +
            '<span style="font-size:12.5px;color:var(--color-neutral-500);white-space:nowrap">exam weight ' + esc(s.weight) + '</span>' +
            '<span style="font-size:13px;font-variant-numeric:tabular-nums;color:' + scol + ';border:1px solid ' + scol + ';border-radius:999px;padding:3px 11px">' +
              (p ? sp + "%" : "—") + '</span></div>' +
          '<div style="height:5px;border-radius:999px;background:var(--color-neutral-900);overflow:hidden">' +
            '<div style="height:100%;width:' + (p ? sp : 0) + '%;background:' + scol + ';border-radius:999px"></div></div>' +
          '<div style="font-size:12.5px;color:var(--color-neutral-500);margin-top:8px">' +
            (p ? list.length + " question" + (list.length === 1 ? "" : "s") + " (" + share + "% of this set · exam weights it " + esc(s.weight) + ")"
               : "No questions from this section in this set.") + '</div></div>';
      });
      h += '</div>';
      if (worst) {
        var focus = worst.sp >= 85
          ? "Solid across the board — your weakest area, " + worst.name + ", still came in at " + worst.sp + "%."
          : "Study next: " + worst.num + " " + worst.name + " — " + worst.sp + "%. It carries " + worst.weight + " of the real exam.";
        h += '<p style="font-size:14px;line-height:1.6;padding:14px 17px;border-radius:12px;border:1px solid var(--color-accent);' +
          'background:color-mix(in srgb,var(--color-accent) 9%,transparent);margin:0 0 34px">' + esc(focus) + '</p>';
      }
    }

    var missedOnly = S.reviewFilter === "missed";
    h += '<div style="display:flex;flex-wrap:wrap;gap:12px;align-items:baseline;margin:0 0 14px">' +
      '<h2 style="' + H2MINI + 'margin:0">Question review</h2><div style="display:flex;gap:8px;margin-left:auto">' +
      '<button type="button" data-a="setFilter" data-v="all" style="' + pillStyle(!missedOnly) + '">All ' + items.length + '</button>' +
      '<button type="button" data-a="setFilter" data-v="missed" style="' + pillStyle(missedOnly) + '">Missed ' +
        items.filter(function (i) { return i.score < 1; }).length + '</button></div></div><div style="display:grid;gap:12px">';

    items.map(function (it, i) { return { it: it, i: i }; })
      .filter(function (o) { return !missedOnly || o.it.score < 1; })
      .forEach(function (o) {
        var it = o.it, s = it.score;
        var col2 = s === 1 ? GOOD : s === 0 ? BAD : PART;
        var answerLine;
        if (it.kind === "mcq" || it.type === "mcq") {
          answerLine = "Correct answer: " + it.correct.join(", ") +
            (it.resp.length ? "   ·   You picked: " + it.resp.join(", ") : "   ·   You left this blank");
        } else if (it.type === "grid") {
          answerLine = it.rows.map(function (row, ri) {
            var parts = Object.keys(row.answer || {}).map(function (k) {
              var w = row.answer[k], wt = Array.isArray(w) ? w.join(" / ") : w;
              var hv = it.resp[ri][k] || "—";
              return String(hv).trim().toLowerCase() === String(wt).trim().toLowerCase() ? "✓ " + wt : "✕ you: " + hv + " → " + wt;
            });
            return (ri + 1) + ". " + parts.join(" · ");
          }).join("\n");
        } else if (it.type === "logselect") {
          var bad = it.lines.map(function (ln, i2) { return ln.bad ? "#" + (i2 + 1) : null; }).filter(Boolean).join(", ");
          answerLine = "Malicious lines: " + bad + "\nYou flagged: " +
            (it.resp.lines.length ? it.resp.lines.map(function (i2) { return "#" + (i2 + 1); }).join(", ") : "none") +
            "\nAttack: " + it.attackAnswer + (it.resp.attack ? "   ·   You picked: " + it.resp.attack : "   ·   You left this blank");
        } else {
          answerLine = it.zones.map(function (z) { return "Correct: " + (z.answer || []).join(", "); }).join("\n") +
            "\nYou placed: " + it.resp.map(function (r) { return r.length ? r.join(", ") : "nothing"; }).join(" | ");
        }
        h += '<div style="padding:17px 19px;border-radius:12px;background:var(--color-surface);border:1px solid var(--color-divider);border-left:3px solid ' + col2 + '">' +
          '<div style="display:flex;flex-wrap:wrap;gap:10px;align-items:baseline;margin-bottom:9px">' +
            '<span style="font-size:12px;color:var(--color-neutral-500);font-variant-numeric:tabular-nums">Q' + (o.i + 1) + '</span>' +
            (bySection ? '<span style="font-size:11.5px;color:var(--color-neutral-500);border:1px solid var(--color-divider);border-radius:6px;padding:2px 8px">' +
              esc(secLabel(it.domain)) + '</span>' : "") +
            '<span style="font-size:12px;color:' + col2 + ';margin-left:auto">' +
              (s === 1 ? "✓ full credit" : s === 0 ? "✕ no credit" : "◐ " + Math.round(s * 100) + "%") + '</span></div>' +
          '<div style="font-size:14.5px;line-height:1.55;margin-bottom:10px">' + esc(it.kind === "pbq" ? it.title + " — " + it.stem : it.stem) + '</div>' +
          '<div style="font-size:13.5px;line-height:1.6;color:var(--color-neutral-300);white-space:pre-wrap">' + esc(answerLine) + '</div>' +
          (it.explanation ? '<p style="font-size:13px;line-height:1.6;color:var(--color-neutral-400);margin:11px 0 0;border-top:1px dashed var(--color-divider);padding-top:11px;white-space:pre-wrap">' +
            esc(it.explanation) + '</p>' : "") + '</div>';
      });

    var againLabel = R.kind === "pbq" ? "New PBQ exam"
      : (R.kind === "flash" || R.kind === "deck") ? "New deck"
      : R.kind === "quiz" ? "New quiz" : "Take a new set";
    return h + '</div><div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:30px">' +
      '<button class="btn btn-secondary" type="button" data-a="goHome" style="' + NAVBTN + '">‹ Back to modes</button>' +
      '<button class="btn btn-primary" type="button" data-a="again" style="' + NAVBTN + '">' + againLabel + '</button></div></div>';
  }

  function renderDialog() {
    if (!S.confirmEnd) { dlgHost.innerHTML = ""; return; }
    var isExam = S.run && S.run.kind === "exam";
    dlgHost.innerHTML = '<div class="dialog-backdrop" style="z-index:90"><div class="dialog" role="dialog" aria-modal="true">' +
      '<div class="dialog-title">' + (isExam ? "Submit exam?" : "End session?") + '</div>' +
      '<div class="dialog-body">' + (isExam
        ? "Unanswered questions score zero. You’ll see your score and a full review."
        : "You’ll see your results so far. Anything you haven’t reached is skipped.") + '</div>' +
      '<div class="dialog-actions">' +
        '<button class="btn btn-secondary" type="button" data-a="cancelEnd">Keep going</button>' +
        '<button class="btn btn-primary" type="button" data-a="confirmEndYes">' + (isExam ? "Submit" : "End session") + '</button>' +
      '</div></div></div>';
  }

  var lastScreen = null;
  function render() {
    var html = "";
    if (S.screen === "home") html = screenHome();
    else if (S.screen === "setup") html = screenSetup();
    else if (S.screen === "pbqSetup") html = screenPbqSetup();
    else if (S.screen === "flashSetup") html = screenFlashSetup();
    else if (S.screen === "deckSetup") html = screenDeckSetup();
    else if (S.screen === "flash" || S.screen === "deck") html = screenFlash();
    else if (S.screen === "lessons") html = screenLessons();
    else if (S.screen === "lesson") html = screenLesson();
    else if (S.screen === "run") html = screenRun();
    else if (S.screen === "results") html = screenResults();
    main.innerHTML = html;
    renderHeader();
    renderDialog();
    if (S.screen !== lastScreen) { window.scrollTo(0, 0); lastScreen = S.screen; }
  }

  /* ══════════════════════════════════════════════════════════════════════
     ACTIONS
     ══════════════════════════════════════════════════════════════════ */
  function bump(mutator) {
    if (!S.run) return;
    mutator(S.run.items[S.idx]);
    persist();
    render();
  }
  function buildResults(items, auto, eyebrow, kind, startedAt, skipped) {
    var earned = items.reduce(function (a, it) { return a + it.score * it.pts; }, 0);
    var possible = items.reduce(function (a, it) { return a + it.pts; }, 0);
    return {
      items: items, auto: auto, eyebrow: eyebrow, kind: kind, skipped: skipped || 0,
      earned: earned, possible: possible,
      pct: possible ? Math.round((earned / possible) * 100) : 0,
      elapsed: startedAt ? Math.round((Date.now() - startedAt) / 1000) : 0
    };
  }
  function finish(auto) {
    var run = S.run;
    if (!run) return;
    /* Only questions you actually answered are scored and reviewed — ending
       early never pads the results with items you never reached. */
    var items = run.items.filter(function (it) { return it.graded || answered(it); }).map(function (it) {
      if (!it.graded) { it.score = gradeItem(it); it.graded = true; }
      return it;
    });
    var skipped = run.items.length - items.length;
    clearSaved();
    var eyebrow = run.kind === "exam" ? "Exam complete"
      : run.kind === "pbq" ? "PBQ exam complete"
      : run.kind === "quiz" ? "Quiz complete" : "Practice exam complete";
    S.results = buildResults(items, auto, eyebrow, run.kind, run.startedAt, skipped);
    S.run = null; S.confirmEnd = false; S.reviewFilter = "all"; S.screen = "results";
    render();
  }
  function flashResults(deckSlice, missed, eyebrow, kind) {
    return buildResults(deckSlice.map(function (q) {
      var it;
      if (kind === "deck") {
        it = { kind: "mcq", domain: 1, stem: q.front, correct: [q.back], resp: [], options: [],
               explanation: q.extra || "", pts: 1 };
      } else {
        it = mkMcq(q, false);
      }
      it.graded = true;
      it.score = missed.indexOf(q) === -1 ? 1 : 0;
      it.resp = it.score ? it.correct.slice() : [];
      return it;
    }), false, eyebrow, kind);
  }
  function gradeCard(known) {
    var f = S.flash, card = f.deck[f.i];
    var missed = known ? f.missed : f.missed.concat([card]);
    if (f.i >= f.deck.length - 1) {
      S.results = flashResults(f.deck, missed, f.kind === "deck" ? f.title + " complete" : "Flashcards complete", f.kind);
      S.flash = null; S.screen = "results";
    } else {
      f.i += 1; f.revealed = false; f.known += known ? 1 : 0; f.missed = missed;
    }
    render();
  }

  var ACTIONS = {
    goHome: function () { S.screen = "home"; S.run = null; S.results = null; S.flash = null; S.confirmEnd = false; },
    goSetup: function () { S.screen = "setup"; },
    goPbqSetup: function () { S.screen = "pbqSetup"; },
    goFlashSetup: function () { S.screen = "flashSetup"; },
    goDeckSetup: function (v) {
      if (v) { S.extraId = v; S.deckMode = "cards"; }
      S.screen = "deckSetup";
    },
    goLessons: function (v) { if (v) S.extraId = v; S.screen = "lessons"; },
    openLesson: function (v) { S.lessonId = v; S.screen = "lesson"; },
    pickPractice: function () { S.mode = "practice"; },
    pickExam: function () { S.mode = "exam"; },
    setPbqCat: function (v) { S.pbqCat = v; },
    setPbqSize: function (v) { S.pbqSize = +v; },
    setDeckMode: function (v) { S.deckMode = v; },
    setFilter: function (v) { S.reviewFilter = v; },

    startExam: function () {
      if (!S.bank.length) return;
      if (S.mode === "practice") {
        var items = shuf(S.bank).slice(0, S.size).map(function (q) { return mkMcq(q, S.shuffle); });
        S.screen = "run"; S.idx = 0; S.results = null;
        S.run = { label: "Practice exam", items: items, feedback: true, deadline: 0, dots: false, kind: "practice" };
        return;
      }
      var picksP = [];
      if (C.hasPbqs && S.pbqs.length) {
        var k = Math.min(3 + Math.floor(Math.random() * 3), S.pbqs.length);
        var pool = S.pbqs.filter(function (p) { return p.type === "grid" || p.type === "dragdrop" || p.type === "logselect"; });
        picksP = shuf(pool.length ? pool : S.pbqs).slice(0, k).map(function (p) { return mkPbq(p, C.exam.weight); });
      }
      var picksM = shuf(S.bank).slice(0, Math.max(0, C.exam.total - picksP.length)).map(function (q) { return mkMcq(q, false); });
      S.screen = "run"; S.idx = 0; S.results = null; S.resume = null;
      S.run = {
        label: "Live exam", items: picksP.concat(picksM), feedback: false,
        deadline: Date.now() + C.exam.minutes * 60000, dots: true, kind: "exam", startedAt: Date.now()
      };
      persist();
    },
    startPbq: function () {
      var pool = S.pbqs;
      if (S.pbqCat !== "all") pool = pool.filter(function (p) { return (p.category || p.type) === S.pbqCat; });
      var items = shuf(pool).slice(0, S.pbqSize).map(function (p) { return mkPbq(p, 1); });
      S.screen = "run"; S.idx = 0; S.results = null;
      S.run = { label: "PBQ practice", items: items, feedback: true, deadline: 0, dots: false, kind: "pbq" };
    },
    startFlash: function () {
      if (!S.bank.length) return;
      S.screen = "flash";
      S.flash = { kind: "flash", deck: shuf(S.bank).slice(0, S.deckSize), i: 0, revealed: false, known: 0, missed: [] };
    },
    startDeck: function () {
      var x = extraById(S.extraId);
      if (!x) return;
      var entries = x.load() || [];
      if (!entries.length) return;   /* deck data still loading — stay put */
      var n = Math.min(S.xdeckSize, entries.length) || entries.length;
      if (S.deckMode === "quiz" && x.quiz) {
        var items = shuf(x.quiz(entries)).slice(0, n).map(function (q) { return mkMcq(q, false); });
        S.screen = "run"; S.idx = 0; S.results = null;
        S.run = { label: x.title, items: items, feedback: true, deadline: 0, dots: false, kind: "quiz" };
        return;
      }
      S.screen = "deck";
      S.flash = { kind: "deck", title: x.title, deck: shuf(entries).slice(0, n), i: 0, revealed: false, known: 0, missed: [] };
    },

    discardResume: function () { clearSaved(); S.resume = null; },
    doResume: function () {
      var saved = S.resume;
      if (!saved) return;
      var items = saved.items.map(function (rec) {
        if (rec.kind === "mcq") {
          var q = S.bank.filter(function (x) { return x.id === rec.id; })[0];
          if (!q) return null;
          var it = mkMcq(q, false); it.resp = rec.resp || []; return it;
        }
        var p = S.pbqs.filter(function (x) { return x.id === rec.id; })[0];
        if (!p) return null;
        var pit = mkPbq(p, C.exam.weight); if (rec.resp) pit.resp = rec.resp; return pit;
      }).filter(Boolean);
      S.screen = "run"; S.idx = Math.min(saved.idx || 0, items.length - 1);
      S.resume = null; S.results = null;
      S.run = { label: "Live exam", items: items, feedback: false, deadline: saved.deadline, dots: true, kind: "exam", startedAt: saved.startedAt };
    },

    pickOption: function (v) {
      bump(function (it) {
        if (it.graded) return;
        var at = it.resp.indexOf(v);
        if (it.multi) { if (at === -1) it.resp.push(v); else it.resp.splice(at, 1); }
        else it.resp = at === -1 ? [v] : [];
      });
      return true;
    },
    pickCell: function (v, el) {
      var ri = +el.getAttribute("data-ri"), ck = el.getAttribute("data-ck");
      bump(function (it) {
        if (it.graded) return;
        it.resp[ri] = Object.assign({}, it.resp[ri]);
        it.resp[ri][ck] = it.resp[ri][ck] === v ? "" : v;
      });
      return true;
    },
    toggleChip: function (v, el) {
      var zi = +el.getAttribute("data-zi");
      bump(function (it) {
        if (it.graded) return;
        var arr = it.resp[zi].slice(), at = arr.indexOf(v);
        if (at === -1) arr.push(v); else arr.splice(at, 1);
        it.resp[zi] = arr;
      });
      return true;
    },
    toggleLine: function (v) {
      var li = +v;
      bump(function (it) {
        if (it.graded) return;
        var at = it.resp.lines.indexOf(li);
        if (at === -1) it.resp.lines.push(li); else it.resp.lines.splice(at, 1);
      });
      return true;
    },
    resetQ: function () {
      bump(function (it) {
        if (it.graded) return;
        if (it.kind === "mcq" || it.type === "mcq") it.resp = [];
        else if (it.type === "grid") it.resp = it.rows.map(function () { return {}; });
        else if (it.type === "logselect") it.resp = { lines: [], attack: "" };
        else it.resp = it.zones.map(function () { return []; });
      });
      return true;
    },
    submitQ: function () { bump(function (it) { it.score = gradeItem(it); it.graded = true; }); return true; },
    nextQ: function () {
      if (S.idx >= S.run.items.length - 1) { finish(false); return true; }
      S.idx += 1; persist();
    },
    prevQ: function () { S.idx = Math.max(0, S.idx - 1); persist(); },
    jump: function (v) { S.idx = +v; persist(); },

    revealCard: function () { S.flash.revealed = true; },
    gradeKnown: function () { gradeCard(true); return true; },
    gradeMiss: function () { gradeCard(false); return true; },

    askEnd: function () { S.confirmEnd = true; },
    cancelEnd: function () { S.confirmEnd = false; },
    confirmEndYes: function () {
      if (S.flash) {
        var f = S.flash;
        S.results = flashResults(f.deck.slice(0, f.i), f.missed,
          f.kind === "deck" ? f.title + " ended" : "Flashcards ended", f.kind);
        S.flash = null; S.confirmEnd = false; S.screen = "results";
        return;
      }
      finish(false);
      return true;
    },
    again: function () {
      var k = S.results ? S.results.kind : "practice";
      S.results = null;
      S.screen = k === "pbq" ? "pbqSetup"
        : k === "flash" ? "flashSetup"
        : (k === "deck" || k === "quiz") ? "deckSetup" : "setup";
    }
  };

  /* ---------- events ---------- */
  function wire() {
    document.addEventListener("click", function (e) {
      var el = e.target.closest("[data-a]");
      if (!el || el.disabled || el.tagName === "SELECT" || el.type === "range" || el.type === "checkbox") return;
      var fn = ACTIONS[el.getAttribute("data-a")];
      if (!fn) return;
      e.preventDefault();
      /* handlers that re-render themselves return true */
      if (fn(el.getAttribute("data-v"), el) !== true) render();
    });

    document.addEventListener("input", function (e) {
      var a = e.target.getAttribute && e.target.getAttribute("data-a");
      var out;
      if (a === "setSize") { S.size = +e.target.value; out = document.getElementById("ez-size-out"); if (out) out.textContent = S.size; }
      else if (a === "setDeck") { S.deckSize = +e.target.value; out = document.getElementById("ez-deck-out"); if (out) out.textContent = S.deckSize; }
      else if (a === "setXDeck") { S.xdeckSize = +e.target.value; out = document.getElementById("ez-xdeck-out"); if (out) out.textContent = S.xdeckSize; }
    });

    document.addEventListener("change", function (e) {
      var a = e.target.getAttribute && e.target.getAttribute("data-a");
      if (a === "toggleShuffle") { S.shuffle = e.target.checked; return; }
      if (a === "setAttack") { var val = e.target.value; bump(function (it) { if (!it.graded) it.resp.attack = val; }); return; }
      if (a === "changeCell") {
        var ri = +e.target.getAttribute("data-ri"), ck = e.target.getAttribute("data-ck"), v = e.target.value;
        bump(function (it) {
          if (it.graded) return;
          it.resp[ri] = Object.assign({}, it.resp[ri]);
          it.resp[ri][ck] = v;
        });
      }
    });

    setInterval(function () {
      if (S.run && S.run.deadline) {
        if (Date.now() >= S.run.deadline) { finish(true); return; }
        paintTimer();
        return;
      }
      if (S.resume && S.screen === "home") {
        var el = document.getElementById("resume-detail");
        if (el) {
          var left = Math.max(0, Math.round((S.resume.deadline - Date.now()) / 1000));
          el.textContent = fmt(left) + " remaining · " + S.resume.items.length + " questions · answers saved";
        }
      }
    }, 1000);
  }

  /* ══════════════════════════════════════════════════════════════════════
     BOOT
     ══════════════════════════════════════════════════════════════════ */
  function init(cfg) {
    C = cfg;
    C.practice = C.practice || { min: 10, max: 90, def: 50 };
    C.deck = C.deck || { min: 10, max: 120, step: 5, def: 30 };
    C.pbqSizes = C.pbqSizes || [[5, "5", "Quick check"], [10, "10", "Standard run"], [15, "15", "Deep drill"], [25, "25", "Marathon"]];
    C.extras = C.extras || [];
    C.hasPbqs = C.hasPbqs !== false;
    C.pbqBlurb = C.pbqBlurb || "Every performance-based item from the pool, rebuilt as an interactive task with partial credit.";
    C.footer = C.footer || "";

    S = {
      screen: "home", loading: true,
      bank: [], pbqs: [],
      mode: "practice", size: C.practice.def, shuffle: false,
      pbqCat: "all", pbqSize: 10, deckSize: C.deck.def,
      xdeckSize: 20, deckMode: "cards", extraId: null, lessonId: null,
      run: null, idx: 0,
      results: null, resume: null, confirmEnd: false,
      reviewFilter: "all", flash: null
    };

    main = document.getElementById("hub-main");
    dlgHost = document.getElementById("hub-dialog");
    hdrTimer = document.getElementById("hdr-timer");
    hdrProg = document.getElementById("hdr-progress");
    hdrExit = document.getElementById("hdr-exit");

    wire();
    render();

    Promise.resolve(C.hasPbqs ? C.loadPbqs() : []).then(function (list) {
      S.pbqs = list || [];
      try {
        var raw = localStorage.getItem(C.storageKey);
        if (raw) {
          var saved = JSON.parse(raw);
          if (saved && saved.deadline > Date.now()) S.resume = saved;
          else localStorage.removeItem(C.storageKey);
        }
      } catch (e) {}
      render();
    })["catch"](function () { render(); });

    Promise.resolve(C.loadPool()).then(function (list) {
      S.bank = list || [];
      S.loading = false;
      render();
    })["catch"](function () { S.loading = false; render(); });
  }

  window.EZHub = { init: init };
})();
