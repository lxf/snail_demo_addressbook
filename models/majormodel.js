var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
var ObjectId = Schema.ObjectId;

//专业模型
var MajorSchema = new Schema({
    name: { type: String }
});

var Major = mongodb.mongoose.model("c_major", MajorSchema);
var MajorDAO = function () { };

//获取专业名称
MajorDAO.prototype.getMajorNameByID=function(major,callback)
{
     Major.findById(major, callback);
}
module.exports=new MajorDAO();
