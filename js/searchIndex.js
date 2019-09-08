let indexFieldType = require('./to/indexFiledType.js')
module.exports = {
    async createIndex(arg,index_name) {
        let client = this.client
        let schema = {
            fieldSchemas:[]
        }
        for(let key in arg){
            let item = arg[key]
            schema.fieldSchemas.push({
                fieldName:key,
                ...item,
                fieldType:indexFieldType(item)
            })
        }
        // console.log(3,schema) 
        let tableName=this.table
        let re = await client.createSearchIndex({
          tableName:tableName,
          indexName:index_name || tableName,
          schema:schema
        })
        // console.log(21,'createSearchIndex',re)
        return re
    },
    async deleteIndex(index_name) {
        let client = this.client
        
        // console.log(3,schema)
        let re = await client.deleteSearchIndex({
            tableName:this.table,
            indexName:index_name|| this.table,
        })
        // console.log(10,'deleteSearchIndex',re)
        return re
    },
    async listIndex(arg) {
        let client = this.client
        
        // console.log(3,schema)
        let re = await client.listSearchIndex({
          tableName:this.table,
        })
        console.log(9,'listSearchIndex',re)
        // re.indices: [ { table_name: 'temp', index_name: 'temp' }
        
        
        return this.getData('listIndex',re)
    }
}
