import { Vector2 } from "./math.js";
import { Drawable } from "./drawable.js";
import { Random } from "./random.js";

function makeCopy(Cls, obj, override) {
  // make new object, will be registered with world, but no _parent yet
  let newObj = new Cls();
  // overwrite fields of newObj with obj
  Object.assign(newObj, obj, override);
  // attach to parent
  if (newObj._parent) {
    newObj._parent.addChild(newObj);
  }
  return newObj;
}

export class Line extends Drawable {
  constructor(parent) {
    super(parent);
    this._offsetVec = new Vector2(10, 0);
  }

  copy(overrides) {
    return makeCopy(Line, this, overrides);
  }

  random(range = 100) {
    super.random();
    this._offsetVec = Vector2.random(range, range);
    return this;
  }

  draw() {
    artworld.prepareDraw(this);
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

  copy(overrides) {
    return makeCopy(Arc, this, overrides);
  }

  random(range = 100) {
    super.random();
    this._r = Random.between(20, range);
    this._startAngle = Random.radians();
    this._endAngle = Random.radians();
    return this;
  }
  draw() {
    artworld.prepareDraw(this);
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
  copy(overrides) {
    return makeCopy(Circle, this, overrides);
  }

  random(range = 100) {
    super.random();
    this._r = Random.between(20, range);
    return this;
  }

  draw() {
    artworld.prepareDraw(this);
    artworld.drawArc(this.worldPos, this._r, 0, 2 * Math.PI);
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

  random(range = 100) {
    super.random();
    this._width = Random.between(20, range);
    this._height = Random.between(20, range);
    return this;
  }
  copy(overrides) {
    return makeCopy(Rect, this, overrides);
  }

  draw() {
    artworld.prepareDraw(this);
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

export class Polygon extends Drawable {
  constructor(parent) {
    super(parent);
    this._points = [];
  }

  random(n = 7) {
    super.random();
    let points = [];
    let i;
    // generate points
    for (i = 0; i < n; i++) {
      points.push(
        new Vector2(Random.between(50, 200), Random.between(50, 200)),
      );
    }
    // sort points by distance for mostly convex (but not always) polygons
    this._points.push(points.shift()); // take first element
    while (points.length) {
      let closestIdx = 0;
      let closestDist = 999999999;
      let dist;
      for (let j = 0; j < points.length; j++) {
        dist = this._points[this._points.length - 1].distance(points[j]);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = j;
        }
      }
      this._points.push(points[closestIdx]);
      points.splice(closestIdx, 1);
    }

    return this;
  }

  copy(overrides) {
    return makeCopy(Polygon, this, overrides);
  }

  draw() {
    artworld.prepareDraw(this);
    artworld.drawPolygon(this.worldPos, this._points);
  }

  point(vector, to_modify = null) {
    if (to_modify !== null) {
      this._points[to_modify] = vector;
    } else {
      this._points.push(point);
    }
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
