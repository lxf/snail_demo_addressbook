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
    //�ж��Ƿ����ͬ�����ʺŻ�������
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
*У���¼
*@param{String} account �ʺ�
*@param{String} pwd ����
*@param{FUnction} callback �ص�����
*/
UserDAO.prototype.checkLogin = function (account, pwd, callback) {
    User.findOne({ account: account, pwd: pwd }, callback);
}

module.exports = new UserDAO();