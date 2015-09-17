var express = require('express');
var config = require('./config/config');
var router = express.Router();

var homeController = require('./controllers/Home');
var university = require('./controllers/university');
var college = require('./controllers/college');
var user = require('./controllers/user');
var userapi=require('./API/userAPI');
var img=require('./controllers/img');

// 显示首页
router.get('/', homeController.showIndex);
router.get('/login', homeController.showIndex);

router.post('/login', homeController.Login);
router.get('/generatecode', img.generateImgCode);

// 注册
router.get('/reg', homeController.showReg);
router.post('/reg', homeController.Reg);


router.get('/university/add', university.showAddView)
router.post('/university/add', university.addData)

router.post('/college/getSchools', college.getSchoolData)
router.post('/college/getMajors', college.getMajorsData)

router.get('/major', university.getMajorByUnivID)

router.get('/user/edit', user.editUserInfo)
router.post('/user/update', user.updateUserInfo)

//API related
// router.post('/api/getuserinfo',userapi.getUserInfo)

function checkNotLogin(req, res, next) {
    if (req.session.account) {
        req.flash('error', '已登录!');
        res.redirect('back');//返回之前的页面
    }
    next();
}
module.exports = router;