
var attractor;
var attractor2;
var mover;
var moving = false;
var attractors = [];
var mx;
var my;
var maxSpeed = 10;
var paths = [];
var painting = true;
var goal;
var score = 0;
var level = 0;
var lives = 5;
function setup(){
    createCanvas(windowWidth,windowHeight);
    attractors = [];
    for(var i = 0; i < 4; i++){
      var attr = new Attractor(random(10,40),random(width-300) + 150,random(height-300)+ 150,random(100,400));
      attractors.push(attr);
    }
    goal = new Goal(800,100);
    mover = new Mover();
    paths = [];

    background(51);
}


function draw(){

        background(51);
        for(var i = 0; i < attractors.length;i++){
            attractors[i].show();
            noFill();
            ellipse(attractors[i].position.x,attractors[i].position.y,attractors[i].pullRadius,attractors[i].pullRadius);

        }
        if(lives <= 0){
          textSize(72);
          fill(255,0,0);
          text("GAMEOVER", width/3,height/2);
          textSize(32);
          fill(255);
          text("Hit refresh to try again",width/2.2,height/1.4);
          noLoop();
        }
        textSize(32);
        fill(117,12,1);
        text("SCORE: " + score,width/4,height/10);
        text("LIVES: " + lives,width/12,height/10);
        goal.show();
        noFill();
        if(!mouseIsPressed && mover.velocity.x == 0){
            mover.position.x = mouseX;
            mover.position.y = mouseY;
        }
        if(!mouseIsPressed){

                var Fx = -0.5 * .47 * .1 * mover.velocity.x * mover.velocity.x * mover.velocity.x / Math.abs(mover.velocity.x);
                var Fy = -0.5 * .47 * .1 * mover.velocity.y * mover.velocity.y * mover.velocity.y / Math.abs(mover.velocity.y);

                Fx = (isNaN(Fx) ? 0 : Fx);
                Fy = (isNaN(Fy) ? 0 : Fy);
                var ax = Fx/ mover.mass;
                var ay = Fy/ mover.mass;

                mover.velocity.x += ax/60;
                mover.velocity.y +=ay/60;
                mover.position.x += mover.velocity.x*(1/60)*10;
                mover.position.y += mover.velocity.y*(1/60)*10;

                for(var i = 0; i < attractors.length;i++){
                  if(inSideCircle(attractors[i].position.x,attractors[i].position.y,mover.position.x,mover.position.y,attractors[i].pullRadius)){
                      mover.applyForce(attractors[i].attraction(mover));
                      paths.push(new Path(mover.position.x,mover.position.y));
                      //score++;
                  }
                }

                mx = mouseX;
                my = mouseY;

                for(var i = paths.length-1; i > 0; i--){
                    fill(127,0,0);
                    ellipse(paths[i].x,paths[i].y,5,5);
                }
        }
        if (mover.position.y > height + 20) {
            mover.position.x = mouseX;
            mover.position.y = mouseY;
            mover.velocity.mult(0);
            lives--;
            score = 0;

        }
        if (mover.position.y < -20) {
            mover.position.x = mouseX;
            mover.position.y = mouseY;
            mover.velocity.mult(0);
            lives--;
            score = 0;


        }
        if (mover.position.x > width + 20) {
               mover.position.x = mouseX;
            mover.position.y = mouseY;
            mover.velocity.mult(0);
            lives--;
            score = 0;

        }
        if (mover.position.x < -20) {
            mover.position.x = mouseX;
            mover.position.y = mouseY;
            mover.velocity.mult(0);
            lives--;
            score = 0;

        }
        for(var i = 0; i < attractors.length;i++){
          if(mouseIsPressed && inSideCircle(attractors[i].position.x,attractors[i].position.y,mouseX,mouseY,attractors[i].mass)){
            moving = true;
          }
          if(!mouseIsPressed){
            moving = false;
          }
        }
        for(var i = 0; i < attractors.length;i++){
          if(mouseIsPressed && !moving){
            mover.position.x = mx;
            mover.position.y = my;
            line(mouseX,mouseY,mover.position.x,mover.position.y);
            paths = [];

          }
        }

        if(paths.length>=100){
          paths.splice(1,1);
        }
        for(var i = 0; i < paths.length;i++){

            paths[i].show;
        }

        mover.show();
        mover.update();
        if(inSideCircle(mover.position.x,mover.position.y,goal.x,goal.y,goal.size)){
          score++;
          setup();
        }

}
function inSideCircle(xc,yc,xp,yp,r){
    var a = (xp - xc)*(xp - xc);
    var b = (yp - yc)*(yp - yc);
    var d = sqrt(a + b);
    return d < r/2;
}
function mouseReleased(){
    for(var i = 0; i< attractors.length;i++){
      if(!inSideCircle(attractors[i].position.x,attractors[i].position.y,mouseX,mouseY,attractors[i].mass)){;
      mover.velocity.y = (mover.position.y - mouseY)/10;
      mover.velocity.x = (mover.position.x- mouseX)/10;
    }
  }
}

function Path(x,y){
    this.x = x;
    this.y = y;
    this.show = function(){
        fill(255);
        ellipse(this.x,this.y,20,20);
    }
}

function Goal(x,y){
  this.x = x;
  this.y = y;

  this.size = 100;



  this.show = function(){
    fill(0);
    ellipse(this.x,this.y,this.size,this.size);
  }
}
