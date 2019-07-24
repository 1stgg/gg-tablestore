module.exports = async function a(arg) {
	let client = this.client
	// console.log(3,client)
	let re = await client.listTable()
	console.log(5,re)
	return re
}