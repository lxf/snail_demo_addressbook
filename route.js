var express = require('express');
var config = require('./config');
var router = express.Router();

var index = require('./controllers/index');
var university = require('./controllers/university');
var college = require('./controllers/college');

router.get('/', index.showApp);

router.get('/reg', index.showReg);

router.post('/reg', index.Reg);

router.post('/login', index.Login);

router.get('/university/add', university.showAddView)
router.post('/university/add', university.addData)

router.post('/college/getSchools', college.getSchoolData)
router.post('/college/getMajors', college.getMajorsData)

router.get('/major', university.getMajorByUnivID)

module.exports = router;