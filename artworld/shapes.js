import { Vector2 } from "./math.js";
import { Drawable } from "./drawable.js";
import { Random } from "./random.js";

export class Line extends Drawable {
  constructor(parent) {
    super(parent);
    this._offsetVec = new Vector2(10, 0);
  }

  draw() {
    artworld.setStrokeColor(this._stroke);
    artworld.setStrokeWeight(this._strokeWeight);
    artworld.drawLine(this.worldPos, this.worldPos.add(this._offsetVec));
  }

  to(vec) {
    this._offsetVec = vec;
    return this;
  }

  angle(angle) {
    let mag = this._offsetVec.magnitude;
    return this.to(Vector2.polar(mag, angle));
  }
}

export class Arc extends Drawable {
  constructor(parent) {
    super(parent);
    this._r = 25;
    this._startAngle = 0;
    this._endAngle = 180;
  }

  draw() {
    artworld.setStrokeColor(this._stroke);
    artworld.setStrokeWeight(this._strokeWeight);
    artworld.setFillColor(this._fill);
    artworld.drawArc(this.worldPos, this._r, this._startAngle, this._endAngle);
  }

  radius(scalar) {
    this._r = scalar;
    return this;
  }
  startAngle(rad) {
    this._startAngle = rad;
    return this;
  }
  endAngle(rad) {
    this._endAngle = rad;
    return this;
  }
}

export class Circle extends Drawable {
  constructor(parent) {
    super(parent);
    this._r = 25;
  }

  draw() {
    artworld.setStrokeColor(this._stroke);
    artworld.setStrokeWeight(this._strokeWeight);
    artworld.setFillColor(this._fill);
    artworld.drawArc(this.worldPos, this._r, 0, 360);
  }

  radius(scalar) {
    this._r = scalar;
    return this;
  }
}

export class Rect extends Drawable {
  constructor(parent) {
    super(parent);
    this._width = 50;
    this._height = 50;
  }

  random(range) {
    super.random();
    this._width = Random.between(20, range);
    this._height = Random.between(20, range);
    return this;
  }

  draw() {
    artworld.setStrokeColor(this._stroke);
    artworld.setStrokeWeight(this._strokeWeight);
    artworld.setFillColor(this._fill);
    artworld.drawRect(this.worldPos, this._width, this._height);
  }

  size(w, h) {
    this._width = w;
    this._height = h;
    return this;
  }

  width(scalar) {
    this._width = scalar;
    return this;
  }

  height(scalar) {
    this._height = scalar;
    return this;
  }

  // TODO
  // contains(x, y) {
  //   return (
  //     x > this.x &&
  //     x < this.x + this._width &&
  //     y > this.y &&
  //     y < this.pos.y + this._height
  //   );
  // }
}
