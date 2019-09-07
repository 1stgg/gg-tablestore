let TableStore = require('tablestore')
let queryType = require('../table/to/queryType.js')
let wherejs = require('./where/base')
module.exports = function where(arg) {
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
	
	// let query = nest(this.whereValue)
	// let query = wherejs.obj2arr(this.whereValue)
	let query = {//6
		queryType: TableStore.QueryType.BOOL_QUERY,
		query: {
			mustQueries:wherejs.obj2origin(this.whereValue)
		}
}

	searchQuery.query = query
	// console.log(22,query)
	// console.log(23,JSON.stringify(query))
	this.searchQuery = searchQuery
	return this
}
