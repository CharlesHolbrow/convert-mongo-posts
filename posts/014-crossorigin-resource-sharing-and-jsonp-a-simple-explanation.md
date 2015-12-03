---
date: '2014-06-08 21:11:19'
edited: '2014-06-09 10:49:33'
title: 'Cross-Origin Resource Sharing and JSONP: A Simple Explanation'
tags: [jsonp, cors, javascript]
hide: false
---

                         
If you are browsing farmville.com and a script downloaded makes an ajax request to facebook.com, this is known as cross-origin resource sharing, or CORS.

When a modern browser encounters a CORS request, it intervenes for security reasons. Browsers distinguish **Simple Requests**  from **Non-Simple Requests** using a different intervention strategy for each. 

## Simple Requests

An HTTP request is considered simple if all 3 criteria are met:

1. The request method is **GET**, **HEAD** or **POST**
2. the request uses only headers in the following list:
  - Accept
  - Accept-Language
  - Content-Type
  - Content-Language
3. The value field of the Content-Type header matches one of the following:
  - application/x-www-form-urlencoded
  - multipart/form-data
  - text/plain

For simple requests, the browser adds the `Origin` header behind the scenes. The request received by our server might look like this:

```
GET /some/resource
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.5; en-US; rv:1.9.1b3pre) Gecko/20081130 Minefield/3.1b3pre
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7
Origin: http://foo.example
```

The server observes the `Origin` header, and serves back a response. The browser inspects the HTTP Response and looks for the Access-Control-Allow-Origin header. 

```
Access-Control-Allow-Origin: http://bar.example.com
```

In the example above,  the server is indicating that only requests originating from `http://bar.example.com` are permitted to access the resource. The browser will discard the data in the http response, and throw a JavaScript error indicating that the AJAX request was unsuccessful. Note that wild cards can also be used for the value of `Access-Control-Allow-Origin`. In the next example, the server is indicating that requests from any origin may be permitted to access the response.

```
Access-Control-Allow-Origin: *
```

The Access Control headers hidden from the JavaScript API - they are removed be the browser before exposing the HTTP Response to your JavaScript code.

## Non-Simple Requests

For non simple HTTP Requests, the browser employs a different security strategy.  Instead of sending an ajax request directly to the other server, it first sends an OPTIONS http request. The headers in the response to the OPTIONS request indicate to the browser if the server is willing to listen to requests originating from other servers. 

In our example, facebook.com needs to be configured to respond to OPTIONS requests with a specific header format. These headers indicate to the browser which domains are allowed to make resource requests.

CORS is the modern way to make cross-origin requests -- It's not supported by IE 7 and below. JSONP is another option for making cross origin requests.

JSONP exploits the fact that `<script>` elements are allowed to make cross-origin GET requests to retrieve script files. A server can return an html document containing a script tag with a cross origin `src='www.example.com'` attribute. The browser will not interfere with this request. 

```javascript
<script>
var myFunc = function(data){
  console.log(data);
};

// append a script tag to the document. This will trigger a cross-origin GET request.
document.write("<script src='http://facebook.com/example/api/callback=myFunc'>")
</script>
```

The script returned by Facebook's executes a function that we (hopefully) defined prior to making the request.
```javascript
// example script returned and run by dynamically adding a script tag
myFunc({
  name: 'Charles',
  id: '123456'
});
```