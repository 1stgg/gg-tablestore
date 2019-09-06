let TableStore = require('tablestore')
let db = require('./db.js')
// let client = 0
// function tbs_ori(arg) {
// 	this.account
// 	this.client
// }

// tbs_ori.prototype.connect = function function_name(account) {
// 	// this.account = account
// 	// client =  new TableStore.Client(account);
// 	db.setClient(new TableStore.Client(account))
// 	return db.db
// }
module.exports = function tbs(account) {
	// let aa = new tbs_ori(arg)
	// // console.log(23,aa.creatTable)
	// return aa
	db.setClient(new TableStore.Client(account))
	return db.db
}





// let default2 = require('./default.js')
// function db_ori(table) {
// 	this.client = client
// 	this.table = table
// 	// this.index
// 	// this.whereValue
// 	this.limitValue = default2.limit
// 	this.pageValue = default2.page
// 	this.countValue = default2.count

// 	// this.fieldValue
// 	// this.fieldValue

// 	// this.searchQuery
// 	// this.columnToGet
// }
// let fileList = require('./fileList.js')
// for(let key in fileList){
// 	let item = fileList[key]
// 	db_ori.prototype[key] = require(item)
// }

// function db(arg) {
// 	let aa = new db_ori(arg)
// 	// console.log(23,aa.creatTable)
// 	return aa
// }
