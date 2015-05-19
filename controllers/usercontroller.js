var validator = require('validator');
var eventproxy = require('eventproxy');
var User = require('./usermodel').User;


//зЂВс
exports.signUp = function (req, res, next) {
    var account = validator.trim(req.body.account).toLowerCase();
    var nickname = validator.trim(req.body.nickname).toLowerCase();
    var phone = validator.trim(req.body.phone).toLowerCase();
    var pwd = validator.trim(req.body.password);
    var repwd = validator.trim(req.body.repassword);

}