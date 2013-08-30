// version ctrler
var Version = require('releaser'),
    file = require('./file'),
    pkg = require('../pkg'),
    sys = pkg.fetch('./package.json'),
    _ = require('underscore'),
    async = require('async');

// 读取当前目录下的版本信息文件
exports.read = function(cb) {
    console.log(__dirname);
    pkg.check(__dirname + '/.cooker-versions.json', function(exist, file) {
        if (exist) {
            cb(true, file);
        } else {
            cb(false);
        }
    });
}

// 创建一个空的版本清单
exports.createList = function(files, cb) {
    var timestamp = new Date(),
        filesMap = {},
        filesList = [];
    if (files.length > 0) {
        _.each(files, function(file) {
            filesMap[file.substr(file.lastIndexOf('/') + 1)] = {
                dir: file,
                ver: new Version()
            };
            filesList.push({
                name: file.substr(file.lastIndexOf('/') + 1),
                dir: file,
                ver: new Version()
            });
        });
    }
    pkg.set('.cooker-versions.json', {
        _created: timestamp,
        _engine: {
            name: sys.name,
            version: sys.version
        },
        files: filesMap
    });
    cb(filesList);
}

// 更新版本清单
exports.update = function(versions, files, cb) {
    var update = function(file, callback) {

    };
    async.each(files, update, function(err) {
        cb(err);
    })
}

// cp
exports.backup = function(files, cb) {
    var cp = function(single, callback) {
        console.log(single.name + '@' + single.ver.version);
        file.cp(single.dir, single.name + '@' + single.ver.version, function(err) {
            cb(err);
        });
    }
    async.each(files, cp, function(err) {
        cb(err);
    })
}