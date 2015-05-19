var express = require('express');
var config = require('../config');
var router = express.Router();


router.get('/index/', function (req, res) {
    res.send('测试路由');
});

module.exports = router;