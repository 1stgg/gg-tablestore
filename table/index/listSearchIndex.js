// let indexFieldType = require('../to/indexFiledType.js')
module.exports = async function listIndex(arg) {
	let client = this.client
	
	// console.log(3,schema)
	let re = await client.listSearchIndex({
  	tableName:this.table,
	})
	// console.log(9,'listSearchIndex',re)
	return re
}