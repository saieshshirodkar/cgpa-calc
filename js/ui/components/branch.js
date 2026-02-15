import { DATA } from '../../config/data.js';
import { BRANCHES } from '../../config/constants.js';
import { showToast } from '../../utils/helpers.js';

export function renderBranchSelection(container, onSelect) {
  if (!container) {
    console.error('Container element is required for renderBranchSelection');
    return;
  }
  
  if (typeof onSelect !== 'function') {
    console.error('onSelect callback is required for renderBranchSelection');
    return;
  }
  
  let html = `
    <div class="step">
      <p class="instruction">Select Branch</p>
      <div class="sem-grid">
  `;
  
  for (const [code, name] of Object.entries(BRANCHES)) {
    const isDisabled = !DATA[code];
    html += `
      <button class="${isDisabled ? 'disabled-soon' : ''}" ${isDisabled ? 'disabled' : ''} data-branch="${code}">
        <span>${code}</span>
        ${isDisabled ? '<small>Coming Soon</small>' : '<span>&rarr;</span>'}
      </button>
    `;
  }
  
  html += '</div></div>';
  container.innerHTML = html;

  container.querySelectorAll('button:not(.disabled-soon)').forEach(btn => {
    btn.addEventListener('click', () => {
      const branch = btn.dataset.branch;
      if (!DATA[branch]) {
        showToast('Data for this branch is coming soon!');
        return;
      }
      onSelect(branch);
    });
  });
}
