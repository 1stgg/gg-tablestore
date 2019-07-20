
let default2 = require('./default.js')
function obj(table) {
	this.table = table
	// this.index
	// this.whereValue
	this.limitValue = default2.limit
	this.pageValue = default2.page
	this.countValue = default2.count
	// this.fieldValue

	// this.searchQuery
	// this.columnToGet
}
let fileList = require('./fileList.js')
for(let key in fileList){
	let item = fileList[key]
	obj.prototype[key] = require(item)
}

module.exports =  function a(arg) {
	let aa = new obj(arg)
	// console.log(23,aa.creatTable)
	return aa
}