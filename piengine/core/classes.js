var CLASSES = CLASSES || (function() {
  function resetContext(context) {
    context.globalAlpha = 1;
    context.lineWidth = 1;
    context.strokeStyle = "#000";
    context.fillStyle = "#000";
    context.translate(0,0);
    context.moveTo(0,0);
    context.scale(1,1);
    context.save();
  }
  var OrganicType = function() {
    this.friction = 1;
    this.mass = 1;
    this.angle = 0;
  }
  OrganicType.prototype.draw = function(context) {
    resetContext(context);
    context.save();
    context.beginPath();
    context.translate(this.x,this.y);
    if (this.angle != 0) {
      context.translate(this.x + this.width/2, this.y + this.height/2);
      context.rotate(angle * Math.PI/180);
    }
    if (this.img) {

    }
    else {
      context.rect(0,0,this.width,this.height);
      if (this.backgroundColor) {
        context.fillStyle = this.backgroundColor;
      }
      if (this.borderColor || this.border) {
        if (this.borderColor) {
          context.strokeStyle = this.borderColor;
        }
        if (this.border) {
          context.lineWidth = this.border;
        }
        context.stroke();
      }
      context.fill();
    }
    context.restore();
  }
  //Collision Detection and action stuff
  OrganicType.prototype.collide = function(obj,vx,vy) {
    return (this.x + vx < obj.x + obj.width &&
        this.x + vx + this.width > obj.x &&
        this.y + vy < obj.y + obj.height &&
        this.y + vy + this.height > obj.y);
  }
  OrganicType.prototype.collisionsX = function(objects) {
    for (var i = 0; i < objects.length; i++) {
      var obj = objects[i];
      if (this !== obj) {
        if (this.collide(obj,this.hSpeed,0)) {
          if (obj.moveable) {
            this.moveObject(obj,true);
          }
          while (!this.collide(obj,INIT.sign(this.hSpeed),0)) {
            this.x += INIT.sign(this.hSpeed);
          }
          this.hSpeed = 0;
          //console.log(INIT.sign(-8));
          return obj;
        }
      }
      else {
      }
      //console.log(this.collide(obj,this.hSpeed,0));
    }
    return false;
  }
  OrganicType.prototype.collisionsY = function(objects) {
    for (var i = 0; i < objects.length; i++) {
      var obj = objects[i];
      if (this !== obj) {
        if (this.collide(obj,0,this.vSpeed)) {
          if (obj.moveable) {
            this.moveObject(obj,false);
          }
          while (!this.collide(obj,0,INIT.sign(this.vSpeed))) {
            this.y += INIT.sign(this.vSpeed);
          }
          this.vSpeed = 0;
          return obj;
        }
      }
      else {
      }
    }
    return false;
  }
  OrganicType.prototype.moveObject = function(obj,dir) {
    if (dir === "horizontal" || dir === true) {
      obj.hSpeed += this.hSpeed;
    }
    else if (dir === "vertical" || dir === false) {
      obj.vSpeed += this.vSpeed;
    }
  }
  OrganicType.prototype.bounce = function(obj){
    PHYSICS.bounce(this,obj);
  }
  OrganicType.prototype.movement = function(obj) {
    if (this.x !== this.prevX || this.y !== this.prevY) {

    }
    this.x += this.hSpeed;
    this.y += this.vSpeed;
  }
  var Player = function(x,y) {
    OrganicType.call(this);
    this.x = x;
    this.y = y;
    this.prevX = 0;
    this.prevY = 0;
    if (arguments[2]) {
      this.width = arguments[2];
    }
    if (arguments[3]) {
      this.height = arguments[3];
    }
    this.hSpeed = 0;
    this.vSpeed = 0;
    this.movementSpeed = 3; //Pixels
  }
  Player.prototype = Object.create(OrganicType.prototype);
  Player.prototype.constructor = Player;

  var Block = function(x,y) {
    OrganicType.call(this);
    this.x = x;
    this.y = y;
    this.prevX = 0;
    this.prevY = 0;

    if (arguments[2]) {
      this.width = arguments[2];
    }
    if (arguments[3]) {
      this.height = arguments[3];
    }
    this.hSpeed = 0;
    this.vSpeed = 0;
  }
  Block.prototype = Object.create(OrganicType.prototype)
  Block.prototype.constructor = Block;
  var Map = function(mapData) {
    this.x = mapData.x;
    this.y = mapData.y;
    this.width = mapData.width;
    this.height = mapData.height;
    this.isometric = false;
    this.objects = mapData.objects;
  }
  Map.prototype.draw = function(context) {
    context.save();
    context.beginPath();
    context.translate(this.x,this.y);
    context.moveTo(this.x,this.y);
    context.lineTo(this.x+(this.width/20),this.y);
    context.lineTo(this.x,this.y+(this.width/20));

    context.moveTo(this.x+this.width,this.y);
    context.lineTo(this.x+this.width-this.width/20,this.y);
    context.lineTo(this.x+this.width,this.y+this.width/20);

    context.moveTo(this.x+this.width,this.y+this.height);
    context.lineTo(this.x+this.width-this.width/20,this.y+this.height);
    context.lineTo(this.x+this.width,this.y+this.height-this.width/20);

    context.moveTo(this.x,this.y+this.height);
    context.lineTo(this.x+this.width/20,this.y+this.height);
    context.lineTo(this.x,this.y+this.height-this.width/20);

    context.fill();
  }



  return {
    Player: Player,
    Block: Block,
    Map: Map,
    init: function() {
      return true;
    }
  }
}());
