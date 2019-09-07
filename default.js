module.exports = {
	page:1,
	limit:10,
	count:false,
	delete:{
		type:0,//0:真删除,10:假删除,允许config()设置,20:所有数据都假删除,config()设置无效
		filed:'_del',//假删除字段,true表示已删除
		dustbin_type:0,//0:删除的数据 不 添加到垃圾箱,10:真删除的数据 添加到垃圾箱,20:真假 删除的都数据 都添加到垃圾箱
		dustbin_table_name:'gg_dustbin',//垃圾箱 表名
	},
	data:{
		type:'origin',//origin:原本返回什么就是什么,simple:简化版
	},
	index:{//索引
		type:'custom',//custom:自定义,time_random:索引只有id,值为  时间戳+随机数
	}
}