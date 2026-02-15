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
    const state = { view, ...data, timestamp: Date.now() };
    this.navigationStack.push(state);
    history.pushState(state, '', '');
  }

  back() {
    history.back();
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
    history.pushState(null, '', window.location.pathname);
  }

  init() {
    window.addEventListener('popstate', (e) => this.handlePopState(e));
  }
}

const router = new Router();

export { Router, router };
