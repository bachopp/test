var EventEmitter = require("events");


var Socket = function(inicial) {
  self = this;
  this.ws = new WebSocket("ws://localhost:8000/ws");
  this.ee = new EventEmitter();

  this.ws.onmessage = function(response) {
    try {
      var message = JSON.parse(response.data);
      self.ee.emit(message.name, message.data);
    }catch(err) {
      self.ee.emit('error', err);
    }
  };

  this.ws.onopen = function() {
    self.ee.emit('connect');
    console.log(inicial)
  };

  this.ws.onclose = function() {
    self.ee.emit('disconnect');
  };;

  this.on = function(name, fn) {
    self.ee.on(name,fn);
  };

  this.off = function(name, fn) {
    self.ee.removeListener(name, fn);
  };

  this.emit = function(name, data) {
    var message = JSON.stringify({name, data});
    self.ws.send(message);
  };
}



module.exports = Socket;