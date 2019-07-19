module.exports = async function a(argument) {
	let re = await db('test').getTable()
	console.log(re.table_meta.primary_key)
	return re
}
