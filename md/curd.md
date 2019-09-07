
# c 添加
```js
// 'and' 'or' "not" 不能做主键名和列名
let keys = {
		id:Math.random()*666,
		str:'str',
	}
	
	let data = {
		int:Math.random()*666,
		float:Math.random()*666,
		str_data:'TEXT',
		bool:false,
	}

	
	let create_status = 
		await db(table_name)
		.c(keys,data)
```

# r 查询
```js
let table_val = 
		await db(table_name)
		.where({
			id:337,
			float:['>',270],
			and:[//多条件
				{
					str_data:'TEXT',
					bool:false,
					int:['>=',584],
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
# u 更新
```js
let update = 
		await db(table_name)
		.where({
			id:337,
			float:['>',270],
			
		})
		.u({
			str_data:'tExt'+Math.random()*233
		})
	console.log(75,update);
```
# d 删除
```js
let del_status = await db(table_name)
		.where({
			id:437
		})
		.d()
	console.log(82,del_status);
```