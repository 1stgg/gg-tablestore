module.exports = async function a(argument) {
	// console.log(2,db().creatTable)
	return await db().creatTable({
			name:'temp',
			// key:[{name:'id',type:'INTEGER'}]
			// index:{

			// }
		})
}
