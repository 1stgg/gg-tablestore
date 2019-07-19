module.exports = async function a(argument) {
	// console.log(2,db().creatTable)
	// console.log(3)
	return await db().createTable({
			name:'test',
			key:[
				{name:'id',type:'INTEGER'},
				{name:'str',type:'STRING'},
				{name:'bin',type:'BINARY'},
			]
			// index:{

			// }
		})
}
