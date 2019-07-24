module.exports = async function a(arg) {
	let client = this.client
	// console.log(3,client)
	let re = await client.describeTable({
		tableName: this.table
	})
	console.log(24,re)
	return re
}