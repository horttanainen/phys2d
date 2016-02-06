/*global engine */
engine.entity = (function () {
  var collisionTypes = {
    elastic : function ( restitution ) {
      this.restitution = restitution || 0.2;
    }
  };

  function Point( arg_map ) {
    this.x = arg_map.x || 0;
    this.y = arg_map.y || 0;
  }

  function Movement( arg_map ) {
    this.vx = arg_map.vx || 0;
    this.vy = arg_map.vy || 0;
    this.ax = arg_map.ax || 0;
    this.ay = arg_map.ay || 0;
  }

  function PhysicsEntity( arg_map ) {
    var 
      entity  = {},
      start     = arg_map.start || new Point( arg_map ),
      movement  = arg_map.movement || new Movement( arg_map ),
      collision_type;

    entity.start = start;
    entity.movement = movement;
    entity.color  = arg_map.color || engine.configMap.default_color;
    // type, collision_type privateiksi ja niille getterit
    entity.type = arg_map.type || engine.configMap.kinematic;
    entity.collision_type = arg_map.collision_type || engine.configMap.elastic;

    collision_type = collisionTypes[ entity.collision_type ];
    collision_type.call( entity, arg_map.restitution );

    entity.get_bottom = function () {
      return this.start.y + this.height;
    };
    entity.get_top = function () {
      return this.start.y;
    };
    entity.get_left = function () {
      return this.start.x;
    };
    entity.get_right = function () {
      return this.start.x + this.width;
    };

    return entity;
  }
 
  function physicsEntityRectangle( arg_map ) {
    var 
      rectangle = new PhysicsEntity( arg_map ),
      half_height, half_width;

    // width ja height privateiksi ja niille getterit
    rectangle.width  = arg_map.width || 20;
    rectangle.height = arg_map.height || 20;
    rectangle.shape  = 'rectangle';
    
    half_width = rectangle.width * 0.5;
    half_height = rectangle.height * 0.5;

    rectangle.get_center_point = function () {
      return new Point( rectangle.start.x + half_width, rectangle.start.y + half_height );
    };

    return rectangle;
  }

  return {
    rectangle : physicsEntityRectangle
  };
}());
