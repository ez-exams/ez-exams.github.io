/* ============================================================
   Python Lab — app engine
   Renders the curriculum, runs Python via Pyodide, checks labs.
   ============================================================ */
(function () {
  "use strict";

  // ---------- State ----------
  const PROGRESS_KEY = "pylab-progress-v1";
  const state = {
    pyodide: null,
    pyReady: false,
    pyFailed: false,
    readyResolvers: [],
    currentLessonId: null,
    running: false,
  };
  let stdoutBuf = [];

  const flatLessons = [];
  CURRICULUM.forEach((mod) => mod.lessons.forEach((l) => flatLessons.push({ mod, lesson: l })));

  // ---------- Progress ----------
  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveProgress(p) {
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(p)); } catch (e) { /* private mode */ }
  }
  let progress = loadProgress();
  function isDone(id) { return !!progress[id]; }
  function markDone(id) { progress[id] = true; saveProgress(progress); refreshProgressUI(); }

  // ---------- Pyodide ----------
  async function initPyodide() {
    const statusEl = document.getElementById("py-status");
    const statusText = document.getElementById("py-status-text");
    try {
      const py = await loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/" });
      py.setStdout({ batched: (s) => stdoutBuf.push(s) });
      py.setStderr({ batched: (s) => stdoutBuf.push(s) });
      // Make input() work via a browser popup, echoing like a terminal would.
      py.runPython(
        "import builtins, js\n" +
        "def _pylab_input(prompt=''):\n" +
        "    r = js.window.prompt(str(prompt))\n" +
        "    r = '' if r is None else str(r)\n" +
        "    print(str(prompt) + r)\n" +
        "    return r\n" +
        "builtins.input = _pylab_input\n"
      );
      py.runPython(STYLE_SRC); // install the spacing checker
      state.pyodide = py;
      state.pyReady = true;
      statusEl.className = "py-status ready";
      statusText.textContent = "Python ready";
      state.readyResolvers.forEach((r) => r());
      state.readyResolvers = [];
    } catch (e) {
      console.error("Pyodide failed to load:", e);
      state.pyFailed = true;
      statusEl.className = "py-status error";
      statusText.textContent = "Python failed to load — check connection & refresh";
    }
  }
  function whenPyReady() {
    if (state.pyReady) return Promise.resolve();
    if (state.pyFailed) return Promise.reject(new Error("Python runtime failed to load. Refresh the page to retry."));
    return new Promise((resolve) => state.readyResolvers.push(resolve));
  }

  // ---------- Error explanations ----------
  const ERROR_EXPLAIN = {
    SyntaxError: "Python couldn't read this line — the \"grammar\" is off. Look for a missing colon :, a missing quote, a missing comma, or an unmatched ( ). The ^ arrow points near the confusing spot. (Tip: the real mistake is sometimes on the line ABOVE the one reported.)",
    IndentationError: "The spacing at the start of a line is wrong. Lines inside if / for / while / def blocks must be indented exactly 4 spaces, and lines in the same block must line up perfectly.",
    TabError: "This code mixes tabs and spaces for indentation. Use spaces only — 4 per level.",
    NameError: "You used a name Python doesn't know. Check the spelling and capitalization, and make sure the variable or function is created BEFORE the line that uses it.",
    UnboundLocalError: "You used a variable inside a function before giving it a value there. Assigning inside a function creates a new local variable — pass values in as parameters, or assign the variable before using it.",
    TypeError: "An operation received the wrong TYPE of value — like adding text to a number, or calling a function with the wrong number of arguments. Convert with int(), float() or str(), or double-check the function call.",
    ValueError: "The type was right but the VALUE wasn't usable — like int(\"hello\"). Check the value you're converting or passing in.",
    IndexError: "You asked for a position that doesn't exist in the list or string. Positions start at 0, so the last item is at len(x) - 1 (or use -1).",
    KeyError: "That key doesn't exist in the dictionary. Check the key's spelling and capitalization — or use .get(key), which returns None instead of crashing.",
    AttributeError: "That value doesn't have the method or attribute you asked for. It's often a typo (like .appendd), or the variable isn't the type you think it is.",
    ZeroDivisionError: "You divided by zero. Check the bottom of your division — a variable might be 0, or an empty list made len() return 0.",
    RecursionError: "A function kept calling itself and never stopped. Make sure there's a condition that ends the chain of calls.",
    ModuleNotFoundError: "Python can't find that module. Check the spelling — only Python's standard library is available on this site.",
    ImportError: "Python couldn't import that. Check the module and name spelling — only Python's standard library is available on this site.",
    AssertionError: "An assert statement found something untrue. Read its message to see which expectation failed.",
  };
  function explainError(errText) {
    const matches = String(errText).match(/\b[A-Z][a-zA-Z]*Error\b/g);
    if (!matches) return null;
    const name = matches[matches.length - 1];
    return ERROR_EXPLAIN[name] ? { name: name, text: ERROR_EXPLAIN[name] } : null;
  }

  // ---------- Style (spacing) checker — runs inside Python via tokenize ----------
  const STYLE_SRC = [
    "import tokenize as _tok, io as _sio, json as _sjson",
    "def _pylab_style_issues(code):",
    "    issues = []",
    "    lines = code.split('\\n')",
    "    for _i, _ln in enumerate(lines, start=1):",
    "        _indent = _ln[:len(_ln) - len(_ln.lstrip())]",
    "        if '\\t' in _indent:",
    "            issues.append(f'Line {_i}: indent with spaces (4 per level), not tabs - mixing them causes TabError.')",
    "    _CMP = {'==', '!=', '<', '>', '<=', '>='}",
    "    _AUG = {'+=', '-=', '*=', '/=', '//=', '%=', '**='}",
    "    _depth = 0",
    "    try:",
    "        _toks = list(_tok.generate_tokens(_sio.StringIO(code).readline))",
    "    except Exception:",
    "        return issues",
    "    for _t in _toks:",
    "        if _t.type != _tok.OP:",
    "            continue",
    "        _s = _t.string",
    "        if _s in '([{':",
    "            _depth += 1",
    "            continue",
    "        if _s in ')]}':",
    "            _depth -= 1",
    "            continue",
    "        _row, _col = _t.start",
    "        _erow, _ecol = _t.end",
    "        _line = lines[_row - 1] if _row - 1 < len(lines) else ''",
    "        _before = (_col == 0) or (_line[_col - 1] == ' ')",
    "        _after = (_ecol >= len(_line)) or (_line[_ecol] == ' ')",
    "        if _s == ',':",
    "            if _ecol < len(_line) and _line[_ecol] not in ' )]}':",
    "                issues.append(f'Line {_row}: add a space after the comma - write (a, b) not (a,b).')",
    "        elif _s == '=' and _depth == 0:",
    "            if not (_before and _after):",
    "                issues.append(f'Line {_row}: put one space on each side of = when assigning - write x = 5, not x=5.')",
    "        elif _s in _CMP:",
    "            if not (_before and _after):",
    "                issues.append(f'Line {_row}: put one space on each side of {_s} - write a {_s} b.')",
    "        elif _s in _AUG and _depth == 0:",
    "            if not (_before and _after):",
    "                issues.append(f'Line {_row}: put one space on each side of {_s} - write total {_s} x.')",
    "    _seen = set()",
    "    _out = []",
    "    for _m in issues:",
    "        if _m not in _seen:",
    "            _seen.add(_m)",
    "            _out.append(_m)",
    "    return _out",
    "def _pylab_style_json(code):",
    "    return _sjson.dumps(_pylab_style_issues(code))",
  ].join("\n");

  function checkStyle(code) {
    try {
      state.pyodide.globals.set("_pylab_code", code);
      const res = state.pyodide.runPython("_pylab_style_json(_pylab_code)");
      return JSON.parse(res) || [];
    } catch (e) {
      console.warn("style check unavailable:", e);
      return [];
    }
  }

  function formatPyError(err) {
    let msg = (err && err.message) ? String(err.message) : String(err);
    const lines = msg.split("\n");
    // Show from the first frame that refers to the user's code onward.
    let start = lines.findIndex((l) => l.includes('File "<exec>"'));
    if (start === -1) start = Math.max(0, lines.length - 4);
    const kept = lines.slice(start).filter((l) => !l.includes("pyodide") && !l.includes("_pyodide"));
    let out = kept.join("\n").trim();
    if (out.length > 1500) out = out.slice(0, 1500) + "\n…";
    return out || msg.slice(-500);
  }

  // Run code in a fresh namespace. Returns {out, error, ns} — caller must ns.destroy() when done.
  async function runPython(code) {
    await whenPyReady();
    const py = state.pyodide;
    stdoutBuf = [];
    const ns = py.globals.get("dict")();
    let error = null;
    try {
      py.runPython(code, { globals: ns });
    } catch (e) {
      error = formatPyError(e);
    }
    return { out: stdoutBuf.join("\n"), error, ns };
  }

  // Run a lab's tests against the namespace produced by the user's code.
  function runTests(testCode, ns, capturedOut, userCode) {
    const py = state.pyodide;
    try {
      ns.set("_stdout", capturedOut);
      ns.set("_code", userCode);
      stdoutBuf = []; // don't leak test prints into the user's output panel
      py.runPython(testCode, { globals: ns });
      return { passed: true, message: "All checks passed. Great work!" };
    } catch (e) {
      const raw = (e && e.message) ? String(e.message) : String(e);
      const m = raw.match(/AssertionError:\s*([\s\S]*?)\s*$/);
      if (m && m[1]) return { passed: false, message: m[1].trim() };
      if (/AssertionError/.test(raw)) return { passed: false, message: "A check failed — look at your output and try again." };
      return { passed: false, message: "The checker hit an error while testing your code:\n" + formatPyError(e) };
    }
  }

  // ---------- Rendering helpers ----------
  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function makeEditor(parent, code, { readOnly = false } = {}) {
    const ta = document.createElement("textarea");
    ta.value = code;
    parent.appendChild(ta);
    const cm = CodeMirror.fromTextArea(ta, {
      mode: "python",
      theme: "material-darker",
      lineNumbers: true,
      indentUnit: 4,
      matchBrackets: true,
      autoCloseBrackets: true,
      readOnly: readOnly,
      viewportMargin: Infinity,
      extraKeys: {
        Tab: (cm) => {
          if (cm.somethingSelected()) cm.indentSelection("add");
          else cm.replaceSelection("    ", "end");
        },
      },
    });

    /* CodeMirror measures its gutter when it is constructed. Lesson panes are
       built while still hidden, so that measurement comes back as zero and the
       line numbers end up painted on top of the code. Re-measure once the
       editor is genuinely on screen, and again when the mono webfont lands. */
    const remeasure = () => cm.refresh();
    requestAnimationFrame(remeasure);
    setTimeout(remeasure, 80);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(remeasure);
    if (typeof IntersectionObserver !== "undefined") {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { cm.refresh(); io.disconnect(); }
        });
      });
      io.observe(cm.getWrapperElement());
    }

    return cm;
  }

  function setOutput(outEl, text, { error = null } = {}) {
    outEl.classList.remove("empty");
    let html = '<span class="out-label">Output</span>';
    const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    if (text) html += esc(text);
    if (text && error) html += "\n";
    if (error) {
      html += '<span class="err">' + esc(error) + "</span>";
      const ex = explainError(error);
      if (ex) {
        html += '<span class="err-explain">💡 <strong>What ' + ex.name + " means:</strong> " + esc(ex.text) + "</span>";
      }
    }
    if (!text && !error) {
      html += "(no output — did you forget to print something?)";
      outEl.classList.add("empty");
    }
    outEl.innerHTML = html;
  }

  function renderBlocks(container, blocks) {
    (blocks || []).forEach((b) => {
      if (b.h) container.appendChild(el("div", "content-block", "<h3>" + b.h + "</h3>"));
      else if (b.p) container.appendChild(el("div", "content-block", "<p>" + b.p + "</p>"));
      else if (b.list) container.appendChild(el("div", "content-block", "<ul>" + b.list.map((i) => "<li>" + i + "</li>").join("") + "</ul>"));
      else if (b.tip) container.appendChild(el("div", "callout tip", '<span class="callout-label">💡 Tip:</span>' + b.tip));
      else if (b.warn) container.appendChild(el("div", "callout warn", '<span class="callout-label">⚠️ Watch out:</span>' + b.warn));
      else if (b.code) {
        const pre = el("div", "static-code");
        pre.textContent = b.code;
        container.appendChild(pre);
      } else if (b.run) {
        container.appendChild(buildRunnable(b.run));
      }
    });
  }

  function buildRunnable(code) {
    const card = el("div", "example");
    const bar = el("div", "example-toolbar");
    bar.appendChild(el("span", "label", "Try it — edit freely, then run"));
    const runBtn = el("button", "btn primary small", "▶ Run");
    const resetBtn = el("button", "btn ghost small", "Reset");
    bar.appendChild(resetBtn);
    bar.appendChild(runBtn);
    card.appendChild(bar);
    const cm = makeEditor(card, code);
    const outEl = el("div", "output empty", "Run the code to see its output here.");
    card.appendChild(outEl);

    async function doRun() {
      if (state.running) return;
      state.running = true;
      runBtn.disabled = true; runBtn.textContent = "Running…";
      try {
        const res = await runPython(cm.getValue());
        setOutput(outEl, res.out, { error: res.error });
        res.ns.destroy();
      } catch (e) {
        setOutput(outEl, "", { error: String(e.message || e) });
      }
      runBtn.disabled = false; runBtn.textContent = "▶ Run";
      state.running = false;
    }
    runBtn.addEventListener("click", doRun);
    resetBtn.addEventListener("click", () => { cm.setValue(code); outEl.className = "output empty"; outEl.textContent = "Run the code to see its output here."; });
    cm.setOption("extraKeys", Object.assign({}, cm.getOption("extraKeys"), { "Ctrl-Enter": doRun, "Cmd-Enter": doRun }));
    return card;
  }

  // ---------- Views ----------
  function findLesson(id) {
    return flatLessons.find((x) => x.lesson.id === id) || null;
  }
  function lessonIndex(id) {
    return flatLessons.findIndex((x) => x.lesson.id === id);
  }

  function renderHome() {
    state.currentLessonId = null;
    const c = document.getElementById("lesson-container");
    c.innerHTML = "";
    const hero = el("div", "home-hero");
    hero.appendChild(el("h1", null, "Learn Python by <em>writing</em> Python 🐍"));
    hero.appendChild(el("p", "sub",
      "An interactive course that runs entirely in your browser. Read a short tutorial, then prove it in a lab — " +
      "your code is executed and checked instantly. Start from absolute zero and work your way up to writing clean, " +
      "reusable functions."));
    c.appendChild(hero);

    const grid = el("div", "module-grid");
    CURRICULUM.forEach((mod, i) => {
      const total = mod.lessons.length;
      const done = mod.lessons.filter((l) => isDone(l.id)).length;
      const card = el("div", "module-card");
      card.appendChild(el("h3", null, "Module " + (i + 1) + " · " + mod.title));
      card.appendChild(el("p", null, mod.blurb));
      card.appendChild(el("div", "mod-progress" + (done === total ? " full" : ""), done + " / " + total + " lessons" + (done === total ? " ✓" : "")));
      card.addEventListener("click", () => navigate(mod.lessons[0].id));
      grid.appendChild(card);
    });
    c.appendChild(grid);
    updateLessonNavButtons();
    renderSidebar();
  }

  function renderLesson(id) {
    const found = findLesson(id);
    if (!found) { renderHome(); return; }
    state.currentLessonId = id;
    const { mod, lesson } = found;
    const c = document.getElementById("lesson-container");
    c.innerHTML = "";

    const modIndex = CURRICULUM.indexOf(mod) + 1;
    c.appendChild(el("div", "lesson-kicker", "Module " + modIndex + " · " + mod.title));
    c.appendChild(el("h1", "lesson-title", lesson.title));
    const meta = el("div", "lesson-meta");
    meta.innerHTML = '<span class="badge ' + lesson.type + '">' + (lesson.type === "lab" ? "🧪 Lab" : "📖 Tutorial") + "</span>" +
      (lesson.minutes ? "~" + lesson.minutes + " min" : "");
    c.appendChild(meta);

    if (lesson.type === "lab") renderLab(c, lesson);
    else renderTutorial(c, lesson);

    updateLessonNavButtons();
    renderSidebar();
    window.scrollTo({ top: 0 });
  }

  function renderTutorial(c, lesson) {
    renderBlocks(c, lesson.content);
    const row = el("div", "done-row");
    if (isDone(lesson.id)) {
      row.appendChild(el("span", "completed-flag", "✓ Completed"));
    }
    const btn = el("button", "btn success", isDone(lesson.id) ? "Continue →" : "Mark complete & continue →");
    btn.addEventListener("click", () => {
      markDone(lesson.id);
      goNext();
    });
    row.appendChild(btn);
    c.appendChild(row);
  }

  function renderLab(c, lesson) {
    const obj = el("div", "objective", '<span class="obj-label">🎯 Your mission:</span>' + lesson.objective);
    c.appendChild(obj);
    renderBlocks(c, lesson.content);

    // Editor card
    const card = el("div", "lab-editor-card");
    const bar = el("div", "lab-toolbar");
    bar.appendChild(el("span", "label", "Your code (Ctrl+Enter to run)"));
    const resetBtn = el("button", "btn ghost small", "Reset");
    const runBtn = el("button", "btn primary", "▶ Run");
    const checkBtn = el("button", "btn success", "✓ Check my work");
    bar.appendChild(resetBtn); bar.appendChild(runBtn); bar.appendChild(checkBtn);
    card.appendChild(bar);
    const cm = makeEditor(card, lesson.starter || "");
    const outEl = el("div", "output empty", "Run your code to see its output here.");
    card.appendChild(outEl);
    const banner = el("div", "check-banner");
    card.appendChild(banner);
    c.appendChild(card);

    async function doRun() {
      if (state.running) return;
      state.running = true;
      runBtn.disabled = true; checkBtn.disabled = true; runBtn.textContent = "Running…";
      banner.className = "check-banner";
      try {
        const res = await runPython(cm.getValue());
        setOutput(outEl, res.out, { error: res.error });
        res.ns.destroy();
      } catch (e) {
        setOutput(outEl, "", { error: String(e.message || e) });
      }
      runBtn.disabled = false; checkBtn.disabled = false; runBtn.textContent = "▶ Run";
      state.running = false;
    }

    async function doCheck() {
      if (state.running) return;
      state.running = true;
      runBtn.disabled = true; checkBtn.disabled = true; checkBtn.textContent = "Checking…";
      banner.className = "check-banner";
      try {
        const code = cm.getValue();
        const res = await runPython(code);
        setOutput(outEl, res.out, { error: res.error });
        if (res.error) {
          banner.className = "check-banner fail";
          banner.textContent = "Your code raised an error — fix it, then check again.";
        } else {
          const t = runTests(lesson.tests, res.ns, res.out, code);
          if (t.passed) {
            const issues = checkStyle(code);
            if (issues.length) {
              banner.className = "check-banner style";
              banner.textContent =
                "So close! Your code WORKS, but clean spacing is required — it keeps code readable and prevents sneaky errors:\n• " +
                issues.slice(0, 4).join("\n• ") +
                (issues.length > 4 ? "\n• …and " + (issues.length - 4) + " more" : "");
            } else {
              banner.className = "check-banner pass";
              banner.textContent = t.message;
              if (!isDone(lesson.id)) {
                markDone(lesson.id);
                renderSidebar();
              }
            }
          } else {
            banner.className = "check-banner fail";
            banner.textContent = t.message;
          }
        }
        res.ns.destroy();
      } catch (e) {
        banner.className = "check-banner fail";
        banner.textContent = String(e.message || e);
      }
      runBtn.disabled = false; checkBtn.disabled = false; checkBtn.textContent = "✓ Check my work";
      state.running = false;
    }

    runBtn.addEventListener("click", doRun);
    checkBtn.addEventListener("click", doCheck);
    resetBtn.addEventListener("click", () => {
      if (confirm("Reset the editor back to the starter code?")) cm.setValue(lesson.starter || "");
    });
    cm.setOption("extraKeys", Object.assign({}, cm.getOption("extraKeys"), { "Ctrl-Enter": doRun, "Cmd-Enter": doRun }));

    // Hints
    if (lesson.hints && lesson.hints.length) {
      const hints = el("div", "hints");
      hints.appendChild(el("div", "content-block", "<h3>Stuck?</h3>"));
      lesson.hints.forEach((h, i) => {
        const btn = el("button", "btn ghost small hint-toggle", "💡 Hint " + (i + 1));
        const body = el("div", "hint-body", h);
        btn.addEventListener("click", () => body.classList.toggle("shown"));
        hints.appendChild(btn);
        hints.appendChild(body);
      });
      c.appendChild(hints);
    }

    // Solution
    if (lesson.solution) {
      const det = el("details", "solution");
      det.appendChild(el("summary", null, "🔓 Show a solution (try the hints first!)"));
      const pre = el("div", "static-code");
      pre.textContent = lesson.solution;
      det.appendChild(pre);
      c.appendChild(det);
    }

    if (isDone(lesson.id)) {
      const row = el("div", "done-row");
      row.appendChild(el("span", "completed-flag", "✓ Lab completed"));
      c.appendChild(row);
    }
  }

  // ---------- Sidebar & progress ----------
  function renderSidebar() {
    const list = document.getElementById("module-list");
    list.innerHTML = "";
    const currentMod = state.currentLessonId ? findLesson(state.currentLessonId).mod : null;
    CURRICULUM.forEach((mod, i) => {
      const modEl = el("div", "module" + ((mod === currentMod || (!currentMod && i === 0)) ? " open" : ""));
      const total = mod.lessons.length;
      const done = mod.lessons.filter((l) => isDone(l.id)).length;
      const header = el("button", "module-header");
      header.innerHTML = "<span>" + (i + 1) + ". " + mod.title + "</span>" +
        (done === total ? '<span class="mod-done">✓</span>' : '<span class="mod-done" style="color:var(--text-dim)">' + done + "/" + total + "</span>") +
        '<span class="chev">▶</span>';
      header.addEventListener("click", () => modEl.classList.toggle("open"));
      modEl.appendChild(header);
      const lessonsEl = el("div", "module-lessons");
      mod.lessons.forEach((l) => {
        const link = el("button", "lesson-link" + (l.id === state.currentLessonId ? " active" : ""));
        link.innerHTML = '<span class="status ' + (isDone(l.id) ? "done" : "todo") + '">' + (isDone(l.id) ? "✓" : "○") + "</span>" +
          "<span>" + l.title + '</span><span class="ltype ' + l.type + '" style="margin-left:auto">' + (l.type === "lab" ? "lab" : "read") + "</span>";
        link.addEventListener("click", () => { navigate(l.id); closeSidebarOnMobile(); });
        lessonsEl.appendChild(link);
      });
      modEl.appendChild(lessonsEl);
      list.appendChild(modEl);
    });
    refreshProgressUI();
  }

  function refreshProgressUI() {
    const total = flatLessons.length;
    const done = flatLessons.filter((x) => isDone(x.lesson.id)).length;
    document.getElementById("progress-count").textContent = done;
    document.getElementById("progress-total").textContent = total;
    document.getElementById("progress-fill").style.width = (total ? (100 * done / total) : 0) + "%";
  }

  // ---------- Navigation ----------
  function navigate(id) {
    if (id) location.hash = id;
    else { history.pushState(null, "", location.pathname); route(); }
  }
  function goNext() {
    const i = lessonIndex(state.currentLessonId);
    if (i >= 0 && i < flatLessons.length - 1) navigate(flatLessons[i + 1].lesson.id);
    else navigate(null);
  }
  function goPrev() {
    const i = lessonIndex(state.currentLessonId);
    if (i > 0) navigate(flatLessons[i - 1].lesson.id);
    else navigate(null);
  }
  function updateLessonNavButtons() {
    const prev = document.getElementById("prev-btn");
    const next = document.getElementById("next-btn");
    const i = state.currentLessonId ? lessonIndex(state.currentLessonId) : -1;
    prev.style.visibility = i <= 0 ? "hidden" : "visible";
    if (i === -1) { next.textContent = "Start learning →"; }
    else if (i >= flatLessons.length - 1) { next.textContent = "Back to overview"; }
    else { next.textContent = "Next →"; }
  }
  function route() {
    const id = location.hash.replace("#", "");
    if (id && findLesson(id)) renderLesson(id);
    else renderHome();
  }

  function closeSidebarOnMobile() {
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("sidebar-backdrop").classList.remove("show");
  }

  // ---------- Boot ----------
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("next-btn").addEventListener("click", () => {
      if (state.currentLessonId === null) navigate(flatLessons[0].lesson.id);
      else goNext();
    });
    document.getElementById("prev-btn").addEventListener("click", goPrev);
    document.getElementById("nav-toggle").addEventListener("click", () => {
      document.getElementById("sidebar").classList.toggle("open");
      document.getElementById("sidebar-backdrop").classList.toggle("show");
    });
    document.getElementById("sidebar-backdrop").addEventListener("click", closeSidebarOnMobile);
    document.getElementById("reset-progress").addEventListener("click", () => {
      if (confirm("Erase all completion progress on this device?")) {
        progress = {};
        saveProgress(progress);
        route();
      }
    });

    /* Header reset. Same job as the sidebar's "Reset my progress", but always
       reachable. Two-step instead of a confirm() dialog so a stray click can
       never wipe someone's progress. */
    (function addHeaderReset() {
      const bar = document.querySelector(".top-progress");
      if (!bar || !bar.parentElement) return;

      const css = document.createElement("style");
      css.textContent =
        ".progress-reset{display:inline-flex;align-items:center;gap:6px;margin-left:14px;padding:5px 11px;" +
        "font:inherit;font-size:12px;line-height:1;color:#8fa3c4;background:transparent;cursor:pointer;" +
        "border:1px solid rgba(255,255,255,.15);border-radius:999px;white-space:nowrap;" +
        "transition:color .15s ease,border-color .15s ease,background .15s ease}" +
        ".progress-reset:hover{color:#eaf1fb;border-color:rgba(255,255,255,.36)}" +
        ".progress-reset .ico{font-size:13px;line-height:1;display:inline-block}" +
        ".progress-reset.armed{color:#ffb3b3;border-color:#b45}" +
        ".progress-reset.armed:hover{background:rgba(190,60,70,.18)}" +
        ".progress-reset.done{color:#8ee39b;border-color:#3a7}" +
        "@media (max-width:720px){.progress-reset .lbl{display:none}.progress-reset{margin-left:8px;padding:5px 8px}}";
      document.head.appendChild(css);

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "progress-reset";
      let armed = false, timer = null;

      function idle() {
        armed = false;
        clearTimeout(timer);
        btn.className = "progress-reset";
        btn.title = "Clear every completed lesson on this device";
        btn.innerHTML = '<span class="ico">\u21bb</span><span class="lbl">Reset progress</span>';
      }
      function arm() {
        armed = true;
        btn.className = "progress-reset armed";
        btn.title = "Click again to erase your progress";
        btn.innerHTML = '<span class="ico">\u21bb</span><span class="lbl">Erase all progress? Click again</span>';
        timer = setTimeout(idle, 4000);
      }
      function cleared() {
        clearTimeout(timer);
        btn.className = "progress-reset done";
        btn.innerHTML = '<span class="ico">\u2713</span><span class="lbl">Progress cleared</span>';
        timer = setTimeout(idle, 2000);
      }

      btn.addEventListener("click", () => {
        if (!armed) { arm(); return; }
        armed = false;
        progress = {};
        saveProgress(progress);
        route();
        refreshProgressUI();
        cleared();
      });

      idle();
      bar.parentElement.insertBefore(btn, bar.nextSibling);
    })();
    window.addEventListener("hashchange", route);
    route();
    initPyodide();
  });
})();
