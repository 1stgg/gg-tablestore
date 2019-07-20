let TableStore = require('tablestore')

module.exports = function a(arg) {
	arg += '_query'
	let type = arg.toLocaleUpperCase()
	return TableStore.QueryType[type]
}