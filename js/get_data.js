module.exports = {

    //table
    createTable(type,origin){
        let re 
        switch (type) {
            case 'simple':
                re = judgeErr(origin)
                break;
        
            default:
                re = origin
                break;
        }
        return re
    },
    listTable(type,origin){
        let re 
        switch (type) {
            case 'simple':
                    re = origin.table_names
                break;
        
            default:
                re = origin
                break;
        }
        return re
    },
    deleteTable(type, origin) {
        let re
        switch (type) {
            case 'simple':
                re = judgeErr(origin)
                break;

            default:
                re = origin
                break;
        }
        return re
    },

    //searchIndex
    createIndex(type, origin) {
        let re
        switch (type) {
            case 'simple':
                re = judgeErr(origin)
                break;

            default:
                re = origin
                break;
        }
        return re
    },
    deleteIndex(type, origin) {
        let re
        switch (type) {
            case 'simple':
                re = judgeErr(origin)
                break;

            default:
                re = origin
                break;
        }
        return re
    },
    listIndex(type,origin){
        let re 
        switch (type) {
            case 'simple':
                    re = []
                    for(let key in origin.indices){
                        let item = origin.indices[key]
                        re.push(item.index_name)
                    }
                break;
        
            default:
                re = origin
                break;
        }
        return re
    },

    //curd
    c(type,origin){
        let re 
        switch (type) {
            case 'simple':
                if (origin.row.primaryKey.length) {
                    re = []
                    for(let key in origin.row.primaryKey){
                        let item = origin.row.primaryKey[key]
                        re.push(shiftType(item.value))
                    }
                }else{
                    re = shiftType(origin.row.primaryKey[0].value)
                }
                
                break;
        
            default:
                re = origin
                break;
        }
        return re
    },
    u(type,origin){
        let re 
        switch (type) {
            case 'simple':
                let rows = []
                // console.log(60,origin);
                if (origin.code > 0) {
                    rows = []
                    break
                }
                for (let key_tb in origin.tables){
                    let item_tb = origin.tables[key_tb]
                    let row = {}
                    for (let key in item_tb.primaryKey) {
                        let item = item_tb.primaryKey[key]
                        
                        row[item.name] = shiftType(item.value)
                    }
                    rows.push(row)
                }
                if (rows.length > 0) {
                    re = {
                        err:0,
                        err_msg:'更新成功！',
                        rows
                    }
                }else{
                    re = {
                        err: origin.code || 1,
                        err_msg: origin.message || '更新失败！',
                        rows
                    }
                }
                
                break;
        
            default:
                re = origin
                break;
        }
        return re
    },
    r(type,origin){
        let re = {}
        let rows = []
        if (origin.nextToken) {
            origin.nextToken = origin.nextToken.toString("base64", origin.nextToken.offset, origin.nextToken.limit)
        }
        switch (type) {
            case 'simple':
                for(let key in origin.rows){
                    let row = {}
                    let item = origin.rows[key]
                    for(let key_p in item.primaryKey){
                        let item_p = item.primaryKey[key_p]
                        row[item_p.name]=shiftType(item_p.value)
                    }
                    
                    for(let key_r in item.attributes){
                        let item_r = item.attributes[key_r]
                        row[item_r.columnName]=shiftType(item_r.columnValue)
                    }
                    rows.push(row)
                    // console.log(100,rows);
                }
                re = {
                    next: origin.nextToken,
                    rows:rows,
                    err: origin.code || 0,
                    err_msg: origin.message || 'success',
                }
                if (origin.totalCounts) {
                    re.count = parseInt(origin.totalCounts)
                }
                break;
        
            default:
                re = origin
                break;
        }
        return re
    },
    inc(type, origin) {
        let re
        switch (type) {
            case 'simple':
                // console.log(179,JSON.stringify(origin));
                // console.log(179, JSON.stringify(origin.row));
                for(let key_or in origin){
                    re = []
                    let item_or = origin[key_or]
                    // console.log(182,JSON.stringify(item));
                    // if (item_or.row.primaryKey.length >1) {
                    //     res = []
                    //     for (let key in item_or.row.primaryKey) {
                    //         let item = item_or.row.primaryKey[key]
                    //         res.push(shiftType(item.value))
                    //     }
                    // } else {
                        res = shiftType(item_or.row.primaryKey[0].value)
                    // }
                    re.push(res)
                }
                

                break;

            default:
                re = origin
                break;
        }
        return re
    },


    
}

function shiftType(val) {
    let re
    switch (typeof(val)) {
        case 'object':
            re = val.toNumber()
            break;
    
        default:
            re = val
            break;
    }
    return re
}
function judgeErr(origin) {
    let re = {}
    if (origin.RequestId) {
        re = {
            err: 0,
            err_msg: 'success',
        }
    } else {
        re = {
            err: origin.code || 1,
            err_msg: origin.message || 'faile',
        }
    }
    return re
}