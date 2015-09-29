/*
 *Function:通用数据配置
 *Author:Snail
 *Date:2015-09-29
 *依赖
    *1.underscore.js
 */
var util = {
	initOperate: function (val, row, index) {
		if (row.editing) {
			var s = '<i class="fa fa-save fa-lg"></i>&nbsp;<a href="#" onclick="util.saveRow(this)" style="color:whitesmoke">保存</a> ';
			var c = '<i class="fa fa-undo fa-lg"></i>&nbsp;<a href="#" onclick="util.cancelRow(this)" style="color:whitesmoke">取消</a>';
			return s + c;
		} else {
			var e = '<span id="uploadify"></span><i class="fa fa-edit fa-lg"></i>&nbsp;<a href="#" onclick="util.editOperate(this)" style="color:black">编辑</a>';
			return e;
		}
    },
	//获取当前grid的id
    getDatagridId: function (target) {
		var idname = $(target).parents('.datagrid-view').children('table').attr('id');
		return idname;
	},
	//获取行索引
	getRowIndex: function (target) {
		var tr = $(target).closest('tr.datagrid-row');
		return parseInt(tr.attr('datagrid-row-index'));
	},
	//更新当前编辑行的状态
	updateActions:function (dg, index) {
		$('#' + dg).datagrid('updateRow', {
			index: index,
			row: {}
		});
	},
	//编辑当前行
	editOperate: function (target) {
		var index = getRowIndex(target);
		var id = getDatagridId(target);
		$('#' + id).datagrid('beginEdit', index);
		$('#' + id).datagrid('selectRow', index);
		var rowData = $('#' + id).datagrid('getChecked');
	},
	//保存当前行
	saveRow: function (target, callback)//cb回调函数
	{
		//保存当前状态
		var id = getDatagridId(target);
		var index = getRowIndex(target);
		$('#' + id).datagrid('endEdit', index);
		if (_.isNumber(index)) {
			var rowdata = $('#' + id).datagrid('getRows')[index];
			if (callback != undefined) {
				callback(rowdata);
			}
		}
	},
	//取消保存当前行
	cancelRow: function (target) {
		var id = getDatagridId(target);
		$('#' + id).datagrid('cancelEdit', getRowIndex(target));
	}
};