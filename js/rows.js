let TableStore = require('tablestore')
let tableDataType = require('./to/tableDataType.js')
let get2attr = require('./to/get2attr.js')
let wherejs = require('./where.js')
module.exports = {
    async c(keys,data) {
        let client = this.client
        let col = []
        for(let key in data){
            let item = data[key]
            
            col.push({
                [key]:tableDataType(item)
            })
        }
        // console.log(col)
        let key_arr = []
        for(let key in keys){
            let item = keys[key]
            switch(typeof(item)){
                case 'number' :
                    item = TableStore.Long.fromNumber(item)
                    break
                default :
                    // key_arr.push({[key]:item})
                    break
            }
    
            key_arr.push({
                [key]:item
            })
        }
        // console.log(3,key_arr)
        let re = await client.putRow({
          tableName: this.table,
          condition: new TableStore.Condition(TableStore.RowExistenceExpectation.EXPECT_NOT_EXIST, null),
          primaryKey: key_arr,
          attributeColumns: col,
          returnContent: { returnType: TableStore.ReturnType.Primarykey }
        })
        console.log(169,'add',re)
        return re
    },
    async d(arg) {
        let client = this.client
        
        // console.log(3,key_arr)
        let re = await client.search({
          tableName: this.table,
          indexName: this.index||this.table,
          searchQuery: this.searchQuery,
          columnToGet: { //返回列设置：RETURN_SPECIFIED(自定义),RETURN_ALL(所有列),RETURN_NONE(不返回)
            returnType: TableStore.ColumnReturnType.RETURN_ALL
        }
        })
        let rows = []
        let re2 = []
        for(let key in re.rows){
            let item = re.rows[key]
            let keys = []
            for(let key2 in item.primaryKey){
                let item2 = item.primaryKey[key2]
                keys.push({
                    [item2.name]:item2.value
                })
            }
        re2.push(await client.deleteRow({
            tableName: this.table,
            condition: new TableStore.Condition(TableStore.RowExistenceExpectation.EXPECT_EXIST, null),
            primaryKey: keys
        }))
        }
        // console.log(47,key_arr)
        // let re2 = 
        console.log(56,'delete',re2)
        return re
    },
    async r(arg) {
        let client = this.client
        
        // console.log(3,key_arr)
        let re = await client.search({
          tableName: this.table,
          indexName: this.index||this.table,
          searchQuery: this.searchQuery,
          columnToGet: { //返回列设置：RETURN_SPECIFIED(自定义),RETURN_ALL(所有列),RETURN_NONE(不返回)
            returnType: TableStore.ColumnReturnType.RETURN_ALL
        }
        })
        console.log(169,'read',re)
        return re
    },
    async u(arg) {
        let client = this.client
        
        // console.log(3,key_arr)
        let re = await client.search({
          tableName: this.table,
          indexName: this.index||this.table,
          searchQuery: this.searchQuery,
          columnToGet: { //返回列设置：RETURN_SPECIFIED(自定义),RETURN_ALL(所有列),RETURN_NONE(不返回)
            returnType: TableStore.ColumnReturnType.RETURN_ALL
        }
        })
        console.log()
        let col = []
        for(let key in arg){
            let item = arg[key]
            
            col.push({
                [key]:tableDataType(item)
            })
        }
        
        let rows = []
        for(let key in re.rows){
            let item = re.rows[key]
            let keys = []
            for(let key2 in item.primaryKey){
                let item2 = item.primaryKey[key2]
                keys.push({
                    [item2.name]:item2.value
                })
            }
            let attr = get2attr(item.attributes)
            let colu = attr.concat(col)
            // console.log(60,colu)
            rows.push({
            type: 'PUT',
            condition: new TableStore.Condition(TableStore.RowExistenceExpectation.EXPECT_EXIST, null),
            primaryKey: keys,
            attributeColumns: colu,
            returnContent: { returnType: TableStore.ReturnType.Primarykey }
        })
        }
        // console.log(47,key_arr)
        // console.log(48,col)
        // console.log(169,'update',re)
        let re2 = await client.batchWriteRow({
          tables: [{
            tableName: this.table,
            rows: rows,
        }],
        })
        console.log(56,'update',re2)
        return re
    },
    where(arg) {
        this.whereValue = arg
        let searchQuery = {
            offset:(this.pageValue-1) * this.limitValue,
        limit: this.limitValue, //如果只为了取行数，但不需要具体数据，可以设置limit=0，即不返回任意一行数据。
        
        getTotalCount: this.countValue // 结果中的TotalCount可以表示表中数据的总行数， 默认false不返回
        }
        
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
    
}