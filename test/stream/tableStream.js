let gg = require('../../gg_tool')

module.exports = async function tableStream(db,table_name) {
	
	let list_index = await db(table_name).config({
		data:'simple'
	}).listIndex()
	// console.log(6,list_index);
	
	let is_have_index = gg.inArr(table_name,list_index)
	if (is_have_index) {
		await db(table_name).deleteIndex()
		// console.log(`${table_name} index is have,dele it success`);
	}
	
	let list = await db().config({
		data:'simple'
	}).listTable()
	// console.log('tableStream',4,list)
	let is_have = gg.inArr(table_name,list)
	if (is_have) {
		await db(table_name).deleteTable()
		// console.log(`${table_name} is have,dele it success`);
	}
	let success = 
		await db(table_name)
		.createTable({//主键
			id:'INTEGER',//int类型
			str:'STRING',//str类型
			// bin:'BINARY',//bin类型
		})
	// console.log(28,success);
	let table = 
		await db('test2')
		.getTable()
	// console.log(32,table);
	await db(table_name)
	.createIndex({
		id:'long',
		str:'KEYWORD',
		int:'long',
		float:'DOUBLE',
		str_data:'KEYWORD',
		bool:'BOOLEAN',
	})

}
