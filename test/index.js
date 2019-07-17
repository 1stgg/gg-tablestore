let list = {}
let fileList = require('../fileList.js')
for(let key in fileList){
	let item = fileList[key]
	list[key] = require(item)
}

module.exports = list