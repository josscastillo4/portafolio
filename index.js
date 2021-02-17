
function World(width, height) {
  // save our custom size or use default value
  this.width = width || 300;
  this.height = height || 300;
  this.balls = [];
  // private constructor function, pixel xy and radius of circle
  
  function Ball(x, y, rad) {
    // save or use default
    this.x = x || 0;
    this.y = y || 0;
    this.rad = rad || 25;
    // Velocity
    this.velX = Math.random() * 3 - Math.random() * 3;
    this.velY = Math.random() * 2.6 - Math.random() * 2.6;
    this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
  
  // fill the balls array, using the private constructor
  while (this.balls.length < 8) {
    this.balls.push(new Ball(
      Math.random() * this.width, // x
      Math.random() * this.height, // y
      Math.random() * 12 // radius, ball's size
    ));
  }
  this.update = function() {
    // iterate over each ball
    for (let b in this.balls) {
      // shortcut variable
      let ball = this.balls[b];
      // reverse velocity when out of bounds
      if (ball.x < 0 || ball.x > width) {        
        ball.velX = -ball.velX;
      }
      if (ball.y < 0 || ball.y > height) {
        ball.velY = -ball.velY;
      }
      // apply velocity
      ball.x += ball.velX;
      ball.y += ball.velY;
    }
  };
}
  
// create a new world using the constructor, and prepare the canvas and drawing context
let world = new World(window.innerWidth, window.innerHeight),
  // canvas = document.body.appendChild(document.createElement("canvas")),
  canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d');
  // Size the canvas to the world
canvas.width = world.width;
canvas.height = world.height;
// Now we can finally get down how to draw things using canvas!
function draw() {
  // now clear the frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);
    
  // iterate each ball
  for (let b in world.balls) {
    // shortcut
    let ball = world.balls[b];
      
    // set fill color to the balls random color
    ctx.fillStyle = ball.color;
      
    // begin a new "line"
    ctx.beginPath();
    ctx.arc(
      ball.x, // center x
      ball.y, // center y
      ball.rad, // radius of circle
      0, // arc start - 3 o'clock
      2 * Math.PI // arc end - 100%
    );
    // fill the path we just created, and close it
    ctx.fill();
  }
}
  
// This is our animation loop by using requestAnimationFrame, it will be called over and over as quickly as possible 
function animate() {
  // update the world
  world.update();
    
  // draw the world
  draw();
    
  // set up the next frame
  requestAnimationFrame(animate);
}
  
animate();

