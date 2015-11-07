var validator = require('validator');
var eventproxy = require('eventproxy');
var User = require('../models/usermodel');
var _ = require("underscore")._;

//更新用户信息
exports.partialUpdate = function (req, res) {
    var account = req.session.account;
    if (account != null || account != undefined) {
        //管理员登陆状态
        var _id = validator.trim(req.body._id);

        //验证是否是手机号,'zh-TW'表示台湾等，awesome!
        if (validator.isMobilePhone(req.body.phone, 'zh-CN')) {
            var phone = validator.trim(req.body.phone);
        }
         
        //验证是否是邮箱
        if (validator.isEmail(req.body.email)) {
            var email = req.body.email;
        }

        //验证是否是合理范围的入学年
        if (validator.isInt(req.body.school_year, { min: 2009, max: 2015 })) {
            var school_year = validator.trim(req.body.school_year);
        }
        var major = validator.trim(req.body.major);
        var description = validator.trim(req.body.description);

        if (validator.isBoolean(req.body.isdel)) {
            var isdel = validator.trim(req.body.isdel);
        }
      
        //这边可以做相关的业务规则限制，这也是为什么要多加一个controller层的原因
        User.partialUpdate(_id, phone, email, school_year, major, description, isdel, function (result) {
            if (!result.errors) {
                res.json({"Item1":true,"Item2":"更新成功!","redirectUrl":"/index"});
            }
            else {
                res.json({"Item1":false,"Item2":"更新失败!"});
            }
        });
    }

};

