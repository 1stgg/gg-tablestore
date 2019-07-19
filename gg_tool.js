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
}