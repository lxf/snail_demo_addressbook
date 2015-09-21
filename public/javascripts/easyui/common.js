var Common = {
    //EasyUI用DataGrid用日期格式化
    TimeFormatter: function (value, rec, index) {
        if (value == undefined) {
            return "";
        }
        /*json格式时间转js时间格式*/
        value = value.substr(1, value.length - 2);
        var obj = eval('(' + "{Date: new " + value + "}" + ')');
        var dateValue = obj["Date"];
        if (dateValue.getFullYear() < 1900) {
            return "";
        }
        var val = dateValue.format("yyyy-MM-dd hh:mm");
        return val.substr(11, 5);
    },
    DateTimeFormatter: function (value, rec, index) {
        if (value == undefined || value == null || value == "") {
            return "";
        }
        if (value.isDateTime(value)) {
            return value;
        }
        /*json格式时间转js时间格式*/
        value = value.substr(1, value.length - 2);
        var obj = eval('(' + "{Date: new " + value + "}" + ')');
        var dateValue = obj["Date"];
        if (dateValue.getFullYear() < 1900) {
            return dateValue.format("yyyy-MM-dd");
        }

        return dateValue.format("yyyy-MM-dd hh:mm");
    },
    //EasyUI用DataGrid用日期格式化
    DateFormatter: function (value, rec, index) {
        if (value == undefined || value == null) {
            return "";
        }

        /*json格式时间转js时间格式*/
        value = value.substr(1, value.length - 2);

        var obj = eval('(' + "{Date: new " + value + "}" + ')');
        var dateValue = obj["Date"];
        if (dateValue.getFullYear() < 1900) {
            return dateValue.format("yyyy-MM-dd");
        }
        return dateValue.format("yyyy-MM-dd");
    },
    HandleFormat: function (value, rec) {
        if (value == true) {
            return "已禁用";
        }
        else {
            return "已启用";
        }
    },
    MilleageFormat: function (value) {
        return value + "Km";
    },
    SpeedFormat: function (value) {
        return value + "Km/h";
    },
    MinuteFormat: function (value) {
        return value + "分钟";
    },
    BoolFormat: function (value, rec) {
        if (value == true) {
            return "有效";
        } else {
            return "无效";
        }
    },
    GenderFormat: function (value, rec) {
        if (value == 1) {
            return "女性";
        } else {
            return "男性";
        }
    },
    YesOrNoFormat: function (value, rec) {
        if (value == 1) {
            return "是";
        } else {
            return "否";
        }
    },
    UndefinedFormatter: function (value, rec) {
        if (value == 'undefined') {
            return "暂无数据";
        }
        else {
            return value;
        }
    },
  
  
    ColumnFormatter: function (value, row, index) {
        if (value == undefined) {
            return "";
        }
        else {
            return "<span title='" + value + "'>" + value + "</span>";
        }
    },
    CurrencyFormatter: function (value, rec, index) {

        if (!isNaN(value)) {
            return value;
        }

        return value.toFixed(2);
    },
    SetColor: function (value, rec, index) {
        return '<img src=Resources/images/mapicon/' + (index + 1) + '.png />';
    },
    AddressSure: function (value, rec, index) {
        return value == 0 ? '未确认' : '已确认';
    },
    DistanceFormatter: function (value, rec, index) {
        if (value != 0) {
            var dis = (parseFloat(value) / 1000).toFixed(2);
            return dis + "km";
        }
        else {
            return 0;
        }
    }
};
var Meesager = {

    alert: function (message, callback) {

        bootbox.alert(message, callback);
    },

    confirm: function (message, callback) {

        bootbox.confirm(message, callback);
    },

    prompt: function (message, callback) {

        bootbox.prompt(message, callback);
    },

    showTipMessage: function () { }

};


Date.prototype.format = function (format) {
    /* 
    * format="yyyy-MM-dd hh:mm:ss"; 
    */
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4
        - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}
//获取当前鼠标所在位置
function mousePosition(evt) {
    var xPos, yPos;
    evt = evt || window.event;
    if (evt.pageX) {
        xPos = evt.pageX;
        yPos = evt.pageY;
    } else {
        xPos = evt.clientX + document.body.scrollLeft - document.body.clientLeft;
        yPos = evt.clientY + document.body.scrollTop - document.body.clientTop;
    }
    return [xPos, yPos];
}
function getWindowHeight() {

    var de = document.documentElement;
    return self.innerHeight || (de && de.clientHeight) || document.body.clientHeight;
}
function getWindowWidth() {

    var de = document.documentElement;
    return self.innerWidth || (de && de.clientWidth) || document.body.clientWidth;
}

var SnailBreadNav = {
    AddOrEdit: function (firlev, currentlev) {
        $('.snailbreadcrumb')[0].innerText = "";
        var breadcookie = "<li><span class='glyphicon glyphicon-home' style='padding-right: 2px;'></span>&nbsp;&nbsp;当前所在位置:<a href='#'>" + firlev + "></a></li><li class='active'>" + currentlev + "</li>";
        $('.snailbreadcrumb').append(breadcookie);
    }

}
Array.prototype.distinct = function () {
    var sameObj = function (a, b) {
        var tag = true;
        if (!a || !b) return false;
        for (var x in a) {
            if (!b[x])
                return false;
            if (typeof (a[x]) === 'object') {
                tag = sameObj(a[x], b[x]);
            } else {
                if (a[x] !== b[x])
                    return false;
            }
        }
        return tag;
    }
    var newArr = [], obj = {};
    for (var i = 0, len = this.length; i < len; i++) {
        if (!sameObj(obj[typeof (this[i]) + this[i]], this[i])) {
            newArr.push(this[i]);
            obj[typeof (this[i]) + this[i]] = this[i];
        }
    }
    return newArr;
}
Array.prototype.indexOf = function (val) { //prototype 给数组添加属性
    for (var i = 0; i < this.length; i++) { //this是指向数组，this.length指的数组类元素的数量
        if (this[i] == val) return i; //数组中元素等于传入的参数，i是下标，如果存在，就将i返回
    }
    return -1;
};
Array.prototype.remove = function (val) {   //prototype 给数组添加属性
    var index = this.indexOf(val);  //调用index()函数获取查找的返回值
    if (index > -1) {
        this.splice(index, 1);  //利用splice()函数删除指定元素，splice() 方法用于插入、删除或替换数组的元素
    }
};

