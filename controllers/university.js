var University = require('../models/universitymodel');
var College = require('../models/collegemodel');
var fs = require('fs');
var _ = require("underscore")._;
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');

exports.showAddView = function (req, res, next) {
    return res.render('loaduniversitydata');
}

//全国院校库
exports.addData = function (req, res, next) {
    var allUnivList = {};
    University.addJsonData(allUnivList, function (err) {
        if (err) {
            res.send({ 'success': false, 'err': err });
        } else {
            res.send({ 'success': true });
        }
    });
}

//获取所有院校id和name
exports.getMajorByUnivID = function (req, res, next) {
    var item = [];
    University.getAllUniv({}, ['provs'], function (err, univdata) {
        console.log('Only One Time U Can See Me');
        async.eachSeries(
            univdata[0].provs,
            function (ele, callback1) {
                var univ_prov = {};
                univ_prov.details = [];
                univ_prov.address = ele.name;

                async.eachSeries(
                    ele.univs,
                    function (_ele, callback2) {
                        var flag = true;
                        var obj = {}, majorarr = [];
                        obj.id = _ele.id;
                        obj.name = _ele.name;
                        //获取专业
                        async.whilst(
                            function () { return flag; },
                            function (callback3) {
                                request('http://www.renren.com/GetDep.do?id=' + obj.id, function (error, response, body) {
                                    if (!error && response.statusCode == 200) {
                                        var count = 1;
                                        var $ = cheerio.load(body);
                                        $('select option').map(function (i, el) {
                                            var _obj = {};
                                            _obj.majorid = count++;
                                            _obj.majorname = $(this).text();
                                            if (i != 0) {
                                                majorarr.push(_obj);
                                            }
                                        });
                                    }
                                });
                                setTimeout(callback3, 10);
                                flag = false;
                            },
                            function (err) {
                                obj.majors = majorarr;
                                univ_prov.details.push(obj);
                                callback2();
                            }
                            );
                    },
                    function (err) {
                        item.push(univ_prov);
                        callback1();
                    });
            },
            function (err) {
                debugger;
                console.log(item);
                College.save(item, function (data) {
                    console.log('saving success');
                });
            });
        console.log('All Done!');
        res.render('welcome', { success: 'save success' });
    });
    //fs.writeFile(path.join(__dirname, 'xx.js'), 'hello world', function (err) {
    //    if (err) throw err;
    //    console.log("Export Account Success!");
    //});
}


