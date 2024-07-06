export class World {
  constructor() {
    this.drawables = [];
    this.ctx = null;
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
    if (color && color.toStr) this.ctx.strokeStyle = color.toStr();
    else this.ctx.strokeStyle = color;
  }

  setFillColor(color) {
    if (color && color.toStr) this.ctx.fillStyle = color.toStr();
    else this.ctx.fillStyle = color;
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
    this.ctx.stroke();
    this.ctx.fill();
  }

  drawRect(center, width, height) {
    this.ctx.beginPath();
    this.ctx.rect(center.x - width / 2, center.y - height / 2, width, height);
    this.ctx.fill();
    this.ctx.stroke();
  }
}

// singleton (for now)
export const artworld = new World();
