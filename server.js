var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session');
var mongostore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('./config/config');

//测试路由
var testRoute=require('./testroute');

var accessLog = fs.createWriteStream('access.log', { flags: 'a' });

var app = express();

var approute = require('./route');
app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(logger({ stream: accessLog }));


//加上这一段可以用req.body.xx去解析form表单中字段
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '100mb'
}));

//模板引擎Jade
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(flash());

//这里网络不好的情况下会报错--之后再改
app.use(session({
    secret: config.cookieSecret,
    key: config.cookiekey,//cookie name
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 1 },//30 days
    store: new mongostore({ url: config.db }, function (e) {

    })
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', approute);

//挂载一个新的路由模块，以后可以按功能划分路由模块，
//测试路由
app.use('/snail',testRoute);

app.use(function (req, res, next) {
    var err = new Error('未找到您要找的内容!');
    err.status = 404;
    next(err);
});


if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

//记录错误日志
app.use(function (err, req, res, next) {
    /*
    * 这边可以把error，存储到数据库或者文件中，以备查找
    *一般企业会部署三套平台，（1）正式线上环境（2）线上测试环境（3）本地测试环境
    */
    
    //这里暂且直接打印出来
    console.log(err.stack);
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err.stack//这里需要看下
    });
});

module.exports = app;

app.listen(config.port, config.host, function () {
    console.log('在端口:' + app.get('port') + '监听!');
});
          
//setTimeout(function () {
//    console.log(new Date());
//    throw new Error("App Error");
//}, 10 * 1000);