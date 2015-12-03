---
date: '2013-07-13 17:32:22'
edited: '2013-08-29 23:03:30'
title: What is an express.js app?
tags: [javascript, express]
hide: false
---
                          
An express `app` is built on top of the npm connect module. The express docs feel incomplete, because they do not cover behavior inherited from connect.

Express apps begin like this:
```javascript
var express = require('express');
var app = express();
```

The source of the express function looks like this [(github)](https://github.com/visionmedia/express/blob/ba5c48aa864202ae9962a4bb7d5b570efa9caa44/lib/express.js#L32-L39):
```javascript
function createApplication() {
  var app = connect();
  utils.merge(app, proto);
  app.request = { __proto__: req, app: app };
  app.response = { __proto__: res, app: app };
  app.init();
  return app;
}
```


## Connect Prototype

The npm `connect` module is the foundation of our express app. The  source of the `connect()` function above looks like this [(github)](https://github.com/senchalabs/connect/blob/695f7e966ee3a6d76d9c76499b7a2191ba24d552/lib/connect.js#L64-L74):

```javascript
function createServer() {
  function app(req, res, next){ app.handle(req, res, next); }
  utils.merge(app, proto);
  utils.merge(app, EventEmitter.prototype);
  app.route = '/';
  app.stack = [];
  for (var i = 0; i < arguments.length; ++i) {
    app.use(arguments[i]);
  }
  return app;
};
```
The code above uses `utils.merge` to give `app` all the functionality of the [Connect http server prototype](https://github.com/senchalabs/connect/blob/master/lib/proto.js). This includes the `.use`, `.handle`, and `.listen` methods. 

The app also merges [EventEmitter](https://github.com/Gozala/events) from the node.js `events` library. `EventEmitter` is where `app` gets `app.on` and `app.emit` from.

## app.listen returns a server

`app` is itself a request handler that is passed to node's `http.createServer` when you call `app.listen`

```javascript
var port = 3000;
var server = app.listen(port);
```

`app.listen` is defined in the connect prototype. It looks like this:
```javascript
// require 'http'
app.listen = function(){
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};
```

`http.createServer` returns a `net.Server` instance from node's [net module](http://nodejs.org/api/net.html).


## Express App Prototype

After the connect initializaition has finished, we merge the express app prototype onto our new `connect` app.
```js
utils.merge(app, proto);
```
This line adds all the functionality from the [express application prototype](https://github.com/visionmedia/express/blob/master/lib/application.js). This is where `app.use`, `app.routes`, `app.get`, etc are defined. This behavior is documented very clearly in the express docs. 


