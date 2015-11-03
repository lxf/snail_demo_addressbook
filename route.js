var express = require('express');
var config = require('./config/config');
var router = express.Router();

var homeController = require('./controllers/Home');
var university = require('./controllers/university');
var teamController = require('./controllers/team');
var user = require('./controllers/user');
var userapi = require('./API/userAPI');
var img = require('./controllers/img');

/*
 *路由系统
 *方法:app.route()可以给路由创建链式路由句柄
 *新类:express.Router可以创建可挂在的模块化路由
 *
 */
// 登陆,路由这边有问题
router.get('/', homeController.showLogin);
router.get('/login', homeController.showLogin);
router.get('/user/logout', homeController.logout);

//首页
router.get('/index', authentication);
router.get('/index', homeController.showIndex);

//router.post('/index', authentication);
router.post('/index', homeController.Login);

//生成验证码
router.get('/generatecode', img.generateImgCode);

//团队管理
router.get('/team', authentication);
router.get('/team', teamController.showTeam);

router.post('/team/add', authentication);
router.post('/team/add', teamController.addTeam);

router.get('/team/getall', authentication);
router.get('/team/getall', teamController.getTeams);


// 注册
// router.get('/reg', homeController.showReg);
// router.post('/reg', homeController.Reg);


// router.get('/university/add', university.showAddView);
// router.post('/university/add', university.addData);

// router.post('/college/getSchools', college.getSchoolData);
// router.post('/college/getMajors', college.getMajorsData);
// 
// router.get('/major', university.getMajorByUnivID);

//更新用户信息
router.post('/user/update', authentication);
router.post('/user/update', user.partialUpdate);



//API related
//router.post('/api/getuserinfo',userapi.getUserInfo)

//检测session是否存在，对相关页面进行强制重定向
function authentication(req, res, next) {
    if (!req.session.account) {
        req.session.error = '请登录';
        return res.redirect('/');
    }
    next();
}
function notAuthentication(req, res, next) {
    if (req.session.account) {
        req.session.error = '已登录';
        return res.redirect('/index');
    }
    next();
}


module.exports = router;