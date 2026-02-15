import { PROGRESS_LABELS } from '../config/constants.js';

export function updateProgress(step) {
  const indicator = document.getElementById('progress-indicator');
  if (indicator) {
    indicator.textContent = PROGRESS_LABELS[step] || '';
  }
}

export function getProgressLabel(step) {
  return PROGRESS_LABELS[step] || '';
}
