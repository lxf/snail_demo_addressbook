var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session');
var mongostore = require('connect-mongo')(session);
var flash = require('connect-flash');

var config = require('./config/config');

var accessLog = fs.createWriteStream('access.log', { flags: 'a' });

var app = express();

var approute = require('./route');

app.use(logger('dev'));
app.use(logger({ stream: accessLog }));


//加上这一段可以用req.body.xx去解析form表单中字段
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '100mb'
}));

//view engine jade
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(flash());

//暂时先取消缓存这个功能
// app.use(session({
//     secret: config.cookieSecret,
//     key: config.cookiekey,//cookie name
//     cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },//30 days
//     store: new mongostore({ url: config.db }, function (e) {
//        
//     })
// }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', approute);

app.use(function (req, res, next) {
    var err = new Error('未找到您要找的内容!');
    err.status = 404;
    next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
 app.listen(config.port, config.host, function () {
            console.log(new Date());
            console.log('在端口:' + app.get('port') + '监听!');
        });
        
//setTimeout(function () {
//    console.log(new Date());
//    throw new Error("App Error");
//}, 10 * 1000);