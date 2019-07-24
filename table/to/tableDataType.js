let TableStore = require('tablestore')
let gg = require('../../gg_tool.js')
module.exports = function a(arg) {
	switch(gg.typeof(arg)){
		    case 'int' :
		    	arg = TableStore.Long.fromNumber(arg)
		        break
		    default :
		        break
		}
	return arg
}