function showSuccessAutoClose(title, msg, returnurl, waittime) {
    if (waittime == undefined)
        waittime = 2000;
    var d = dialog({
        title: title,
        content: msg,
        zIndex: 99999,
        quickClose: true// 点击空白处快速关闭
    });
    d.show();
    setTimeout(function () {
        d.close().remove();
        if (returnurl == undefined || returnurl == null) {

        }
        else {
            window.location.href = returnurl;
        }
    }, waittime)
}

function getNowDate() {
    var currentdate = new Date();
    return currentdate.format("yyyy-MM-dd");

}
//为空则返回false
function CheckIsEmpty(str) {
    if (typeof (str) == undefined) {
        return false;
    }
    else if (str == "") {
        return false
    }
    else if (str == null) {
        return false;
    }
    else {
        return true;
    }
}
function formatterStr(value, count) {
    return value.substr(0, count);

}
//全选checkbox
function SelectAllCheck(id, checkid) {
    if ($('#' + checkid)[0].checked == true) {
        //全选
        $('#' + id).find("[type='checkbox']").each(function (index, item) {
            item.checked = 'checked';
        });
    }
    else {
        //全不选
        $('#' + id).find("[type='checkbox']").each(function (index, item) {
            item.checked = false;
        });
    }
}
//删除某个dom中的class
function RemoveClass(me, classname) {
    $(me).removeClass(classname);
}
//增加某个dom中的class
function AddClass(me, classname) {
    $(me).addClass(classname);
}
//隐藏
//参数是id的数组
function HideSomeDom(domarr) {
    if (CheckIsEmpty(domarr)) {
        $.each(domarr, function (index, item) {
            $('#' + item).hide();
        });
    }
}
//展现
//参数是id的数组
function ShowSomeDom(domarr) {
    if (CheckIsEmpty(domarr)) {
        $.each(domarr, function (index, item) {
            $('#' + item).show();
        });
    }
}
//模拟触发事件
//dom是class
function TriggerChange(dom) {
    $('.' + dom).trigger('onchange');

}

//隐藏datagrid 分页
function HidePage(dg) {
    $(dg).pagination({ showPageList: false });
}

//清除某个div下的所有input的值
function RemoveValueOfInput(div) {
    $('#' + div + ' input[type="text"]').each(function (index, item) {
        $(item).val('');
    })
}
//显示加载进度
function ShowLoading(title) {
    var d = dialog({
        title: title,
        zIndex: 99999
    }).show();

    return d;
}

//获取div下的checkbox的value属性值
function getDivOfCheckboxValue(id) {
    var areaid = [];
    $.each($('#' + id + ' input[type="checkbox"]'), function (index, item) {
        if ($(item).attr('checked') == 'checked') {
            areaid.push($(item).attr('value'));
        }
    });
    return areaid;
}
//通用的ajax方法
//par为参数
//url为地址
function commonAjax(url, par) {
    var returnres;
    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(par),
        async: false,
        success: function (res) {
            returnres = res;
        }
    });
    return returnres;
}

//获取url参数值
function request(paras) {
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return decodeURI(returnValue);
    }
}

function CheckIsNum(title, domid) {
    var code = $.trim($(domid).val());
    if (code == "")
        return;
    var reg = /^\d+$/;
    if (!reg.test(code)) {
        showSuccessAutoClose(title, "该项填写的必须是数字", null);
        $(domid).focus();
    }
}
var queryString = function QueryString() {
    var name, value, i;
    var str = decodeURI(location.href);//防止中文乱码,传过来的参数需要encodeURI
    var num = str.indexOf("?")
    str = str.substr(num + 1);
    var arrtmp = str.split("&");
    for (i = 0; i < arrtmp.length; i++) {
        num = arrtmp[i].indexOf("=");
        if (num > 0) {
            name = arrtmp[i].substring(0, num);
            value = arrtmp[i].substr(num + 1);
            this[name] = value;
        }
    }
}


//url:请求地址 method:传值方式(post,get) callback:回调函数 basync:同步false或异步true param:post传值的参数不带问号

function sendAjaxRequest(url, method, callback, basync, param) {
    if (typeof (method) != undefined && method == "get") {
        $.ajax({
            url: url,
            type: 'GET',
            async: basync,
            dataType: "text",
            error: ajaxError,
            success: callback
        });
    } else if (typeof (method) != undefined && method == "post") {
        $.ajax({
            url: url,
            type: 'POST',
            async: basync,
            data: param,
            dataType: "text",
            error: ajaxError,
            success: callback
        });
    }
};

function ajaxError(err) {
    alert("网络异常！");
};

function Callback(returnres) {
    returnres = eval('(' + returnres + ')')
    if (returnres.Item1) {
        showSuccessAutoClose("提示", "操作成功", null);
        window.location.reload();
    }
    else {
        showSuccessAutoClose("提示", "操作失败" + returnres.Item2, null);
    }
}
function goBack() {
    history.go(-1);
}
