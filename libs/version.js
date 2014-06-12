// version ctrler
var Version = require('releaser');
var file = require('./file');
var pkg = require('../pkg');
var sys = pkg.fetch('/package.json');
var _ = require('underscore');
var async = require('async');

// 读取当前目录下的版本信息文件
exports.read = function(callback) {
  var dir = process.cwd();
  pkg.check(dir + '/.cooker-versions.json', function(exist, file) {
    if (exist) return callback(true, file);
    return callback(false);
  });
}

// 创建一个空的版本清单
exports.createList = function(files, callback) {
  var timestamp = new Date();
  var filesMap = {};
  var filesList = [];
  var dir = process.cwd();

  if (files.length > 0) {
    _.each(files, function(file) {
      var f = {
        name: file.substr(file.lastIndexOf('/') + 1, file.lastIndexOf('.')),
        dir: file,
        type: file.substr(file.lastIndexOf('.')),
        ver: new Version()
      };
      filesMap[file.substr(file.lastIndexOf('/') + 1)] = f;
      filesList.push(f);
    });
  }

  pkg.set(dir + '/.cooker-versions.json', {
    _created: timestamp,
    _engine: {
      name: sys.name,
      version: sys.version
    },
    files: filesMap
  });

  callback(filesList);
}

// 更新版本清单
exports.update = function(versions, files, callback) {
  var dir = process.cwd();

  function cp(f, callback) {
    exports.cp(f, function(err) {
      callback(err)
    });
  }

  function update(file, callback) {
    var filename = file.substr(file.lastIndexOf('/') + 1);
    var f = versions.files[filename];
    // 如果文件已经在清单中
    if (f) {
      f.ver = new Version({
        number: f.ver.number + 1
      });
      cp(f, callback);
    } else {
      // 判断文件是否是源文件，不带cooker戳的文件
      // 这个判断方法还太武断
      if (filename.indexOf(sys.name) == -1) {
        // 如果文件未曾在清单中
        f = {
          name: file.substr(filename, file.lastIndexOf('.')),
          dir: file,
          type: file.substr(file.lastIndexOf('.')),
          ver: new Version()
        };
        versions.files[filename] = f;
        cp(f, callback);
      } else {
        callback();
      }
    }
  }

  // 写入新的版本清单
  async.each(files, update, function(err) {
    pkg.set(dir + '/.cooker-versions.json', versions);
    callback(err);
  });

}

// cp signle
exports.cp = function(single, callback) {
  var cpdate = [
    single.ver.created.getFullYear(),
    single.ver.created.getMonth() + 1,
    single.ver.created.getDate()
  ].join('-');
  file.cp(single.dir, [
    single.name,
    '@',
    single.ver.version,
    '_',
    cpdate,
    '_',
    sys.name,
    single.type
  ].join(''), callback);
}

// back up file list
exports.backup = function(files, callback) {
  async.each(files, exports.cp, callback);
}