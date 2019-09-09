let gg = require('../../js/gg_tool')

module.exports = async function allStream(db, table_name) {
    db().setDefault({ delete: { type: 10, dustbin_type: 10, }, data: { type: 'simple', }, index: { type: 'time_random', } })

    // let have_table = await db().haveTable(table_name)
    // console.log(7,JSON.stringify(have_table));

    // if (have_table.all_have) {
    //     let have_index = await db(table_name).haveIndex(table_name)
    //     console.log(11,JSON.stringify(have_index));

    //     if (have_index.all_have) {
    //         let delete_index = await db(table_name).deleteIndex(table_name)
    //         console.log(14,JSON.stringify(delete_index));
    //     }

    //     let delete_table = await db(table_name).deleteTable()
    //     console.log(17, JSON.stringify(delete_table));
    // }

    // let create_table = await db(table_name).createTable()
    // console.log(20, JSON.stringify(create_table));

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
    // console.log(31, JSON.stringify(c));
    // sleep(24000)
    
    let r = 
        await db(table_name)
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
    console.log(55, JSON.stringify(r));


    return
    // let have_table = await db(table_name).haveTable()
    // console.log(7,JSON.stringify(have_table));

    let list_index = await db(table_name).listIndex()
    console.log(7,JSON.stringify(list_index));
    // return
    let is_have_index = gg.inArr(table_name, list_index)
    if (is_have_index) {
        await db(table_name).deleteIndex()
    }

    let list = await db().listTable()
    let is_have = gg.inArr(table_name, list)
    if (is_have) {
        await db(table_name).deleteTable()
    }

    console.log();
    //table
    let success =
        await db(table_name)
            .createTable()

    let c_index_suc = await db(table_name)
        .createIndex()
    let c_id = await db(table_name).c({
        str: 'ahfjkdhsj',
    })
    console.log(41, c_id);
    let u_ids = await db(table_name).where({
        id: 15679326731253020
    }).u({
        str: 'str'
    })
    let r_data = await db(table_name).config({
        count: true
    }).where({
        id: 15679326731253020,
        // not:[
        //     {_del:true}
        // ]
    }).r()
    console.log(57, r_data);
    let d_data = await db(table_name).config({
        del: true
    }).where({
        id: 15679517436666180
    }).d()
    console.log(50, d_data);

}

function sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
        continue;
    }
}