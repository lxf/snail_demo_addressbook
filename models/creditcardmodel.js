var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
var ObjectId = Schema.ObjectId;
var tools = require('../common/tool');

//交易模型
var CostSchema = new Schema({
    CostDate: Date,
    CostRemark: String,
    CostNum: Number
});

var Cost = mongodb.mongoose.model('c_cost', CostSchema);

var CostDAO = function () { };

CostDAO.prototype.getCostData = function (opts, callback) {
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

    Cost.count({}, function (err, count) {
        var query = Cost.find(tools.objToString(opts.pageCondition.Condition.Filters), showcols).sort(sortobj).skip(skipNum).limit(pageSize);
        query.exec(callback);
    });
};


CostDAO.prototype.getTeamsCount = function (opts, callback) {
    Cost.count(opts, callback);
}


module.exports=new CostDAO();
