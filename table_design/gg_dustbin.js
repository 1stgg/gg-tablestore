// type:['str','int','bool']
// ext_type:['str','int','bool','obj_str','time','date']
module.exports = {
    attr:{
        data:{
            type:'str',
            ext_type:'obj_str',
            title:'源数据',
        },
        time_c:{
            type:'int',
            ext_type:'time',
            title:'创建时间',
            is_index:true
        },
        table:{
            type:'str',
            ext_type:'str',
            title:'表名称',
            is_index:true
        },
    }
}