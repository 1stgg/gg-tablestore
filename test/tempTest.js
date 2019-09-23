// let gg = require('../js/gg_tool')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
module.exports = async function tempTest(db) {
  db().setDefault({ delete: { type: 10, dustbin_type: 10, }, data: { type: 'simple', }, index: { type: 'time_random', } })
  db('gg_model').c({
    name:'name',
    title:'title',
    time_c: (new Date()).getTime(),
  }).then((re)=>{
    console.log(9,re); 
  })
}