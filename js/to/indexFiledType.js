let TableStore = require('tablestore')
// console.log(2,TableStore.FieldType)
// '{"LONG":1,"DOUBLE":2,"BOOLEAN":3,"KEYWORD":4,"TEXT":5,"NESTED":6,"GEO_POINT":7}'
module.exports = function a(arg) {
	switch (arg) {
		case 'int':
			arg = 'long'
			break;
		case 'str':
			arg = 'KEYWORD'
			break;
		case 'bool':
			arg = 'BOOLEAN'
			break;
		case 'float':
			arg = 'DOUBLE'
			break;
		case 'geo':
			arg = 'GEO_POINT'
			break;
	
		default:
			break;
	}
	let type = arg.toLocaleUpperCase()
	return TableStore.FieldType[type]
}