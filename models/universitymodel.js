var request = require('request');
var cheerio = require('cheerio');
var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
var UniversitySchema = new Schema({
    provs: [{
        id: Number,
        name: String,
        univs: [{
            id: Number,
            name: String
        }]
    }]
});

var University = mongodb.mongoose.model('University', UniversitySchema);
var UniversityDAO = function () { };

//ԺУ���ݱ���
UniversityDAO.prototype.addJsonData = function (obj, callback) {
    var instance = new University(obj);
    instance.save(function (err) {
        callback(err);
    });
}


UniversityDAO.prototype.getAllUniv = function (query, opts, callback) {
    University.find(query, '', opts, callback);
}


UniversityDAO.prototype.getMajorByUnivID = function (univ_id, callback) {
    var count = 1;
    request('http://www.renren.com/GetDep.do?id=' + univ_id, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(body);
            var s = $('select').map(function (i, el) {
                var obj = {};
                obj.majorid = count++;
                obj.majorname = $(this).text();
            });
        }
    });
}

module.exports = new UniversityDAO();