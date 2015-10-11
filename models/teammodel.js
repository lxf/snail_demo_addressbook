var crypto = require('crypto');
var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
var ObjectId = Schema.ObjectId;

//团队模型
var TeamSchema = new Schema({
    teamname: { type: String },
    description: { type: String },
    isdel: { type: Boolean }
});