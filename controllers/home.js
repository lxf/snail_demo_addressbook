//工具组件
var validator = require('validator');
var eventproxy = require('eventproxy');
var utility = require('utility');
var moment = require('moment');
var _ = require("underscore")._;
var tools = require('../common/tool');
var mail = require('../common/mail');
var Promise = require('bluebird');
//配置
var config = require('../config/config');

//模型
var User = require('../models/usermodel');
var Major = require('../models/majormodel');
var College = require('../models/collegemodel');


exports.showIndex = function (req, res) {
    //生成随机code，放到session中
    var randomcode = Math.random().toString(36).substr(2);
    req.session.randomcode = randomcode;
    res.render('login', { title: config.app_name, version: config.app_version, randomcode: randomcode });
}

exports.showReg = function (req, res) {
    // var schoolyears = [],
    //     todayyear = (new Date()).getFullYear(),
    //     areas = [];
    // //年级
    // for (var i = todayyear; i > todayyear - 10; i--) {
    //     schoolyears.push(i);
    // }
    // College.getCollegeInfo({}, { 'row.address': 1 }, {}, function cb(err, data) {
    //     //地区
    //     _.each(data[0].row, function (ele, index, list) {
    //         areas.push(ele.address);
    //     });
    //     res.render('reg', { schoolyears: schoolyears, schoolareas: areas, schools: [], majors: [] });
    // });
}
//注册
exports.Reg = function (req, res, next) {
    //     var account = validator.trim(req.body.account);
    //     var nickname = validator.trim(req.body.nickname);
    //     var realname = validator.trim(req.body.realname);
    //     var email = validator.trim(req.body.email);
    //     var phone = validator.trim(req.body.phone);
    //     var pwd = validator.trim(req.body.password);
    //     var repwd = validator.trim(req.body.repassword);
    //     var school_year = validator.trim(req.body.school_year);
    //     var school = validator.trim(req.body.school);
    //     var school_area = validator.trim(req.body.school_area);
    //     var major = validator.trim(req.body.major);
    //     var description = validator.trim(req.body.description);
    //     var ep = new eventproxy();
    //     ep.fail(next);
    //     ep.on('prop_err', function (msg) {
    //         res.status(422);
    //         res.render('reg', { error: msg })
    //     });
    //     if ([account, nickname, phone, pwd, repwd, realname, school_area].some(function (item) { return item === ''; })) {
    //         ep.emit('prop_err', '信息不完整');
    //         return;
    //     }
    // 
    //     if (account.length < 6) {
    //         ep.emit('prop_err', '账号不能少于6个字符');
    //         return;
    //     }
    // 
    //     if (!tools.validateAccount(account)) {
    //         ep.emit('prop_err', '账号格式不合法');
    //         return;
    //     }
    // 
    //     if (!validator.isEmail(email)) {
    //         return ep.emit('prop_err', '邮箱不合法。');
    //     }
    //     if (pwd !== repwd) {
    //         return ep.emit('prop_err', '两次密码输入不一致。');
    //     }
    // 
    //     User.getUsersByQuery({ '$or': [{ 'account': account }, { 'email': email }] }, {}, function (err, users) {
    //         if (err) {
    //             return next(err);
    //         }
    //         if (users.length > 0) {
    //             ep.emit('prop_err', '用户名或者邮箱重复');
    //             return;
    //         }
    //     });
    // 
    //     User.Reg(account, realname, nickname, email, phone, pwd, school_year, school, major, description, school_area, function (err) {
    //         if (err) {
    //             return next(err);
    //         }
    //         req.flash('success', '注册成功');
    //         // 发送激活邮件
    //         mail.sendActiveMail(email, utility.md5(email), nickname);
    // 
    //         res.render('welcome', {
    //             success: req.flash('success').toString() + '欢迎加入 ' + config.app_name + '！我们已给您的注册邮箱发送了一封验证邮件，请点击里面的链接来激活您的帐号。'
    //         });
    //     });

}

//登陆
exports.Login = function (req, res, next) {
    var ep = new eventproxy();
    var account = validator.trim(req.body.account).toLowerCase();
    var pwd = validator.trim(req.body.password);
    var imgcode = validator.trim(req.body.imgcode);
    var code = validator.trim(req.body.code);
    //随机值
    var randomcode = code;
    ep.fail(next);
    ep.on('prop_err', function (msg) {
        res.status(403);
        res.render('login', { error: msg })
    });

    if (imgcode != req.session.checkcode) {
        ep.emit('prop_err', '验证码输入不正确!');
        return;
    }

    if ([account, pwd, req.session.account].some(function (item) { return item === ''; })) {
        ep.emit('prop_err', '帐号、密码、验证码都不能为空!');
        return;
    }

    if (account.length < 5) {
        ep.emit('prop_err', '账号不能少于5个字符');
        return;
    }

    if (!tools.validateAccount(account)) {
        ep.emit('prop_err', '账号格式不合法');
        return;
    }
    //原始密码与我们的固定盐值进行拼接，然后做md5运算，运算后的结果再拼接上我们的随机码，再次md5运算，然后提交。
    req.session.account = account;
    var encryptpwd = tools.md5(tools.md5(pwd + config.secretsalt) + randomcode);

    User.checkLoginBySalt(account, function (err, data) {
        if (err) {
            return next(err);
        }
        if (data != null) {
            if (tools.md5(data.pwd + req.session.randomcode) == encryptpwd) {
                if (data.isadmin != 1) {
                    ep.emit('prop_err', '您没有权限登陆!');
                    return;
                }
                else {
                    //获取所有成员列表 
                    User.getUsersByCondition({ isadmin: false, isdel: false }, function (err, result) {
                        var griddata = { rows: result, total: result.length };
                        //遍历获取专业的名称
                        var getMajorName = function (item) {
                            var p = new Promise(function (resolve, reject) {
                                Major.getMajorNameByID(item.major, function (err, returndata) {
                                    if (!_.isNull(returndata)) {
                                        _.each(griddata.rows, function (inneritem, index, list) {
                                            if (inneritem.account == item.account) {
                                                inneritem.major = returndata.name;
                                            }
                                        });
                                    }
                                    resolve(returndata);
                                });
                            });
                            return p;
                        };

                        var promises = result.map(function (item) {
                            return getMajorName(item);
                        });

                        Promise.all(promises).then(function SuccessFun(result) {
                            res.render('index', { data: griddata, islogin: 1 });
                        }, function FailureFun(result) {
                            console.log(result);
                        });

                    });
                }
            }

        }

    });
}
