//团队管理
var easy = new easyGridIniter($('#dgForTeam'), {
				easyOpts: {
		pageSize: 20,
		fitColumns: true,
		showFooter: true,
		onBeforeEdit: function (index, row) {
			row.editing = true;
			util.updateActions('dgForTeam', index);
		},
		onAfterEdit: function (index, row) {
			row.editing = false;
			util.updateActions('dgForTeam', index);
		},
		onCancelEdit: function (index, row) {
			row.editing = false;
			util.updateActions('dgForTeam', index);
		}
	}
});
$("#dgForTeam").datagrid("loadData", local_data);

//新增团队
$('#btnaddteam').click(function (e) {
	util.addRow('dgForTeam');
});

$(document).ready(function () {
	//菜单选中
	$('li[class="active"]').eq(0).removeClass('active');
	var currentmenu = Cookies.get('cm');
	$('#' + currentmenu).addClass('active');
	
	//加载数据，你可以在后台render的时候直接回传数据
	util.sendGet('/team/getall', function (result) {
		$("#dgForTeam").datagrid("loadData", result);
	})
});