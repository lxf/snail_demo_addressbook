var validator = require('validator');
var eventproxy = require('eventproxy');
var teamModel = require('../models/teammodel');
var _ = require("underscore")._;

exports.showTeam = function (req, res) {
	res.render('team', { data: [], islogin: 1 });
}

//新增Team
exports.addTeam = function (req, res) {
	var teamname = req.body.teamname,
		description = req.body.description,
		isdel = req.body.isdel;

	teamModel.addTeam(teamname, description, isdel, function (err, result) {
		// console.log('err:' + err);
		// console.log(result);
	});
}

//查询获取团队
exports.getTeams = function (req, res, next) {
	var pageCon = req.body;
	teamModel.getTeams(pageCon, function (err, result) {
		teamModel.getTeamsCount({}, function (err, count) {
			var griddata = { rows: result, total: count };
			res.json(griddata);
		})
	});


}