var validator = require('validator');
var eventproxy = require('eventproxy');
var User = require('../models/usermodel');
var College = require('../models/collegemodel');
var _ = require("underscore")._;

exports.editUserInfo = function (req, res) {
    var account = req.session.account;
    if (account != null || account != undefined) {
        User.getUsersByQuery({ account: account }, {}, function (err, userdata) {
            if (err) {
                return next(err);
            }
            if (userdata != null) {
                console.log(userdata[0]);
                res.render('edit', { userinfo: userdata[0] });
            }
        });
    }
}

//用户更新信息
exports.updateUserInfo = function (req, res) {
    var _id = validator.trim(req.body._id);
    var nickname = validator.trim(req.body.nickname);
    var realname = validator.trim(req.body.realname);
    var email = validator.trim(req.body.email);
    var phone = validator.trim(req.body.phone);
    var school_year = validator.trim(req.body.school_year);
    var school = validator.trim(req.body.school);
    var school_area = validator.trim(req.body.school_area);
    var major = validator.trim(req.body.major);
    var description = validator.trim(req.body.description);
    var account = req.session.account;
    User.Update(_id, account, nickname, realname, email, phone, school_year, school, school_area, major, description, function (err, result) {
        res.render('edit', {
            error: '更新成功!'
        });
    });
}
//db:'mongodb://127.0.0.1/upsnail',