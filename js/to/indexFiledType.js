let TableStore = require('tablestore')
// console.log(2,TableStore.FieldType)
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
	
		default:
			break;
	}
	let type = arg.toLocaleUpperCase()
	return TableStore.FieldType[type]
}