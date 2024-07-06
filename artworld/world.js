export class World {
  constructor() {
    this.drawables = [];
    this.ctx = null;
  }

  bindCanvas(id) {
    this.ctx = document.getElementById(id).getContext("2d");
  }

  register(drawable) {
    this.drawables.push(drawable);
  }

  draw() {
    for (let d of this.drawables) {
      d.draw();
    }
  }

  // Canvas 2D /////////////////

  setStrokeWeight(scalar) {
    this.ctx.lineWidth = scalar;
  }

  setStrokeColor(color) {
    this.ctx.strokeStyle = color.toStr();
  }

  setFillColor(color) {
    this.ctx.fillStyle = color.toStr();
  }

  fillRect(rect) {
    this.ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  }

  strokeRect(rect) {
    this.ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  }

  drawLine(from, to) {
    this.ctx.beginPath();
    this.ctx.moveTo(from.x, from.y);
    this.ctx.lineTo(to.x, to.y);
    this.ctx.stroke();
  }
}

// singleton (for now)
export const artworld = new World();
