var easyGridIniter = function (obj, options) {

    this.target = obj;
    this.opts = $.extend(true, {}, defaultOpts, options || {});

    return this.init();
};


easyGridIniter.prototype = (function () {
    return {

        init: function () {

            var self = this;

            if ($.isArray(self.opts.easyOpts.pageList)) {
                if ($.inArray(self.opts.easyOpts.pageSize, self.opts.easyOpts.pageList) < 0) {

                    self.opts.easyOpts.pageList.push(self.opts.easyOpts.pageSize);
                    self.opts.easyOpts.pageList.sort(function (a, b) {
                        if (isNaN(a) || isNaN(b)) {
                            return a > b ? 1 : -1;
                        }
                        return a - b;
                    });
                }
            }

            var grid = self.target.datagrid(self.opts.easyOpts);

            //var p = grid.datagrid('getPager');
            //p.pagination(self.opts.easyOpts);

            $("#" + self.opts.search.exportButtonId).click(function () {

                if (!self.opts.exportOpts.exportUrl) {
                    return false;
                }

                var total = grid.datagrid('getData').total;

                if (total >= 65535) {
                    alert("记录数太多，请完善检索条件后再导出！");
                    return false;
                }

                var options = grid.datagrid('options');

                var frozenColumns = options.frozenColumns;
                var columns = options.columns;

                var allcolumns = [];

                if (frozenColumns.length > 0) {
                    for (var i = 0; i < frozenColumns[0].length; i++) {
                        allcolumns.push({ Field: frozenColumns[0][i].field, Name: frozenColumns[0][i].title });
                    }
                }

                for (var i = 0; i < columns[0].length; i++) {
                    allcolumns.push({ Field: columns[0][i].field, Name: columns[0][i].title });
                }

                if (allcolumns.length == 0) {
                    return;
                }

                var params = {
                    title: self.opts.exportOpts.title,
                    pageCondition: getCondition({}, self.opts.search.id).pageCondition,
                    headers: allcolumns
                };

                var form = $("<form>", {
                    id: "export-form",
                    action: self.opts.exportOpts.exportUrl,
                    method: "post"
                });

                var input = $("<input>", {
                    id: "export-hidden",
                    type: "hidden",
                    name: "exportCondition"
                });

                input.val(JSON.stringify(params));

                form.append(input);
                form.appendTo("body");

                form.submit();
            });

            grid.datagrid("options").loader = function (easyParam, success, error) {
                var that = $(this);
                var opts = that.datagrid("options");
                var sorting = {};

                if (!opts.postUrl) {
                    return false;
                }

                var params = getCondition(easyParam, self.opts.search.id);
              
                if (opts.sort) {
                    var order = opts.order == "asc" ? 1 : -1;
                    sorting[opts.sort] = order;
                }
                params["Sorting"]=sorting;
                params["ShowColumns"]=opts.showColumns;
                
                $.ajax({
                    type: 'POST',
                    url: opts.postUrl,
                    data: JSON.stringify(params),
                    contentType: "application/json",
                    success: function (data) {
                        //这边需要修改
                        if (data != null && data != "") {
                            if (data.errorMessage) {
                                data.rows = 0;
                                alert(data.errorMessage);
                            }
                            success(data);
                        }
                        else {
                            var tempdata = {};
                            tempdata.rows = [];
                            tempdata.total = 0;
                            success(tempdata);
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        // alert('数据加载错误！状态码：' + XMLHttpRequest.status);
                        error.apply(this, arguments);
                    }
                });
            };

            $("#" + self.opts.search.searchButtonId).click(function () {
                grid.datagrid('load');
            });

            $("#" + self.opts.search.clearButtonId).click(function () {

                var clearSelector = "[data-area='search'][data-isclear!='false']";
                var $clearObject = $("#" + self.opts.search.id).find(clearSelector);

                $clearObject.each(function () {
                    $(this).clearVal();
                });
                grid.datagrid('load');
            });
        }
    }
})();


var getCondition = function (easyParam, searchId) {

    var params = {
        pageCondition: {
            Condition: {
                Filters: getFilters(searchId)
            },
            PageFilter: {
                CurrentIndex: easyParam.page,
                PageSize: easyParam.rows
            }
        }
    };

    return params;
};


var getFilters = function (searchId) {

    var field, value, operator, dataType, conditions = [];

    $("#" + searchId).find("[data-area='search']").each(function () {
        field = $(this).attr("data-field");
        var extenfiled = $(this).attr('data-attr');
        if (typeof (extenfiled) != 'undefined') {
            value = $(this)[0].getAttribute(extenfiled);
        }
        else {
            value = $(this).val();
        }
        operator = ($(this).attr("data-operator") || 5);
        if ($.trim(value).length > 0) {
            conditions.push({ Name: field, Value: value, Filter: operator });
        }
    });

    return conditions;
};

var defaultOpts = {
    search: {
        id: "search",
        clearButtonId: "btnClear",
        searchButtonId: "btnSearch",
        exportButtonId: "btnExport"
    },
    exportOpts: {

    },
    easyOpts: {
        language: 'zh_CN',
        pagination: true,
        loadMsg: '数据加载中，请稍后...',
        singleSelect: true,
        striped: true,
        nowrap: true,
        rownumbers: true,
        remoteSort: true,
        fitColumns: true,
        pageSize: 10,
        //pageList: [10, 15, 20, 25, 50, 100],
        pageNumber: 1,
        beforePageText: '第',
        afterPageText: '页    共 {pages} 页',
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
    }
};

//datagrid 编辑器扩展
$.extend($.fn.datagrid.defaults.editors, {
    datetimebox: {
        init: function (container, options) {
            var input = $('<input type="text" class="easyui-datetimebox" >')
                .appendTo(container);
            //编辑框延迟加载
            window.setTimeout(function () {
                input.datetimebox($.extend({ editable: false }, options));
            }, 10);
            //input.datetimebox($.extend({ editable: false }, options));
            return input;
        },
        getValue: function (target) {
            return $(target).datetimebox('getValue');
        },
        setValue: function (target, value) {
            $(target).val(value);
            window.setTimeout(function () {
                $(target).datetimebox('setValue', value);
            }, 150);
        },
        resize: function (target, width) {
            var input = $(target);
            if ($.boxModel == true) {
                input.width(width - (input.outerWidth() - input.width()));
            } else {
                input.width(width);
            }
        }
    }
});
//扩展numberspinner编辑器
$.extend($.fn.datagrid.defaults.editors, {
    numberspinner: {
        init: function (container, options) {
            var input = $('<input type="text">').appendTo(container);
            return input.numberspinner(options);
        },
        destroy: function (target) {
            $(target).numberspinner('destroy');
        },
        getValue: function (target) {
            return $(target).numberspinner('getValue');
        },
        setValue: function (target, value) {
            $(target).numberspinner('setValue', value);
        },
        resize: function (target, width) {
            $(target).numberspinner('resize', width);
        }
    }
});
/*
*显示列的内容
*使用方法
*    $('#dg').datagrid('doCellTip',
*  {
*     onlyShowInterrupt: true,
*      position: 'bottom',
*      tipStyler: { 'backgroundColor': '#fff000', borderColor: '#ff0000', maxWidth: '50px', boxShadow: '1px 1px 3px #292929' },
*      contentStyler: { backgroundColor: '#333', paddingLeft: '5px' }
* });
*/
$.extend($.fn.datagrid.methods, {
    /**
     * 开打提示功能    
     * @param {} jq    
     * @param {} params 提示消息框的样式    
     * @return {}    
     */
    doCellTip: function (jq, params) {
        function showTip(showParams, td, e, dg) {
            //无文本，不提示。      
            if ($(td).text() == "") return;

            params = params || {};
            var options = dg.data('datagrid');
            showParams.content = '<div class="tipcontent">' + showParams.content + '</div>';
            $(td).tooltip({
                content: showParams.content,
                trackMouse: true,
                position: params.position,
                onHide: function () {
                    $(this).tooltip('destroy');
                },
                onShow: function () {
                    var tip = $(this).tooltip('tip');
                    if (showParams.tipStyler) {
                        tip.css(showParams.tipStyler);
                    }
                    if (showParams.contentStyler) {
                        tip.find('div.tipcontent').css(showParams.contentStyler);
                    }
                }
            }).tooltip('show');

        };
        return jq.each(function () {
            var grid = $(this);
            var options = $(this).data('datagrid');
            if (!options.tooltip) {
                var panel = grid.datagrid('getPanel').panel('panel');
                panel.find('.datagrid-body').each(function () {
                    var delegateEle = $(this).find('> div.datagrid-body-inner').length ? $(this).find('> div.datagrid-body-inner')[0] : this;
                    $(delegateEle).undelegate('td', 'mouseover').undelegate('td', 'mouseout').undelegate('td', 'mousemove').delegate('td[field]', {
                        'mouseover': function (e) {
                            //if($(this).attr('field')===undefined) return;      
                            var that = this;
                            var setField = null;
                            if (params.specialShowFields && params.specialShowFields.sort) {
                                for (var i = 0; i < params.specialShowFields.length; i++) {
                                    if (params.specialShowFields[i].field == $(this).attr('field')) {
                                        setField = params.specialShowFields[i];
                                    }
                                }
                            }
                            if (setField == null) {
                                options.factContent = $(this).find('>div').clone().css({ 'margin-left': '-5000px', 'width': 'auto', 'display': 'inline', 'position': 'absolute' }).appendTo('body');
                                var factContentWidth = options.factContent.width();
                                params.content = $(this).text();
                                if (params.onlyShowInterrupt) {
                                    if (factContentWidth > $(this).width()) {
                                        showTip(params, this, e, grid);
                                    }
                                } else {
                                    showTip(params, this, e, grid);
                                }
                            } else {
                                panel.find('.datagrid-body').each(function () {
                                    var trs = $(this).find('tr[datagrid-row-index="' + $(that).parent().attr('datagrid-row-index') + '"]');
                                    trs.each(function () {
                                        var td = $(this).find('> td[field="' + setField.showField + '"]');
                                        if (td.length) {
                                            params.content = td.text();
                                        }
                                    });
                                });
                                showTip(params, this, e, grid);
                            }
                        },
                        'mouseout': function (e) {
                            if (options.factContent) {
                                options.factContent.remove();
                                options.factContent = null;
                            }
                        }
                    });
                });
            }
        });
    },
    /**
     * 关闭消息提示功能    
     * @param {} jq    
     * @return {}    
     */
    cancelCellTip: function (jq) {
        return jq.each(function () {
            var data = $(this).data('datagrid');
            if (data.factContent) {
                data.factContent.remove();
                data.factContent = null;
            }
            var panel = $(this).datagrid('getPanel').panel('panel');
            panel.find('.datagrid-body').undelegate('td', 'mouseover').undelegate('td', 'mouseout').undelegate('td', 'mousemove')
        });
    }
});

//获取行索引
function getRowIndex(target) {
    var tr = $(target).closest('tr.datagrid-row');
    return parseInt(tr.attr('datagrid-row-index'));
}
//获取当前grid的id
function getDatagridId(target) {
    var idname = $(target).parents('.datagrid-view').children('table').attr('id');
    return idname;
}
//编辑当前行
function EditOperate(target) {
    var index = getRowIndex(target);
    var id = getDatagridId(target);
    $('#' + id).datagrid('beginEdit', index);
    $('#' + id).datagrid('selectRow', index);
    var rowData = $('#' + id).datagrid('getChecked');
    if (id == 'dgSelectOrder') {
        InitDetail(rowData[0]);
    }
}
//取消编辑
function cancelrow(target) {
    var id = getDatagridId(target);
    $('#' + id).datagrid('cancelEdit', getRowIndex(target));
}
//保存当前状态
function saverow(target) {
    var id = getDatagridId(target);
    $('#' + id).datagrid('endEdit', getRowIndex(target));
}
//新增一行
function adddetail(target) {
    var index = $('#' + target).datagrid('appendRow', {}).datagrid('getRows').length - 1;
    $('#' + target).datagrid('beginEdit', index);

}
//新增一行后，保存
function detailsave(target) {
    var items = $('#' + target).datagrid('getRows');
    $.each(items, function (index, item) {
        var rowIndex = $('#' + target).datagrid('getRowIndex', item);
        $('#' + target).datagrid('endEdit', rowIndex);
    })
}
function updateActions(dg, index) {
    $('#' + dg).datagrid('updateRow', {
        index: index,
        row: {}
    });
}