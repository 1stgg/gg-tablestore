module.exports = {
	typeof(e){
		let re = ''
		switch(typeof(e)){
		    case 'number' :
		    	if(parseInt(e) == e){
		    		re = 'int'
		    	}else{
		        re = 'float'
		    	}
		    	break
		    default :
		      re = typeof(e)
		        break
		}
		return re
	},
	inArr(search,array){
		for(var i in array){
			if(array[i]==search){
				return true;
			}
		}
		return false;
	},
	shallowCopy(e){
        // console.log(91,e)
        // console.log(93,typeof(e))
        if(typeof(e) != "object"){
            return e
        }
        let re = {}
        for(let key in e){
            let item = this.shallowCopy(e[key])
            // console.log(94,key,item)
            re[key] = item
        }
        return re
    },
}