var validator = require('validator');
var eventproxy = require('eventproxy');
var creditCardModel = require('../models/creditcardmodel');
var _ = require("underscore")._;

exports.showSys = function (req, res) {
	res.render('sys', { data: [], islogin: 1 });
}

//查询数据
exports.getCreditData = function (req, res, next) {
	 var pageCon = req.body;
	creditCardModel.getTeams(pageCon, function (err, result) {
		creditCardModel.getTeamsCount({}, function (err, count) {
			var griddata = { rows: result, total: count };
			res.json(griddata);
		})
	});
}

