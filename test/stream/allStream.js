let gg = require('../../js/gg_tool')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
module.exports = async function allStream(db, table_name) {
    db().setDefault({ delete: { type: 10, dustbin_type: 10, }, data: { type: 'simple', }, index: { type: 'time_random', } })
 
    // let have_table = await db().haveTable(table_name)
    // console.log(7,JSON.stringify(have_table));

    // if (!have_table.all_have) {
    //     let create_table = await db(table_name).createTable()
    //     console.log(11, JSON.stringify(create_table));

    //     let have_index = await db(table_name).haveIndex(table_name)
    //     console.log(14, JSON.stringify(have_index));

    //     if (have_index.all_have) {
    //         let create_index = await db(table_name).createIndex(table_name)
    //         console.log(18, JSON.stringify(create_index));
    //     }

    // }
    
    // let create_index = await db(table_name).createIndex({
    //     int:'int',
    //     bool:'bool',
    //     str:'str',
    // })
    // console.log(23, JSON.stringify(create_index));
    
    
    // let c = await db(table_name).c({
    //     int:233,
    //     bool:false,
    //     str:'asmr',
    // })
    // console.log(31,'c', JSON.stringify(c));
    
    let r = await 
        db(table_name)
        .where({
            int:233,
            and:[
                {bool:false},
                {id:['>',233]},
            ],
            or:[
                { str: ['like','*s*'],bool:true}
            ],
            not:[
                {_del:true}
            ]
        })
        .r()
    console.log(55,'r', JSON.stringify(r));

    // let u = await db(table_name)
    //     .where({
    //         id: r.rows[r.rows.length-1].id,
    //     })
    //     .u({
    //         update:true
    //     })
    // https://github.com/aliyun/aliyun-tablestore-python-sdk/blob/master/examples/update_row.py
    // update_of_attribute_columns = {
    //     'PUT': [('name', 'David'), ('address', 'Hongkong')],
    //     'DELETE': [('address', None, 1488436949003)],
    //     'DELETE_ALL': [('mobile'), ('age')],
    //     'INCREMENT': [('counter', -1)]
    // }
    // console.log(63,'u', JSON.stringify(u));

    // let d = await db(table_name)
    //     .where({
    //         id: r.rows[0].id,
    //     })
    //     .d()
    // console.log(70, JSON.stringify(d));
    


    // let delete_index = await db(table_name).deleteIndex(table_name)
    // console.log(14, JSON.stringify(delete_index));

    // let delete_table = await db(table_name).deleteTable()
    // console.log(17, JSON.stringify(delete_table));

}


// sleep(24000)
function sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
        continue;
    }
}