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
	}
}