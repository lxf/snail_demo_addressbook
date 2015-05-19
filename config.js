/**
 *配置文件
 */

var path = require('path');
var config = {
    app_name: '大蜗牛通讯录',
    app_description: '通讯录',
    app_keywords: '通讯录',
    cookieSecret: 'upsnail',
    cookiekey:'cookiename',
    host: 'localhost',
    // mongodb 配置
    db: '',
    // redis 配置，默认是本地
    redis_host: '127.0.0.1',
    redis_port: 6379,
    // 程序运行的端口
    port: 3000,
    wla:222,
    // 邮箱配置
    mail_opts: {
        host: 'smtp.126.com',
        port: 25,
        auth: {
            user: '',
            pass: ''
        }
    }
};

module.exports = config;
