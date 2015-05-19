﻿var express = require('express');
var config = require('./config/config');
var router = express.Router();

var index = require('./controllers/index');
var university = require('./controllers/university');
var college = require('./controllers/college');

router.get('/', index.showApp);
router.get('/login', index.showApp);

router.get('/reg', index.showReg);

router.post('/reg', index.Reg);

//router.post('/login', checkNotLogin);
router.post('/login', index.Login);

router.get('/university/add', university.showAddView)
router.post('/university/add', university.addData)

router.post('/college/getSchools', college.getSchoolData)
router.post('/college/getMajors', college.getMajorsData)

router.get('/major', university.getMajorByUnivID)

function checkNotLogin(req, res, next) {
    if (req.session.account) {
        req.flash('error', '已登录!');
        res.redirect('back');//返回之前的页面
    }
    next();
}
module.exports = router;