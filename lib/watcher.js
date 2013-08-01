// watcher ctrler

var watcher = require('watch');

exports.watch = function(dist,cb) {
    watcher.createMonitor(dist, function(monitor) {
        cb(monitor);
    })
}