/*global engine*/
engine.solver = (function () {

  function displaceVertically( arg_map ) {
    var
      player = arg_map.player,
      entity = arg_map.entity,
      dy     = arg_map.dy;

    if ( dy < 0 ) {
      player.start.y = entity.get_bottom();
    }
    else {
      player.start.y = entity.get_top() - player.height;
    }
  }

  function displaceHorizontally( arg_map ) {
    var
      player = arg_map.player,
      entity = arg_map.entity,
      dx     = arg_map.dx;

    if ( dx < 0 ) {
      player.start.x = entity.get_right();
    }
    else {
      player.start.x = entity.get_left() - player.width;
    }
  }

  function bounceVertically( arg_map ) {
    var
      player = arg_map.player,
      entity = arg_map.entity;

    player.movement.vy = - player.movement.vy * entity.restitution;
    if ( Math.abs( player.movement.vy ) < engine.configMap.sticky_threshold ) {
      player.movement.vy = 0;
    }
  }

  function bounceHorizontally( arg_map ) {
    var
      player = arg_map.player,
      entity = arg_map.entity;

      player.movement.vx = - player.movement.vx * entity.restitution;
      if ( Math.abs( player.movement.vx ) < engine.configMap.sticky_threshold ) {
        player.movement.vx = 0;
      }
  }

  function cornerCollision( arg_map ) {
    displaceHorizontally( arg_map );
    displaceVertically( arg_map );
    // Randomly choose a dircetion to reflect player velocity
    if ( Math.random() < 0.5) {
      bounceHorizontally( arg_map );
    }
    else {
      bounceVertically( arg_map );
    }
  }

  function sideCollision( arg_map ) {
    displaceHorizontally( arg_map );
    bounceHorizontally( arg_map );
  }

  function verticalCollision( arg_map ) {
    displaceVertically( arg_map );
    bounceVertically( arg_map );
  }

  function resolveElastic( player, entity ) {
    var 
      player_center = player.get_center_point(),
      entity_center = entity.get_center_point(),
      dx = ( entity_center.x - player_center.x ) / entity.half_width,
      dy = ( entity_center.y - player_center.y ) / entity.half_height,
      abs_dx = Math.abs( dx ),
      abs_dy = Math.abs( dy ),
      arg_map = { player : player, entity : entity, dx : dx, dy : dy };

    if ( Math.abs( abs_dx - abs_dy ) < 0.1 ) {
      cornerCollision( arg_map );
    }
    else if ( abs_dx > abs_dy ) {
      sideCollision( arg_map );
    }
    else {
      verticalCollision( arg_map );
    }
  }

  function resolve( collider, collidees ) {
    collidees.forEach( function ( collidee) {
      if ( collidee.collision_type === engine.configMap.elastic ) {
        resolveElastic( collider, collidee );
      }
    });
  }

  return {
    resolve : resolve
  };
}());
