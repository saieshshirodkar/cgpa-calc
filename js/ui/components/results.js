import { hasPassed, getGradeLetter, getGradePoint } from '../../utils/grades.js';
import { formatNumber } from '../../utils/helpers.js';

export function renderResults(container, sgpa, branch, sem, subjects, marks, onBack, onChangeBranch, onRestart) {
  if (!container) {
    console.error('Container element is required for renderResults');
    return;
  }
  
  if (typeof sgpa !== 'number' || isNaN(sgpa)) {
    console.error('Invalid SGPA value:', sgpa);
    sgpa = 0;
  }
  
  const passed = hasPassed(sgpa);

  let breakdownHtml = `
    <div style="margin: 1.5rem 0; text-align: left; border-top: 1px solid #333; border-bottom: 1px solid #333;">
      <div style="display: flex; padding: 0.5rem 0; color: #666; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em;">
        <div style="flex: 3; text-align: left;">Subject</div>
        <div style="flex: 1; text-align: center;">Marks</div>
        <div style="flex: 1; text-align: right;">Crds</div>
        <div style="flex: 1; text-align: right;">Grd</div>
      </div>
  `;

  subjects.forEach(sub => {
    if (!sub || typeof sub !== 'object') return;
    
    const credits = parseFloat(sub.credits);
    if (isNaN(credits) || credits <= 0) return;

    const mark = marks?.[sub.code];
    if (mark === undefined || mark === null || isNaN(parseFloat(mark))) {
      return;
    }
    
    const numericMark = parseFloat(mark);
    const maxMarks = sub.max !== undefined ? parseFloat(sub.max) : (credits * 25);
    
    if (isNaN(maxMarks) || maxMarks <= 0) return;
    
    const percentage = (numericMark / maxMarks) * 100;
    const letter = getGradeLetter(percentage);
    const gradePoint = getGradePoint(percentage);

    const gradeColors = {
      10: '#4ade80', 9: '#22d3ee', 8: '#60a5fa', 7: '#a78bfa',
      6: '#f472b6', 5: '#fb923c', 0: '#ef4444'
    };

    const gradeColor = gradeColors[gradePoint] || '#fff';

    breakdownHtml += `
      <div style="display: flex; padding: 0.75rem 0; border-top: 1px solid #1a1a1a; font-size: 0.85rem;">
        <div style="flex: 3; color: #fff; font-family: monospace;">${sub.short || sub.code}</div>
        <div style="flex: 1; text-align: center; color: #ccc;">${mark}</div>
        <div style="flex: 1; text-align: right; color: #666;">${sub.credits}</div>
        <div style="flex: 1; text-align: right; font-weight: 600; color: ${gradeColor};">${letter}</div>
      </div>
    `;
  });
  
  breakdownHtml += '</div>';

  container.innerHTML = `
    <div class="step" id="result-step" style="text-align: center; padding: 1rem 0;">
      <div id="score-card" style="padding: 2rem; background: linear-gradient(135deg, #0a0a0a 0%, #050505 100%); border: 1px solid #1a1a1a; border-radius: 8px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);">
        <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom: 0.5rem;">
          <div style="text-align:left;">
            <span style="display:block; font-size: 0.8rem; color: #666; text-transform: uppercase;">Semester ${sem}</span>
            <span style="display:block; font-size: 0.6rem; color: #444;">${branch}</span>
          </div>
          <div style="text-align:right;">
            ${passed 
              ? `<span style="font-size: 3rem; font-weight: 700; color: #fff; line-height: 1; animation: scorePop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);">${formatNumber(sgpa)}</span>`
              : '<span style="font-size: 3rem; font-weight: 700; color: #ef4444; line-height: 1; animation: scorePop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);">FAIL</span>'
            }
          </div>
        </div>
        ${breakdownHtml}
      </div>

      <div style="margin-top: 2rem; display: flex; flex-direction: column; gap: 1rem;">
        <button class="secondary back-btn">Back to Marks</button>
        <div style="display: flex; gap: 1rem;">
          <button class="secondary change-branch-btn" style="flex: 1;">Change Branch</button>
          <button class="secondary restart-btn" style="flex: 1;">Start Over</button>
        </div>
      </div>
    </div>
  `;

  container.querySelector('.back-btn').addEventListener('click', onBack);
  container.querySelector('.change-branch-btn').addEventListener('click', onChangeBranch);
  container.querySelector('.restart-btn').addEventListener('click', onRestart);
}
