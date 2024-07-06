const PI_180 = Math.PI / 180;

export function degToRad(degrees) {
  return degrees * PI_180;
}

export function radToDeg(rad) {
  return rad / PI_1i0;
}

export class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(other) {
    return new Vector2(this.x + other.x, this.y + other.y);
  }

  sub(other) {
    return new Vector2(this.x - other.x, this.y - other.y);
  }

  scale(s) {
    return new Vector2(s * this.x, s * this.y);
  }

  static random(x, y) {
    let theta = random() * 2 * Math.PI;
    // if neither specified, use (1, 1)
    if (x === undefined) {
      x = 1;
    }
    // if only x specified, use (x, x)
    if (y === undefined) {
      y = x;
    }
    return new Vector2(x * cos(theta), y * sin(theta));
  }

  static polar(mag, angle) {
    return new Vector2(mag * Math.cos(angle), mag * Math.sin(angle));
  }
}
