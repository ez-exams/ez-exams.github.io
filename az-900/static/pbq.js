"use strict";

/* ------------------------------------------------------------------ *
 * AZ-900 PBQ Practice Exam.
 *
 * This script runs AFTER app.js, so it shares app.js's top-level
 * bindings (state, els, show, goHome, escapeHtml, DOMAINS,
 * domainLabel, ...). It adds the interactive PBQ mode built from
 * every HOTSPOT / DRAG DROP question in the pool (pbq-data.js):
 *   - "grid"     : Yes/No statement sets and dropdown completion
 *   - "dragdrop" : place the right options into the answer area
 * Grading gives partial credit per statement / zone / cell.
 * ------------------------------------------------------------------ */

(function () {
  const pbq = {
    btnTest: document.getElementById("mode-pbq-test"),

    // test setup
    setup: document.getElementById("pbq-setup"),
    catGrid: document.getElementById("pbq-cat-grid"),
    sizeGrid: document.getElementById("pbq-size-grid"),
    poolSize: document.getElementById("pbq-pool-size"),
    startBtn: document.getElementById("pbq-start-btn"),
    loadingMsg: document.getElementById("pbq-loading-msg"),

    // interactive test runner
    xScreen: document.getElementById("pbqx-screen"),
    xProgress: document.getElementById("pbqx-progress"),
    xDomain: document.getElementById("pbqx-domain"),
    xTitle: document.getElementById("pbqx-title"),
    xScenario: document.getElementById("pbqx-scenario"),
    xBody: document.getElementById("pbqx-body"),
    xFeedback: document.getElementById("pbqx-feedback"),
    xFeedbackIcon: document.getElementById("pbqx-feedback-icon"),
    xFeedbackTitle: document.getElementById("pbqx-feedback-title"),
    xFeedbackText: document.getElementById("pbqx-feedback-text"),
    xReset: document.getElementById("pbqx-reset"),
    xSubmit: document.getElementById("pbqx-submit"),
    xPrev: document.getElementById("pbqx-prev"),
    xNext: document.getElementById("pbqx-next"),
    xExit: document.getElementById("pbqx-exit"),

    // interactive results
    xResults: document.getElementById("pbqx-results"),
    xScore: document.getElementById("pbqx-result-score"),
    xPercent: document.getElementById("pbqx-result-percent"),
    xBar: document.getElementById("pbqx-result-bar"),
    xVerdict: document.getElementById("pbqx-result-verdict"),
    xReview: document.getElementById("pbqx-review"),
    xResultsHome: document.getElementById("pbqx-results-home"),
    xResultsRestart: document.getElementById("pbqx-results-restart"),
  };

  const TEST_BANK = window.PBQ_TEST || [];

  let selectedCategory = "all";
  let selectedSize = 10;

  // active test
  const T = { quiz: [], i: 0, answers: [], graded: [] };
  let picked = null; // drag/drop: currently selected chip {item, from}

  function esc(t) {
    return String(t == null ? "" : t)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function domainBadge(d) {
    if (!d) return "";
    return `<span class="domain-badge" data-domain="${d}">Section ${esc(domainLabel(d))}</span>`;
  }

  /* ------------------------------ setup ------------------------------- */

  function poolFor(cat) {
    if (cat === "all") return TEST_BANK.slice();
    return TEST_BANK.filter((q) => q.category === cat);
  }

  function openPbqSetup() {
    els.sessionStats.classList.add("hidden");
    state.mode = "pbqTest";
    if (pbq.poolSize) pbq.poolSize.textContent = TEST_BANK.length.toLocaleString();
    updateSetupCounts();
    updateLoadingMsg();
    show(pbq.setup);
  }

  function updateSetupCounts() {
    if (!pbq.catGrid) return;
    pbq.catGrid.querySelectorAll(".pbq-cat").forEach((b) => {
      const cat = b.dataset.cat;
      const n = poolFor(cat).length;
      const sub = b.querySelector(".pbq-cat-sub");
      if (sub && !sub.dataset.base) sub.dataset.base = sub.textContent;
      if (sub) sub.textContent = `${sub.dataset.base} · ${n}`;
    });
  }

  function updateLoadingMsg() {
    const n = poolFor(selectedCategory).length;
    if (pbq.loadingMsg) {
      pbq.loadingMsg.textContent = n
        ? `${n.toLocaleString()} PBQs available in this focus. We'll draw ${Math.min(selectedSize, n)} at random.`
        : "No PBQs available in this focus.";
    }
    if (pbq.startBtn) pbq.startBtn.disabled = n === 0;
  }

  function selectCategory(cat) {
    selectedCategory = cat;
    if (pbq.catGrid) {
      pbq.catGrid.querySelectorAll(".pbq-cat").forEach((b) => {
        b.classList.toggle("is-active", b.dataset.cat === cat);
      });
    }
    updateLoadingMsg();
  }

  function selectSize(size) {
    selectedSize = size;
    if (pbq.sizeGrid) {
      pbq.sizeGrid.querySelectorAll(".pbq-cat").forEach((b) => {
        b.classList.toggle("is-active", Number(b.dataset.size) === size);
      });
    }
    updateLoadingMsg();
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function blankAnswer(q) {
    switch (q.type) {
      case "mcq":
        return { selected: [] };
      case "dragdrop":
        return { tray: shuffle(q.items), zones: q.zones.map(() => []) };
      case "grid":
        return { cells: q.rows.map(() => ({})) };
      default:
        return {};
    }
  }

  function startTest() {
    const pool = poolFor(selectedCategory);
    if (!pool.length) return;
    T.quiz = shuffle(pool).slice(0, Math.min(selectedSize, pool.length));
    T.i = 0;
    T.answers = T.quiz.map(blankAnswer);
    T.graded = T.quiz.map(() => null);
    state.mode = "pbqTest";
    renderActive();
  }

  /* --------------------------- grading helpers ------------------------ */

  function norm(s) {
    return String(s == null ? "" : s).trim().toLowerCase();
  }
  function matchCell(expected, val) {
    const v = norm(val);
    if (v === "") return false;
    const list = Array.isArray(expected) ? expected : [expected];
    return list.some((e) => norm(e) === v);
  }
  function sameSet(a, b) {
    if (a.length !== b.length) return false;
    const sa = a.slice().sort();
    const sb = b.slice().sort();
    return sa.every((x, i) => x === sb[i]);
  }

  function grade(q, ans) {
    if (q.type === "mcq") {
      const ok = sameSet(ans.selected, q.correct.slice());
      return { score: ok ? 1 : 0, max: 1, correct: ok };
    }
    if (q.type === "dragdrop") {
      let score = 0;
      let max = 0;
      q.zones.forEach((z, zi) => {
        if (z.answer.length > 1) {
          // multi-item zone: credit per correct item, penalty-free
          max += z.answer.length;
          const placed = ans.zones[zi];
          z.answer.forEach((it) => {
            if (placed.indexOf(it) !== -1) score++;
          });
          // any stray item in the zone voids one point (keeps 'drag everything' from winning)
          const strays = placed.filter((it) => z.answer.indexOf(it) === -1).length;
          score = Math.max(0, score - strays);
        } else {
          max += 1;
          if (sameSet(ans.zones[zi], z.answer)) score++;
        }
      });
      const fullyCorrect = q.zones.every((z, zi) => sameSet(ans.zones[zi].slice().sort(), z.answer.slice().sort()));
      return { score, max, correct: fullyCorrect };
    }
    if (q.type === "grid") {
      let score = 0;
      let max = 0;
      q.rows.forEach((row, ri) => {
        q.columns.forEach((col) => {
          max++;
          if (matchCell(row.answer[col.key], (ans.cells[ri] || {})[col.key])) score++;
        });
      });
      return { score, max, correct: score === max };
    }
    return { score: 0, max: 1, correct: false };
  }

  /* --------------------------- body renderers ------------------------- */

  function renderMcq(q, ans, locked) {
    const single = q.correct.length < 2;
    const prompt = `<p class="pbqx-q">${esc(q.question)}</p>`;
    const hint = single ? "" : `<p class="pbqx-multi-hint">Select all that apply.</p>`;
    const opts = Object.keys(q.options)
      .map((k) => {
        const chosen = ans.selected.indexOf(k) !== -1;
        const isCorrect = q.correct.indexOf(k) !== -1;
        let cls = "pbqx-opt";
        if (chosen) cls += " is-chosen";
        if (locked) {
          if (isCorrect) cls += " is-correct";
          else if (chosen) cls += " is-wrong";
        }
        return (
          `<button type="button" class="${cls}" data-letter="${k}" ${locked ? "disabled" : ""}>` +
          `<span class="pbqx-opt-letter">${k}</span>` +
          `<span class="pbqx-opt-text">${esc(q.options[k])}</span></button>`
        );
      })
      .join("");
    return `${prompt}${hint}<div class="pbqx-opts">${opts}</div>`;
  }

  function renderDragdrop(q, ans, locked) {
    const trayChips = ans.tray
      .map((it) => `<button type="button" class="pbqx-chip" data-item="${esc(it)}" data-from="tray" ${locked ? "disabled" : ""}>${esc(it)}</button>`)
      .join("");
    const zones = q.zones
      .map((z, zi) => {
        const placed = ans.zones[zi];
        const chips = placed
          .map((it) => {
            let cls = "pbqx-chip pbqx-chip-placed";
            if (locked) cls += z.answer.indexOf(it) !== -1 ? " is-correct" : " is-wrong";
            return `<button type="button" class="${cls}" data-item="${esc(it)}" data-from="${zi}" ${locked ? "disabled" : ""}>${esc(it)}</button>`;
          })
          .join("");
        const empty = placed.length === 0 && !locked ? `<span class="pbqx-drop-hint">Drop items here</span>` : "";
        const answerLine = locked
          ? `<div class="pbqx-zone-answer">Correct: ${z.answer.map(esc).join(", ")}</div>`
          : "";
        return (
          `<div class="pbqx-zone">` +
          `<div class="pbqx-drop${locked ? " is-locked" : ""}" data-zone="${zi}">${chips}${empty}</div>` +
          `<div class="pbqx-zone-desc">${esc(z.prompt)}${answerLine}</div>` +
          `</div>`
        );
      })
      .join("");
    return (
      `<p class="pbqx-multi-hint">Tap an option, then tap the box it belongs in — or drag it there.</p>` +
      `<div class="pbqx-dnd">` +
      `<div class="pbqx-tray">${trayChips || '<span class="pbqx-tray-empty">All placed</span>'}</div>` +
      `<div class="pbqx-zones">${zones}</div></div>`
    );
  }

  function renderGrid(q, ans, locked) {
    const diagram = q.diagram ? `<figure class="lb-diagram pbqx-diagram">${q.diagram}</figure>` : "";
    const head =
      `<th class="pbqx-grid-rowhead">${esc(q.rowLabel || "Statement")}</th>` +
      q.columns.map((c) => `<th>${esc(c.label)}</th>`).join("");
    const body = q.rows
      .map((row, ri) => {
        const cells = q.columns
          .map((col) => {
            const val = (ans.cells[ri] || {})[col.key] || "";
            if (locked) {
              const ok = matchCell(row.answer[col.key], val);
              const want = Array.isArray(row.answer[col.key]) ? row.answer[col.key][0] : row.answer[col.key];
              return (
                `<td class="pbqx-cell ${ok ? "is-correct" : "is-wrong"}">` +
                `<span class="pbqx-cell-val">${esc(val || "—")}</span>` +
                (ok ? "" : `<span class="pbqx-cell-want">${esc(want)}</span>`) +
                `</td>`
              );
            }
            if (col.kind === "text") {
              return `<td><input type="text" class="pbqx-input" data-row="${ri}" data-key="${col.key}" value="${esc(val)}" placeholder="${esc(col.placeholder || "")}" /></td>`;
            }
            // per-row option overrides (multi-box dropdown completion)
            const optList = (row.options && row.options[col.key]) || col.options;
            const opts =
              `<option value="">-- Select --</option>` +
              optList.map((o) => `<option value="${esc(o)}"${o === val ? " selected" : ""}>${esc(o)}</option>`).join("");
            return `<td><select class="pbqx-select" data-row="${ri}" data-key="${col.key}">${opts}</select></td>`;
          })
          .join("");
        return `<tr><td class="pbqx-grid-prompt">${esc(row.prompt)}</td>${cells}</tr>`;
      })
      .join("");
    return (
      diagram +
      `<div class="pbqx-grid-wrap"><table class="pbqx-grid"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`
    );
  }

  function renderBody(q, ans, locked) {
    switch (q.type) {
      case "mcq": return renderMcq(q, ans, locked);
      case "dragdrop": return renderDragdrop(q, ans, locked);
      case "grid": return renderGrid(q, ans, locked);
      default: return "";
    }
  }

  /* --------------------------- event wiring --------------------------- */

  function wireBody(q, ans) {
    const root = pbq.xBody;
    if (q.type === "mcq") {
      const single = q.correct.length < 2;
      root.querySelectorAll(".pbqx-opt").forEach((b) => {
        b.addEventListener("click", () => {
          const k = b.dataset.letter;
          const at = ans.selected.indexOf(k);
          if (single) {
            ans.selected = [k];
          } else if (at === -1) {
            ans.selected.push(k);
          } else {
            ans.selected.splice(at, 1);
          }
          rerenderBody();
        });
      });
    } else if (q.type === "dragdrop") {
      const place = (item, from, zoneIdx) => {
        if (from === "tray") {
          const k = ans.tray.indexOf(item);
          if (k !== -1) ans.tray.splice(k, 1);
        } else {
          const z = ans.zones[Number(from)];
          const k = z.indexOf(item);
          if (k !== -1) z.splice(k, 1);
        }
        if (zoneIdx === "tray") ans.tray.push(item);
        else ans.zones[zoneIdx].push(item);
        picked = null;
        rerenderBody();
      };
      root.querySelectorAll(".pbqx-chip").forEach((c) => {
        c.setAttribute("draggable", "true");
        c.addEventListener("dragstart", (e) => {
          picked = { item: c.dataset.item, from: c.dataset.from };
          e.dataTransfer.setData("text/plain", c.dataset.item);
        });
        c.addEventListener("click", () => {
          if (c.dataset.from === "tray") {
            if (picked && picked.item === c.dataset.item) { picked = null; updatePicked(); return; }
            picked = { item: c.dataset.item, from: "tray" };
            updatePicked();
          } else {
            place(c.dataset.item, c.dataset.from, "tray");
          }
        });
      });
      root.querySelectorAll(".pbqx-drop").forEach((d) => {
        const zi = Number(d.dataset.zone);
        d.addEventListener("click", () => {
          if (picked) place(picked.item, picked.from, zi);
        });
        d.addEventListener("dragover", (e) => { e.preventDefault(); d.classList.add("is-over"); });
        d.addEventListener("dragleave", () => d.classList.remove("is-over"));
        d.addEventListener("drop", (e) => {
          e.preventDefault();
          d.classList.remove("is-over");
          if (picked) place(picked.item, picked.from, zi);
        });
      });
    } else if (q.type === "grid") {
      root.querySelectorAll(".pbqx-select").forEach((s) => {
        s.addEventListener("change", () => {
          const ri = Number(s.dataset.row);
          ans.cells[ri] = ans.cells[ri] || {};
          ans.cells[ri][s.dataset.key] = s.value;
        });
      });
      root.querySelectorAll(".pbqx-input").forEach((inp) => {
        inp.addEventListener("input", () => {
          const ri = Number(inp.dataset.row);
          ans.cells[ri] = ans.cells[ri] || {};
          ans.cells[ri][inp.dataset.key] = inp.value;
        });
      });
    }
  }

  function updatePicked() {
    pbq.xBody.querySelectorAll(".pbqx-chip[data-from='tray']").forEach((c) => {
      c.classList.toggle("is-picked", !!picked && picked.item === c.dataset.item);
    });
  }

  function rerenderBody() {
    const q = T.quiz[T.i];
    const ans = T.answers[T.i];
    const locked = !!T.graded[T.i];
    pbq.xBody.innerHTML = renderBody(q, ans, locked);
    if (!locked) wireBody(q, ans);
    if (q.type === "dragdrop" && !locked) updatePicked();
  }

  /* ------------------------------ screens ----------------------------- */

  function renderActive() {
    picked = null;
    const q = T.quiz[T.i];
    const ans = T.answers[T.i];
    const g = T.graded[T.i];
    const locked = !!g;

    pbq.xProgress.textContent = `Question ${T.i + 1} of ${T.quiz.length}`;
    if (pbq.xDomain) pbq.xDomain.innerHTML = domainBadge(q.domain);
    pbq.xTitle.textContent = q.title || "Performance-Based Question";
    pbq.xScenario.textContent = q.scenario || "";
    pbq.xScenario.classList.toggle("hidden", !pbq.xScenario.textContent);

    pbq.xBody.innerHTML = renderBody(q, ans, locked);
    if (!locked) wireBody(q, ans);

    if (locked) {
      showFeedback(q, g);
      pbq.xSubmit.classList.add("hidden");
      pbq.xReset.classList.add("hidden");
      pbq.xNext.classList.remove("hidden");
      pbq.xNext.textContent = T.i === T.quiz.length - 1 ? "See results ›" : "Next ›";
    } else {
      pbq.xFeedback.classList.add("hidden");
      pbq.xSubmit.classList.remove("hidden");
      pbq.xReset.classList.remove("hidden");
      pbq.xNext.classList.add("hidden");
    }
    pbq.xPrev.disabled = T.i === 0;

    show(pbq.xScreen);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function showFeedback(q, g) {
    const fb = pbq.xFeedback;
    fb.classList.remove("hidden", "is-correct", "is-partial", "is-wrong");
    let cls, icon, title;
    if (g.correct) {
      cls = "is-correct"; icon = "✓"; title = "Correct";
    } else if (g.score > 0) {
      cls = "is-partial"; icon = "◑"; title = `Partially correct — ${g.score} / ${g.max}`;
    } else {
      cls = "is-wrong"; icon = "✕"; title = "Incorrect";
    }
    fb.classList.add(cls);
    pbq.xFeedbackIcon.textContent = icon;
    pbq.xFeedbackTitle.textContent = title;
    pbq.xFeedbackText.textContent = q.explanation || "";
  }

  function submitActive() {
    const q = T.quiz[T.i];
    const ans = T.answers[T.i];
    T.graded[T.i] = grade(q, ans);
    renderActive();
  }

  function resetActive() {
    if (T.graded[T.i]) return;
    T.answers[T.i] = blankAnswer(T.quiz[T.i]);
    picked = null;
    renderActive();
  }

  function nextActive() {
    if (T.i === T.quiz.length - 1) { showResults(); return; }
    T.i++;
    renderActive();
  }

  function prevActive() {
    if (T.i > 0) { T.i--; renderActive(); }
  }

  /* Per-section breakdown for the PBQ results screen. */
  function renderPbqSectionBreakdown() {
    const container = document.getElementById("pbqx-section-breakdown");
    const list = document.getElementById("pbqx-section-breakdown-list");
    const focus = document.getElementById("pbqx-section-focus");
    if (!container || !list) return;

    const tally = {};
    T.quiz.forEach((q, i) => {
      const g = T.graded[i];
      if (!g) return;
      const d = q.domain || 0;
      if (!tally[d]) tally[d] = { score: 0, max: 0, full: 0, tasks: 0 };
      tally[d].score += g.score;
      tally[d].max += g.max;
      tally[d].tasks += 1;
      if (g.correct) tally[d].full += 1;
    });

    if (Object.keys(tally).length === 0) {
      container.classList.add("hidden");
      return;
    }

    list.innerHTML = "";
    let weakest = null;
    for (const d of [1, 2, 3]) {
      const t = tally[d];
      if (!t) continue;
      const pct = t.max ? Math.round((t.score / t.max) * 100) : 0;
      if (weakest === null || pct < weakest.pct) weakest = { domain: d, pct, tasks: t.tasks };

      const row = document.createElement("div");
      row.className = "section-row";
      row.innerHTML = `
        <div class="section-row-head">
          <span class="domain-badge" data-domain="${d}">${escapeHtml(DOMAINS[d].num)}</span>
          <span class="section-row-name">${escapeHtml(DOMAINS[d].name)}</span>
          <span class="section-row-pct ${pct >= 70 ? "good" : "bad"}">${pct}%</span>
        </div>
        <div class="section-bar" role="img"
          aria-label="${escapeHtml(DOMAINS[d].name)}: ${t.score} of ${t.max} selections correct">
          <div class="section-bar-fill ${pct >= 70 ? "good" : "bad"}" style="width: ${pct}%"></div>
        </div>
        <div class="section-row-counts">
          <span class="count-correct">${t.full} of ${t.tasks} task${t.tasks === 1 ? "" : "s"} fully correct</span>
          <span class="count-sep" aria-hidden="true">·</span>
          <span class="count-total">${t.score} / ${t.max} selections right</span>
        </div>
      `;
      list.appendChild(row);
    }

    if (focus) {
      if (weakest && weakest.pct < 100) {
        focus.innerHTML =
          `Study priority: <strong>Section ${escapeHtml(domainLabel(weakest.domain))}</strong>` +
          ` — ${weakest.pct}% on ${weakest.tasks} PBQ task${weakest.tasks === 1 ? "" : "s"}.`;
        focus.classList.remove("hidden");
      } else {
        focus.classList.add("hidden");
      }
    }
    container.classList.remove("hidden");
  }

  function showResults() {
    let full = 0, totScore = 0, totMax = 0;
    T.quiz.forEach((q, i) => {
      const g = T.graded[i] || grade(q, T.answers[i]);
      T.graded[i] = g;
      if (g.correct) full++;
      totScore += g.score;
      totMax += g.max;
    });
    const pct = totMax ? Math.round((totScore / totMax) * 100) : 0;

    pbq.xScore.textContent = `${full} / ${T.quiz.length}`;
    pbq.xPercent.textContent = `${pct}%`;
    pbq.xBar.style.width = pct + "%";
    pbq.xBar.className = "pbqx-bar-fill " + (pct >= 80 ? "good" : pct >= 60 ? "ok" : "low");
    pbq.xVerdict.textContent =
      full === T.quiz.length
        ? "Perfect score — you nailed every task."
        : pct >= 80
        ? "Strong work. Review the misses below and you're exam-ready."
        : pct >= 60
        ? "Solid start. Study the reviews below, then run another set."
        : "Keep practicing — study the reviews below, then retry.";

    renderPbqSectionBreakdown();

    pbq.xReview.innerHTML = "";
    T.quiz.forEach((q, i) => {
      const g = T.graded[i];
      const item = document.createElement("div");
      item.className = "pbqx-review-item " + (g.correct ? "ok" : g.score > 0 ? "partial" : "bad");
      const tag = g.correct ? "Correct" : g.score > 0 ? `Partial ${g.score}/${g.max}` : "Incorrect";
      const head =
        `<div class="pbqx-review-head">` +
        `<span class="pbqx-review-num">Q${i + 1}</span>` +
        `<span class="pbqx-review-title">${esc(q.title || "PBQ")}</span>` +
        (q.domain ? domainBadge(q.domain) : "") +
        `<span class="pbqx-review-badge">${tag}</span></div>`;
      const scn = `<p class="pbqx-review-scn">${esc(q.scenario || "")}</p>`;
      const body = `<div class="pbqx-review-body">${renderBody(q, T.answers[i], true)}</div>`;
      const exp = `<div class="pbqx-review-exp"><strong>Why:</strong> ${esc(q.explanation || "")}</div>`;
      item.innerHTML = head + scn + body + exp;
      pbq.xReview.appendChild(item);
    });

    els.sessionStats.classList.add("hidden");
    show(pbq.xResults);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function exitTest() {
    state.mode = null;
    goHome();
  }

  // Read-only introspection hook (used by automated UI tests; harmless).
  window.__pbq = {
    cur: () => ({ q: T.quiz[T.i], ans: T.answers[T.i], i: T.i, n: T.quiz.length, graded: T.graded[T.i] }),
    bank: () => TEST_BANK.length,
  };

  /* ------------------------------- wire ------------------------------- */

  function init() {
    if (pbq.btnTest) pbq.btnTest.addEventListener("click", () => { openPbqSetup(); });

    if (pbq.catGrid) {
      pbq.catGrid.querySelectorAll(".pbq-cat").forEach((b) => {
        b.addEventListener("click", () => selectCategory(b.dataset.cat));
      });
    }
    if (pbq.sizeGrid) {
      pbq.sizeGrid.querySelectorAll(".pbq-cat").forEach((b) => {
        b.addEventListener("click", () => selectSize(Number(b.dataset.size)));
      });
    }
    if (pbq.startBtn) pbq.startBtn.addEventListener("click", startTest);

    if (pbq.xSubmit) pbq.xSubmit.addEventListener("click", submitActive);
    if (pbq.xReset) pbq.xReset.addEventListener("click", resetActive);
    if (pbq.xNext) pbq.xNext.addEventListener("click", nextActive);
    if (pbq.xPrev) pbq.xPrev.addEventListener("click", prevActive);
    if (pbq.xExit) pbq.xExit.addEventListener("click", exitTest);
    if (pbq.xResultsHome) pbq.xResultsHome.addEventListener("click", exitTest);
    if (pbq.xResultsRestart) pbq.xResultsRestart.addEventListener("click", openPbqSetup);

    // expose for app.js restartCurrentMode
    window.openPbqSetup = openPbqSetup;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
