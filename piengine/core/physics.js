var PHYSICS = PHYSICS || (function() {
  return {
    gravity: 8, //pixels/s
    terminalVelocity: 56, //pixles/s
    frictionForce: function(obj1,obj2,normalforce) {
      if (obj1.friction && obj2.friction) {
        var n = normalforce;
        var mu = (obj1.friction + obj2.friction)/2;
        return mu * n;
      }
    },
    init: function() {
      return true;
    },
    bounce: function(obj1,obj2) {
      if (Math.abs(obj1.vSpeed) > PHYSICS.gravity) {
        return -obj1.vSpeed * (obj1.friction + obj2.friction)/2 - (obj1.mass * PHYSICS.gravity);
      }
    }
  };
}());
