let gg = require('../../gg_tool')

module.exports = async function rowStream(db,table_name) {
	let keys = {
		id:parseInt(Math.random()*666) ,
		str:'str',
	}
	
	let data = {
		int:parseInt(Math.random()*666),
		float:Math.random()*666,
		str_data:'TEXT',
		bool:false,
	}

	
	// let create_status = 
	// 	await db(table_name)
	// 	.c(keys,data)

	let table_val = 
		await db(table_name)
		.where({
			id:337,
			float:['>',270],
			and:[//多条件
				{
					str_data:'TEXT',
					bool:false,
					int:['>=',584],
					not:[
						{bool:true,int:['in',[600,500]],}
					]
				},
				{
					int:['<=',600],
					str_data:['like','*E*'],
					or:[
						{bool:true,str_data:'TEXT'},
						{bool:false},
					]
				}
			]
		})
		.r()
		// db().getLastSql()
	console.log(44,JSON.stringify(table_val));
	
}