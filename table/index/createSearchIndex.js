let indexFieldType = require('../to/indexFiledType.js')
module.exports = async function a(arg) {
	let client = getClient()
	let schema = {
		fieldSchemas:[]
	}
	for(let key in arg.index){
		let item = arg.index[key]
		schema.fieldSchemas.push({
			fieldName:key,
			...item,
			fieldType:indexFieldType(item.type)
		})
	}
	// console.log(3,schema)
	let re = await client.createSearchIndex({
  	tableName:this.table,
  	indexName:arg.name || this.table,
  	schema:schema
	})
	console.log(21,'createSearchIndex',re)
	return re
}