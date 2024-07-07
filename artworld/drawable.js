import { artworld } from "./world.js";
import { Vector2 } from "./math.js";
import { Color } from "./color.js";
import { Random } from "./random.js";

export class Drawable {
  constructor(parent) {
    this._parent = parent;
    this._updates = [];
    this._fill = parent ? parent._fill : null;
    this._stroke = parent ? parent._stroke : null;
    this._strokeWeight = parent ? parent._strokeWeight : null;
    this._z_index = parent ? parent._z_index : null;
    this._posVec = new Vector2(0, 0);
    if (this._parent) {
      this._parent.addChild(this);
    }
    artworld.register(this);
  }

  copy() {
    throw new Error("copy() must be implemented on child class");
  }

  draw() {
    throw new Error("draw() must be implemented on child class");
  }

  // do nothing by default
  update() {}

  // setters

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
    return this;
  }

  random() {
    this._posVec = new Vector2(
      Random.under(artworld.width),
      Random.under(artworld.height),
    );
    this._stroke = new Color(
      Random.under(360),
      Random.between(30, 60),
      Random.between(30, 60),
    );
    this._fill = new Color(
      Random.under(360),
      Random.between(30, 60),
      Random.between(30, 60),
    );
    return this;
  }

  // getters /////////////////////////////

  get worldPos() {
    // offset from parent if needed
    return this._parent
      ? this._parent.worldPos.add(this._posVec)
      : this._posVec;
  }
}

export class Group extends Drawable {
  constructor() {
    super();
    this._children = [];
  }

  copy() {
    // new empty group
    let newGroup = new Group();

    for (let child of this._children) {
      // make a copy of each child item
      // use child class copy, with forced override of group
      // this registers each one as a child of newGroup
      // as part of the copy behavior
      child.copy({ _parent: newGroup });
    }

    // attach own parent if present
    if (this._parent) {
      newGroup._parent = this._parent;
      newGroup._parent.addChild(newGroup);
    }

    return newGroup;
  }

  draw() {}

  addChild(drawable) {
    this._children.push(drawable);
    drawable._parent = this;
    return this;
  }

  fill(color) {
    for (let child of this._children) {
      child.fill(color);
    }
    return this;
  }

  stroke(color) {
    for (let child of this._children) {
      child.stroke(color);
    }
    return this;
  }

  strokeWeight(scalar) {
    for (let child of this._children) {
      child.strokeWeight(scalar);
    }
    return this;
  }
}
