let gg = require('../../js/gg_tool')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
module.exports = async function allApi(db, table_name) {
  db().setDefault({ delete: { type: 10, dustbin_type: 10, }, data: { type: 'simple', }, index: { type: 'time_random', } })
  let run = {
    table: {
      // create: true,
      // update: false,//forbidden update capacity unit
      // list: true, 
      // delete: true,
      // get: true,
      // have: true,
    },
    index: {
      // create: true,
      // list: true,
      // delete: true,
      // get: true,
      // have: true,
    },
    row: {
      c: true,
      u: true,
      r: true,
      d: true,
    },
    more:{
      // getLastSql:true
    }
  }
  // table
  if (run.table.create) {
    let create_table = await db(table_name).createTable()
    console.log(0, 'create_table', JSON.stringify(create_table));
  }

  if (run.table.update) {
    let update_table = await db(table_name).updateTable({
      reservedThroughput: {
        capacityUnit: {
          read: 0,
          write: 0
        }
      },
      tableOptions: {
        maxVersions: 10,
      }
    })
    console.log(1, 'update_table', JSON.stringify(update_table));
  }

  if (run.table.list) {
    let list_table = await db().listTable(table_name)
    console.log(2, 'list_table', JSON.stringify(list_table));
  }

  if (run.table.delete) {
    let delete_table = await db(table_name).deleteTable()
    console.log(3, 'delete_table', JSON.stringify(delete_table));
  }

  if (run.table.get) {
    let get_table = await db(table_name).getTable()
    console.log(2.0, 'get_table', JSON.stringify(get_table));
  }

  if (run.table.have) {
    let have_table = await db().haveTable(table_name)
    console.log(2.1, 'have_table', JSON.stringify(have_table));
  }

  // search_index
  if (run.index.create) {
    let create_index = await db(table_name).createIndex({
      int: 'int',
      bool: 'bool',
      str: 'str',
    })
    console.log(0, 'create_index', JSON.stringify(create_index));
  }

  if (run.index.list) {
    let list_index = await db(table_name).listIndex()
    console.log(2, 'list_index', JSON.stringify(list_index));
  }

  if (run.index.delete) {
    let delete_index = await db(table_name).deleteIndex()
    console.log(3, 'delete_index', JSON.stringify(delete_index));
  }

  if (run.index.get) {
    let get_index = await db(table_name).getIndex()
    console.log(2.0, 'get_index', JSON.stringify(get_index));
  }

  if (run.index.have) {
    let have_index = await db(table_name).haveIndex(table_name)
    console.log(2.1, 'have_index', JSON.stringify(have_index));
  }

  // row
  if (run.row.c) {
    let c = await db(table_name).c({
      int: 233,
      bool: false,
      str: 'asmr',
    })
    console.log(0, 'c', JSON.stringify(c));
  }
  let r = {}
  if (run.row.r) {
    r = await db(table_name)
      .where({
        int: 233,
        and: [
          { bool: false },
          { id: ['>', 233] },
        ],
        or: [
          { str: ['like', '*s*'], bool: true }
        ],
        not: [
          { _del: true }
        ]
      })
      .r()
    console.log(2, 'r', JSON.stringify(r));
  }
  if (run.row.u) {
    let u = await db(table_name)
      .where({
        id: 233||r.rows[r.rows.length - 1].id,
      })
      .u({
        update: true
      })
    // https://github.com/aliyun/aliyun-tablestore-python-sdk/blob/master/examples/update_row.py
    // update_of_attribute_columns = {
    //     'PUT': [('name', 'David'), ('address', 'Hongkong')],
    //     'DELETE': [('address', None, 1488436949003)],
    //     'DELETE_ALL': [('mobile'), ('age')],
    //     'INCREMENT': [('counter', -1)]
    // }
    console.log(1, 'u', JSON.stringify(u));
  }


  if (run.row.d) {
    let d = await db(table_name)
      .where({
        id: r.rows[0].id,
      })
      .d()
    console.log(3, JSON.stringify(d));

  }

  // more
  if (run.more.getLastSql) {
    let get_last_sql = db().getLastSql()
    console.log(2,'get_last_sql', JSON.stringify(get_last_sql));

  }
  // db().test()


}
