module.exports = {
    async createTable(arg) {
        let client = this.client
        // console.log(3,client)
        let key_arr = []
        for(let key in arg){
            let item = arg[key]
            key_arr.push({
                name:key,
                type:item,
            })
        }
        // console.log(11,key_arr)
        let re = await client.createTable({
          tableMeta: {
            tableName: this.table,
            primaryKey: key_arr || [
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
        // console.log(24,re)
        return re
    },
    async deleteTable(arg) {
        let client = this.client
        // console.log(3,client)
        let re = await client.deleteTable({
          tableName:this.table
        })
        // console.log(7,re)
        return re
    },
    async getTable(arg) {
        let client = this.client
        // console.log(3,client)
        let re = await client.describeTable({
            tableName: this.table
        })
        // console.log(24,re)
        return re
    },
    async listTable(arg) {
        let client = this.client
        // console.log(3,client)
        let re = await client.listTable()
        // console.log(5,re)
    
        return re.table_names
    }
}