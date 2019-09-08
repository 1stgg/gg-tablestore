module.exports = {

    //table
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

    //searchIndex
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
                re = []
                // console.log(60,origin);
                for(let key in origin.tables[0].primaryKey){
                    let item = origin.tables[0].primaryKey[key]
                    re.push(shiftType(item.value.toNumber()))
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
                    next:origin.nextToken,
                    rows:rows,
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