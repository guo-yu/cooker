// var zipper = require('./zipper'),
    // watcher = require('./watcher'),
var _ = require('underscore'),
    fs = require('fs');

// copy file
exports.cp = function(source, target, cb) {
    var rd = fs.createReadStream(source);
    rd.on("error", function(err) {
        cb(err);
    });
    var wr = fs.createWriteStream(target);
    wr.on("error", function(err) {
        cb(err);
    });
    wr.on("close", function(ex) {
        cb(null);
    });
    rd.pipe(wr);
};

// create xxx.zip
exports.zip = function(dist, files, cb) {
    var zip = new zipper(dist);
    zip.create(files, function(err, stat) {
        cb(err, stat)
    });
};

// pack files to zip
exports.pack = function(files, cb) {
    var filelist = [];
    _.each(files, function(file) {
        filelist.push({
            name: file.substr(file.lastIndexOf('/') + 1),
            dir: file
        })
    });
    exports.zip('./demo.zip', filelist, function(err, stat) {
        cb(err, stat);
    });
};

// watch files change
exports.watch = function(dir, cb) {
    watcher.watch(dir, function(monitor) {
        cb(monitor);
    });
};