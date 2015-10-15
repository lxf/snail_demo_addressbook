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
		console.log('err:' + err);
		console.log(result);
	});
}

exports.getTeams = function (req, res, next) {
	console.log('??????');
	teamModel.getTeams({ 'isdel': false }, {}, function (err, result) {
		var griddata = { rows: result, total: result.length };
		res.json(griddata);
	});

}