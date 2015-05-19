var request = require('request');
var cheerio = require('cheerio');
var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
var CollegeSchema = new Schema({
    row: [{
        address: String,
        details: [{
            id: Number,
            name: String,
            majors: [{
                majorid: Number,
                majorname: String

            }]
        }]
    }]
});

var College = mongodb.mongoose.model('College', CollegeSchema);
var CollegeDAO = function () { };

//查询
CollegeDAO.prototype.getCollegeInfo = function (query, fields,opts, callback) {
    College.find(query, fields, opts, callback);
}

CollegeDAO.prototype.save = function (data, callback) {
    var instance = new College();
    instance.row = data;
    instance.save(function (err) {
        callback(err);
    });
}
module.exports = new CollegeDAO();