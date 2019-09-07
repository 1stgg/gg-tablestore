# 高效tablestore工具链

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
### 3。使用
- [表的curd](./md/table.md)
- [索引的curd](./md/index.md)
- [数据行的curd](./md/curd.md)

