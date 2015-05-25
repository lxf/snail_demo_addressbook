//IOS API接口
exports.getUserInfo = function (req, res) {
	res.json({ account: "snail", nickname: "大蜗牛" });
}