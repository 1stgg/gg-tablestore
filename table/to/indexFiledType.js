let TableStore = require('tablestore')

module.exports = function a(arg) {
	let type = arg.toLocaleUpperCase()
	return TableStore.FieldType[type]
}