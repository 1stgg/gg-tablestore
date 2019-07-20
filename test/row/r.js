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
          fieldName: 'int',
          term: 666,
        }
      }, {
        term: {
          fieldName: 'float',
          term: 2.33,
        }
      }, {
        term: {
          fieldName: 'str_data',
          term: 'asdfjikhjio',
        }
      }, {
        term: {
          fieldName: 'bool',
          term: true,
        }
      }, ],
    }
  })
  .r()
}