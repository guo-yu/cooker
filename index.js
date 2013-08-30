//                     __            
//   _________  ____  / /_____  _____
//  / ___/ __ \/ __ \/ //_/ _ \/ ___/
// / /__/ /_/ / /_/ / ,< /  __/ /    
// \___/\____/\____/_/|_|\___/_/     
// 
// @brief: a minimalism style version manager for static files
// @author: [turing](http://guoyu.me)

var optimist = require('optimist'),
    argv = optimist.argv,
    color = require('colors'),
    version = require('./lib/version');

// CLI
exports.cli = function() {
    var params = argv._;
    // 手动升级版本，必须指定文件
    if (params[0] == 'up') {
        if (params.length > 1) {
            var files = params.slice(1);
            // 读取执行命令当前目录下的文件版本表
            console.log(color.yellow('[ Loading ] ') + '正在读取版本信息...');
            version.read(function(exist, versions) {
                if (exist) {
                    console.log(color.yellow('[ Success ] ') + '版本信息读取成功...');
                    // 升级版本
                    version.update(versions, files, function(err) {
                        if (!err) {
                            console.log(color.green('[ Success ] ') + '新版本创建成功，备份完成');
                        } else {
                            console.log(color.red('[ Error ] ') + '版本创建失败，详情如下：');
                            console.log(err);
                        }
                    });
                } else {
                    // 创建一个新的版本清单
                    console.log(color.yellow('[ Loading ] ') + '没有找到版本清单...');
                    version.createList(files, function(filelist) {
                        console.log(color.green('[ Success ] ') + '版本清单创建成功，创建时间：' + new Date());
                        // 保留一份老版本
                        version.backup(filelist, function(err) {
                            if (!err) {
                                console.log(color.green('[ Success ] ') + filelist[0].name + '等文件的新版本创建成功，备份完成');
                            } else {
                                console.log(color.red('[ Error ] ') + '版本创建失败，详情如下：');
                                console.log(err);
                            }
                        });
                    });
                }
            });
        } else {
             console.log(color.red('[ Error ] ') + '请指定需要监控版本的文件名称');
        }
    }
};

exports.watch = require('./lib/watcher').watch;
exports.zip = require('./lib/file').zip;