var express = require('express');
var config = require('./config/config');
var router = express.Router();

var homeController = require('./controllers/Home');
var university = require('./controllers/university');
var college = require('./controllers/college');
var user = require('./controllers/user');
var userapi=require('./API/userAPI');
var img=require('./controllers/img');

// 登陆
router.get('/', homeController.showLogin);
router.get('/login', homeController.showLogin);

//首页
router.get('/index',homeController.showIndex);

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

//更新用户信息
router.post('/user/update', user.partialUpdate)

//API related
// router.post('/api/getuserinfo',userapi.getUserInfo)

module.exports = router;