var College = require('../models/collegemodel');
var async = require('async');
var _ = require("underscore")._;

exports.getSchoolData = function (req, res, next) {
    var area = req.body.name;
    College.getCollegeInfo({ 'row.address': area }, { 'row.$.details.majors': 1 }, {}, function (err, data) {
        var schools = [];
        async.eachSeries(
            data[0].row[0].details,
             function (ele, callback) {
                 schools.push(ele.name);
                 callback();
             },
             function (err) {
                 console.log(schools);
                 res.send(schools);
             }
            )
    });
}


exports.getMajorsData = function (req, res, next) {
    var school = req.body.name;
    College.getCollegeInfo({ 'row.details.name': school }, { 'row.$.details.majors': 1 }, {}, function (err, data) {
        var majors = [];
        _.each(
            data[0].row[0].details,
            function (ele, index, list) {
                if (ele.name == school) {
                    async.eachSeries(
                        ele.majors,
                        function (_ele, callback) {
                            debugger;
                            majors.push(_ele.majorname);
                            callback();
                        },
                     function (err) {
                         res.send(majors);
                     }
           )
                }
            });

    });
}