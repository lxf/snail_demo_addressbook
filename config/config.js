/**
 *配置文件
 */
var path = require('path');
var config = {
    app_name: 'JIT Lab',
    app_description: 'Manage Demo',
    app_keywords: 'Demo',
    app_version:'1.0',
    cookieSecret: 'upsnail',
    cookiekey: 'cookiename',
    //1表示是开发环境0:表示非开发环境
    isdevelop:1,
    //盐值
    secretsalt:'what1r2u3nong7sha5lei4',
   // db: 'mongodb://root:Abc123456@ds047571.mongolab.com:47571/jitlabdb',
    db:'mongodb://127.0.0.1/jitlabdb',
    // redis 配置，默认是本地
    redis_host: '127.0.0.1',
    redis_port: 6379,
    // 程序运行的端口
    port: 3000,
    host: '127.0.0.1',
    // 邮箱配置
    mail_opts: {
        host: 'smtp.126.com',
        port: 25,
        auth: {
            user: 'mspublic@126.com',
            pass: ''
        }
    }
};

module.exports = config;
