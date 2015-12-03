---
publish: true
date: '2014-07-08 09:42:01'
edited: '2014-12-11 14:27:09'
title: Connect Handler Example for Simple CORS Requests
tags: [connect, javascript, cors]
---

For reference, I'm recording an example of handling **Simple CORS Requests** with some handy connect/express implementation details. 

Remember when using [webapp.use()](http://www.senchalabs.org/connect/proto.html#app.use) with a path as the first argument:

- All sub-paths of that path are also handled
- The specified path is striped from the beginning `req.url` inside request handlers

Notes about the `req` parameter to request handlers:

- `req` objects are instances of node's [http.IncomingMessage](http://nodejs.org/api/http.html#http_http_incomingmessage)
- Your framework may build on top of the `IncomingMessage` interface. For example, express adds the [param](http://expressjs.com/api.html#req.param) method

```javascript
// hosts whitelist
var coorsAccessOrigins = {
  'http://localhost:3000': true,
  'http://example.com': true,
  'http://charlesholbrow.com': true,
  'http://www.charlesholbrow.com': true
};

// allow simple CORS GET requests to the /dds directory
webApp.use('/dds', function(req, res, next){
  // Don't add access control headers if host is not in whitelist
  if (!coorsAccessOrigins[req.headers.origin]) return next();

  // The origin header implies this is a CORS request.
  // The user-agent (the browser) is unlikely to add the origin
  // header if it doesn't support CORS
  if (!req.headers.origin) return next();

  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  return next();
});
```

Notice the difference between the `origin` request header and the `host` request header. 

- The `host` request-header specifies the Internet host and port number of the resource being requested
- The `origin` request-header indicates that this is a CORS request

``` JSON
// example req.headers object
{
  "host": "localhost:3000",
  "connection": "keep-alive",
  "cache-control": "no-cache",
  "pragma": "no-cache",
  "origin": "http://charles.meteor.com",
  "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36",
  "accept": "*/*",
  "dnt": "1",
  "referer": "http://charles.meteor.com/",
  "accept-encoding": "gzip,deflate,sdch",
  "accept-language": "en-US,en;q=0.8",
  "x-forwarded-for": "127.0.0.1",
  "x-forwarded-port": "3000",
  "x-forwarded-proto": "http"
}
```