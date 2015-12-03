---
date: '2013-07-10 21:28:16'
edited: '2014-04-07 14:07:14'
title: In the Trenches With a Large Scale Backbone/Express/MongoDB App
tags: [javascript, express, backbone, async]
hide: false
---

       
I've just finished some contract work on the Web App [www.VisualStager.com][vs]. This is a large scale project that build on top of Express, Mongoose, Backbone, [F][F], and [PsuedoClass][PS].

Since Express and Backbone are both lightweight and flexible, it was pretty neat to see them working a part of a well designed large scale production app. My team of four developers had just under two weeks to build out an admin interface for the entire app. 

Visual Stager is an interior design app that depends on three.js and clever mathematics to position 3D furniture models inside a 2D photo of a room. We needed to create admin pages for the Account, User, House, Photo, Scene, and Furniture collections. While the experience is still fresh in my mind, I'm going to memoize some interesting takeaways. 

## Pure Backbone is too lightweight for large scale apps
In a mature framework like Rails or Django, building an admin page is trivial. In our case, we depended on [F.ListComponent][flc] to render collections of items as tables or lists without boilerplate. F.Component organizes the following into a logical unit of application code:

- A Backbone View
- A Backbone Model
- Handlebars templates
- Public methods
- Sub-components

F Components address one of the main complexity headaches found in backbone apps -- There is no Controller class. Additionally, we can subclass F Components using the [PsuedoClass][PS] inheritance pattern. 

## No Associations
In ActiveRecord we have "associations". Imagine a User in our app is a member of many accounts. When we delete the user, we want to automatically remove that user from all accounts it belongs to. This is trivial with ActiveRecord. However, the Mongo/Express stack is not mature enough to have abstracted this behavior. We had to write the association logic manually in our server-side controllers.

## Async
This is where Express gets fun. As part of the admin behavior, I found myself writing backend operations that run on large collections of MongoDB documents. The asynchronous style of node.js lends itself perfectly to this type of operation. The [async][async] library provides operations that operate on collections, similar to \_.each and \_.map -- the difference between async and underscore is synchronicity. Async iterators may operate on each member of a collection asynchronously.

[F]: http://lazd.github.io/F/ 
[PS]: http://lazd.github.io/PseudoClass/
[vs]: http://www.visualstager.com
[flc]: http://lazd.github.io/F/F/jsdoc/F.ListComponent.html
[async]: https://github.com/caolan/async
