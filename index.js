'use strict';

var fs      = require('fs')
  , _       = require('lodash')
  , moment  = require('moment')
  , yaml   = require('yaml-js')

var posts = JSON.parse(fs.readFileSync('posts.json', 'utf8'))


// Date stuff
var now = moment()
  , momentStr = 'YYYY-MM-DD HH:mm:ss'
  , nowStr = now.format(momentStr)

console.log('Blog Post created at:', moment(posts[1].createdAt).format(momentStr))
console.log(posts[1].content)
console.log('Now', nowStr)
console.log(moment(nowStr).format('YYYY MMMM DD, HH:mm:ss'))

var stringifyJsDate = function(jsDate){
  return moment(jsDate).format(momentStr)
}

var newPosts = _.map(posts, (post)=>{
  return [{
    publish: post.publish
    , date      : stringifyJsDate(post.createdAt)
    , edited    : stringifyJsDate(post.editedAt)
    , title     : post.title
    , tags      : post.tags
    , publish   : post.publish
  }, post.content]
})

console.log(_.map(newPosts, (ar)=>{
  return ar[0]
}))
