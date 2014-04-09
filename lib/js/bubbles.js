// Create a physics instance which uses the Verlet integration method
var physics = new Physics();
physics.integrator = new Verlet();

// Design some behaviours for particles
var avoidMouse = new Attraction();
var gravity = new ConstantForce(new Vector(0, $(window).height()));
var minVector = new Vector(0, 0)
var maxVector = new Vector($(window).width(),$(window).height())
var edge = new EdgeBounce(minVector, maxVector)

// Allow particle collisions to make things interesting
var collision = new Collision()

// Use Sketch.js to make life much easier
var example = Sketch.create({ container: document.body });

particles = []
example.setup = function() {
    

    for ( var i = 0; i < 2; i++ ) {
        example.addNew();
    }
                
    avoidMouse.setRadius( 60 );
    avoidMouse.strength = -300000;
    
    example.fillStyle = 'transparent';
    example.globalAlpha = 0.5;
}

example.addNew = function() {
    // Create a particle
    var particle = new Particle( 0.5 );
    particles.push(particle);
    var position = new Vector( 15 + random(50) , this.height - 15 + random(10));
    particle.setRadius(3 + random(15));
    particle.setMass(1000 / particle.radius);
    particle.moveTo( position );

    // Make it collidable
    collision.pool.push( particle );

    // Apply behaviours
    particle.behaviours.push( avoidMouse, gravity, edge, collision );

    // Add to the simulation
    physics.particles.push( particle );
}

example.draw = function() {

    // Step the simulation
    physics.step();

    // Render particles
    for ( var i = 0, n = physics.particles.length; i < n; i++ ) {

        var particle = physics.particles[i];
        example.beginPath();
     //    example.arc( particle.pos.x, particle.pos.y, particle.radius, 0, Math.PI * 2 );
        // example.fillStyle = 'transparent';
     //    example.fill();
        example.arc( particle.pos.x, particle.pos.y, particle.radius + 6, 0, Math.PI * 2);
        example.strokeStyle = '#eee';
        example.stroke()
    }
}

example.mousemove = function() {
    avoidMouse.target.x = example.mouse.x;
    avoidMouse.target.y = example.mouse.y;
}

$(document).ready(function() {
    function addNew() {
        if (physics.particles.length < 500)
            example.addNew();
    }

    setInterval(addNew, 100);
});

// $(window).click(function() {
//  var yc = 0;
    
//     for ( var i = 0, n = physics.particles.length; i < n; i += 2 ) {
//      yc += 5;
//      xc1 = 400 + 50 * Math.sin(yc/50);
//      xc2 = 400 + 50 * Math.sin(yc/50 - 1.57)

//      var p1 = physics.particles[i];
//      a1 = new Attraction(new Vector(xc1,yc), 10000, 100);
//      p1.behaviours.splice($.inArray(gravity,p1.behaviours),1);
//      p1.behaviours.splice($.inArray(collision,p1.behaviours),1);
//      p1.behaviours.push(a1);

//      var p2 = physics.particles[i + 1];
//      a2 = new Attraction(new Vector(xc2,yc), 10000, 100);
//      p2.behaviours.splice($.inArray(gravity,p2.behaviours),1);
//      p2.behaviours.splice($.inArray(collision,p2.behaviours),1);
//      p2.behaviours.push(a2);

//  };
// });
