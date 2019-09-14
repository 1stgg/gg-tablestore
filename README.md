# 链式操作查询tablestore

## 示例
```js
db('table_name')
.where({
	int : ['>=',666],
	str : 'str',
	and:[//多条件
		{
			bool:false,
			not:[
				{bool:true,int:['in',[600,500]],}
			]
		},
		{
			int:['<=',600],
			str_data:['like','*E*'],
			or:[
				{bool:true,str_data:'TEXT'},
				{bool:false},
			]
		}
	]
})
.r()
```

## 注意事项
- 目前在初始开发中，不保证向上兼容
- npm安装的可能是旧版，可能与文档不符
- git下载，不保证是stable版
- 高效是指开发高效，并非运行高效

## 使用方式
### 1.安装
```sh
npm i gg-tablestore --s
```
### 2.配置
```js
let gdb = require('gg-tablestore')
global.db = gdb({
	accessKeyId: 'accessKeyId',
	secretAccessKey: 'secretAccessKey',
	endpoint: 'endpoint',
	instancename: 'instancename',
})
//建议使用以下配置
db().setDefault({
	delete:{
		type:10,//0:真删除,10:假删除,允许config()设置,20:所有数据都假删除,config()设置无效
		dustbin_type:10,//0:删除的数据 不 添加到垃圾箱,10:真删除的数据 添加到垃圾箱,20:真假 删除的都数据 都添加到垃圾箱
	},
	data:{
		type:'simple',//origin:原本返回什么就是什么,simple:简化版
	},
	index:{//索引,关联函数 table.js createTable()
		type:'time_random',//custom:自定义,time_random:索引只有id,值为  时间戳+随机数
	}
})
```
#### 2.1默认设置值为
```js
{
	limit:10,//查询默认条数
	count:false,//是否返回总条数
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
```
### 3.使用
- [表的curd](./md/table.md)
- [索引的curd](./md/index.md)
- [数据行的curd](./md/curd.md)
### 4.where支持类型

|name|title|示例|
|-|-|-|
|默认|等于|int:233|
|>,>=,<,<=|比较|int:['>',233]|
|in|包含|int:['in',[233,666]]|
|like|通配符模糊搜索|str:['like','\*val\*']]|

使用方式
```js
//u方法
let up_status = await db(db_name).where({
	a:['>',233],
}).u({
	a:666
})
//r()和d()如上
```

### 5.config字段

|name|title|示例|
|-|-|-|
|del|是否真删除|true:真删除|
|count|是否返回总计条数|true:返回|
|page|列表返回第几页,翻页建议使用next()|int类型|
|next|r() 返回的next|str类型|
|limit|每页返回几行数据|int类型|
|sort|排序|{a:'asc',latlng:['geo',['25.002,120.001'],'desc']}|
|column|返回哪些字段|'a,latlng'|
