var crypto = require('crypto');
var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
var ObjectId = Schema.ObjectId;

//用户模型
var UserSchema = new Schema({
    account: { type: String },
    realname: { type: String },
    phone: { type: String },
    email: { type: String },
    pwd: { type: String },
    school_year: { type: Number },
    major: { type: String },
    description: { type: String },
    isadmin: { type: Boolean },
    isdel: { type: Boolean }
});


var User = mongodb.mongoose.model("c_user", UserSchema);

function User(user) {
    this.account = user.account;
    this.email = user.email;
    this.phone = user.phone;
    this.pwd = user.pwd;
    this.school_year = user.school_year;
    this.major = user.major;
    this.realname = user.realname;
    this.description = user.description;
    this.isadmin = user.isadmin;
    this.isdel = user.isdel;
}

var UserDAO = function () { };

UserDAO.prototype.Reg = function (account, realname, email, phone, pwd, school_year, major, description, callback) {
    var md5 = crypto.createHash('md5');
    var user = {
        account: account,
        email: email,
        phone: phone,
        pwd: md5.update(pwd).digest('hex'),
        school_year: school_year,
        major: major,
        realname: realname,
        description: description
    };
    var usermodel = new User(user);
    usermodel.save(callback);
}

//部分更新
UserDAO.prototype.partialUpdate = function (_id, phone, email, school_year, major, description, isdel,callback) {
    User.findByIdAndUpdate(_id,
        {
            $set: {
                phone: phone,
                email: email,
                school_year: school_year,
                major: major,
                description: description,
                isdel: isdel
            }
        }, function (err, doc) {
            if (err) {
                return next(err);
            }
            else {
                return callback(doc);
            }
        });
}

UserDAO.prototype.getUserByLoginName = function (account, callback) {
    User.findOne({ 'account': account }, callback);
};

UserDAO.prototype.getUsersByQuery = function (query, opts, callback) {
    User.find(query, '', opts, callback);
};

UserDAO.prototype.checkLogin = function (account, pwd, callback) {
    User.findOne({ account: account, pwd: pwd }, callback);
}

UserDAO.prototype.checkLoginBySalt = function (account, callback) {
    User.findOne({ account: account }, callback);
}

UserDAO.prototype.getUsersByCondition = function (condition, callback) {
    User.find(condition, callback);
}

//TODO 这个要重点解释
module.exports = new UserDAO();