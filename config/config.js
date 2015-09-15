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
    db: 'mongodb://snail:123465@ds059938.mongolab.com:59938/upsnail',
    //db:'mongodb://127.0.0.1/upsnail',
    // redis 配置，默认是本地
    redis_host: '127.0.0.1',
    redis_port: 6379,
    // 程序运行的端口
    port: 18080,
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
