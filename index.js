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
    zipper = require('./lib/zipper');

// CLI
exports.cli = function() {
    if (argv.w || argv.watch) {
        console.log(color.yellow('zipping...!'));
        var zip = new zipper( __dirname + '/demo.zip');
        zip.create([{
          name: 'demo.txt',
          dir: __dirname + '/demo.txt'  
        }],function(stat){
            console.log('ok');
        });
    }
}