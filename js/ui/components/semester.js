import { DATA } from '../../config/data.js';
import { showToast } from '../../utils/helpers.js';

export function renderSemesterSelection(container, branch, onSelect, onBack) {
  const availableSems = Object.keys(DATA[branch] || {});

  let buttonsHtml = '';
  for (let i = 1; i <= 8; i++) {
    const isAvailable = availableSems.includes(i.toString());
    buttonsHtml += `
      <button class="${!isAvailable ? 'disabled-soon' : ''}" ${!isAvailable ? 'disabled' : ''} data-sem="${i}">
        <span>Semester ${i}</span>
        <span>${!isAvailable ? '<small>N/A</small>' : '&rarr;'}</span>
      </button>
    `;
  }

  container.innerHTML = `
    <div class="step">
      <p class="instruction">Select Semester</p>
      <div class="sem-grid">${buttonsHtml}</div>
      <button class="secondary back-btn">Back</button>
    </div>
  `;

  container.querySelectorAll('button:not(.disabled-soon):not(.back-btn)').forEach(btn => {
    btn.addEventListener('click', () => {
      const sem = parseInt(btn.dataset.sem);
      const semData = DATA[branch]?.[sem];

      if (!semData) {
        showToast('Semester data not available');
        return;
      }
      onSelect(sem);
    });
  });

  container.querySelector('.back-btn').addEventListener('click', onBack);
}
