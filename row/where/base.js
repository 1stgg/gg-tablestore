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
    getBoolQuery(key,val){
        let query_obj = {
            mustQueries:[],
        }
        
        
          switch(key){
            case 'and' :
                console.log(41,item);
                
                    query_obj.mustQueries = getBoolQuery(key,item)
                    break
            case 'or' :
                    query_obj.shouldQueries = getBoolQuery(key,item)
                    break
            case 'not' :
                    query_obj.mustNotQueries = getBoolQuery(key,item)
                    break
            default :
                query_obj.mustQueries.push(where.getQuery(key,item))

                break
        }
        
        console.log(50,query_obj)
        console.log(50.1,query_obj.mustQueries)
        console.log(50.2,query_obj.shouldQueries)
        console.log(50.3,query_obj.mustNotQueries)
        return {//6
                queryType: TableStore.QueryType.BOOL_QUERY,
                query: query_obj
        }
    },
    obj2arr(obj){
        let arr = []
        let bool = {}
        
        if (obj.constructor == Array) {
            for(let key_arr in obj){
              let item_arr = obj[key_arr]
              for(let key in item_arr){
                let item = item[key]
                switch (key) {
                    case 'and':
                            bool.and = this.obj2arr(item)
                        break;
                    case 'or':
                            bool.or = this.obj2arr(item)
                        break;
                    case 'not':
                            bool.not = this.obj2arr(item)
                        break;
                
                    default:
                            arr.push({key:key,item:item})
                        break;
                }
              }
            }
        }else{
            for(let key in obj){
                let item = item[key]
                switch (key) {
                    case 'and':
                            bool.mustQueries = this.obj2arr(item)
                        break;
                    case 'or':
                            bool.shouldQueries = this.obj2arr(item)
                        break;
                    case 'not':
                            bool.mustNotQueries = this.obj2arr(item)
                        break;
                
                    default:
                            arr.push(where.getQuery(key,item))
                        break;
                }
              }
        }
        if (bool.and || bool.or|| bool.not) {
            
            arr.push({
                queryType: TableStore.QueryType.BOOL_QUERY,
                query:bool
            })
        }
    },
    obj2simple(obj){
        let query_arr = []
        let bool = {
            and:[],
            or:[],
            not:[],
        }
        
      for(let key in obj){
        let item = obj[key]
        switch (key) {
            case 'and':
                    bool.and.push(where.obj2simple(item))
                break;
        
            default:
                    query_arr.push(where.getQuery(key,item))
                break;
        }
      }
    },
    bool2simple(e){
        let bool = {
            and:[],
            or:[],
            not:[],
        }
        
      for(let index in e){
        let arr_item = e[index]
        for(let key in arr_item){
          let item = arr_item[key]
          switch (key) {
              case 'and':
                    bool.and.push()
                  break;
          
              default:
                  break;
          }
        }
      }
    },
    simple2origin(simple){
      
    },
}

module.exports = where
