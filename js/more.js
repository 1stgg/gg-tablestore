
let gg = require('./gg_tool')
let gg_dustbin = require('../table_design/gg_dustbin')
module.exports = {
    setDefault(config){
        for(let key in config){
            let item = config[key]
            // console.log(5,typeof(item));
            if (typeof(item) == 'object') {
                this.default[key] = {
                    ...this.default[key],
                    ...item
                }
                // console.log(11,);
            }else{
                this.default[key] = item
            }
            
        }
        if (this.default.delete.dustbin_type) {

            this.setDustbin()
        }
        // console.log(15,this.default);
    },
    async setDustbin(){
        let table = this.default.delete.dustbin_table_name
        let tables =await this.config({
            data:'simple',
        }).listTable()
        // console.log(31,tables);
        if (!gg.inArr(table,tables)) {
            this.table = table
            await this.createTable({id: 'INTEGER'})
            let s_index = {
                id: 'long'
            }
            for(let key in gg_dustbin.attr){
                let item = gg_dustbin.attr[key]
                if (item.is_index) {
                    s_index[key] = item.type
                }
            }
            this.createIndex(s_index)
        }
        
    },
    config(config){
        this.config_obj = config
        return this
    },
    getLastSql(e){
        
    },
    getData(fun_name,origin){
        let get_data = require('./get_data.js')
        let data_type = (this.default.data.type == 'simple' || this.config_obj.data =='simple') ? 'simple':'origin'
        return get_data[fun_name](data_type,origin)
    },
    getId(){
        return parseInt((new Date()).getTime()+''+parseInt(Math.random()*9999))
    },
    async addDustbin(table_name,re){
        let data = {
            data:JSON.stringify(re.rows),
            time_c:(new Date()).getTime(),
            table:table_name
        }
        this.table = this.default.delete.dustbin_table_name
        // let res =await 
            this.c(data)
        // console.log(71,res);
    },
    checkHave(check_table, have_table){
        let re = {
            have: [],
            not_have: [],
        }
        let table_obj = {}
        for (let key in have_table) {
            let item = have_table[key]
            table_obj[item] = true
        }

        let check_table_arr = check_table.split(',')
        for (let key in check_table_arr) {
            let item = check_table_arr[key]
            if (table_obj[item]) {
                re.have.push(item)
            } else {
                re.not_have.push(item)
            }
        }

        re.all_have = !re.not_have.length
        return re
    },
    test(e){
        console.log(20,this.config_obj);
    },
}