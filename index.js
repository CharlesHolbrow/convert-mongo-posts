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

//console.log('Blog Post created at:', moment(posts[1].createdAt).format(momentStr))
//console.log(posts[1].content)
//console.log('Now', nowStr)
//console.log(moment(nowStr).format('YYYY MMMM DD, HH:mm:ss'))

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
  }, post.content, post.slug, post.createdAt]
}).sort((postArr)=>{
  return postArr[3] // sort by created at
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
  fs.writeFileSync(i'./posts/' + pad(i, 3) + '-'+ filename, doc)
})

