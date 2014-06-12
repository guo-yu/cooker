// zipper ctrler
// var archiver = require('archiver'),
var fs = require('fs');

module.exports = Zip;

function Zip(dist) {
  this.zipper = archiver('zip');
  this.dist = fs.createWriteStream(dist);
  this.zipper.on('error', function(err) {
    throw err;
  });
}

Zip.prototype.add = function(file) {
  if (!this.zipper) return false;
  this.zipper
    .append(fs.createReadStream(file.dir), {
      name: file.name
    });
}

Zip.prototype.create = function(files, callback) {
  var self = this;
  // create stream
  self.zipper.pipe(this.dist);
  // add files
  (function(list) {
    for (var i = 0; i < list.length; i++) {
      self.add(list[i]);
    }
  })(files);
  // final
  self.zipper.finalize(callback);
}