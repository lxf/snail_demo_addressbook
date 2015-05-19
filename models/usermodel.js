var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    nickname: { type: String },
    account: { type: String },
    realname: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    pwd: { type: String },
    school_year: { type: Number },
    school: { type: String },
    major: { type: String },
    description: { type: String }
});


var User = mongodb.mongoose.model("UserModel", UserSchema);

var UserDAO = function () { };

UserDAO.prototype.Reg = function (account, realname, nickname, email, phone, pwd, school_year, school, major,description, callback) {
    var usermodel = new User();
    usermodel.nickname = nickname;
    usermodel.account = account;
    usermodel.email = email;
    usermodel.phone = phone;
    usermodel.pwd = pwd;
    usermodel.school_year = school_year;
    usermodel.school = school;
    usermodel.major = major;
    usermodel.realname = realname; 
    usermodel.description = description;
    //判断是否存在同样的帐号或者邮箱
    usermodel.save(callback);
}

/**
 * 根据登录名查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} account 登录名
 * @param {Function} callback 回调函数
 */
UserDAO.prototype.getUserByLoginName = function (account, callback) {
    User.findOne({ 'account': account }, callback);
};

/**
 *获取一组用户
 *@param{String} query 关键字
 *@param{Object} opts 选项
 @param {Function} callback 回调函数
*/
UserDAO.prototype.getUsersByQuery = function (query, opts, callback) {
    User.find(query, '', opts, callback);
};

/**
*校验登录
*@param{String} account 帐号
*@param{String} pwd 密码
*@param{FUnction} callback 回调函数
*/
UserDAO.prototype.checkLogin = function (account, pwd, callback) {
    User.findOne({ account: account, pwd: pwd }, callback);
}

module.exports = new UserDAO();