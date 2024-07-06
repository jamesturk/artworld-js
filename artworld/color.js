export class Color {
  static defaultColorMode = "hsl";

  constructor(p1, p2, p3, alpha = 1, mode = null) {
    this.mode = mode || Color.defaultColorMode;
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.alpha = alpha;
  }

  toStr() {
    return `${this.mode}(${this.p1} ${this.p2} ${this.p3} / ${this.alpha})`;
  }

  adjustHue(delta) {
    this.p1 += delta;
  }

  adjustSat(delta) {
    this.p2 += delta;
  }

  adjustLum(delta) {
    this.p3 += delta;
  }

  adjustAlpha(delta) {
    this.alpha += alpha;
  }
}

// Palette Source: https://pico-8.fandom.com/wiki/Palette
export const Pico8 = {
  BLACK: "rgb(0, 0, 0)",
  DARK_BLUE: "rgb(29, 43, 83)",
  PURPLE: "rgb(126, 37, 83)",
  DARK_GREEN: "rgb(0, 135, 81)",
  BROWN: "rgb(171, 82, 54)",
  DARK_GREY: "rgb(95, 87, 79)",
  LIGHT_GREY: "rgb(194, 195, 199)",
  WHITE: "rgb(255, 241, 232)",
  RED: "rgb(255, 0, 77)",
  ORANGE: "rgb(255, 163, 0)",
  YELLOW: "rgb(255, 236, 39)",
  GREEN: "rgb(0, 228, 54)",
  BLUE: "rgb(41, 173, 255)",
  LAVENDER: "rgb(131, 118, 156)",
  PINK: "rgb(255, 119, 168)",
  LIGHT_PEACH: "rgb(255, 204, 170)",
};
