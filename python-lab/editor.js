const PyEditor = (() => {
    let pyodide = null;
    let pyodideLoading = false;
    let labEditor = null;
    let exampleEditor = null;

    const CM_OPTIONS = {
        mode: 'python',
        theme: 'dracula',
        lineNumbers: true,
        indentUnit: 4,
        tabSize: 4,
        indentWithTabs: false,
        matchBrackets: true,
        autoCloseBrackets: true,
        extraKeys: {
            'Tab': (cm) => {
                if (cm.somethingSelected()) {
                    cm.indentSelection('add');
                } else {
                    cm.replaceSelection('    ', 'end');
                }
            },
            'Shift-Tab': (cm) => cm.indentSelection('subtract'),
            'Ctrl-Enter': () => document.getElementById('run-code-btn')?.click(),
            'Cmd-Enter': () => document.getElementById('run-code-btn')?.click(),
        }
    };

    async function loadPyodide() {
        if (pyodide) return pyodide;
        if (pyodideLoading) {
            while (!pyodide) await new Promise(r => setTimeout(r, 100));
            return pyodide;
        }

        pyodideLoading = true;
        const overlay = document.getElementById('loading-overlay');
        overlay.classList.remove('hidden');

        try {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
            document.head.appendChild(script);

            await new Promise((resolve, reject) => {
                script.onload = resolve;
                script.onerror = reject;
            });

            pyodide = await window.loadPyodide({
                indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
            });
        } catch (err) {
            console.error('Failed to load Pyodide:', err);
            overlay.querySelector('p').textContent = 'Failed to load Python. Please refresh.';
            throw err;
        } finally {
            overlay.classList.add('hidden');
            pyodideLoading = false;
        }

        return pyodide;
    }

    function initLabEditor(container, code) {
        if (labEditor) {
            labEditor.setValue(code || '');
            return labEditor;
        }

        labEditor = CodeMirror(container, {
            ...CM_OPTIONS,
            value: code || '',
        });

        setTimeout(() => labEditor.refresh(), 10);
        return labEditor;
    }

    function initExampleEditor(container, code) {
        if (exampleEditor) {
            exampleEditor.toTextArea();
            exampleEditor = null;
        }

        const textarea = document.createElement('textarea');
        container.innerHTML = '';
        container.appendChild(textarea);

        exampleEditor = CodeMirror.fromTextArea(textarea, {
            ...CM_OPTIONS,
            lineNumbers: false,
            value: code || '',
        });

        exampleEditor.setValue(code || '');
        setTimeout(() => exampleEditor.refresh(), 10);
        return exampleEditor;
    }

    function getLabEditor() {
        return labEditor;
    }

    function getExampleEditor() {
        return exampleEditor;
    }

    async function runCode(code) {
        const py = await loadPyodide();

        let output = '';
        py.setStdout({
            batched: (text) => { output += text + '\n'; }
        });
        py.setStderr({
            batched: (text) => { output += text + '\n'; }
        });

        try {
            py.runPython(code);
            return { success: true, output: output.trimEnd() };
        } catch (err) {
            let errorMsg = err.message || String(err);
            const lines = errorMsg.split('\n');
            const relevantLines = lines.filter(line =>
                !line.includes('pyodide') &&
                !line.includes('JsProxy') &&
                !line.trim().startsWith('at ')
            );
            const cleanError = relevantLines.length > 0
                ? relevantLines.join('\n')
                : errorMsg;

            return {
                success: false,
                output: output.trimEnd(),
                error: cleanError.trim()
            };
        }
    }

    async function runTests(userCode, tests) {
        const py = await loadPyodide();
        const results = [];

        let capturedOutput = '';
        py.setStdout({
            batched: (text) => { capturedOutput += text + '\n'; }
        });
        py.setStderr({
            batched: (text) => { capturedOutput += text + '\n'; }
        });

        try {
            py.runPython(userCode);
        } catch (err) {
            return [{
                name: 'Code Execution',
                passed: false,
                message: `Code has errors: ${err.message}`
            }];
        }

        for (const test of tests) {
            try {
                const testCode = test.test.replace('__captured_output__', JSON.stringify(capturedOutput));
                py.runPython(testCode);
                results.push({ name: test.name, passed: true, message: 'Passed' });
            } catch (err) {
                let msg = err.message || String(err);
                const assertMatch = msg.match(/AssertionError: (.+)/);
                if (!assertMatch) {
                    const lines = msg.split('\n');
                    msg = lines[lines.length - 1] || msg;
                }
                results.push({
                    name: test.name,
                    passed: false,
                    message: assertMatch ? assertMatch[1] : msg.trim()
                });
            }
        }

        return results;
    }

    function destroyLabEditor() {
        if (labEditor) {
            const wrapper = labEditor.getWrapperElement();
            if (wrapper && wrapper.parentNode) {
                wrapper.parentNode.removeChild(wrapper);
            }
            labEditor = null;
        }
    }

    function destroyExampleEditor() {
        if (exampleEditor) {
            exampleEditor.toTextArea();
            exampleEditor = null;
        }
    }

    return {
        loadPyodide,
        initLabEditor,
        initExampleEditor,
        getLabEditor,
        getExampleEditor,
        runCode,
        runTests,
        destroyLabEditor,
        destroyExampleEditor
    };
})();
