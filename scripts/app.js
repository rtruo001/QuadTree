const app = {
  'quadTree': null,
  'drawObj': null
};
(function(app) {
  console.log("Hello World");
  const drawObj = new Draw();
  // let size = window.innerWidth-3;
  let size = 800;
  const quadTree = new QuadTree(3, size, size/2, size/2);
  document.getElementById('boundaryBoxInfo').style.marginTop = `${size}px`;
  document.getElementById('app').addEventListener('click', (event) => {
    drawObj.drawPoint(event.x,event.y);
    quadTree.insertLocation(event.x, event.y); 
  });
  app['quadTree'] = quadTree;
  app['drawObj'] = drawObj;
}(app));
console.log(app);

// quadTree.insertBoundaryBox(200, 400, 300);
