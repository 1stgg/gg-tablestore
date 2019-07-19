
module.exports = async function a(argument) {
	// console.log(2,db().creatTable)
	return await db('temp').c({
			key:{
				id:parseInt(Math.random()*1000),
				// str:'str',
				// bin:Buffer.from('a'),
				// bin:666, 
			},
			data:{
				int:666,
				float:2.33,
				str_data:'asdfjikhjio',
				bool:true,
			}
		})
}
