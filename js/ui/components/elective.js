import { showToast } from '../../utils/helpers.js';

export function renderTrackSelection(container, semData, onSelect, onBack) {
  if (!container || !semData || !semData.electives) {
    console.error('Invalid parameters for renderTrackSelection');
    return;
  }
  
  const tracks = Object.keys(semData.electives);
  
  let html = `
    <div class="step">
      <p class="instruction">Select Elective Track</p>
  `;

  tracks.forEach(track => {
    html += `
      <button data-track="${track}">
        <span>${track}</span>
        <span>&rarr;</span>
      </button>
    `;
  });
  
  html += `<button class="secondary back-btn">Back</button></div>`;
  container.innerHTML = html;

  container.querySelectorAll('button:not(.back-btn)').forEach(btn => {
    btn.addEventListener('click', () => onSelect(btn.dataset.track));
  });

  container.querySelector('.back-btn').addEventListener('click', onBack);
}

export function renderSlotSelection(container, semData, selections, onUpdate, onConfirm, onBack) {
  if (!container || !semData || !semData.electives) {
    console.error('Invalid parameters for renderSlotSelection');
    return;
  }
  
  const slots = Object.keys(semData.electives);
  
  let html = `
    <div class="step">
      <p class="instruction">Select Electives</p>
  `;

  slots.forEach(slot => {
    const options = semData.electives[slot];
    const currentVal = selections[slot] || '';

    html += `
      <div style="margin-bottom: 1.5rem;">
        <label class="item-label">${slot}</label>
        <select data-slot="${slot}">
          <option value="" disabled ${currentVal === '' ? 'selected' : ''}>Select Subject...</option>
          ${options.map(opt => `<option value="${opt.code}" ${currentVal === opt.code ? 'selected' : ''}>${opt.code} - ${opt.name}</option>`).join('')}
        </select>
      </div>
    `;
  });

  html += `
    <button class="primary confirm-btn">Next &rarr;</button>
    <button class="secondary back-btn">Back</button>
    </div>
  `;
  
  container.innerHTML = html;

  container.querySelectorAll('select').forEach(select => {
    select.addEventListener('change', (e) => onUpdate(e.target.dataset.slot, e.target.value));
  });

  container.querySelector('.confirm-btn').addEventListener('click', () => {
    for (const slot of slots) {
      if (!selections[slot]) {
        showToast(`Please select a subject for ${slot}`);
        return;
      }
    }
    onConfirm();
  });

  container.querySelector('.back-btn').addEventListener('click', onBack);
}
