let TableStore = require('tablestore')
let db = require('./js/db.js')

module.exports = function tbs(account) {
	
	db.setClient(new TableStore.Client(account))
	return db.db
}
