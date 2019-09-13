module.exports = {
  async createTable(arg) {
    let client = this.client
    // console.log(3,client)
    let key_arr = []
    for (let key in arg) {
      let item = arg[key]
      key_arr.push({
        name: key,
        type: item,
      })
    }
    // console.log(11,key_arr)
    let param = {
      tableMeta: {
        tableName: this.table,
        primaryKey: key_arr.length && this.default.index.type == 'custom' ? key_arr : [
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
    }
    // this.client_origin.createTable(param,(err,data)=>{
    //   console.log(36,JSON.stringify(err));
    //   console.log(36.1, JSON.stringify(data));
    // })
    let re = await client.createTable(param)
    // console.log(24, re.code)
    this.setLastSql('createTable', param)
    return this.getData('createTable', re)
  },
  async updateTable(arg) {
    let client = this.client
    // console.log(3,client)
    let param = {
      tableName: this.table,
      ...arg
    }
    let re = await client.updateTable(param)
    // console.log(7,re)
    this.setLastSql('updateTable', param)
    return re
  },
  async listTable() {
    let client = this.client
    // console.log(3,client)
    let re = await client.listTable()
    // console.log(5,re)

    // return re.table_names
    this.setLastSql('listTable', {})
    return this.getData('listTable', re)
  },
  async deleteTable() {
    let client = this.client
    // console.log(3,client)
    let param = {
      tableName: this.table
    }
    let re = await client.deleteTable(param)
    // console.log(7,re)
    this.setLastSql('deleteTable', param)
    return this.getData('deleteTable', re)
  },
  async getTable() {
    let client = this.client
    // console.log(3,client)
    let param = {
      tableName: this.table
    }
    let re = await client.describeTable(param)
    if (re.code) {
      re.err = re.code
      re.err_msg = re.message
    }
    // console.log(24,re)
    this.setLastSql('getTable', param)
    return re
  },
  async haveTable(check_table) {
    let have_table = await this.config({
      data: 'simple',
    }).listTable()
    let param = { check_table, have_table}
    let re = this.checkHave(check_table, have_table)
    // return re.table_names
    this.setLastSql('checkHave', param)
    return re
  },

}