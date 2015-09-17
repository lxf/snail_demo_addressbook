
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var moment = require('moment');
moment.locale('zh-cn'); // 使用中文

// 格式化时间
exports.formatDate = function (date, friendly) {
  date = moment(date);

  if (friendly) {
    return date.fromNow();
  } else {
    return date.format('YYYY-MM-DD HH:mm');
  }

};

exports.validateAccount = function (str) {
  return (/^[a-zA-Z0-9\-_]+$/i).test(str);
};

exports.bhash = function (str, callback) {
  //bcrypt.hash(str, 10, callback);
};

exports.bcompare = function (str, hash, callback) {
  //bcrypt.compare(str, hash, callback);
};

/**
 * MD5加密
 * @param data
 * @returns {*}
 */
exports.md5 = function(data) {
	return crypto.createHash('md5').update(data).digest('hex');
}
