var crypto = require('crypto');
var tools = require('../common/tool');
var _ = require("underscore")._;
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
        operate_date: new Date(),
        isdel: isdel
    });

    team.save(callback);
}

TeamDAO.prototype.getTeams = function (opts, callback) {
    /*
    *
    *req.body.pageCondition包括如下属性
    *{Condition:{Sorting:{},Filters:[]},PageFilter:{CurrentIndex:1,PageSize:20}}
    */
    var pageIndex = opts.pageCondition.PageFilter.CurrentIndex || 1;
    var pageSize = opts.pageCondition.PageFilter.PageSize || 20;
    var skipNum = (pageIndex - 1) * pageSize;
    var sortobj = opts.Sorting;
    var queryobj = {};
    var showcols = opts.ShowColumns;

    Team.count({}, function (err, count) {
        var query = Team.find(tools.objToString(opts.pageCondition.Condition.Filters), showcols).sort(sortobj).skip(skipNum).limit(pageSize);
        query.exec(callback);
    });
};

//查询总共记录数
TeamDAO.prototype.getTeamsCount = function (opts, callback) {
    Team.count(opts, callback);
}

module.exports = new TeamDAO();

