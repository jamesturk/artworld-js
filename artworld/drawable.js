import { Vector2 } from "./math.js";
import { artworld } from "./world.js";

export class Drawable {
  constructor(parent) {
    this._parent = parent;
    this._updates = [];
    this._fill = parent ? parent._fill : null;
    this._stroke = parent ? parent._stroke : null;
    this._strokeWeight = parent ? parent._strokeWeight : null;
    this._z_index = parent ? parent._z_index : null;
    this._posVec = new Vector2(0, 0);
    this._register();
  }

  _register() {
    if (this._parent) {
      this._parent.push(this);
    }
    artworld.register(this);
  }

  copy() {
    let obj = Object.assign({}, this);
    obj._register();
    return obj;
  }

  fill(color) {
    this._fill = color;
    return this;
  }

  stroke(color) {
    this._stroke = color;
    return this;
  }

  strokeWeight(scalar) {
    this._strokeWeight = scalar;
    return this;
  }

  pos(vec) {
    this._posVec = vec;
    return this;
  }

  x(scalar) {
    this._posVec.x = scalar;
    return this;
  }

  y(scalar) {
    this._posVec.y = scalar;
    return this;
  }

  z(scalar) {
    this._z_index = scalar;
    return this;
  }

  // Modifiers ///////////////////////////

  move(byVec) {
    this._posVec = this._posVec.add(byVec);
  }

  // TODO random()
  // TODO draw() abstract

  // getters /////////////////////////////

  get worldPos() {
    return this._parent ? this._parent.worldPos.add(this._pos) : this._pos;
  }
}

export class Group extends Drawable {
  constructor() {
    super();
    this._children = [];
  }

  copy() {
    let newobj = super.copy();
    for (let child of this._children) {
      let ccopy = Object.assign({}, child);
      ccopy._parent = newobj;
      ccopy._register();
    }
    return newobj;
  }

  add(drawable) {
    this._children.push(drawable);
    drawable._parent = this;
    return this;
  }
}
