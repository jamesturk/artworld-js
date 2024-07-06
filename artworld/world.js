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
    for (let d of this.drawables.sort((a, b) => a._z_index - b._z_index)) {
      d.draw();
    }
  }

  // Canvas 2D /////////////////

  prepareDraw(drawable) {
    this._stroke = false;
    this._fill = false;
    if (drawable._stroke) {
      this.ctx.lineWidth = drawable._strokeWidth;
      this.ctx.strokeStyle = drawable._stroke.toStr
        ? drawable._stroke.toStr()
        : drawble._stroke;
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
}

// singleton (for now)
export const artworld = new World();
