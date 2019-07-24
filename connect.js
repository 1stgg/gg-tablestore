let TableStore = require('tablestore')
module.exports = function function_name(account) {
	let client = this.client
	if(client){
		return client
	}else{
		client = new TableStore.Client(account);
		this.client = client
	}
}