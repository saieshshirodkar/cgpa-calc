import { calculator } from '../services/calculator.js';

let toastTimeout;

export function showToast(msg, duration = 2000, type = 'normal') {
  clearTimeout(toastTimeout);
  
  const toastBox = document.getElementById('toast-box');
  const existingToasts = toastBox.querySelectorAll('.toast');
  existingToasts.forEach(t => t.remove());
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerText = msg;
  toastBox.appendChild(toast);

  toastTimeout = setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  }, 10);

  toastTimeout = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

export function shakeInput(el) {
  el.style.borderColor = '#ff4444';
  el.classList.add('shake');
  setTimeout(() => {
    el.style.borderColor = '';
    el.classList.remove('shake');
  }, 500);
}

export function getGradePoint(percentage) {
  return calculator.getGradePoint(percentage);
}

export function getGradeLetter(percentage) {
  return calculator.getGradeLetter(percentage);
}

export function formatNumber(num, decimals = 2) {
  return num.toFixed(decimals);
}

export function createToastContainer() {
  const toastBox = document.createElement('div');
  toastBox.id = 'toast-box';
  document.body.appendChild(toastBox);
  return toastBox;
}
