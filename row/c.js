let TableStore = require('tablestore')
module.exports = async function a(arg) {
	let client = getClient()
	let col = []
	for(let key in arg.data){
		let item = arg.data[key]
		console.log(13.1,item)
		console.log(14,gg.typeof(item))
		switch(gg.typeof(item)){
		    case 'int' :
		    	item = TableStore.Long.fromNumber(item)
		        break
		    default :
		        break
		}
		col.push({
			[key]:item
		})
	}
	console.log(col)
	let key_arr = []
	for(let key in arg.key){
		let item = arg.key[key]
		switch(typeof(item)){
		    case 'number' :
		    	item = TableStore.Long.fromNumber(item)
		        break
		    default :
		    	// key_arr.push({[key]:item})
		        break
		}

		key_arr.push({
			[key]:item
		})
	}
	// console.log(3,key_arr)
	let re = await client.putRow({
	  tableName: this.table,
	  condition: new TableStore.Condition(TableStore.RowExistenceExpectation.EXPECT_NOT_EXIST, null),
	  primaryKey: key_arr,
	  attributeColumns: col,
	  returnContent: { returnType: TableStore.ReturnType.Primarykey }
	})
	console.log(169,'add',re)
	return re
}