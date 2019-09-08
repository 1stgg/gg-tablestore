
let default2 = require('./default.js')
let client = 0
function db_ori(table) {
	this.client = client
	this.table = table
	// this.index
	// this.whereValue
	this.limitValue = default2.limit
	this.pageValue = default2.page
	this.countValue = default2.count

	this.default = default2

	// this.fieldValue
	// this.fieldValue

	// this.searchQuery
	// this.columnToGet
}
let fileList = {
	// //table
	// createTable:'./table/createTable.js',
	// deleteTable:'./table/deleteTable.js',
	// listTable:'./table/listTable.js',
	// getTable:'./table/getTable.js',

	// //index
	// createIndex:'./table/index/createSearchIndex.js',
	// deleteIndex:'./table/index/deleteSearchIndex.js',
	// listIndex:'./table/index/listSearchIndex.js',

	// //curd
	// c:'./row/c.js',
	// u:'./row/u.js',
	// r:'./row/r.js',
	// d:'./row/d.js',
	// where:'./row/where.js',

	// //more
	// setDefault:'./more/setDefault.js',

	table:'./js/table.js',
	searchIndex:'./js/searchIndex.js',
	rows:'./js/rows.js',


}
for(let key_list in fileList){
	let file = fileList[key_list]
	let file_data = require(file)
	for(let key in file_data){
		let item = file_data[key]
		console.log(53,file_data);
		
		db_ori.prototype[key] = item
	}
	
}

// module.exports =  function 

module.exports = {
	setClient(e){
		client = e
	},
	db(arg) {
		let aa = new db_ori(arg)
		// console.log(23,aa.creatTable)
		return aa
	}
}