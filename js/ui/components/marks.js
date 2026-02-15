import { showToast } from '../../utils/helpers.js';

export function renderMarksInput(container, subjects, marks, onMarkUpdate, onCalculate, onBack, onRandomFill, onReset) {
  if (!container) {
    console.error('Container element is required for renderMarksInput');
    return;
  }
  
  if (!Array.isArray(subjects)) {
    console.error('Subjects must be an array');
    return;
  }
  
  let html = `
    <div class="step" id="marks-step">
      <p class="instruction" style="display: flex; justify-content: space-between; align-items: center;">
        <span>Enter Marks Obtained</span>
        <span>
          <span class="rainbow-text random-fill">Random Fill</span>
          <span style="margin: 0 8px; color: #444;">|</span>
          <span class="rainbow-text reset-btn">Reset</span>
        </span>
      </p>

      <div style="margin-bottom: 1.5rem; padding: 1.25rem; border: 1px solid #222; border-radius: 8px; background: linear-gradient(135deg, #0a0a0a 0%, #050505 100%);">
        <p style="font-size: 0.7rem; color: #888; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.75rem;">Target SGPA Predictor</p>
        <div class="flex-row">
          <div class="fancy-input" style="flex:1; position: relative;">
            <input type="number" id="target-sgpa" placeholder="Target SGPA (e.g., 8.5)" step="0.01" min="0" max="10" />
          </div>
          <button class="primary predict-btn" style="margin-top: 0; width: auto; white-space: nowrap; padding-left: 1.5rem; padding-right: 1.5rem;">Predict</button>
        </div>
      </div>

      <div id="items-list">
  `;

  subjects.forEach((sub) => {
    if (!sub || typeof sub !== 'object') return;
    
    const credits = parseFloat(sub.credits);
    if (isNaN(credits) || credits <= 0) return;
    
    const maxMarks = sub.max !== undefined ? parseFloat(sub.max) : (credits * 25);
    if (isNaN(maxMarks) || maxMarks <= 0) return;

    const val = marks[sub.code] !== undefined ? marks[sub.code] : '';
    const isEmpty = val === '';

    html += `
      <div class="item-row" style="${isEmpty ? 'opacity: 0.7;' : ''}">
        <span class="item-label" style="display: flex; justify-content: space-between;">
          ${sub.code}
          ${isEmpty ? '<span style="color: #ef4444;">*</span>' : ''}
        </span>
        <p style="font-size: 0.9rem; margin-bottom: 0.5rem;">${sub.name}</p>
        <div class="flex-row">
          <div class="fancy-input" style="flex:1; position: relative;">
            <input type="number"
                   id="input-${sub.code}"
                   class="mark-input ${isEmpty ? 'empty-field' : ''}"
                   data-code="${sub.code}"
                   data-max="${maxMarks}"
                   placeholder="Obtained Marks"
                   min="0" max="${maxMarks}"
                   step="0.5"
                   inputmode="decimal"
                   value="${val}" />
            <span style="position: absolute; right: 10px; top: 12px; color: #666; font-size: 0.85rem; font-weight: 500; z-index: 2;">/ ${maxMarks}</span>
          </div>
        </div>
      </div>
    `;
  });

  html += `
      </div>
      <button class="primary calculate-btn">Calculate SGPA</button>
      <button class="secondary back-btn">Back</button>
    </div>
  `;

  container.innerHTML = html;

  container.querySelectorAll('.mark-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const value = e.target.value;
      const code = e.target.dataset.code;
      onMarkUpdate(code, value);
      
      const parentRow = e.target.closest('.item-row');
      const itemLabel = parentRow?.querySelector('.item-label');
      
      if (!value || value === '') {
        e.target.classList.add('empty-field');
        if (parentRow) parentRow.style.opacity = '0.7';
        if (itemLabel && !itemLabel.querySelector('span:last-child')) {
          const asterisk = document.createElement('span');
          asterisk.style.color = '#ef4444';
          asterisk.textContent = '*';
          itemLabel.appendChild(asterisk);
        }
      } else {
        e.target.classList.remove('empty-field');
        if (parentRow) parentRow.style.opacity = '1';
        const asterisk = itemLabel?.querySelector('span:last-child');
        if (asterisk) asterisk.remove();
      }
    });
  });

  container.querySelector('.calculate-btn').addEventListener('click', onCalculate);
  container.querySelector('.back-btn').addEventListener('click', onBack);
  container.querySelector('.random-fill').addEventListener('click', onRandomFill);
  container.querySelector('.reset-btn').addEventListener('click', onReset);

  setTimeout(() => {
    const firstInput = container.querySelector('input[type=number].mark-input');
    if (firstInput && Object.keys(marks).length === 0) firstInput.focus();
  }, 200);
}
