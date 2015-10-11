var validator = require('validator');
var eventproxy = require('eventproxy');
var teamModel = require('../models/teammodel');
var _ = require("underscore")._;

exports.showTeam = function (req, res) {
	res.render('team', { data: [], islogin: 1 });
}