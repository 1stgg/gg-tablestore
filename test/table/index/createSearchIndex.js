module.exports = async function a(argument) {
	// console.log(2,db().creatTable)
	return await db('temp').creatIndex({
			// name:'temp',//默认为table_name
			index:{
				id:{
					type:'long'
				}
			}
			
		})
}
