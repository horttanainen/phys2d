/*global engine*/
engine.collider = (function (){

  function collide_rect( collider, collidee ) {
    if (collider.get_bottom() < collidee.get_top() ||
        collider.get_top() > collidee.get_bottom() ||
        collider.get_left() > collidee.get_right() ||
        collider.get_right() < collidee.get_left() ) {
      return false;
    }
    return true;
  }

  function detect_collisions( collider, collidees ) {
    var colliders = [];

    collidees.forEach(function ( collidee) {
      if ( collidee.collision_type === engine.configMap.elastic ) {
        if ( collide_rect( collider, collidee ) ) {
          console.log('push!');
          colliders.push(collidee);
        }
      }
    });
    return colliders;
  }

  return {
    detect_collisions : detect_collisions
  };
}());
