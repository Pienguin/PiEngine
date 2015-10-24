(function() {
  var directory = "piengine/";
  var files = {
    physics: {
      src: "core/physics.js",
      args: {hello:0},
    },
    classes: {
      src: "core/classes.js",
      args: {ok:0},
    },
    init: {
      src: "init.js",
    }
  };
  for (var key in files) {
    var script = document.createElement('script');
    script.src = directory + files[key].src;
    document.head.appendChild(script);
    files[key].loaded = false;
  }
  function scriptsLoaded(scripts) {
    var i = 0;
    if (arguments[1]) {
      i = arguments[1];
    }
    for (var key in scripts) {
      if (!scripts[key].loaded) {
        if (window[key.toUpperCase()]) {
          scripts[key].loaded = window[key.toUpperCase()].init(scripts[key].args);
        }
        if (i < 100) {
          setTimeout(function() {
            i++;
            scriptsLoaded(scripts,i);
          }, 0016);
        }
        else {
          console.log("TIMED OUT!");
        }
        return false;
      }
    }
    init();
    return true;
  }
  function init() {
    console.log("YAY");
    start();
  }
  scriptsLoaded(files);
})();
