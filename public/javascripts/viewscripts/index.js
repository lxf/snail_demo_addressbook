var easy = new easyGridIniter($('#dg'), {
				easyOpts: {
		pageSize: 20,
		fitColumns: true,
		showFooter: true,
		onBeforeEdit: function (index, row) {
			row.editing = true;
			util.updateActions('dg', index);
		},
		onAfterEdit: function (index, row) {
			row.editing = false;
			util.updateActions('dg', index);
		},
		onCancelEdit: function (index, row) {
			row.editing = false;
			util.updateActions('dg', index);
		}
	}
});
$("#dg").datagrid("loadData", local_data);


