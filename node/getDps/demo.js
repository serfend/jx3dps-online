function 计算 () {
  // 这一行不能删掉，因为待执行代码里有localStorage的访问，这里做了个假的localStorage防止报错
  global.localStorage = { getItem:() => { return ''} }
  const data = require('./demo.json')
  global.心法 = data?.心法
  // eslint-disable-next-line no-global-assign
  window = global
  const DPS = require('../../build/static/js/getDps.js')
  // const DPS = require('./getDps.js')
  const 计算结果 = DPS?.计算秒伤?.(data)
  return 计算结果
}

计算()