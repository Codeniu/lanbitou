const utils = require('./utils')
var obj = utils.inferSiderbars()

const arr = Object.keys(obj).map(key => {
  const p = obj[key][0]
  return p.children
})
console.log(arr)
