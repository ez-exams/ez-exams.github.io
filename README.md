# EZ Exam — Certification Study Hub

**Live site:** https://ez-exams.github.io

One website, three complete study hubs behind a single landing page:

| Path | Hub | Content |
| --- | --- | --- |
| `/security-plus/` | **CompTIA Security+ SY0-701** | 604 questions, PBQ trainer, ports & protocols flashcards |
| `/az-900/` | **Microsoft Azure Fundamentals AZ-900** | 208 questions, 266 PBQs (Yes/No, dropdown, drag & drop), flashcards |
| `/cysa/` | **CompTIA CySA+ CS0-003** | 291 questions, 128 acronym flashcards, missed-question review |

Every hub is fully static — no backend, no build step, no sign-up.

## Run it locally

Double-click **`Start-EZ-Exam.bat`** (Windows), or from a terminal:

```bash
python run.py
```

Your browser opens to `http://localhost:8000/`. Use `--port 9000` for a
different port, `--no-browser` to skip auto-opening. Stop with `Ctrl+C`.

> Note: Security+ and AZ-900 load their question banks with `fetch()`, which
> browsers block over `file://`. Always use the launcher (or any static
> server) rather than double-clicking `index.html`.

## Publishing / updating the live site

The site is hosted with GitHub Pages from the `ez-exams/ez-exams.github.io`
repository. For a `*.github.io` repo, Pages deploys automatically from the
`main` branch — pushing is all it takes.

To publish changes, double-click **`Publish-EZ-Exam.bat`**, or:

```bash
git add -A
git commit -m "Update EZ Exam"
git push
```

The live site refreshes at https://ez-exams.github.io within a minute or two.

## Updating a hub

Each subfolder is a snapshot of its source repo. When you improve one of the
originals, re-copy its files over the matching subfolder here, then publish:

- `SYO/` (repo root) → `security-plus/` — copy `index.html`, `static/`, `data/`
- `SYO/az900/` → `az-900/` — copy `index.html`, `static/`, `data/`
- `CySA-Study-Hub/` → `cysa/` — copy `index.html`, `questions.json`, `acronyms.json`

Heads-up: the three hub `index.html` files here carry two small EZ Exam
additions (the "‹ EZ Exam" banner link and the page title suffix), so if you
overwrite them with fresh copies from the source repos, re-add those or ask
Claude to re-apply them.
