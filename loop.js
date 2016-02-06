/*global engine*/
engine.loop = (function (){
  var
  stateMap = {
    last_time : 0
  };

  function step(elapsed) {
    // var elapsed = stateMap.last_time || Date.now() - stateMap.last_time,
    var
      x_velocity = engine.configMap.gravity_x * elapsed,
      y_velocity = engine.configMap.gravity_y * elapsed,
      entities = this.entities;

    entities.forEach( function ( entity ) {
      switch (entity.type) {
        case engine.configMap.dynamic:
          entity.movement.vx += entity.movement.ax * elapsed + x_velocity;
          entity.movement.vy += entity.movement.ay * elapsed + y_velocity;
          entity.start.x  += entity.movement.vx * elapsed;
          entity.start.y  += entity.movement.vy * elapsed;
          break;
        case engine.configMap.kinematic:
          entity.movement.vx += entity.movement.ax * elapsed;
          entity.movement.vy += entity.movement.ay * elapsed;
          entity.start.x  += entity.movement.vx * elapsed;
          entity.start.y  += entity.movement.vy * elapsed;
          break;
      }
    });

    if ( this.player && this.collidables ) {
      var collisions = this.collider.detect_collisions( this.player, this.collidables );
      if (collisions !== null) {
        this.solver.resolve(this.player, collisions);
      }
    }
  }

  function createLoop() {
    var e = {};
    e.step = step;
    e.solver = engine.solver;
    e.collider = engine.collider;
    e.entities = [];
    e.collidables = [];
    return e;
  }
  
  return {
    createLoop  : createLoop
  };
}());
