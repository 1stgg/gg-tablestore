
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
	//table
	createTable:'./table/createTable.js',
	deleteTable:'./table/deleteTable.js',
	listTable:'./table/listTable.js',
	getTable:'./table/getTable.js',

	//index
	createIndex:'./table/index/createSearchIndex.js',
	deleteIndex:'./table/index/deleteSearchIndex.js',
	listIndex:'./table/index/listSearchIndex.js',

	//curd
	c:'./row/c.js',
	u:'./row/u.js',
	r:'./row/r.js',
	d:'./row/d.js',
	where:'./row/where.js',

	//more
	setDefault:'./more/setDefault.js',


}
for(let key in fileList){
	let item = fileList[key]
	db_ori.prototype[key] = require(item)
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