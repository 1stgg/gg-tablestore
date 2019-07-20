let TableStore = require('tablestore')
let queryType = require('../table/to/queryType.js')
module.exports = function a(arg) {
	this.whereValue = arg
	let searchQuery = {
		offset:(this.pageValue-1) * this.limitValue,
    limit: this.limitValue, //如果只为了取行数，但不需要具体数据，可以设置limit=0，即不返回任意一行数据。
    // query: { // 设置查询类型为TermQuery
    //     queryType: TableStore.QueryType.TERM_QUERY,
    //     query: {
    //         fieldName: "Col_Keyword",
    //         term: "hangzhou"
    //     }
    // },
    getTotalCount: this.countValue // 结果中的TotalCount可以表示表中数据的总行数， 默认false不返回
	}
	
	let query = nest(this.whereValue)
	

	searchQuery.query = query
	console.log(22,query)
	this.searchQuery = searchQuery
	return this
}

function nest(arg) {
	let re = {}
	// if(typeof(arg) !='object'){
	// 	return
	// }
	let key = Object.keys(arg)
	// console.log(33,key)
	switch(key[0]){
	    case 'and' :
	    	// console.log(31,'and')
	    	re.mustQueries = []
	    	for(let key2 in arg[key[0]]){
	    		let item2 = arg[key[0]][key2]
	    		// console.log(39,item2)
	    		re.mustQueries.push(nest(item2))
	    	}
	        break
	    case 'bool' :
	    	re = {
	    		queryType:queryType(key[0]),
	    		query:nest(arg[key[0]]),
	    	}
	        break
	    default :
	    	re = {
	    		queryType:queryType(key[0]),
	    		query:arg[key[0]],
	    	}

	      break
	}
	// console.log(50,re)
	return re
}