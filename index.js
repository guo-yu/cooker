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
    version = require('./lib/version'),
    finder = require('glob'),
    consoler = require('consoler');

// CLI
exports.cli = function() {
    var params = argv._;
    // 手动升级版本
    if (params[0] == 'up') {
        var files = [];
        // 指定了文件
        if (params.length > 1) {
            files = params.slice(1);
        }
        // 寻找匹配的文件
        if (argv.f) {
            files = files.concat(finder.sync(argv.f));
        }
        if (params.length == 1 && !argv.f) {
            files = finder.sync('**/*');
        }
        if (files.length > 0) {
            consoler.log('loading', '正在读取版本信息...');
            version.read(function(exist, versions) {
                if (exist) {
                    consoler.log('success', '版本信息读取成功...')
                    // 升级版本
                    version.update(versions, files, function(err) {
                        if (!err) {
                            consoler.log('success', '新版本创建成功，备份完成')
                        } else {
                            consoler.log('error', '版本创建失败，详情如下：')
                            console.log(err);
                        }
                    });
                } else {
                    // 创建一个新的版本清单
                    consoler.log('loading', '没有找到版本清单...')
                    version.createList(files, function(filelist) {
                        consoler.log('success', '版本清单创建成功，创建时间：' + new Date())
                        // 保留一份老版本
                        version.backup(filelist, function(err) {
                            if (!err) {
                                consoler.log('success', filelist[0].name + filelist[0].type + ' 等文件的新版本创建成功，备份完成')
                            } else {
                                consoler.log('error', '版本创建失败，详情如下：')
                                console.log(err);
                            }
                        });
                    });
                }
            });
        } else {
            consoler.log('error','没有找到任何匹配的文件，请指定文件');
        }
    }
};