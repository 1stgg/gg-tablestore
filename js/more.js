module.exports = {
    setDefault(config){
        for(let key in config){
            let item = config[key]
            if (typeof(item) == 'object') {
                this.default.key = {
                    ...this.default.key,
                    ...item
                }
            }else{
                this.default.key = item
            }
            
        }
    },
    getLastSql(e){
        
    },
}