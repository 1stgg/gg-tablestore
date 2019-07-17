let TableStore = require('tablestore')
const NodeCache = require( "node-cache" );
global.db = require('./db.js')
global.client = 0
global.getClient = function (argument) {
	if(client){
		return client
	}
	var client = new TableStore.Client(require('./account.js'));
	global.client = client
	return client
}
global.S = function (key,value) {
	if(value === undefine){
		NodeCache.get(key)
	}else{
		NodeCache.set(key,value)
	}
}
var arg = process.argv.splice(2);
console.log(13,arg)
let test = require('./test/index.js')
// require('./db.js')[arg[0]]()
test[arg[0]]()