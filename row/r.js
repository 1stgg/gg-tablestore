let TableStore = require('tablestore')
module.exports = async function a(arg) {
	let client = getClient()
	
	// console.log(3,key_arr)
	let re = await client.search({
	  tableName: this.table,
	  indexName: this.index||this.table,
	  searchQuery: this.searchQuery,
	  columnToGet: { //返回列设置：RETURN_SPECIFIED(自定义),RETURN_ALL(所有列),RETURN_NONE(不返回)
        returnType: TableStore.ColumnReturnType.RETURN_ALL
    }
	})
	console.log(169,'read',re)
	return re
}