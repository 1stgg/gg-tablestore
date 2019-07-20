module.exports = async function a(argument) {
  // console.log(2,db().creatTable)
  // {
  // 			int:666,
  // 			float:2.33,
  // 			str_data:'asdfjikhjio',
  // 			bool:true,
  // 		}
  return await db('temp').where({
    bool: {
      and: [{
        term: {
          fieldName: 'id',
          term: 914,
        }
      } ],
    }
  })
  .u({
    int:233,
    str_data:'awsl',
  })
}