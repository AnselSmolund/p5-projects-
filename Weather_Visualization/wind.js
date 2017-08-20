var rectWidth, rectHeight;
var xSpeed, ySpeed;

function wind(direction,speed){
  if(direction == 'N'){
    this.x = random(-500,500);
    this.y = random(-2000);
    rectWidth = 5;
    rectHeight = 20;
    ySpeed = speed;
    xSpeed = 0;
  }
  if(direction == 'S'){
    this.x = random(-500,500);
    this.y = random(2000);
    rectWidth = 5;
    rectHeight = 20;
    ySpeed = -speed;
    xSpeed = 0;
  }
  if(direction == 'W'){
    this.x = random(-2000);
    this.y = random(height)-height/2;
    rectWidth = 20;
    rectHeight = 5;
    xSpeed = speed;
    ySpeed = 0;
}
if(direction == 'E'){
  this.x = random(0,1000);
  this.y = random(height)-height/2;
  rectWidth = 20;
  rectHeight = 5;
  xSpeed = -speed;
  ySpeed = 0;
}


    this.show = function(){

      fill(100,100,100,0);
      rect(this.x,this.y, rectWidth,rectHeight);
    }
    this.update = function(){
      if(this.x > width && direction == 'W'){
        this.x*=-1;
      }
      if(this.x < -512 && direction == 'E'){
        this.x*=-1;
      }
      if(this.y > height && direction == 'N'){
        this.y*=-1;
      }
      if(this.y < -256 && direction == 'S'){
        this.y*=-1;
      }
        this.x+=xSpeed;
        this.y+=ySpeed;


    }


}
