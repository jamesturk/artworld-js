import { Vector2 } from "./math.js";
import { Drawable } from "./drawable.js";

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
