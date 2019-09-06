
#c
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