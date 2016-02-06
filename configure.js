var engine = (function () {
  var configMap = {
    gravity_x : 0,
    gravity_y : 0.0001,
    dynamic   : 'dynamic',
    kinematic : 'kinematic',
    elastic   : 'elastic',
    default_color : '#0095DD',
    sticky_threshold : 0.0004
  },
  stateMap = {
    click_mode : 'draw'
  };

  return {
    configMap : configMap,
    stateMap  : stateMap
  };
}());
