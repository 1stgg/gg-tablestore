let TableStore = require('tablestore')
let tableDataType = require('./tableDataType.js')
module.exports = function a(arg) {
	let re = []
	for(let key in arg){
		let item = arg[key]

		re.push({
			[item.columnName]:tableDataType(item.columnValue)
		})
	}
	return re
}