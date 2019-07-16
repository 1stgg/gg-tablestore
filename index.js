// import account from './account.js'
// import TableStore from 'tablestore'
let TableStore = require('tablestore')
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
var arg = process.argv.splice(2);
console.log(13,arg)
let test = require('./test/index.js')
// require('./db.js')[arg[0]]()
test[arg[0]]()