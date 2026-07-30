const app = (() => {
    const STORAGE_KEY = 'pylearn_progress';
    let progress = {};
    let currentItem = null;
    let currentModuleId = null;
    let currentHintIndex = 0;
    let currentExampleCode = '';

    function init() {
        loadProgress();
        renderSidebar();
        renderDashboard();
        bindEvents();
        showView('dashboard');
    }

    // --- Progress Management ---

    function loadProgress() {
        try {
            progress = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        } catch {
            progress = {};
        }
    }

    function saveProgress() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }

    function markComplete(itemId) {
        progress[itemId] = true;
        saveProgress();
        updateProgressUI();
        renderSidebar();
    }

    function resetAllProgress() {
        if (confirm('Reset all progress? This cannot be undone.')) {
            progress = {};
            saveProgress();
            updateProgressUI();
            renderSidebar();
            renderDashboard();
            showView('dashboard');
        }
    }

    function getCompletedCount() {
        return Object.keys(progress).length;
    }

    function getTotalCount() {
        return MODULES.reduce((sum, m) => sum + m.items.length, 0);
    }

    function getModuleProgress(mod) {
        const done = mod.items.filter(i => progress[i.id]).length;
        return { done, total: mod.items.length, percent: Math.round((done / mod.items.length) * 100) };
    }

    function updateProgressUI() {
        const done = getCompletedCount();
        const total = getTotalCount();
        const pct = total > 0 ? Math.round((done / total) * 100) : 0;

        document.getElementById('progress-fill').style.width = pct + '%';
        document.getElementById('progress-text').textContent = pct + '%';

        const lessonsCompleted = MODULES.reduce((sum, m) =>
            sum + m.items.filter(i => i.type === 'lesson' && progress[i.id]).length, 0);
        const labsCompleted = MODULES.reduce((sum, m) =>
            sum + m.items.filter(i => i.type === 'lab' && progress[i.id]).length, 0);

        const statLessons = document.getElementById('stat-lessons');
        const statLabs = document.getElementById('stat-labs');
        const statTotal = document.getElementById('stat-total');
        if (statLessons) statLessons.textContent = lessonsCompleted;
        if (statLabs) statLabs.textContent = labsCompleted;
        if (statTotal) statTotal.textContent = total;
    }

    // --- Sidebar ---

    function renderSidebar() {
        const nav = document.getElementById('sidebar-nav');
        nav.innerHTML = '';

        const homeItem = document.createElement('div');
        homeItem.className = 'nav-item' + (!currentItem ? ' active' : '');
        homeItem.innerHTML = `
            <span class="item-icon lesson-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </span>
            Dashboard
        `;
        homeItem.onclick = () => {
            currentItem = null;
            currentModuleId = null;
            renderSidebar();
            renderDashboard();
            showView('dashboard');
        };
        nav.appendChild(homeItem);

        MODULES.forEach(mod => {
            const group = document.createElement('div');
            group.className = 'module-group';

            const modProgress = getModuleProgress(mod);
            const header = document.createElement('div');
            header.className = 'module-header';
            header.innerHTML = `
                <svg class="chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                <span>${mod.title}</span>
            `;

            const items = document.createElement('div');
            items.className = 'module-items';

            header.onclick = () => {
                header.classList.toggle('collapsed');
                items.classList.toggle('collapsed');
            };

            mod.items.forEach(item => {
                const navItem = document.createElement('div');
                const isActive = currentItem && currentItem.id === item.id;
                const isDone = progress[item.id];
                navItem.className = `nav-item${isActive ? ' active' : ''}${isDone ? ' completed' : ''}`;

                const iconClass = item.type === 'lab' ? 'lab-icon' : 'lesson-icon';
                const icon = item.type === 'lab'
                    ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 3h6v2H9zM7 5l-2 14h14L17 5z"/><path d="M8 12h8"/></svg>`
                    : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`;
                const checkSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;

                navItem.innerHTML = `
                    <span class="item-icon check-icon">${checkSvg}</span>
                    <span class="item-icon ${iconClass}">${icon}</span>
                    <span>${item.title}</span>
                `;

                navItem.onclick = () => navigate(mod.id, item.id);
                items.appendChild(navItem);
            });

            items.style.maxHeight = items.scrollHeight + 200 + 'px';

            group.appendChild(header);
            group.appendChild(items);
            nav.appendChild(group);
        });
    }

    // --- Dashboard ---

    function renderDashboard() {
        updateProgressUI();

        const grid = document.getElementById('modules-grid');
        grid.innerHTML = '';

        MODULES.forEach(mod => {
            const p = getModuleProgress(mod);
            let badgeHtml = '';
            if (p.percent === 100) {
                badgeHtml = '<span class="module-card-badge complete">Complete</span>';
            } else if (p.done > 0) {
                badgeHtml = `<span class="module-card-badge in-progress">${p.done}/${p.total}</span>`;
            }

            const card = document.createElement('div');
            card.className = 'module-card';
            card.innerHTML = `
                <div class="module-card-header">
                    <span class="module-number">Module ${MODULES.indexOf(mod) + 1}</span>
                    ${badgeHtml}
                </div>
                <h3>${mod.title}</h3>
                <p>${mod.description}</p>
                <div class="module-card-progress">
                    <div class="module-card-progress-fill" style="width: ${p.percent}%"></div>
                </div>
            `;

            card.onclick = () => {
                const firstIncomplete = mod.items.find(i => !progress[i.id]) || mod.items[0];
                navigate(mod.id, firstIncomplete.id);
            };

            grid.appendChild(card);
        });
    }

    // --- Navigation ---

    function navigate(moduleId, itemId) {
        const mod = MODULES.find(m => m.id === moduleId);
        if (!mod) return;
        const item = mod.items.find(i => i.id === itemId);
        if (!item) return;

        currentItem = item;
        currentModuleId = moduleId;
        currentHintIndex = 0;

        closeSidebar();

        if (item.type === 'lesson') {
            renderLesson(mod, item);
            showView('lesson');
        } else if (item.type === 'lab') {
            renderLab(mod, item);
            showView('lab');
        }

        renderSidebar();
        window.scrollTo(0, 0);
        document.getElementById('main-content').scrollTo(0, 0);
    }

    function showView(view) {
        document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
        document.getElementById(view + '-view').classList.remove('hidden');
    }

    function getAdjacentItem(direction) {
        if (!currentItem || !currentModuleId) return null;

        const allItems = MODULES.flatMap(m => m.items.map(i => ({ moduleId: m.id, item: i })));
        const idx = allItems.findIndex(a => a.item.id === currentItem.id);

        const newIdx = idx + direction;
        if (newIdx < 0 || newIdx >= allItems.length) return null;
        return allItems[newIdx];
    }

    function navigateAdjacent(direction) {
        const target = getAdjacentItem(direction);
        if (target) {
            navigate(target.moduleId, target.item.id);
        }
    }

    // --- Lesson Rendering ---

    function renderLesson(mod, item) {
        const breadcrumb = document.getElementById('lesson-breadcrumb');
        breadcrumb.innerHTML = `
            <a onclick="app.goHome()">Home</a>
            <span class="separator">›</span>
            <span>${mod.title}</span>
            <span class="separator">›</span>
            <span>${item.title}</span>
        `;

        document.getElementById('lesson-content').innerHTML = item.content;

        const completeBtn = document.getElementById('complete-lesson-btn');
        if (progress[item.id]) {
            completeBtn.textContent = 'Completed ✓';
            completeBtn.disabled = true;
            completeBtn.classList.remove('btn-primary');
            completeBtn.classList.add('btn-outline');
        } else {
            completeBtn.textContent = 'Mark Complete';
            completeBtn.disabled = false;
            completeBtn.classList.add('btn-primary');
            completeBtn.classList.remove('btn-outline');
        }

        const prev = getAdjacentItem(-1);
        const next = getAdjacentItem(1);
        document.getElementById('prev-btn').style.visibility = prev ? 'visible' : 'hidden';
        document.getElementById('next-btn').style.visibility = next ? 'visible' : 'hidden';
    }

    // --- Lab Rendering ---

    function renderLab(mod, item) {
        const breadcrumb = document.getElementById('lab-breadcrumb');
        breadcrumb.innerHTML = `
            <a onclick="app.goHome()">Home</a>
            <span class="separator">›</span>
            <span>${mod.title}</span>
            <span class="separator">›</span>
            <span>${item.title}</span>
        `;

        document.getElementById('lab-title').textContent = item.title;
        document.getElementById('lab-objective').textContent = item.objective;
        document.getElementById('lab-tasks').innerHTML = item.instructions;

        document.getElementById('hints-container').innerHTML = '';
        currentHintIndex = 0;

        const hintBtn = document.getElementById('hint-btn');
        if (item.hints && item.hints.length > 0) {
            hintBtn.style.display = 'inline-flex';
            hintBtn.textContent = `Show Hint (${item.hints.length} available)`;
        } else {
            hintBtn.style.display = 'none';
        }

        document.getElementById('output-content').textContent = '';
        document.getElementById('test-results').classList.add('hidden');
        document.getElementById('test-results').innerHTML = '';

        PyEditor.destroyLabEditor();

        const editorContainer = document.getElementById('lab-editor');
        editorContainer.innerHTML = '';
        PyEditor.initLabEditor(editorContainer, item.starterCode);

        const prev = getAdjacentItem(-1);
        const next = getAdjacentItem(1);
        document.getElementById('lab-prev-btn').style.visibility = prev ? 'visible' : 'hidden';
        document.getElementById('lab-next-btn').style.visibility = next ? 'visible' : 'hidden';
    }

    // --- Example Runner ---

    function openExample(btn) {
        const codeBlock = btn.closest('.code-block');
        const code = codeBlock.querySelector('code').textContent;
        currentExampleCode = code;

        const modal = document.getElementById('example-runner');
        modal.classList.remove('hidden');

        const container = document.getElementById('example-editor');
        PyEditor.initExampleEditor(container, code);

        document.getElementById('example-output').textContent = '';
    }

    async function runExample() {
        const editor = PyEditor.getExampleEditor();
        if (!editor) return;

        const output = document.getElementById('example-output');
        output.textContent = 'Running...';

        const result = await PyEditor.runCode(editor.getValue());
        if (result.success) {
            output.innerHTML = result.output || '<span class="text-muted">(No output)</span>';
        } else {
            let text = '';
            if (result.output) text += result.output + '\n';
            text += `<span class="error">${escapeHtml(result.error)}</span>`;
            output.innerHTML = text;
        }
    }

    function closeExample() {
        document.getElementById('example-runner').classList.add('hidden');
        PyEditor.destroyExampleEditor();
    }

    function resetExample() {
        const editor = PyEditor.getExampleEditor();
        if (editor) {
            editor.setValue(currentExampleCode);
        }
        document.getElementById('example-output').textContent = '';
    }

    // --- Lab Actions ---

    async function runLabCode() {
        const editor = PyEditor.getLabEditor();
        if (!editor) return;

        const btn = document.getElementById('run-code-btn');
        btn.disabled = true;
        btn.innerHTML = '<span class="loading-spinner" style="width:14px;height:14px;border-width:2px;display:inline-block;vertical-align:middle;"></span> Running...';

        const output = document.getElementById('output-content');
        output.textContent = 'Running...';
        document.getElementById('test-results').classList.add('hidden');

        const result = await PyEditor.runCode(editor.getValue());

        if (result.success) {
            output.innerHTML = result.output || '<span style="color:var(--text-muted)">(No output)</span>';
        } else {
            let text = '';
            if (result.output) text += escapeHtml(result.output) + '\n';
            text += `<span class="error">${escapeHtml(result.error)}</span>`;
            output.innerHTML = text;
        }

        btn.disabled = false;
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg> Run`;
    }

    async function checkLabCode() {
        if (!currentItem || currentItem.type !== 'lab') return;

        const editor = PyEditor.getLabEditor();
        if (!editor) return;

        const btn = document.getElementById('check-code-btn');
        btn.disabled = true;
        btn.innerHTML = '<span class="loading-spinner" style="width:14px;height:14px;border-width:2px;display:inline-block;vertical-align:middle;"></span> Checking...';

        const output = document.getElementById('output-content');
        output.textContent = 'Running tests...';

        const results = await PyEditor.runTests(editor.getValue(), currentItem.tests);

        let capturedOutput = '';
        const codeResult = await PyEditor.runCode(editor.getValue());
        if (codeResult.success && codeResult.output) {
            output.innerHTML = escapeHtml(codeResult.output);
        }

        const testPanel = document.getElementById('test-results');
        testPanel.classList.remove('hidden');

        const passed = results.filter(r => r.passed).length;
        const total = results.length;
        const allPassed = passed === total;

        let html = results.map(r => `
            <div class="test-result-item ${r.passed ? 'test-pass' : 'test-fail'}">
                <span>${r.passed ? '✓' : '✗'}</span>
                <span>${r.name}${r.passed ? '' : ' — ' + escapeHtml(r.message)}</span>
            </div>
        `).join('');

        html += `<div class="test-summary ${allPassed ? 'all-pass' : 'has-fail'}">
            ${allPassed ? '🎉 All tests passed!' : `${passed}/${total} tests passed`}
        </div>`;

        testPanel.innerHTML = html;

        if (allPassed && !progress[currentItem.id]) {
            markComplete(currentItem.id);
            output.innerHTML += '\n<span class="success">Lab completed! Great work!</span>';
        }

        btn.disabled = false;
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Check`;
    }

    function resetLabCode() {
        if (!currentItem || currentItem.type !== 'lab') return;
        const editor = PyEditor.getLabEditor();
        if (editor) {
            editor.setValue(currentItem.starterCode);
        }
        document.getElementById('output-content').textContent = '';
        document.getElementById('test-results').classList.add('hidden');
    }

    function showHint() {
        if (!currentItem || !currentItem.hints) return;

        if (currentHintIndex >= currentItem.hints.length) return;

        const container = document.getElementById('hints-container');
        const hint = document.createElement('div');
        hint.className = 'hint-item';
        hint.innerHTML = `<strong>Hint ${currentHintIndex + 1}:</strong> ${currentItem.hints[currentHintIndex]}`;
        container.appendChild(hint);

        currentHintIndex++;

        const btn = document.getElementById('hint-btn');
        const remaining = currentItem.hints.length - currentHintIndex;
        if (remaining > 0) {
            btn.textContent = `Show Hint (${remaining} remaining)`;
        } else {
            btn.textContent = 'No more hints';
            btn.disabled = true;
        }
    }

    function clearOutput() {
        document.getElementById('output-content').textContent = '';
    }

    // --- Event Binding ---

    function bindEvents() {
        document.getElementById('reset-progress').onclick = resetAllProgress;

        document.querySelector('.logo').onclick = () => {
            currentItem = null;
            currentModuleId = null;
            renderSidebar();
            renderDashboard();
            showView('dashboard');
        };

        document.getElementById('complete-lesson-btn').onclick = () => {
            if (currentItem) {
                markComplete(currentItem.id);
                renderLesson(
                    MODULES.find(m => m.id === currentModuleId),
                    currentItem
                );
            }
        };

        document.getElementById('prev-btn').onclick = () => navigateAdjacent(-1);
        document.getElementById('next-btn').onclick = () => navigateAdjacent(1);
        document.getElementById('lab-prev-btn').onclick = () => navigateAdjacent(-1);
        document.getElementById('lab-next-btn').onclick = () => navigateAdjacent(1);

        document.getElementById('run-code-btn').onclick = runLabCode;
        document.getElementById('check-code-btn').onclick = checkLabCode;
        document.getElementById('reset-code-btn').onclick = resetLabCode;
        document.getElementById('clear-output-btn').onclick = clearOutput;
        document.getElementById('hint-btn').onclick = showHint;

        document.getElementById('example-run-btn').onclick = runExample;
        document.getElementById('example-close-btn').onclick = closeExample;
        document.getElementById('example-reset-btn').onclick = resetExample;

        document.getElementById('sidebar-toggle').onclick = toggleSidebar;
        document.getElementById('sidebar-overlay').onclick = closeSidebar;
    }

    function toggleSidebar() {
        document.getElementById('sidebar').classList.toggle('open');
        document.getElementById('sidebar-overlay').classList.toggle('active');
    }

    function closeSidebar() {
        document.getElementById('sidebar').classList.remove('open');
        document.getElementById('sidebar-overlay').classList.remove('active');
    }

    function goHome() {
        currentItem = null;
        currentModuleId = null;
        renderSidebar();
        renderDashboard();
        showView('dashboard');
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    document.addEventListener('DOMContentLoaded', init);

    return {
        openExample,
        goHome
    };
})();
