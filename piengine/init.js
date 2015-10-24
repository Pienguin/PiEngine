var INIT = INIT || (function() {
  return {
    sign: function(num) {
      if (num <= -1) {
        return -1;
      }
      else if (num >= 1) {
        return 1;
      }
      else {
        return 0;
      }
    },
    init: function() {
      return true;
    },
    press: function() {
      return {
        //LEFT Direction
        left: 0,
        leftValues: [0,-1],
        //RIGHT Direction
        right: 0,
        rightValues:[0,1],
        //UP Direction
        up: 0,
        upValues: [0,-1],
        //DOWN Direction
        down: 0,
        downValues: [0,1],
        //JUMP
        jump: false,
        jumpValues: [false,true],
        jumpActions: function() {
          return "oh Yey";
        }
      }
    },
    keyboard: function(press) {
      function action(pressed) {
        if (pressed) {
          press[this.bind] = press[this.bind + "Values"][1];
        }
        else {
          press[this.bind] = press[this.bind + "Values"][0];
        }
        if (press[this.bind + "Actions"]) {
          press[this.bind + "Actions"]();
        }
      }
      var parent = this;
      return {
        "32": {
          bind: 'jump',
          action: action
        },
        "65": {
          bind: 'left',
          action: action
        },
        "68": {
          bind: 'right',
          action: action
        },
        "87": {
          bind: 'up',
          action: action
        },
        "83": {
          bind: 'down',
          action: action
        }
      }
    }
  };
}());
