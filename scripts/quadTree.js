class QuadTree {
  constructor(capacity, width, middleX, middleY) {
    this.capacity = capacity;
    this.width = width;
    this.middleX = middleX;
    this.middleY = middleY;
    this.locations = [];
    // Quadrant are in the order of 1 2 3 4
    this.quadrants = [null, null, null, null];
    this.isLeaf = true;
    this.boundaryBox = null;

    const drawObj = new Draw();
    drawObj.drawSquare(this.middleX, this.middleY, this.width);
  }

  insertLocation(x, y) {
    // BUG: JUST TO NOTE, this insertLocation will infinitely create quads if the x and ys are in the same locations 
    // and hits the capacity.

    // Check if the current node is a leaf
    // If it is a leaf, just push it into locations
    if (this.isLeaf) {
      this.locations.push([x,y]);
    }

    // If the length of locations is more than capacity
    // Create 4 nodes from your node, as well as traverse through the nodes.
    if (this.isLeaf && this.locations.length >= this.capacity) {
      this.splitIntoQuads();
      return;
    }

    // If it isn't a leaf, choose the correct quadrant to insert the location.
    if (!this.isLeaf) {
      this.addLocationIntoCorrectQuadrant(x,y);
    }
  }

  splitIntoQuads() {
    this.isLeaf = false;
    this.quadrants = [new QuadTree(this.capacity, this.width/2, this.middleX + this.width/4, this.middleY - this.width/4), 
                      new QuadTree(this.capacity, this.width/2, this.middleX - this.width/4, this.middleY - this.width/4), 
                      new QuadTree(this.capacity, this.width/2, this.middleX - this.width/4, this.middleY + this.width/4), 
                      new QuadTree(this.capacity, this.width/2, this.middleX + this.width/4, this.middleY + this.width/4)];
    this.locations.forEach((point) => {
      let x = point[0]; let y = point[1];
      this.addLocationIntoCorrectQuadrant(x,y);
    });
    this.locations = [];
  }

  addLocationIntoCorrectQuadrant(x, y) {
    if (x >= this.middleX && y <= this.middleY) {
      this.quadrants[0].insertLocation(x,y);  
    }
    else if (x <= this.middleX && y <= this.middleY) {
      this.quadrants[1].insertLocation(x,y);
    }
    else if (x <= this.middleX && y >= this.middleY) {
      this.quadrants[2].insertLocation(x,y);
    }
    else if (x >= this.middleX && y >= this.middleY) {
      this.quadrants[3].insertLocation(x,y);
    }
    else {
      console.log("SHOULDN'T DO THIS");
    }
  }

  insertBoundaryBox(x, y, width) {
    const drawObj = new Draw();
    drawObj.drawBoundaryBox(x, y, width);
    const locationsInBoundaryBox = [];
    this.findAllLocationsInBoundaryBox(x,y,width, locationsInBoundaryBox);
    locationsInBoundaryBox.forEach((point) => {
      let text = document.createElement('h1');
      text.innerHTML = point.toString();
      document.getElementById('boundaryBoxInfo').appendChild(text);
    });
    return locationsInBoundaryBox;
  }

  findAllLocationsInBoundaryBox(boundaryX, boundaryY, boundaryWidth, locationsInBoundaryBox) {
    // If boundarybox doesn't intersect current quadrant, return
    if (!this.ifPointIsInContainer(this.middleX - this.width/2, this.middleY - this.width/2, boundaryX, boundaryY, boundaryWidth) &&
        !this.ifPointIsInContainer(this.middleX - this.width/2, this.middleY + this.width/2, boundaryX, boundaryY, boundaryWidth) &&
        !this.ifPointIsInContainer(this.middleX + this.width/2, this.middleY - this.width/2, boundaryX, boundaryY, boundaryWidth) &&
        !this.ifPointIsInContainer(this.middleX + this.width/2, this.middleY + this.width/2, boundaryX, boundaryY, boundaryWidth) &&
        !this.ifPointIsInContainer(boundaryX - boundaryWidth/2, boundaryY - boundaryWidth/2, this.middleX, this.middleY, this.width) &&
        !this.ifPointIsInContainer(boundaryX - boundaryWidth/2, boundaryY + boundaryWidth/2, this.middleX, this.middleY, this.width) &&
        !this.ifPointIsInContainer(boundaryX + boundaryWidth/2, boundaryY - boundaryWidth/2, this.middleX, this.middleY, this.width) &&
        !this.ifPointIsInContainer(boundaryX + boundaryWidth/2, boundaryY + boundaryWidth/2, this.middleX, this.middleY, this.width)) {
      return;
    }

    // When the boundarybox intersects quad and quad is not a leaf, then continue traversing down the quad tree
    if (!this.isLeaf) {
      this.quadrants[0].findAllLocationsInBoundaryBox(boundaryX, boundaryY, boundaryWidth, locationsInBoundaryBox);
      this.quadrants[1].findAllLocationsInBoundaryBox(boundaryX, boundaryY, boundaryWidth, locationsInBoundaryBox);
      this.quadrants[2].findAllLocationsInBoundaryBox(boundaryX, boundaryY, boundaryWidth, locationsInBoundaryBox);
      this.quadrants[3].findAllLocationsInBoundaryBox(boundaryX, boundaryY, boundaryWidth, locationsInBoundaryBox);
    }
    // If quadrant is a leaf
    else {
      this.locations.forEach((point) => {
        if (this.ifPointIsInContainer(point[0],point[1],boundaryX,boundaryY,boundaryWidth)) {
          locationsInBoundaryBox.push(point);
        }
      })
    }
  }

  ifPointIsInContainer(x, y, boundaryX, boundaryY, boundaryWidth) {
    if (x <= boundaryX + boundaryWidth/2 && y >= boundaryY - boundaryWidth/2 &&
        x >= boundaryX - boundaryWidth/2 && y >= boundaryY - boundaryWidth/2 &&
        x >= boundaryX - boundaryWidth/2 && y <= boundaryY + boundaryWidth/2 &&
        x <= boundaryX + boundaryWidth/2 && y <= boundaryY + boundaryWidth/2)
      return true;
    else
      return false;
  }
}
