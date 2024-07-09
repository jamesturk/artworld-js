import { Timer } from "./timer.js";

export class World {
  constructor() {
    this.ctx = null;
    this.drawables = [];
    this.backgroundColor = "white";
    this.timer = new Timer();
    this.targetFrameRate = 60;
    this.stepSize = 1000 / this.targetFrameRate;
    this.lastTick = this.timer.time();
  }

  bindCanvas(id) {
    this.ctx = document.getElementById(id).getContext("2d");
  }

  get width() {
    return this.ctx.canvas.width;
  }

  get height() {
    return this.ctx.canvas.height;
  }

  // TODO rename
  register(drawable) {
    this.drawables.push(drawable);
  }

  draw() {
    this.ctx.fillStyle = "white";
    this.ctx.beginPath();
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.fill();
    for (let d of this.drawables.sort((a, b) => a._z_index - b._z_index)) {
      d.draw();
    }
  }

  tick() {
    for (let d of this.drawables) {
      d.update();
    }
  }

  loopStep() {
    window.requestAnimationFrame(() => this.loopStep());

    let curTime = this.timer.time();
    // tick appropriate number of times
    while (curTime - this.lastTick > this.stepSize) {
      this.lastTick += this.stepSize;
      this.tick();
    }
    this.draw();
  }

  // Canvas 2D /////////////////

  prepareDraw(drawable) {
    this._stroke = false;
    this._fill = false;
    if (drawable._stroke) {
      this.ctx.lineWidth = drawable._strokeWeight;
      this.ctx.strokeStyle = drawable._stroke.toStr
        ? drawable._stroke.toStr()
        : drawable._stroke;
      this._stroke = true;
    } else if (drawable._fill) {
      this.ctx.fillStyle = drawable._fill.toStr
        ? drawable._fill.toStr()
        : drawable._fill;
      this._fill = true;
    }
  }

  drawLine(from, to) {
    this.ctx.beginPath();
    this.ctx.moveTo(from.x, from.y);
    this.ctx.lineTo(to.x, to.y);
    this.ctx.stroke();
  }

  drawArc(center, radius, fromAngle, toAngle) {
    this.ctx.beginPath();
    this.ctx.arc(center.x, center.y, radius, fromAngle, toAngle);
    if (this._stroke) this.ctx.stroke();
    if (this._fill) this.ctx.fill();
  }

  drawRect(center, width, height) {
    this.ctx.beginPath();
    this.ctx.rect(center.x - width / 2, center.y - height / 2, width, height);
    if (this._stroke) this.ctx.stroke();
    if (this._fill) this.ctx.fill();
  }

  drawPolygon(center, points) {
    this.ctx.beginPath();
    this.ctx.moveTo(center.x + points[0].x, center.y + points[0].y);
    for (let i = 1; i < points.length; i++) {
      this.ctx.lineTo(center.x + points[i].x, center.y + points[i].y);
    }
    this.ctx.lineTo(center.x + points[0].x, center.y + points[0].y);
    if (this._stroke) this.ctx.stroke();
    if (this._fill) this.ctx.fill();
  }
}

// singleton (for now)
export const artworld = new World();
