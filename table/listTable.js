module.exports = async function a(arg) {
	let client = getClient()
	// console.log(3,client)
	let re = await client.listTable()
	console.log(5,re)
	return re
}