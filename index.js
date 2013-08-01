//                     __            
//   _________  ____  / /_____  _____
//  / ___/ __ \/ __ \/ //_/ _ \/ ___/
// / /__/ /_/ / /_/ / ,< /  __/ /    
// \___/\____/\____/_/|_|\___/_/     
// 
// a minimalism style version manager

var optimist = require('optimist'),
    argv = optimist.argv,
    color = require('colors'),
    zipper = require('./lib/zipper'),
    watcher = require('./lib/watcher'),
    version = require('./lib/version');

// version manager
exports.version = version;

// create .zip
exports.zip = function(dist,dir) {
    var zip = new zipper(dist);
    zip.create([{
        name: 'demo.txt',
        dir: __dirname + '/demo.txt'
    }], function(err, stat) {
        if (!err) {
            console.log(stat);
        }
    })
};

// watch files change
exports.watch = function(dir, cb) {
    watcher.watch(dir, function(monitor) {
        cb(monitor);
    });
}

// CLI
exports.cli = function() {
    if (argv.w) {
        console.log(color.yellow('[Cooker] watching...!'));
        exports.watch(argv.w, function(monitor) {
            monitor.on("created", function(f, stat) {
                // Handle new files
                console.log('new files added!!!')
            })
            monitor.on("changed", function(f, curr, prev) {
                // Handle file changes
                console.log('files changed!!!')
            })
            monitor.on("removed", function(f, stat) {
                // Handle removed files
                console.log('files removed!!!')
            })
        });
    }
};