let indexFieldType = require('../to/indexFiledType.js')
module.exports = async function createIndex(arg,index_name) {
	let client = this.client
	let schema = {
		fieldSchemas:[]
	}
	for(let key in arg){
		let item = arg[key]
		schema.fieldSchemas.push({
			fieldName:key,
			...item,
			fieldType:indexFieldType(item)
		})
	}
	// console.log(3,schema) 
	let tableName=this.table
 //  let	indexName=arg.name || this.table
	// let list = await client.listSearchIndex({
 //  	tableName:tableName,
	// })
	// // console.log(198,list)
	// for(let key in list.indices){
	// 	let item = list.indices[key]
	// 	if(item.index_name == indexName){
	// 		let del = await client.deleteSearchIndex({
	// 	  	tableName:tableName,
	// 	  	indexName:indexName,
	// 		})
	// 		console.log(29,'deleteSearchIndex',del)
	// 	}
	// }
	let re = await client.createSearchIndex({
  	tableName:tableName,
  	indexName:index_name || tableName,
  	schema:schema
	})
	// console.log(21,'createSearchIndex',re)
	return re
}