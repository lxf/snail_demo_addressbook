var crypto = require('crypto');
var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
var ObjectId = Schema.ObjectId;

//团队-成员模型
var UserTeamSchema = new Schema({
    teamid: { type: ObjectId },
	userid: { type: ObjectId },
    isdel: { type: Boolean }
});