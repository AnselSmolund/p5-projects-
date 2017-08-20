function Attractor(m,x,y,pr){
    this.position = createVector(x,y);
    this.mass = m; // kg
    this.G = 6; // gravitational constant
    this.pullRadius = pr;
    this.attraction = function(m){
        var force = p5.Vector.sub(this.position,m.position);
        var distance = force.mag();

        distance = constrain(distance,5,25);

        force.normalize();

        var strength = (this.G * this.mass * m.mass) / (distance * distance);

        force.mult(strength);
        return force;
    }
    this.show = function(){
        fill(127,127,0);
        ellipse(this.position.x,this.position.y,this.mass*2,this.mass*2);
    }
}
