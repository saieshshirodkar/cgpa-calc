import { PROGRESS_LABELS } from '../config/constants.js';

export function updateProgress(step) {
  if (!step || typeof step !== 'string') {
    console.warn('Invalid step provided to updateProgress:', step);
    return;
  }
  
  const indicator = document.getElementById('progress-indicator');
  if (indicator) {
    indicator.textContent = PROGRESS_LABELS[step] || '';
  }
}

export function getProgressLabel(step) {
  return PROGRESS_LABELS[step] || '';
}
