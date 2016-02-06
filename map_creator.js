/*global engine, prompt */
engine.map_creator =(function (){
  var block, canvas, loop;

  function addToEngine( block ) {
    loop.entities.push( block );
    if ( block.player ) {
      loop.player = block;
    } else {
      loop.collidables.push( block );
    }
  }

  function onMouseDown( event ) {
    var
      start_x = event.clientX - canvas.offsetLeft,
      start_y = event.clientY - canvas.offsetTop;

    block = engine.entity.rectangle({ x : start_x, y : start_y });
  }

  function onMouseUp( event ) {
    var
      stop_x = event.clientX - canvas.offsetLeft,
      stop_y = event.clientY - canvas.offsetTop,
      response,
      message;

    block.width = stop_x - block.start.x;
    block.height = stop_y - block.start.y;

    message = JSON.stringify( block );
    response =  prompt( message, message );

    block = engine.entity.rectangle( JSON.parse( response ) );

    addToEngine( block );
  }

  function init( arg_map ) {
    canvas = arg_map.canvas;
    loop = arg_map.loop;
  }

  return {
    init : init,
    onMouseDown : onMouseDown,
    onMouseUp : onMouseUp
  };
}());

