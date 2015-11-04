var crypto = require('crypto');
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
    var showcols = opts.Columns;
    //暂时不扩展，查询条件包含>,<等，只考虑相等
    _.each(opts.pageCondition.Condition.Filters, function (item, index, list) {
        for (var attr in item) {
            if (attr != 'Filter') {
                queryobj[attr] = item[attr];
            }
        }
    });
    // var query = Team.find({}, []).sort({teamname:1}).skip(0).limit(20);
    var query = Team.find(queryobj, showcols).sort(sortobj).skip(skipNum).limit(pageSize);
    query.exec(callback);
};

module.exports = new TeamDAO();

