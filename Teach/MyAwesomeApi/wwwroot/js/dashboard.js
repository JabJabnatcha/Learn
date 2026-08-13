import { executeEndpoint } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initial setup: Load Lesson 1 by default
    loadLesson(1);
    
    // Bind click events on sidebar items
    document.querySelectorAll('.lesson-item').forEach(button => {
        button.addEventListener('click', (e) => {
            document.querySelectorAll('.lesson-item').forEach(btn => btn.classList.remove('active'));
            const targetBtn = e.currentTarget;
            targetBtn.classList.add('active');
            
            const lessonNum = parseInt(targetBtn.getAttribute('data-lesson'));
            loadLesson(lessonNum);
        });
    });
});

async function loadLesson(num) {
    const viewContainer = document.getElementById('active-pane-container');
    viewContainer.innerHTML = '<div style="padding:2rem;color:var(--text-muted);font-style:italic;">Loading lesson template...</div>';
    
    try {
        const response = await fetch(`/templates/lesson${num}.html`);
        if (!response.ok) throw new Error("Template not found");
        
        const html = await response.text();
        viewContainer.innerHTML = html;
        
        // Bind event handlers dynamically inside the loaded template
        bindTemplateEvents(num);
    } catch (err) {
        viewContainer.innerHTML = `<div style="padding:2rem;color:var(--danger);">Failed to load template for Lesson ${num}. Details: ${err.message}</div>`;
    }
}

function bindTemplateEvents(num) {
    const runBtn = document.querySelector('[data-action="run"]');
    const runBadBtn = document.querySelector('[data-action="run-bad"]');
    const runGoodBtn = document.querySelector('[data-action="run-good"]');
    
    if (runBtn) {
        runBtn.addEventListener('click', () => triggerExecution(num, 'general'));
    }
    if (runBadBtn) {
        runBadBtn.addEventListener('click', () => triggerExecution(num, 'bad'));
    }
    if (runGoodBtn) {
        runGoodBtn.addEventListener('click', () => triggerExecution(num, 'good'));
    }
}

async function triggerExecution(lessonNum, mode) {
    const outputBox = document.getElementById('console-output');
    outputBox.classList.remove('empty');
    outputBox.style.color = '#38bdf8';
    outputBox.textContent = 'Calling API endpoint...';

    let endpoint = '';
    
    if (lessonNum === 1) {
        const val = document.getElementById('l1-deposit').value;
        endpoint = `/lesson1/bankaccount?deposit=${val}`;
    } else if (lessonNum === 2) {
        const val = document.getElementById('l2-price').value;
        endpoint = `/lesson2/product?price=${val}`;
    } else if (lessonNum === 3) {
        const val = document.getElementById('l3-type').value;
        endpoint = `/lesson3/discount?type=${val}`;
    } else if (lessonNum === 4) {
        endpoint = '/lesson4/report';
    } else if (lessonNum === 5) {
        const name = document.getElementById('l5-name').value;
        endpoint = `/lesson5/search?name=${encodeURIComponent(name)}`;
    } else if (lessonNum === 6) {
        // Mode will be 'bad' or 'good' for SRP / OCP / LSP
        // Since Lesson 6 has multiple buttons, we read what type was clicked
        const clickedBtn = event.currentTarget;
        const targetType = clickedBtn.getAttribute('data-target'); // e.g. 'lsp', 'ocp'
        if (targetType === 'lsp') {
            endpoint = `/lessons/lsp/${mode}`;
        } else if (targetType === 'ocp') {
            endpoint = mode === 'bad' 
                ? '/lessons/ocp/bad?gateway=PromptPay&amount=250'
                : '/lessons/ocp/good?gateway=PromptPay&amount=250';
        }
    } else if (lessonNum === 7) {
        endpoint = `/lessons/dip/${mode}?amount=100`;
    } else if (lessonNum === 8) {
        endpoint = '/lesson8/run-tests';
    } else if (lessonNum === 9) {
        endpoint = '/lesson9/lifetimes';
    } else if (lessonNum === 10) {
        endpoint = '/lesson11/structure'; // Resolves DI structure audit
    } else if (lessonNum === 11) {
        endpoint = '/lesson11/structure';
    } else if (lessonNum === 12) {
        endpoint = '/lesson12/products';
    } else if (lessonNum === 13) {
        endpoint = '/';
    } else if (lessonNum === 14) {
        endpoint = '/lesson11/structure';
    }

    const result = await executeEndpoint(endpoint);
    
    if (result.ok) {
        outputBox.style.color = '#10b981'; // Green
    } else {
        outputBox.style.color = '#ef4444'; // Red
    }
    
    outputBox.textContent = JSON.stringify(result.data, null, 4);
}
window.triggerExecution = triggerExecution; // make available if inline calls exist
