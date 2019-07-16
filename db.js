function obj(table) {
	this.table = table
}
obj.prototype = {
	...obj.prototype,
	creatTable:require('./table/createTable.js')
}
// obj.prototype.creatTable = require('./table/createTable.js')
// obj.prototype.creatTable = 666
// obj.prototype.creatTable = async function creatTable(argument) {
// 	console.log(2,db().creatTable)
// 	return await db().creatTable({
// 			name:'temp',
// 			// key:[{name:'id',type:'INTEGER'}]
// 			// index:{

// 			// }
// 		})
// }

module.exports =  function a(arg) {
	let aa = new obj(arg)
	// console.log(23,aa.creatTable)
	return aa
}