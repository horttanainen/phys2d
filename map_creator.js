/*global engine, prompt */
engine.map_creator =(function (){
  var block, canvas, loop, clickedElement;

  function addToLoop( block ) {
    loop.entities.push( block );
    loop.collidables.push( block );
    block = undefined;
  }

  function checkIfElementClicked( x, y, callback ) {
    var counter = 0;
    loop.entities.forEach( function( entity ) {
      if (entity.start.x < x &&
          entity.start.x + entity.width > x &&
          entity.start.y < y &&
          entity.start.y + entity.height > y ) {
        clickedElement = entity;
      }
      counter++;
    });

    if ( counter === loop.entities.length ) {
      if ( ! clickedElement ) {
        callback( x, y );
      }
    }
  }

  function onMouseDown( event ) {
    var
      start_x = event.clientX - canvas.offsetLeft,
      start_y = event.clientY - canvas.offsetTop;

    checkIfElementClicked( start_x, start_y,
      function ( start_x, start_y ){
        block = engine.entity.rectangle({ x : start_x, y : start_y });
      });
  }

  function onMouseUp( event ) {
    var
      stop_x = event.clientX - canvas.offsetLeft,
      stop_y = event.clientY - canvas.offsetTop;

    if ( clickedElement ) {
      loop.collidables.splice(loop.collidables.indexOf( clickedElement ), 1);
      loop.player = clickedElement;
      clickedElement.color = 'red';
      clickedElement.type = 'dynamic';
      clickedElement = undefined;
    }
    else {
      block.width = stop_x - block.start.x;
      block.height = stop_y - block.start.y;
      addToLoop( block );
    }
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

