export class Random {
  static chance(odds) {
    return Math.random() < odds;
  }
}
