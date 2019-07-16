module.exports = async function a(arg) {
	let client = getClient()
	// console.log(3,client)
	let re = await client.createTable({
  	tableMeta: {
    	tableName: arg.name,
	    primaryKey: arg.key || [
	      {
	        name: 'id',
	        type: 'INTEGER'
	      },
	    ]
	  },
	  reservedThroughput: {
	    capacityUnit: {
	      read: 0,
	      write: 0
	    }
	  },
	  tableOptions: {
	    timeToLive: -1,// 数据的过期时间, 单位秒, -1代表永不过期. 假如设置过期时间为一年, 即为 365 * 24 * 3600.
	    maxVersions: 1// 保存的最大版本数, 设置为1即代表每列上最多保存一个版本(保存最新的版本).
	  }
	})
	console.log(24,re)
	return re
}