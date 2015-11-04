var crypto = require('crypto');
var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
var ObjectId = Schema.ObjectId;

//团队模型
var TeamSchema = new Schema({
    teamname: { type: String },
    description: { type: String },
    isdel: { type: Boolean, default: false },
    operate_date: { type: Date, default: Date.now }
});

var Team = mongodb.mongoose.model("c_team", TeamSchema);

var TeamDAO = function () { };

//新增一个团队
TeamDAO.prototype.addTeam = function (teamname, description, isdel, callback) {
    var team = new Team({
        teamname: teamname,
        description: description,
        operate_date:new Date(),
        isdel: isdel
    });

    team.save(callback);
}

TeamDAO.prototype.getTeams = function (query, opts, callback) {
    Team.find(query, '', opts, callback);
};

module.exports = new TeamDAO();

