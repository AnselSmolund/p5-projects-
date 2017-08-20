function Mover(){
    this.position = createVector(100,130);
    this.velocity = createVector(2,0);
    this.acceleration = createVector(0,0);
    this.mass = .8;
    this.restitution = -.7;
    this.color = (random(255))

    this.applyForce = function(force){
        var f = p5.Vector.div(force,this.mass);
        this.acceleration.add(f);
    }
    this.update = function(){
        this.velocity.add(this.acceleration);
        this.velocity.limit(maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.color++;
        if(this.color > 240){
            this.color = 0;
        }
    }
    this.show = function(){
        fill(255);
        ellipse(this.position.x,this.position.y,this.mass*20,this.mass*20);
    }
}
