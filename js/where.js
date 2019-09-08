let TableStore = require('tablestore')
let where = {
	eq(key,val){
        return { // 设置查询类型为TermQuery
            queryType: TableStore.QueryType.TERM_QUERY,
            query: {
                fieldName: key,
                term: val
            }
        }
    },
	big(key,val){
        return { // 设置查询类型为RangeQuery
            queryType: TableStore.QueryType.RANGE_QUERY,
            query: {
                fieldName: key,
                rangeFrom: val,
                // includeLower: true, // >= 1
                // rangeTo: 10,
                // includeUpper: false // < 10
            }
        }
    },
	bigEq(key,val){
        return { // 设置查询类型为RangeQuery
            queryType: TableStore.QueryType.RANGE_QUERY,
            query: {
                fieldName: key,
                rangeFrom: val,
                includeLower: true, // >= 1
                // rangeTo: 10,
                // includeUpper: false // < 10
            }
        }
    },
	small(key,val){
        return { // 设置查询类型为RangeQuery
            queryType: TableStore.QueryType.RANGE_QUERY,
            query: {
                fieldName: key,
                rangeTo: val,
            }
        }
    },
	smallEq(key,val){
        return { // 设置查询类型为RangeQuery
            queryType: TableStore.QueryType.RANGE_QUERY,
            query: {
                fieldName: key,
                rangeTo: val,
                includeUpper: true, 
            }
        }
    },
	in(key,val){
        return { // 设置查询类型为TermsQuery
            queryType: TableStore.QueryType.TERMS_QUERY,
            query: {
                fieldName: key,
                terms: val.constructor == Array ? val : val.splice(',')
            }
        }
    },
	like(key,val){
        console.log(66,val);
        if ('*'==val[0]) {
            val = '?'+val
        }
        return { // 设置查询类型为WILDCARD_QUERY
            queryType: TableStore.QueryType.WILDCARD_QUERY,
            query: {
                fieldName: key,
                value: val
            }
        }
    },
    getQuery(key,val){
        let re = {}
        
        // console.log(14,val);
        if (val.constructor == Array) {
           switch (val[0]) {
               case '>':
                   re = where.big(key,val[1])
                   break;
               case '>=':
                   re = where.bigEq(key,val[1])
                   break;
               case '<':
                   re = where.small(key,val[1])
                   break;
               case '<=':
                   re = where.smallEq(key,val[1])
                   break;
               case 'in':
                   re = where.in(key,val[1])
                   break;
               case 'like':
                   re = where.like(key,val[1])
                   break;
           
               default:
                   break;
           } 
        }else{
            re = where.eq(key,val)
        }
        return re
    },
    obj2origin(obj){
        let arr = []
        let bool = {}
        // console.log(131,obj);
        
        if (obj.constructor == Array) {
            for(let key_arr in obj){
              let item_arr = obj[key_arr]
              for(let key in item_arr){
                let item = item_arr[key]
                switch (key) {
                    case 'and':
                            bool.mustQueries = where.obj2origin(item)
                        break;
                    case 'or':
                            bool.shouldQueries = where.obj2origin(item)

                            bool.minimumShouldMatch = 1
                        break;
                    case 'not':
                            bool.mustNotQueries = where.obj2origin(item)
                        break;
                
                    default:
                            arr.push(where.getQuery(key,item))
                        break;
                }
              }
            }
        }else{
            for(let key2 in obj){
                let item2 = obj[key2]
                switch (key2) {
                    case 'and':
                            bool.mustQueries = where.obj2origin(item2)
                        break;
                    case 'or':
                            bool.shouldQueries = where.obj2origin(item2)
                        break;
                    case 'not':
                            bool.mustNotQueries = where.obj2origin(item2)
                            bool.minimumShouldMatch = 1
                        break;
                
                    default:
                            arr.push(where.getQuery(key2,item2))
                        break;
                }
              }
        }
        if (bool.mustQueries || bool.shouldQueries|| bool.mustNotQueries) {
            
            arr.push({
                queryType: TableStore.QueryType.BOOL_QUERY,
                query:bool
            })
            // console.log(181,JSON.stringify(bool));
            
        }
        // console.log('bool type',TableStore.QueryType.BOOL_QUERY);
        
        return arr
    },
}

module.exports = where
