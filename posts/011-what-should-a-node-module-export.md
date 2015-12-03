---
publish: true
date: '2013-10-27 15:48:38'
edited: '2014-01-18 11:28:47'
title: What Should a Node Module Export?
tags: [node, module, exports]
---
      
A node.js module can export:

- A function that we call when we import a module
- An object with properties
- Both! (a function with assigned properties)

`module` is the global scope variable in a node.js file. It behaves similarly to `window` in the browser.

```javascript
// Assignment can hide the "exports" name
// in a node.js file:
var exports = 'Caution!' // creates a new exports object that will NOT be exported
exports = 'Same problem!' // same problem as above
```

The controller pattern (exemplified below) exports a function 

```javascript
var app;
var templates;
var emailController;

// Code outside of the exports function will be run once the 
// first time we require this module is required
var mongoose = require('mongoose');
var User = mongoose.model('User');
var controller = {};

// if the exports function on a module requires the app,
// pass express app in when we require this controller
module.exports = function(_app) {
  app = _app;

  // if we know that 'templates' was set on the app before
  // requring this controller, then we can app.get 'templates'
  // This will re-set the templates variable every time that 
  // this module-function is called.
  templates = app.get('templates'); 

  // We can also require modules directly on the exports
  // function. Asume that the Email module uses the same
  // module.exports = function(_app) pattern as this 
  // module.
  emailController = require(__dirname + 'controllers/Email')(app)

  return controller;
}

controller.getAPI = function(req, res, next) {...};
```
