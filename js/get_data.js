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


    
}