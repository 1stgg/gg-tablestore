module.exports = async function a(argument) {
	// console.log(2,db().creatTable)
	return await db('temp').createIndex({
			// name:'temp',//默认为table_name
			index:{
				id:{
					type:'long'
				},
				int:{
					type:'long'
				},
				float:{
					type:'DOUBLE'
				},
				str_data:{
					type:'TEXT'
				},
				bool:{
					type:'BOOLEAN'
				},
			}
			
		})
}
