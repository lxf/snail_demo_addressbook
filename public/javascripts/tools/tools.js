/*
 *Function:通用数据配置
 *Author:Snail
 *Date:2015-09-29
 *依赖
    *1.underscore.js
	*2.jquery
 */
var util = {
	initOperate: function (val, row, index) {
		if (row.editing) {
			var s = '<i class="fa fa-save fa-lg"></i>&nbsp;<a href="#" onclick="util.saveRow(this,util.saveRowCallback)" style="color:whitesmoke">保存</a> ';
			var c = '<i class="fa fa-undo fa-lg"></i>&nbsp;<a href="#" onclick="util.cancelRow(this)" style="color:whitesmoke">取消</a>';
			return s + c;
		} else {
			var e = '<span id="uploadify"></span><i class="fa fa-edit fa-lg"></i>&nbsp;<a href="#" onclick="util.editOperate(this)" style="color:black">编辑</a>';
			return e;
		}
    },
	//带有密码重置功能
	initOperateWithPwd: function (val, row, index) {
		if (row.editing) {
			var s = '<i class="fa fa-save fa-lg"></i>&nbsp;<a href="#" onclick="util.saveRow(this,util.saveRowCallback)" style="color:whitesmoke">保存</a> ';
			var c = '<i class="fa fa-undo fa-lg"></i>&nbsp;<a href="#" onclick="util.cancelRow(this)" style="color:whitesmoke">取消</a>';
			return s + c;
		} else {
			var e = '<span id="uploadify"></span><i class="fa fa-edit fa-lg"></i>&nbsp;<a href="#" onclick="util.editOperate(this)" style="color:black">编辑</a>';
			e += '<span id="uploadify"></span><i class="fa fa-edit fa-lg"></i>&nbsp;<a href="#" onclick="util.resetPwd(this)" style="color:black">重置密码</a>';
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
	updateActions: function (dg, index) {
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
				callback(rowdata, id);
			}
		}
	},
	//saveRowCallback,回调函数
	saveRowCallback: function (rowdata, datagridid) {
		switch (datagridid) {
			case "dgForPeople":
				util.sendPost('/user/update', rowdata);
				break;
			default:
				break;

		}
		//console.log('行数据:' + rowdata);
		//console.log('datagrid的id:' + datagridid);
	},
	//取消保存当前行
	cancelRow: function (target) {
		var id = getDatagridId(target);
		$('#' + id).datagrid('cancelEdit', getRowIndex(target));
	},
	//Ajax请求
	//url请求地址,par参数
	sendPost: function (url, par) {
		$.ajax({
			url: url,
			type: 'POST',
			contentType: 'application/json;charset=utf-8',
			data: JSON.stringify(par),
			success: function (res) {
				//显示操作的结果
				showSuccessAutoClose("提示", res.Item2, res.redirectUrl);
			}
		});
	}
};