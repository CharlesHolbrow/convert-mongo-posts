'use strict';

var fs      = require('fs')
  , _       = require('lodash')
  , moment  = require('moment')
  , yaml   = require('yaml-js')

var posts = JSON.parse(fs.readFileSync('posts.json', 'utf8'))


// Date stuff
var now = moment()
  , momentStr = 'YYYY-MM-DD HH:mm:ss' // this can be read my moment
  , nowStr = now.format(momentStr)

var stringifyJsDate = function(jsDate){
  return moment(jsDate).format(momentStr)
}

var newPosts = _.map(posts, (post)=>{
  return [{
      date        : stringifyJsDate(post.createdAt)
      , edited    : stringifyJsDate(post.editedAt)
      , title     : post.title
      , tags      : post.tags
      , hide      : !post.publish
    }
    , post.content
    , post.slug
    , post.createdAt
  ]
})

newPosts = _.sortBy(newPosts, (postArr)=>{
  return postArr[3] // sort by created at
})

_.each(newPosts, (postArr)=>{
  console.log(postArr[3])
})

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

_.each(newPosts, (postArr, i)=>{
  var yamlText  = yaml.dump(postArr[0])
  , content     = postArr[1]
  , slug        = postArr[2]
  , filename    = slug + '.md'
  , doc         = '---\n' + yamlText + '---\n' + content
  fs.writeFileSync('./posts/' + pad(i, 3) + '-'+ filename, doc)
})

