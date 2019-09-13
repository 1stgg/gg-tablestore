
let default2 = require('./default.js')
let last_sql = {}
let client = 0
let temp_client = {}
function setTempClient(client_origin) {
	let set_fun_arr = [
		'createTable',
		'listTable',
		'deleteTable',
		'describeTable',

		'getRow',
		'putRow',
		'updateRow',
		'deleteRow',
		'getRange',
		'batchGetRow',
		'batchWriteRow',

		'listSearchIndex',
		'describeSearchIndex',
		'createSearchIndex',
		'deleteSearchIndex',
		'search',
		'createIndex',
		'dropIndex',
	]
	for (let key in set_fun_arr){
		let name = set_fun_arr[key]
		// let item = client_origin[name]
		// console.log(11, item);
		// continue
		temp_client[name] = (param)=>{
			return new Promise(function (resolve, reject) {
				// console.log(11,item);
				client_origin[name](param, (err, data) => {
					// console.log(38,err);
					// console.log(39,data);
					let re_so = data == null ? err : data
					// console.log(41,JSON.stringify(re_so));
					// console.log(41.1, JSON.stringify(data == null));
					resolve(re_so);
				})
			});
			
		}
	}
}
function db_ori(table) {
	this.client_origin = client
	this.client = temp_client
	this.last_sql = last_sql
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
		setTempClient(client)
	},
	db(arg) {
		let aa = new db_ori(arg)
		// console.log(23,aa.creatTable)
		return aa
	}
}