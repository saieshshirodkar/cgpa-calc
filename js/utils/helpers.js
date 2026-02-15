import { calculator } from '../services/calculator.js';

let toastTimeout;

export function showToast(msg, duration = 2000, type = 'normal') {
  clearTimeout(toastTimeout);
  
  const toastBox = document.getElementById('toast-box');
  if (!toastBox) {
    console.warn('Toast container not found, message:', msg);
    return;
  }
  
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
  if (!el || !(el instanceof HTMLElement)) {
    console.warn('Invalid element provided to shakeInput');
    return;
  }
  
  el.style.borderColor = '#ff4444';
  el.classList.add('shake');
  setTimeout(() => {
    if (el && el.style) {
      el.style.borderColor = '';
    }
    if (el && el.classList) {
      el.classList.remove('shake');
    }
  }, 500);
}

export function getGradePoint(percentage) {
  return calculator.getGradePoint(percentage);
}

export function getGradeLetter(percentage) {
  return calculator.getGradeLetter(percentage);
}

export function formatNumber(num, decimals = 2) {
  if (num === null || num === undefined || isNaN(num) || !isFinite(num)) {
    return '0.00';
  }
  return num.toFixed(decimals);
}

export function createToastContainer() {
  const existingToastBox = document.getElementById('toast-box');
  if (existingToastBox) {
    return existingToastBox;
  }
  
  if (!document.body) {
    console.error('Document body not available for toast container');
    return null;
  }
  
  const toastBox = document.createElement('div');
  toastBox.id = 'toast-box';
  document.body.appendChild(toastBox);
  return toastBox;
}
