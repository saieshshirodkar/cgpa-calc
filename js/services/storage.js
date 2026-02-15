import { CONSTANTS } from '../config/constants.js';

class StorageService {
  save(state) {
    localStorage.setItem(CONSTANTS.STORAGE_KEY, JSON.stringify(state));
  }

  load() {
    const saved = localStorage.getItem(CONSTANTS.STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('State recovery failed:', e);
        this.clear();
        return null;
      }
    }
    return null;
  }

  clear() {
    localStorage.removeItem(CONSTANTS.STORAGE_KEY);
  }
}

const storage = new StorageService();

export { StorageService, storage };
