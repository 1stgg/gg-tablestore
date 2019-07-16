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
		and:{
			range:{
				gt:2
				lt:6,
			},
			str:{}
		}
	}
})