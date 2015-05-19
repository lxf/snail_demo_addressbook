var validator = require('validator');
var eventproxy = require('eventproxy');
var User = require('../models/usermodel');


exports.editUserInfo = function (req, res) {
    var account = req.session.account;
	if (account != null || account != undefined) {
		User.getUsersByQuery({ account: account }, {}, function (err, data) {
			if (err) {
				return next(err);
			}
			if (data != null) {
				res.render('edit', { userinfo: data[0] });
			}
		});
	}
}