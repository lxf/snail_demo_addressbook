//人员管理
var easy = new easyGridIniter($('#dgForPeople'), {
				easyOpts: {
		pageSize: 20,
		fitColumns: true,
		showFooter: true,
		onBeforeEdit: function (index, row) {
			row.editing = true;
			util.updateActions('dgForPeople', index);
		},
		onAfterEdit: function (index, row) {
			row.editing = false;
			util.updateActions('dgForPeople', index);
		},
		onCancelEdit: function (index, row) {
			row.editing = false;
			util.updateActions('dgForPeople', index);
		}
	}
});
$("#dgForPeople").datagrid("loadData", local_data);


