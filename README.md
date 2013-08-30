# ![logo](http://ww4.sinaimg.cn/large/61ff0de3jw1e76l9veqwsj20190190sj.jpg) cooker ![npm](https://badge.fury.io/js/cooker.png)

123

a minimalism style version manager for static files.

## How to install

````
$ sudo npm install cooker -g
````

## Usage

### Use CLI
````
// update version by youself
$ cooker up README.md
````

### Sample code

now building...

````javascript
var cooker = require('cooker');

// using cooker to watch psd changes
cooker.watch('./psd',function(changes){
  console.log(changes);
});

// watch file changes and created when new psd added.
cooker.watch('./psd',function(changes){
  // if new psd added to './psd'
  if (changes.type == 'new') {
    // using defalut zip config
    cooker.zip('./psd',function(zipfile){
      // zipfile should be 'psd_v0.0.x.zip'
      console.log(zipfile)
    })
  }
});
````

## API

### cooker.watch(config,callback) 
- `config` [Object] or [String] :
  - `ingore`: [Array] : filetypes to ignore.
  - `dir`: [String] : dir for watch
- `callback` [Function]
  - `err`
  - `changes`: [Array] list every changes here.
 
### cooker.zip(config,callback)
- `config` [Object] or [String]:
  - `fileDir`: [String] dir wanna to zip
  - `dist`: [String] `mv` zip file to selected dist dir
  - `start`: [Number] : like `0.0.1` or `1.0.0`
  - `divider`: [String] : divider that divide filename from version-stamps , e.g: "-" or "." or ("_" -> "filename_v0.1.0" )
  - `afterfix` : [String] : string after version-stamp. e.g: "filename_v1.0.1_2013-20-20.zip"
- `fileDir` [String]
- `callback` [Function]
  - `err`
  - `pkg` zipped package dir

## Run unit-test (Mocha)

````
$ git clone https://github.com/turingou/cooker.git
$ cd cooker
$ npm install 
$ npm test
````

## Changelog

- `0.0.1` logo added