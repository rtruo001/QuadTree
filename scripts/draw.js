class Draw {
  constructor() {
    this.app = document.getElementById('app');
  }

  drawPoint(x, y) {
    let point = document.createElement('div');
    point.style.position = 'absolute';
    point.style.left = `${x}px`;
    point.style.top = `${y}px`;
    point.style.width = '1px';
    point.style.height = '1px';
    point.style.border = '2px solid white';
    point.style.borderRadius = '50%';
    this.app.appendChild(point);
  }

  drawSquare(x, y, width) {
    let square = document.createElement("div");
    square.style.position = 'absolute';
    square.style.top = `${y - width/2}px`;
    square.style.left = `${x - width/2}px`;
    square.style.border = '1px dashed white';
    square.style.width = `${width}px`;
    square.style.height = `${width}px`;
    this.app.appendChild(square);
  }

  drawBoundaryBox(x, y, width) {
    let boundaryBox = document.createElement("div");
    boundaryBox.style.position = 'absolute';
    boundaryBox.style.top = `${y - width/2}px`;
    boundaryBox.style.left = `${x - width/2}px`;
    boundaryBox.style.border = '3px solid white';
    boundaryBox.style.width = `${width}px`;
    boundaryBox.style.height = `${width}px`;
    this.app.appendChild(boundaryBox);
  }
}