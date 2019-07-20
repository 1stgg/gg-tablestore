module.exports = async function a(argument) {
	// console.log(2,db().creatTable)
	// console.log(3)
	return await db('test').createTable({
				id:'INTEGER',
				str:'STRING',
				bin:'BINARY',
			})
	// return await db('test').createTable({
	// 		key:[
	// 			{name:'id',type:'INTEGER'},
	// 			{name:'str',type:'STRING'},
	// 			{name:'bin',type:'BINARY'},
	// 		]
	// 	})
}
