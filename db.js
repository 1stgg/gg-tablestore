function obj(table) {
	this.table = table
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