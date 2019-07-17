export class Matrix2x2 {
  constructor(cssString) {
    let contents = cssString.substring(cssString.indexOf('(') + 1).replace(')', '');
    contents = contents.split(', ');
    this.x = parseFloat(contents[4]);
    this.y = parseFloat(contents[5]);

    // atan2(c, a) to get angle
    this.angle = Math.atan2(parseFloat(contents[2]), parseFloat(contents[0]));
  }

  translate(x, y) {
    this.x += x;
    this.y += y;
  }

  rotate(angle) {
    this.angle += angle;
  }

  translateWithAngle(forwardAmount) {
    // X and Y are flipped because truck starts facing up, not right
    this.x += forwardAmount * Math.sin(this.angle);
    this.y += forwardAmount * Math.cos(this.angle);
  }

  getCssString() {
    let c = Math.cos(this.angle);
    let s = Math.sin(this.angle);
    return `matrix(${c}, ${-s}, ${s}, ${c}, ${this.x}, ${this.y})`;
  }
}
