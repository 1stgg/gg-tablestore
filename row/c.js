let TableStore = require('tablestore')
module.exports = async function a(arg) {
	let client = getClient()
	let col = []
	for(let key in arg.data){
		let item = arg.data[key]
		col.push({
			[key]:item
		})
	}
	// console.log(3,client)
	let re = await client.putRow({
	  tableName: this.table,
	  condition: new TableStore.Condition(TableStore.RowExistenceExpectation.EXPECT_NOT_EXIST, null),
	  primaryKey: arg.key,
	  attributeColumns: col,
	  returnContent: { returnType: TableStore.ReturnType.Primarykey }
	})
	console.log(169,'add',re)
	return re
}