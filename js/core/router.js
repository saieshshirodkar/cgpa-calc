import { STEPS } from '../config/constants.js'; 

class Router {
  constructor() {
    this.navigationStack = [];
    this.isNavigating = false;
    this.handlers = {};
  }

  on(view, handler) {
    this.handlers[view] = handler;
  }

  push(view, data = {}) {
    if (this.isNavigating) return;
    if (!view || typeof view !== 'string') {
      console.error('Invalid view provided to router.push:', view);
      return;
    }
    const state = { view, ...data, timestamp: Date.now() };
    this.navigationStack.push(state);
    try {
      history.pushState(state, '', '');
    } catch (e) {
      console.error('Failed to push state:', e);
    }
  }

  back() {
    try {
      history.back();
    } catch (e) {
      console.error('Failed to go back:', e);
    }
  }

  handlePopState(event) {
    this.isNavigating = true;
    
    if (event.state && event.state.view && this.handlers[event.state.view]) {
      this.handlers[event.state.view](event.state);
    }
    
    setTimeout(() => { this.isNavigating = false; }, 100);
  }

  clear() {
    this.navigationStack = [];
    try {
      history.pushState(null, '', window.location.pathname);
    } catch (e) {
      console.error('Failed to clear history state:', e);
    }
  }

  init() {
    window.addEventListener('popstate', (e) => this.handlePopState(e));
  }
}

const router = new Router();

export { Router, router };
