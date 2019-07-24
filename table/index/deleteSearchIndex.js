// let indexFieldType = require('../to/indexFiledType.js')
module.exports = async function a(arg) {
	let client = this.client
	
	// console.log(3,schema)
	let re = await client.deleteSearchIndex({
  	tableName:this.table,
  	indexName:arg.name || this.table,
	})
	console.log(10,'deleteSearchIndex',re)
	return re
}