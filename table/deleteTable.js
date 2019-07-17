module.exports = async function a(arg) {
	let client = getClient()
	// console.log(3,client)
	let re = await client.deleteTable({
  	tableName:arg.name
	})
	console.log(7,re)
	return re
}