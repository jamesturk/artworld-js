export const TO_RADIANS = 180 / Math.PI;

export class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(other) {
    return Vector2(this.x + other.x, this.y + other.y);
  }

  sub(other) {
    return Vector2(this.x - other.x, this.y - other.y);
  }

  scale(s) {
    return Vector2(s * this.x, s * this.y);
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
    return Vector2(x * cos(theta), y * sin(theta));
  }

  static polar(mag, angle) {
    return Vector2(mag * Math.cos(angle), mag * Math.sin(angle));
  }
}
