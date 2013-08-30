var mkdirp = require('mkdirp'),
    zipper = require('./zipper'),
    watcher = require('./watcher'),
    _ = require('underscore');

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
}

// mkdirp
exports.mkdir = function(dir, cb) {
    mkdirp(dir, function(err) {
        cb(err);
    });
}

// create xxx.zip
exports.zip = function(dist, files, cb) {
    var zip = new zipper(dist);
    zip.create(files, function(err, stat) {
        cb(err, stat)
    })
};

// pack files to zip
exports.pack = function(files, cb) {
    var filelist = [];
    _.each(files, function(file) {
        filelist.push({
            name: file.substr(file.lastIndexOf('/') + 1),
            dir: file
        })
    })
    console.log(filelist);
    exports.zip('./demo.zip', filelist, function(err, stat) {
        cb(err, stat);
    })
}

// watch files change
exports.watch = function(dir, cb) {
    watcher.watch(dir, function(monitor) {
        cb(monitor);
    });
};

// if (argv.w) {
//     console.log(color.yellow('[Cooker] watching...!'));
//     exports.watch(argv.w, function(monitor) {
//         monitor.on("created", function(f, stat) {
//             // Handle new files
//             console.log('new files added!!!')
//         })
//         monitor.on("changed", function(f, curr, prev) {
//             // Handle file changes
//             console.log('files changed!!!')
//         })
//         monitor.on("removed", function(f, stat) {
//             // Handle removed files
//             console.log('files removed!!!')
//         })
//     });
// } else if (argv)