var fs = require('fs');

exports.fetch = function(file) {
  return JSON.parse(fs.readFileSync(__dirname + file));
}

exports.set = function(file, obj) {
  if (obj && typeof(obj) == 'object') {
    fs.writeFileSync(file, JSON.stringify(obj));
    return obj;
  } else {
    return false;
  }
}

exports.check = function(dir, cb) {
  fs.readFile(dir, function(err, stat) {
    if (!err) {
      cb(true, JSON.parse(stat));
    } else {
      cb(false);
    }
  });
}