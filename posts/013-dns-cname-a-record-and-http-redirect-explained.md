---
date: '2014-05-30 20:18:10'
edited: '2014-09-16 15:33:26'
title: DNS, CNAME, A Record, and HTTP Redirect Explained
tags: [dns, http]
hide: false
---

You have probably noticed that different websites handle the **www** subdomain in different ways. For Example:

- [google.com](http://google.com) redirects you to [www.google.com](http://www.google.com)
- [www.ipython.org](http://www.ipython.org) redirects you to [ipython.org](http://ipython.org)
- [writersreply.com](http://writersreply.com) and [www.writersreply.com](http://www.writersreply.com) look identical without redirecting

It's worth understanding DNS, A Records, CNAME, the HTTP Host Request Header,  and HTTP Redirects so you can make your domain function the way that you want.

## DNS - Domain Name System

When you buy a domain, your registrar allows you to specify **Authoritative Name Servers**. For example you might register `ns1.domaincontrol.com` as the authoritative resource on the internet for identifying the IP address of your domain.

## A Records and CNAME

Once your Authoritative Name Server is registered, you configure that name server, specifying the IP addresses that your domain and (optionally) subdomains point to. 

An **A Record** (Address Record) points your domain or subdomain to an IP Address. An **A Record** will always point to an IP Address.

A **CNAME** (Canonical Name aka Alias) points your domain or subdomain to to the the IP Address of a different domain. **CNAME** records always point to domain names. 

The **@** symbols is used in DNS records to indicate your root domain name. Consider the hypothetical DNS table below for the domain `writersreply.com`

<table>
<style>
thead{
  font-weight: bold;
}
td{
  width: 180px;
}
table, td, th {
  border:1px solid black;
  border-collapse:collapse;
}
</style>
<thead>
<tr><td>Host Name</td><td>Address</td><td>Type</td></tr>
</thead>
<tbody>
<tr><td>@</td><td>18.85.28.11</td><td>A</td></tr>
<tr><td>www</td><td>writersreply.com</td><td>CNAME</td></tr>
</tbody>
</table>

The example above doesn't actually redirect users - it just means that when you navigate your browser to `www.example.com` the HTTP Request goes to the same IP address as if you navigate to `example.com`. In either case the address bar in your browser will be unchanged when the site loads. 

## HTTP Redirects

You can't redirect users with DNS Configuration. However, **some DNS providers offer a redirection service**. If your Domain registrar does not offer redirection service, you have to configure your web server to redirect http traffic manually. 

How does this work? Here's an example of browser behavior when you navigate to `google.com`:

1. Use the DNS IP address provided by your Router or ISP to determine the Authoritative Name Server for `google.com`
  - Answer: `ns1.google.com`
2. Request the ip address of `google.com` from `ns1.google.com`
  - Answer: `74.125.21.100`
3. Send an HTTP Request to `74.125.21.100` looking something like this:
```
GET / HTTP/1.1
Host: google.com
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Encoding: gzip,deflate,sdch
Accept-Language: en-US,en;q=0.8
DNT: 1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36
X-Chrome-UMA-Enabled: 1
```
Notice that the HTTP request is sent to an IP address, but it includes the **Host Header** `google.com`. Google's servers see the host name in the request, and send back an HTTP 301 Redirect looking akin to this:
```
HTTP/1.1 301 Moved Permanently
Location: http://www.google.com/
Content-Type: text/html; charset=UTF-8
Server: gws
Content-Length: 219
X-XSS-Protection: 1; mode=block
X-Frame-Options: SAMEORIGIN
Alternate-Protocol: 80:quic
Age: 25150
Date: Sun, 01 Jun 2014 13:09:35 GMT
Expires: Tue, 01 Jul 2014 13:09:35 GMT
Cache-Control: public, max-age=2592000
Connection: keep-alive
```

Important points

- The only thing that DNS acutally does is tie Domain names to IP Addresses
- HTTP Requests are sent to IP addresses, but include the domain name in the Host Header
- HTTP servers may serve different content depending on the contents of the Host Header

The exact way you configure your server to redirect http requests depends on the server you are using. 

- Apache servers can redirect via the .htaccess file ([Stackoverflow](http://stackoverflow.com/questions/1100343/apache-redirect-from-non-www-to-www))
- Nginx servers can redirect via server block ([Stackoverflow](http://stackoverflow.com/questions/10294481/how-to-redirect-a-url-in-nginx))
- Node.js servers inspect the HTTP Host header, and headers modify the response object

```javascript
// Inside node.js request handler
response.writeHead(302, {
  'Location': 'your/path/here',
  // optional other headers...
});
response.end();
```

   