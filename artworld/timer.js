export class Timer {
  constructor() {
    this._pausedAt = null;
    this._elapsed = 0;
    this._lastStarted = performance.now();
  }

  pause() {
    if (!this.isPaused) {
      this._pausedAt = performance.now();
      // store time since last pause
      this._elapsed += this._pausedAt - this._lastStarted;
    }
  }

  unpause() {
    if (this.isPaused) {
      this.lastStarted = performance.now();
      this._pausedAt = null;
    }
  }

  get isPaused() {
    return this._pausedAt !== null;
  }

  time() {
    if (this.isPaused) {
      return this._elapsed;
    } else {
      return this._elapsed + (performance.now() - this._lastStarted);
    }
  }
}
