# 🐍 Python Lab

**Learn Python by writing Python** — an interactive course that runs 100% in your browser. No installs, no account, no server. Real Python code executes right on the page (via [Pyodide](https://pyodide.org), Python compiled to WebAssembly), and every lab is checked automatically the moment you click **Check my work**.

**▶ Live site:** https://stevenlb94.github.io/python-lab/

## What's inside

12 modules take you from absolute zero to confidently writing, testing, and debugging your own functions:

| # | Module | You learn |
|---|--------|-----------|
| 1 | First Steps | `print()`, strings, comments, reading error messages |
| 2 | Variables & Data Types | variables, `str`/`int`/`float`/`bool`, f-strings, PEP 8 spacing |
| 3 | Numbers, Math & Input | all math operators, `//` and `%`, precedence, rounding, `input()` |
| 4 | Making Decisions | `if` / `elif` / `else`, comparisons, `and` / `or` / `not` |
| 5 | Loops | `for`, `range()`, `while`, the accumulator pattern, FizzBuzz |
| 6 | Lists & Dictionaries | indexing, appending, looping, dict keys/values, counting patterns |
| 7 | **Functions I** | `def`, calling, parameters & arguments |
| 8 | **Functions II** | `return` vs `print`, composing functions |
| 9 | **Functions III** | default values, keyword arguments, scope, docstrings |
| 10 | Working with Strings | comparison & case, slicing, searching, `split()` / `join()` |
| 11 | Debugging Python | reading tracebacks, debugging techniques, fixing calculation / logic / off-by-one / loop / function / syntax errors |
| 12 | Capstone Labs | password checker, word tools, Caesar cipher, grade book |

**64 lessons total — 37 of them hands-on labs** with instant automated feedback, progressive hints, and reference solutions.

## How it works

- **Tutorials** 📖 teach a concept with live, editable code examples — every code box on the site can be edited and re-run.
- **Labs** 🧪 give you a mission, a starter file, and a checker. Your code runs in a real Python interpreter in your browser, and a test suite verifies the behavior (not just the output text — many labs re-run your logic with different inputs, so hardcoding answers won't work 😄).
- **Errors are explained.** Every Python error shown on the site comes with a plain-English 💡 explanation of what that error type means and how to hunt it down.
- **Clean formatting is required.** Labs check PEP 8-style spacing (spaces around `=` and comparisons, after commas, 4-space indentation) — building the habits that prevent errors before they happen.
- **Progress** is saved automatically in your browser (localStorage) — close the tab and pick up where you left off.

## Running it locally

It's a static site — any web server works:

```bash
git clone https://github.com/stevenlb94/python-lab.git
cd python-lab
python3 -m http.server 8000
# open http://localhost:8000
```

(An internet connection is still needed the first time, to fetch Pyodide and CodeMirror from their CDNs.)

## Project structure

```
index.html   — page shell, loads CodeMirror + Pyodide from CDNs
styles.css   — all styling
app.js       — the engine: rendering, code execution, lab checking, progress
lessons.js   — the entire curriculum as data (modules → lessons → content/tests)
```

Want to add a lesson? Everything is data-driven — add an object to `CURRICULUM` in `lessons.js`. A lab needs: `objective`, `content`, `starter`, `tests` (Python `assert`s; `_stdout` holds the captured output and `_code` the learner's source), `hints`, and `solution`.

## Credits

Built with [Pyodide](https://pyodide.org) and [CodeMirror](https://codemirror.net). Made to be shared — send the live link to anyone who wants to learn Python. 🚀
