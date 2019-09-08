let TableStore = require('tablestore')
// console.log(2,TableStore.FieldType)
module.exports = function a(arg) {
	let type = arg.toLocaleUpperCase()
	return TableStore.FieldType[type]
}