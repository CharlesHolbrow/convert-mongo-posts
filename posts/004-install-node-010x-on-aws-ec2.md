---
date: '2013-06-10 13:04:07'
edited: '2013-07-04 13:44:54'
title: Install Node 0.10.0 on AWS ec2 Ubuntu
tags: [aws, node, ec2]
hide: false
---
             
I wanted to install Node on a free AWS ec2 instance. As is so often the case with ec2, I had to jump through some hoops. Hopefully my own experiences can save you some time. 

As of June, 2013 Node runs perfectly on on Ubuntu 12.X LTS and 13.x. You can `$ apt-get install nodejs` but this will install node 0.6.0. 

If you already installed node 0.6.0, uninstall with 

```
$ sudo apt-get remove nodejs

# If needed clean up symbolic link created when we installed node js
$ hash -r
```

Add Chris Lea's PPA to the list of locations that apt-get searches, and get the package.

```
$ sudo add-apt-repository ppa:chris-lea/node.js  
$ sudo apt-get update  
$ sudo apt-get install build-essential  
$ sudo apt-get install nodejs  
$ sudo apt-get install npm
```

Now you can `npm install`, `npm update` etc

For the record -- I also was able to build node from source by following the steps in [this excellent blog post](http://cuppster.com/2011/05/12/diy-node-js-server-on-amazon-ec2/) on cuppster.com. 
