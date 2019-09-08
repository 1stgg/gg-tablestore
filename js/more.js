
module.exports = {
    setDefault(config){
        for(let key in config){
            let item = config[key]
            console.log(5,typeof(item));
            if (typeof(item) == 'object') {
                this.default[key] = {
                    ...this.default[key],
                    ...item
                }
                console.log(11,);
            }else{
                this.default.key = item
            }
            
        }
        console.log(15,this.default);
    },
    config(config){
        this.config_obj = config
    },
    getLastSql(e){
        
    },
    getData(fun_name,origin){
        let get_data = require('./get_data.js')
        let data_type = (this.default.data.type == 'simple' || this.config_obj.data =='simple') ? 'simple':'origin'
        return get_data[fun_name](data_type,origin)
    },
    test(e){
        console.log(20,this.config_obj);
    },
}