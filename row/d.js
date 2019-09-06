let TableStore = require('tablestore')
let get2attr = require('../table/to/get2attr.js')
let tableDataType = require('../table/to/tableDataType.js')
module.exports = async function d(arg) {
	let client = this.client
	
	// console.log(3,key_arr)
	let re = await client.search({
	  tableName: this.table,
	  indexName: this.index||this.table,
	  searchQuery: this.searchQuery,
	  columnToGet: { //返回列设置：RETURN_SPECIFIED(自定义),RETURN_ALL(所有列),RETURN_NONE(不返回)
        returnType: TableStore.ColumnReturnType.RETURN_ALL
    }
	})
	let rows = []
	let re2 = []
	for(let key in re.rows){
		let item = re.rows[key]
		let keys = []
		for(let key2 in item.primaryKey){
			let item2 = item.primaryKey[key2]
			keys.push({
				[item2.name]:item2.value
			})
		}
		// console.log(60,colu)
		// rows.push({
  //       type: 'PUT',
  //       condition: new TableStore.Condition(TableStore.RowExistenceExpectation.EXPECT_EXIST, null),
  //       primaryKey: keys,
  //       attributeColumns: colu,
  //       returnContent: { returnType: TableStore.ReturnType.Primarykey }
  //   })
    re2.push(await client.deleteRow({
	    tableName: this.table,
	    condition: new TableStore.Condition(TableStore.RowExistenceExpectation.EXPECT_EXIST, null),
	    primaryKey: keys
	}))
	}
	// console.log(47,key_arr)
	// let re2 = 
	console.log(56,'delete',re2)
	return re
}