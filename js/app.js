function init() {
     // Check for legacy state or missing new fields
    const saved = localStorage.getItem('gradeCalcState');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            // If it's the old state format (no scheme), wipe it
            if (!parsed.scheme) {
                localStorage.removeItem('gradeCalcState');
                renderSchemeSelection();
                return;
            }
        } catch (e) {
             localStorage.removeItem('gradeCalcState');
        }
    }

     if (!loadState()) {
        renderSchemeSelection();
    }
    
    // Event Delegation
    document.body.addEventListener('change', (e) => {
        if (e.target.classList.contains('mark-input')) {
            updateMarks(e.target.dataset.code, e.target.value);
        }
    });

    document.body.addEventListener('focusout', (e) => {
        if (e.target.classList.contains('mark-input')) {
            validateInput(e.target.dataset.code, e.target.dataset.max);
        }
    });

}

init();
