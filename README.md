# ![logo](http://ww4.sinaimg.cn/large/61ff0de3jw1e76l9veqwsj20190190sj.jpg) cooker ![npm](https://badge.fury.io/js/cooker.png)

a minimalism style version manager for static files.

![screenshot](http://ww3.sinaimg.cn/large/61ff0de3jw1e86g0oi2jwj20lf0ioq6h.jpg)

## How to install

````
$ sudo npm install cooker -g
````

## Usage

### Use CLI
````
// update version by youself
$ cooker up README.md

// update versions of a.md and b.js
$ cooker up a.md b.js

// update versions of all js files
$ cooker up -f *.js

// update versions of a.md and all css files in all dirs
$ cooker up a.md -f **/*.css
````

## Run unit-test (Mocha)

````
$ git clone https://github.com/turingou/cooker.git
$ cd cooker
$ npm install 
$ npm test
````