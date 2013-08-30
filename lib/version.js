// version ctrler
var Version = require('releaser'),
    file = require('./file'),
    pkg = require('../pkg'),
    sys = pkg.fetch('./package.json'),
    _ = require('underscore'),
    async = require('async');

// 读取当前目录下的版本信息文件
exports.read = function(cb) {
    var dir = process.cwd();
    pkg.check(dir + '/.cooker-versions.json', function(exist, file) {
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
        filesList = [],
        dir = process.cwd();
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
    cb(filesList);
}

// 更新版本清单
exports.update = function(versions, files, cb) {
    var dir = process.cwd();
    var update = function(file, callback) {
        var f = versions.files[file.substr(file.lastIndexOf('/') + 1)];
        f.ver = new Version({number: f.ver.number + 1});
        // console.log(f);
        exports.cp(f,function(err){
            callback(err)
        });
    };
    async.each(files, update, function(err) {
        // 写入新的版本清单
        pkg.set(dir + '/.cooker-versions.json', versions);
        cb(err);
    })
}

// cp signle
exports.cp = function(single, cb) {
    file.cp(single.dir, single.name + '@' + single.ver.version + single.type, function(err) {
        cb(err);
    });
}

// back up file list
exports.backup = function(files, cb) {
    async.each(files, exports.cp, function(err) {
        cb(err);
    })
}