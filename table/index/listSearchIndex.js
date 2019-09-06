// let indexFieldType = require('../to/indexFiledType.js')
module.exports = async function listIndex(arg) {
	let client = this.client
	
	// console.log(3,schema)
	let re = await client.listSearchIndex({
  	tableName:this.table,
	})
	console.log(9,'listSearchIndex',re)
	// re.indices: [ { table_name: 'temp', index_name: 'temp' }
	let re_arr = []
	for(let key in re.indices){
	  let item = re.indices[key]
	  re_arr.push(item.index_name)
	}
	
	return re_arr
}