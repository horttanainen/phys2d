/*global engine */
engine.render = (function () {
  var loop, context;

  function drawRectangle( entity ) {
    var
      start   = entity.start,
      height  = entity.height,
      width   = entity.width,
      color   = entity.color;
    context.beginPath();
    context.rect( start.x, start.y, width, height );
    context.fillStyle = color;
    context.fill();
    context.closePath();
  }

  function draw( entity ) {
    if ( entity.shape === 'rectangle' ) {
      drawRectangle( entity );
    }
  }

  function all() {
    loop.entities.forEach( function ( entity ){
      draw( entity );
    });

  }

  function init( arg_map ) {
    loop = arg_map.loop;
    context = arg_map.context;
  }

  return {
    init : init,
    all : all
  };
}());
