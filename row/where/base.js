let TableStore = require('tablestore')
let queryType = require('../../table/to/queryType.js')
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
    getQuery(key,val){
        let re = {}
        
        console.log(14,val);
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
           
               default:
                   break;
           } 
        }else{
            re = where.eq(key,val)
        }
        return re
    },
}

module.exports = where
