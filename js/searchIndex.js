let indexFieldType = require('./to/indexFiledType.js')
module.exports = {
  async createIndex(arg = {}, index_name) {
    let client = this.client
    let schema = {
      fieldSchemas: []
    }
    if (this.default.index.type == 'time_random' || this.config_obj.index_type == 'time_random') {
      arg.id = 'long'
    }
    if (this.default.delete.type != 0) {
      arg[this.default.delete.filed] = 'boolean'
    }
    for (let key in arg) {
      let item = arg[key]
      schema.fieldSchemas.push({
        fieldName: key,
        ...item,
        fieldType: indexFieldType(item)
      })
    }
    // console.log(3,schema) 
    let tableName = this.table
    let param = {
      tableName: tableName,
      indexName: index_name || tableName,
      schema: schema,
    }
    // client.createSearchIndex(param,(err,data)=>{
    //   console.log(30,JSON.stringify(err));
    //   console.log(31,JSON.stringify(data));
    // })
    // return 0
    let re = await client.createSearchIndex(param)
    // console.log(21,'createSearchIndex',re)
    this.setLastSql('createSearchIndex', param)
    return this.getData('createIndex', re)
  },
  async listIndex(arg) {
    let client = this.client

    // console.log(3,schema)
    let param = {
      tableName: this.table,
    }
    let re = await client.listSearchIndex(param)
    // console.log(9,'listSearchIndex',re)
    this.setLastSql('listSearchIndex', param)
    return this.getData('listIndex', re)
  },
  async deleteIndex(index_name) {
    let client = this.client

    // console.log(3,schema)
    let param = {
      tableName: this.table,
      indexName: index_name || this.table,
    }
    let re = await client.deleteSearchIndex(param)
    // console.log(10,'deleteSearchIndex',re)
    this.setLastSql('deleteSearchIndex', param)
    return this.getData('deleteIndex', re)
  },
  async getIndex(index_name) {
    let client = this.client

    // console.log(3,schema)
    let param = {
      tableName: this.table,
      indexName: index_name || this.table,
    }
    let re = await client.describeSearchIndex(param)
    if (re.code) {
      re.err = re.code
      re.err_msg = re.message
    }
    // console.log(9,'listSearchIndex',re)
    this.setLastSql('describeSearchIndex', param)
    return re
  },
  async haveIndex(check_table) {
    let have_table = await this.config({
      data: 'simple',
    }).listIndex()
    check_table = check_table ? check_table : this.table
    let re = this.checkHave(check_table, have_table)
    let param = { check_table, have_table}
    // return re.table_names
    this.setLastSql('haveIndex', param)
    return re
  },

}
