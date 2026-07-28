<#
  Commits and pushes the EZ Exam study hub.
  Usage:  powershell -ExecutionPolicy Bypass -File .\Publish-EZ-Exam-Update.ps1

  Note: the commit message is passed via a temp file (git commit -F) rather
  than -m. A message containing double quotes gets mangled by PowerShell's
  native-argument parsing, which silently turns message text into pathspecs.
#>

$ErrorActionPreference = 'Stop'
$repo = 'C:\Users\lil man\Desktop\Cursor\Study-Hub'

# $ErrorActionPreference does NOT trap native command failures, so check
# $LASTEXITCODE explicitly after every git call. Otherwise a failed commit
# sails straight through to a "published!" message.
function Invoke-Git {
  param([Parameter(ValueFromRemainingArguments = $true)][string[]]$GitArgs)
  & git @GitArgs
  if ($LASTEXITCODE -ne 0) {
    Write-Host ''
    Write-Host "git $($GitArgs -join ' ') failed with exit code $LASTEXITCODE." -ForegroundColor Red
    Write-Host 'Nothing was published. Fix the error above and re-run.' -ForegroundColor Red
    exit $LASTEXITCODE
  }
}

Set-Location -LiteralPath $repo
Invoke-Git rev-parse --is-inside-work-tree | Out-Null

if (-not (git config user.name))  { git config user.name  'stevenlb94' }
if (-not (git config user.email)) { git config user.email 'stevenlbillingsley94@gmail.com' }

$branch = (git rev-parse --abbrev-ref HEAD).Trim()
Write-Host "Repo:   $repo"
Write-Host "Branch: $branch`n"

# --- unpack the restructured CySA hub, if the archive is present ---
$zip = Join-Path $repo 'cysa-hub.zip'
if (Test-Path $zip) {
  Write-Host 'Unpacking restructured CySA hub...' -ForegroundColor Cyan
  $tmp = Join-Path ([System.IO.Path]::GetTempPath()) "cysa-unpack-$PID"
  Remove-Item -LiteralPath $tmp -Recurse -Force -ErrorAction SilentlyContinue
  Expand-Archive -LiteralPath $zip -DestinationPath $tmp -Force
  if (-not (Test-Path (Join-Path $tmp 'cysa\index.html'))) {
    Write-Host 'Archive looks wrong (no cysa\index.html). Aborting before touching anything.' -ForegroundColor Red
    exit 1
  }
  # only now is it safe to clear the old tree
  Remove-Item -LiteralPath (Join-Path $repo 'cysa') -Recurse -Force -ErrorAction SilentlyContinue
  Move-Item -LiteralPath (Join-Path $tmp 'cysa') -Destination $repo
  Remove-Item -LiteralPath $tmp -Recurse -Force -ErrorAction SilentlyContinue
  Remove-Item -LiteralPath $zip -Force
  Write-Host ('  cysa/ replaced — {0} files' -f (Get-ChildItem (Join-Path $repo 'cysa') -Recurse -File).Count)
}

# the old inlined files are gone from disk; -A stages those deletions
Invoke-Git add -A -- index.html security-plus az-900 cysa

Write-Host 'Staged changes:' -ForegroundColor Cyan
git status --short
if (-not (git diff --cached --name-only)) {
  Write-Host 'Nothing to commit — already up to date.' -ForegroundColor Yellow
  exit 0
}

$msg = @'
Restructure CySA hub, simplify landing hero, add hub navigation

CySA hub (cysa/):
- Question bank 291 -> 485. The old parser dropped every item whose
  answer used the Suggested Answer label instead of Correct Answer.
- Restore 67 exhibit images that text extraction had dropped
- Tag every question with its CS0-003 domain; add explanations, a
  per-section breakdown and a missed-question review
- Fix multi-answer scoring and replace corrupt question #122
- Add a PBQ Practice Exam: 8 simulations, 52 sub-answers, partial credit
- Restructure to match the other hubs: data fetched from data/, scripts
  and styles under static/, exhibits as lazy-loaded .webp files.
  Initial page load drops from ~6.8 MB to ~0.7 MB.

Landing page:
- Strip the cert pill, description and stat chips; enlarge the headline
- Credit ExamTopics as the question source
- Correct the CySA card counts

All three hubs:
- Sticky nav with a prominent Home button back to the landing page and
  one button per section, with active-state tracking
- ExamTopics sourcing note in the footer
'@

$msgFile = Join-Path ([System.IO.Path]::GetTempPath()) "ezexam-commit-$PID.txt"
Set-Content -LiteralPath $msgFile -Value $msg -Encoding UTF8
try   { Invoke-Git commit -F $msgFile }
finally { Remove-Item -LiteralPath $msgFile -ErrorAction SilentlyContinue }

Invoke-Git push origin $branch

Write-Host ''
Write-Host "Published to origin/$branch." -ForegroundColor Green
Write-Host 'Live in ~1 minute: https://ez-exams.github.io/' -ForegroundColor Green
