# 目标
简化tablestore（node）语法，采用键值对控制query
# 大纲
## 1.query
### 1.1 
```js
db('db_name').get({
	key://
	{
		id:233,
	},
	index:'db_name',//索引，默认为表名
	query:{
		bool:{
			and:[
				{
					range:{
						field:'field',
						from:2,
						lower:true,
						lt:6,
					}
				},
			],
		}
	}
})
```
### 查询关键词
|key|title|origin|
|-|-|-|
|eq|等于|TERM_QUERY|
|like|近似匹配|MATCH_QUERY|

### 函数
|key|title|
|-|-|
|db|获取表|
|db.get|获取表|


#za
```js
json2str//键值对和复杂query(_str)和简化obj 转 str query
str2obj// str query 转 简化obj
obj2origin// 简化obj转原生obj

or and not

// bool:{
// 	and:[
// 		{a:['>=',6]},
// 		{bool:{
// 			and:[
// 				{b:['<=',6]},
// 			]
// 		}},
// 	],
// 	or:[],
// }

{
	order_status:{
		and:[
			['>=',6],
			{
				type:2,
			},
		],
		or:[
			['=',3],
			{
				type:1,
			},
		]
	}
}

```
