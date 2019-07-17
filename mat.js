export class Matrix2x2 {
  constructor(cssString) {
    let contents = cssString.substring(cssString.indexOf('(') + 1).replace(')', '');
    contents = contents.split(', ');
    this.x = parseFloat(contents[contents.length - 2]);
    this.y = parseFloat(contents[contents.length - 1]);
  }

  translate(x, y) {
    this.x += x;
    this.y += y;
  }

  getCssString() {
    return `matrix(1, 0, 0, 1, ${this.x}, ${this.y})`;
  }
}
