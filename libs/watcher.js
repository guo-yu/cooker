// watcher ctrler
// var watcher = require('watch');

exports.watch = function(dist, callback) {
  watcher.createMonitor(dist, callback);
}