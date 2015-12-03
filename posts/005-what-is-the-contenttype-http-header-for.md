---
date: '2013-06-12 15:21:44'
edited: '2014-09-10 10:51:19'
title: What is the Content-Type http header for?
tags: [ajax, javascript]
hide: false
---

                 
The `Content-Type` http request header specifies the content type of the **http request payload**. The `Content-Type` header is NOT tied to the content type of the response sent by the server. 

Here's an example using pure JavaScript to make an asynchronous HTTP request from the browser.

```js
var joinRequest = new XMLHttpRequest();  
joinRequest.onload = function() {  
  if (this.status === 200) {  
    console.log('JOINED!', this.response); // this.response is NOT affected by 'Content-Type'
  } 
};

// 'Content-Type' header tells the server what type of data we are sending
joinRequest.setRequestHeader('Content-Type', 'application/json');  
// 'Accept' header tells the server what content types we can accept
joinRequest.setRequestHeader('Accept', 'text/plain'); 
joinRequest.open('POST', '/join', true);  
joinRequest.send(JSON.stringify({name:'Charles'}));  
```

Don't confuse `Content-Type` with `dataType`, `accepts`, and `Accept`. 

`dataType`, and `accepts` are jquery.ajax options. 

- `dataType` helps jqeury correctly process the server's response. 
- `accepts` tells jquery to include headers in the request that inform the server what type of data we are interested in. 
- `Accept` is an http request header that  informs the server which data types we are interested in. The value for the Accept header must be a semicolon-separated list of MIME types.
