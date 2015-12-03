---
publish: true
date: '2015-11-25 00:46:11'
edited: '2015-11-25 00:52:32'
title: Getting Npm, Anaconda, Jupyter, and Brew to Play Together
tags: ['']
---

I chose to use Anaconda to manage my Python installation in favor of the OSX stock Python 2.7 or brew'd Python. This makes it easy to switch between Python 2 and Python 3, and it works well with [Project Jupyter](http://jupyter.org/). 

I would like to default to Python 3.4.3, because that works best with iPython notebooks in Project Jupyter. But npm package often use node-gyp to build packages, and node-gyp is not compatible with Python 3. When I tried to install the npm fsevents package, I got the following error:

```
gyp ERR! configure error 
gyp ERR! stack Error: Python executable "python" is v3.4.3, which is not supported by gyp.
gyp ERR! stack You can pass the --python switch to point to Python >= v2.5.0 & < 3.0.0.
gyp ERR! stack     at failPythonVersion (/usr/local/lib/node_modules/npm/node_modules/node-gyp/lib/configure.js:108:14)
...
```

It is possible to specify a python version when npm installing `npm install --python=python2.7`. We can also configure npm to use a specific version of python ([stackoverflow](http://stackoverflow.com/questions/20454199/how-to-use-a-different-version-of-python-during-npm-install)).

``` bash
$ npm config set python python2.7
```

This solved the node-gyp problem, but created another problem. By default, npm modules installed with the `-g` are installed to `/usr/local`. You can check where global npm modules are stored with

``` bash
$ npm config get prefix
```

I usually just use sudo when installing global npm modules in OSX. However, for some reason the when I `sudo npm install -g` with with npm configured to use Python 2.7, Python ran as a different user without admin privileges, and failed. (Does anyone know why?)

[It is safe](https://github.com/npm/npm/issues/3139) to use sudo when npm installing, but I would prefer to sudo as little as possible. To solve the problem, I configured npm to install global packages to a directory that does not require admin privileges. 

It is not difficult to configure npm to use a custom path for storing global modules ([stackoverflow](http://stackoverflow.com/questions/19352976/npm-modules-wont-install-globally-without-sudo)).

``` bash
$ npm config set prefix '~/.npm-packages'
```

Then add the following to .bashrc (linux) .bash_profile (osx)

``` bash
export PATH="$PATH:$HOME/.npm-packages/bin"
```

This also allows us to `npm install -g` without sudo.
