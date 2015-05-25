var crypto = require('crypto');
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
    school_area: { type: String },
    school: { type: String },
    major: { type: String },
    description: { type: String },
    isEdit: { type: Boolean }//是否已经修改过
});


var User = mongodb.mongoose.model("UserModel", UserSchema);

function User(user) {
    this.nickname = user.nickname;
    this.account = user.account;
    this.email = user.email;
    this.phone = user.phone;
    this.pwd = user.pwd;
    this.school_year = user.school_year;
    this.school_area = user.school_area;
    this.school = user.school;
    this.major = user.major;
    this.realname = user.realname;
    this.description = user.description;
}

var UserDAO = function () { };

UserDAO.prototype.Reg = function (account, realname, nickname, email, phone, pwd, school_year, school, major, description, school_area, callback) {
    var md5 = crypto.createHash('md5');
    var user = {
        nickname: nickname,
        account: account,
        email: email,
        phone: phone,
        pwd: md5.update(pwd).digest('hex'),
        school_year: school_year,
        school_area: school_area,
        school: school,
        major: major,
        realname: realname,
        description: description
    };
    var usermodel = new User(user);
    usermodel.save(callback);
}
//用户编辑
UserDAO.prototype.Update = function (_id, account, nickname, realname, email, phone, school_year, school, school_area, major, description, callback) {
    User.findById(_id, function (err, userinfo) {
            userinfo.nickname = nickname,
            userinfo.email = email,
            userinfo.phone = phone,
            userinfo.school_year = school_year,
            userinfo.school_area = school_area,
            userinfo.school = school,
            userinfo.major = major,
            userinfo.realname = realname,
            userinfo.description = description,
            userinfo.isEdit = true
            userinfo.save(callback);
    });
    //User.findOne({ '_id': ObjectId(_id) }, function (err, userinfo) {
    //    if (err || !userinfo) {
    //        return callback(err);
    //    }

    //    userinfo.nickname = nickname,
    //    userinfo.email = email,
    //    userinfo.phone = phone,
    //    userinfo.school_year = school_year,
    //    userinfo.school_area = school_area,
    //    userinfo.school = school,
    //    userinfo.major = major,
    //    userinfo.realname = realname,
    //    userinfo.description = description,
    //    userinfo.isEdit = true
    //    userinfo.save(callback);
    //});
    /*
    var user = {
        nickname: nickname,
        email: email,
        phone: phone,
        school_year: school_year,
        school_area: school_area,
        school: school,
        major: major,
        realname: realname,
        description: description,
        isEdit: true
    };
    var usermodel = new User(user);
    var usermodel = new User();
    //console.log("{$set:{'nickname':"+nickname+",'email':"+email+",'phone':"+phone+",'school_year':"+school_year+",'school_area':"+school_area+",'major':"+major+",'realname':"+realname+",'description':"+description+",'isEdit':"+true+"}");
    User.update({ '_id': ObjectId(_id) }, {$set:{'nickname':nickname,'email':email,'phone':phone,'school_year':school_year,'school_area':school_area,'major':major,'realname':realname,'description':description,'isEdit':true}}, callback);
    */

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


module.exports = new UserDAO();