/*
 *Function:通用数据配置
 *Author:Snail
 *Date:2015-09-29
 */
var commonData = {
	getYesOrNoData: function () {
		return [{ text: '是', value: true }, { text: '否', value: false }];
	},
	getSchoolYear:function()
	{
		return [
			{text:'2009',value:2009},
			{text:'2010',value:2010},
			{text:'2011',value:2011},
			{text:'2012',value:2012},
			{text:'2013',value:2013},
			{text:'2014',value:2014},
			{text:'2015',value:2015},
			{text:'2016',value:2016},
			{text:'2017',value:2017}
			];
	},
	getMajor:function()
	{
		//这样做其实不安全,这里仅作为演示
		return [
		{text:'计算机科学与技术',value:'55fa5a6ae4b01124a0158dd2'},
		{text:'NIIT',value:'55fa5a22e4b01124a0158dd0'},
		{text:'其他',value:'55fa5a8de4b01124a0158dd5'}
		];
	}
};
