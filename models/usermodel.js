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
    this.school = user.school;
    this.major = user.major;
    this.realname = user.realname;
    this.description = user.description;
}

var UserDAO = function () { };

UserDAO.prototype.Reg = function (account, realname, nickname, email, phone, pwd, school_year, school, major, description, callback) {
    var md5 = crypto.createHash('md5');

    var user = {
        nickname: nickname,
        account: account,
        email: email,
        phone: phone,
        pwd: md5.update(pwd).digest('hex'),
        school_year: school_year,
        school: school,
        major: major,
        realname: realname,
        description: description
    };

    var usermodel = new User(user);

    //�ж��Ƿ�����ͬ�����ʺŻ�������
    usermodel.save(callback);
}

/**
 * ���ݵ�¼�������û�
 * Callback:
 * - err, ���ݿ��쳣
 * - user, �û�
 * @param {String} account ��¼��
 * @param {Function} callback �ص�����
 */
UserDAO.prototype.getUserByLoginName = function (account, callback) {
    User.findOne({ 'account': account }, callback);
};

/**
 *��ȡһ���û�
 *@param{String} query �ؼ���
 *@param{Object} opts ѡ��
 @param {Function} callback �ص�����
*/
UserDAO.prototype.getUsersByQuery = function (query, opts, callback) {
    User.find(query, '', opts, callback);
};

/**
*У����¼
*@param{String} account �ʺ�
*@param{String} pwd ����
*@param{FUnction} callback �ص�����
*/
UserDAO.prototype.checkLogin = function (account, pwd, callback) {
    User.findOne({ account: account, pwd: pwd }, callback);
}


module.exports = new UserDAO();