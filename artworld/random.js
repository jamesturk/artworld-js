export class Random {
  static chance(odds) {
    return Math.random() < odds;
  }

  static under(num) {
    let n = Math.random() * num;
    return n;
  }

  static between(lo, hi) {
    let n = Math.random() * (hi - lo) + lo;
    return n;
  }

  static radians() {
    return Math.random() * Math.PI * 2;
  }
}
