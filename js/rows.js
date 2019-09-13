let TableStore = require('tablestore')
let tableDataType = require('./to/tableDataType.js')
let get2attr = require('./to/get2attr.js')
let wherejs = require('./where.js')
let gg = require('./gg_tool.js')
module.exports = {
    async c(keys,data) {
        let client = this.client
        let col = []
        if (this.default.index.type == 'time_random') {
            data = gg.shallowCopy(keys)
            keys = {
                id: this.getId()
            }
        }
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
        // console.log(169,'add',re.row.primaryKey[0].value.toNumber())
        return this.getData('c',re)
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
        if (!rows.length) {
            return 
        }
        let re2 = await client.batchWriteRow({
          tables: [{
                tableName: this.table,
                rows: rows,
            }],
        })
        return this.getData('u',re2)
    },
    async r(arg) {
        let client = this.client
        let searchQuery = this.searchQuery
        // console.log(105,searchQuery.query.query.mustQueries[1].query.mustNotQueries[0].query);
        if (!this.default.delete.type) {
            searchQuery.query.query.mustNotQueries=[ { queryType: 3, query: { fieldName: '_del', term: true } }]
        }
        
        // console.log(3,key_arr)
        let re = await client.search({
          tableName: this.table,
          indexName: this.index||this.table,
          searchQuery: searchQuery,
          columnToGet: { //返回列设置：RETURN_SPECIFIED(自定义),RETURN_ALL(所有列),RETURN_NONE(不返回)
            returnType: TableStore.ColumnReturnType.RETURN_ALL
        }
        })
        // console.log(169,'read',re)
        return this.getData('r',re)
    },
    async d() {
        
        let true_del = false
        switch (this.default.delete.type) {
            case 0:
                true_del = true
                break;
            case 10:
                true_del = this.config_obj.del
                break;
        
            default:
                break;
        }
        
        
        let re2 = {}
        
        if (true_del) {
            re2 = await this.true_del()
        }else{
            re2 = await this.u({[this.default.delete.filed]:true})
        }
        // console.log(47,key_arr)
        // let re2 = 
        console.log(56,'delete',re2)
        return re2
    },
    async true_del() {
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
        for(let key in re.rows){
            let item = re.rows[key]
            let keys = []
            for(let key2 in item.primaryKey){
                let item2 = item.primaryKey[key2]
                keys.push({
                    [item2.name]:item2.value
                })
            }
            // let attr = get2attr(item.attributes)
            // let colu = attr.concat(col)
            // console.log(60,colu)
            rows.push({
                type: 'DELETE',
                condition: new TableStore.Condition(TableStore.RowExistenceExpectation.EXPECT_EXIST, null),
                primaryKey: keys,
                // attributeColumns: colu,
                returnContent: { returnType: TableStore.ReturnType.Primarykey }
            })
        }
        let re2 = await client.batchWriteRow({
          tables: [{
                tableName: this.table,
                rows: rows,
            }],
        })
        let dustbin_type = this.default.delete.dustbin_type
        if (dustbin_type== 20 || (dustbin_type == 10)) {
            this.addDustbin(this.table,re)
        }
        return this.getData('u',re2)
    },
    
    where(arg) {
        this.whereValue = arg
        let page = this.config_obj.page||this.default.page
        let limit = this.config_obj.limit||this.default.limit
        let count = this.config_obj.count||this.default.count
        let searchQuery = {
            offset:(page-1) * limit,
            limit: limit, //如果只为了取行数，但不需要具体数据，可以设置limit=0，即不返回任意一行数据。
            
            getTotalCount: count// 结果中的TotalCount可以表示表中数据的总行数， 默认false不返回
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