//                     __            
//   _________  ____  / /_____  _____
//  / ___/ __ \/ __ \/ //_/ _ \/ ___/
// / /__/ /_/ / /_/ / ,< /  __/ /    
// \___/\____/\____/_/|_|\___/_/     
// 
// a minimalism style version manager
var optimist = require('optimist'),
    argv = optimist.argv,
    watcher = require('./lib/watcher');

// CLI
exports.cli = function() {
    if (argv.w || argv.watch) {
        console.log('works!')
    }
}