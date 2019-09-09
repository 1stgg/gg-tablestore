let gg = require('../../js/gg_tool')

module.exports = async function defaultStream(db,table_name) {
    db().setDefault({
        delete:{
            type:10,//0:真删除,10:假删除,允许config()设置,20:所有数据都假删除,config()设置无效
            dustbin_type:10,//0:删除的数据 不 添加到垃圾箱,10:真删除的数据 添加到垃圾箱,20:真假 删除的都数据 都添加到垃圾箱
        },
        data:{
            type:'simple',//origin:原本返回什么就是什么,simple:简化版
        },
        index:{//索引,关联函数 table.js createTable()
            type:'time_random',//custom:自定义,time_random:索引只有id,值为  时间戳+随机数
        }
    })
    /***************** */
	// let list_index = await db(table_name).listIndex()
	// console.log(6,list_index);
	// // return
	// let is_have_index = gg.inArr(table_name,list_index)
	// if (is_have_index) {
	// 	await db(table_name).deleteIndex()
	// 	// console.log(`${table_name} index is have,dele it success`);
	// }
	
	// let list = await db().listTable()
	// // console.log('tableStream',4,list)
	// let is_have = gg.inArr(table_name,list)
	// if (is_have) {
	// 	await db(table_name).deleteTable()
	// 	// console.log(`${table_name} is have,dele it success`);
	// }
	// let success = 
	// 	await db(table_name)
    //     .createTable()

    // let c_index_suc =  await db(table_name)
    //     .createIndex()
    //************************ */
    let c_id = await db(table_name).c({
        str:'ahfjkdhsj',
    })
    console.log(41,c_id);
    let u_ids = await db(table_name).where({
        id:15679326731253020
    }).u({
        str:'str'
    })
    let r_data = await db(table_name).config({
        count:true
    }).where({
        id:15679326731253020,
        // not:[
        //     {_del:true}
        // ]
    }).r()
    console.log(57,r_data);
    let d_data = await db(table_name).config({
        del:true
    }).where({
        id:15679517436666180
    }).d()
    console.log(50,d_data);

}
