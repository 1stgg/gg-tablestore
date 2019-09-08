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
### 5.config字段

|name|title|示例|
|-|-|-|
|del|是否真删除|true:真删除|
