console.log(local_data);
var easy = new easyGridIniter($('#dg'),{
				easyOpts: {
					pageSize: 20,
					width: 1140,
					fitColumns: true,
					showFooter: true
			}
		});
$("#dg").datagrid("loadData",local_data);
