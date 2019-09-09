
let default2 = require('./default.js')
let client = 0
function db_ori(table) {
	this.client = client
	this.table = table || ''
	this.index = ''
	this.searchQuery = {}
	this.whereValue = {}
	
	this.default = default2
	this.config_obj = {}
}
let fileList = {
	
	table:'./table.js',
	searchIndex:'./searchIndex.js',
	rows:'./rows.js',
	more:'./more.js',
}
for(let key_list in fileList){
	let file = fileList[key_list]
	let file_data = require(file)
	for(let key in file_data){
		let item = file_data[key]
		// console.log(53,file_data);
		
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