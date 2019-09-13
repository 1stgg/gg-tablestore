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
        let param = {
            tableName: this.table,
            condition: new TableStore.Condition(TableStore.RowExistenceExpectation.EXPECT_NOT_EXIST, null),
            primaryKey: key_arr,
            attributeColumns: col,
            returnContent: { returnType: TableStore.ReturnType.Primarykey }
        }
        let re = await client.putRow(param)
        this.setLastSql('putRow', param)
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
              returnType: TableStore.ColumnReturnType.RETURN_NONE
        }
        })
        console.log()
        let col = []
        for(let key in arg){
            let item = arg[key]
            col.push({
                [key]: tableDataType(item)
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
            // let attr = get2attr(item.attributes)
            // let colu = attr.concat(col)
            let colu = col
            // console.log(60, inc)
            rows.push({
                type: 'UPDATE',
                condition: new TableStore.Condition(TableStore.RowExistenceExpectation.EXPECT_EXIST, null),
                primaryKey: keys,
                attributeColumns: [
                    { 'PUT': colu },
                    // { 'INCREMENT': inc },
                ],
                returnContent: { returnType: TableStore.ReturnType.Primarykey }
            })
        }
        let param = {
            tables: [{
                tableName: this.table,
                rows: rows,
            }],
        }
        let re2 = await client.batchWriteRow({
            tables: [{
                tableName: this.table,
                rows: rows,
            }],
        })

        this.setLastSql('batchWriteRow', param)
        return this.getData('u',re2)
    },

    async dec(arg) {
        let par = {}
        for(let key in arg){
            let item = arg[key]
            par[key] = -item
        }
        return await this.inc(par)
    },
    async inc(arg) {
        let client = this.client
        
        // console.log(3,key_arr)
        let re = await client.search({
          tableName: this.table,
          indexName: this.index||this.table,
          searchQuery: this.searchQuery,
          columnToGet: { //返回列设置：RETURN_SPECIFIED(自定义),RETURN_ALL(所有列),RETURN_NONE(不返回)
              returnType: TableStore.ColumnReturnType.RETURN_NONE
        }
        })
        // console.log()
        let col = []
        for(let key in arg){
            let item = arg[key]
            col.push({
                [key]: tableDataType(item)
            })
        }
        let res = []
        let params = []
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
            // console.log(156, JSON.stringify(keys));
            // console.log(156.1, JSON.stringify(col));
            let colu = col
            var param = {
                tableName: this.table,
                condition: new TableStore.Condition(TableStore.RowExistenceExpectation.EXPECT_EXIST, null),
                primaryKey: keys,
                updateOfAttributeColumns: [
                    { 'INCREMENT': colu },
                ],
                returnContent: { returnType: TableStore.ReturnType.Primarykey }
            };
            let re_up = await client.updateRow(param)
            // console.log(168,JSON.stringify(re_up));
            res.push(re_up)
            params.push(param)
        }
        
        this.setLastSql('updateRow', params)
        return this.getData('inc', res)
    },
    async r(arg) {
        let client = this.client
        let searchQuery = this.searchQuery
        // console.log(105,searchQuery.query.query.mustQueries[1].query.mustNotQueries[0].query);
        if (!this.default.delete.type) {
            searchQuery.query.query.mustNotQueries=[ { queryType: 3, query: { fieldName: '_del', term: true } }]
        }
        if (this.config_obj.next) {
            searchQuery.token = Buffer.from(this.config_obj.next, "base64")
        }
        
        // console.log(3,key_arr)
        let param = {
            tableName: this.table,
            indexName: this.index || this.table,
            searchQuery: searchQuery,
            columnToGet: { //返回列设置：RETURN_SPECIFIED(自定义),RETURN_ALL(所有列),RETURN_NONE(不返回)
                returnType: TableStore.ColumnReturnType.RETURN_ALL
            }
        }
        let re = await client.search(param)
        this.setLastSql('search', param)
        // console.log(169,'read',re)
        return this.getData('r',re)
    },
    async next(stringToken) {
        let client = this.client
        var params = {
            tableName: this.table,
            indexName: this.index || this.table,
            searchQuery: {
                offset: 0,
                limit: 10,
                token: null,//获取nextToken作为下一页起点（数据类型字节流）
                query: {
                    queryType: TableStore.QueryType.MATCH_ALL_QUERY
                },
                getTotalCount: true
            },
            columnToGet: {
                returnType: TableStore.ColumnReturnType.RETURN_NONE,
            }
        };

        /**
         * 同步示例：基于token实现的翻页
         */
        (async () => { //同步示例代码
            try {
                var data = await client.search(params);
                console.log(224,data);
                let stringToken = data.nextToken.toString("base64", data.nextToken.offset, data.nextToken.limit);
                // while (data.nextToken) { //如果存在nextToken，说明还有数据
                params.searchQuery.token = Buffer.from(stringToken, "base64");// 翻页更新token值
                    data = await client.search(params);
                    console.log(230,data);
                // }
            } catch (error) {
                console.log(error);
            }
        })()
        return
        console.log(236, JSON.stringify(stringToken));
        let param = {
            tableName: this.table,
            indexName: this.index || this.table,
            searchQuery: {
                token: new Buffer(stringToken, "base64"),//获取nextToken作为下一页起点（数据类型字节流）
                query: {
                    queryType: TableStore.QueryType.MATCH_ALL_QUERY
                },
                getTotalCount: this.config_obj.count || this.default.count
            },
            columnToGet: { //返回列设置：RETURN_SPECIFIED(自定义),RETURN_ALL(所有列),RETURN_NONE(不返回)
                returnType: TableStore.ColumnReturnType.RETURN_ALL
            }
        }
        let re = await client.search(param)
        this.setLastSql('search', param)
        console.log(217, 'token', stringToken)
        console.log(169,'read',re)
        return this.getData('r', re)
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
        // console.log(56,'delete',re2)
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
        let param = {
            tables: [{
                tableName: this.table,
                rows: rows,
            }],
        }
        let re2 = await client.batchWriteRow(param)
        let dustbin_type = this.default.delete.dustbin_type
        if (dustbin_type== 20 || (dustbin_type == 10)) {
            this.addDustbin(this.table,re)
        }
        this.setLastSql('batchWriteRow', param)
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