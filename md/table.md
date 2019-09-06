
#createTable
```js
let re = 
	await db('test2')
	.createTable({//主键
		id:'INTEGER',//int类型
		str:'STRING',//str类型
		bin:'BINARY',//bin类型
	})
```
#getTable
```js
let re = 
	await db('test2')
	.getTable()
```
#listTable
```js
let re = 
	await db()
	.listTable()
```
#deleteTable
```js
let re = 
	await db('test2')
	.deleteTable()
```