module.exports = async function a(argument) {
	// console.log(2,db().creatTable)
	return await db('temp').c({
			key:[{id:6666666}],
			data:{
				int:666,
				float:2.33,
				str:'asdfjikhjio',
				bool:true,
			}
		})
}
