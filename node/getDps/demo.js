function 计算 (心法) {
  // 这一行不能删掉，因为待执行代码里有localStorage的访问，这里做了个假的localStorage防止报错
  global.localStorage = { getItem:() => { return ''} }

  const 太玄经 = require('./demo_太玄.json')
  // const 太玄经 = require('./zwyt.json')
  const 山海心诀 = require('./demo_山海.json')
  const 凌海诀 = require('./zwpl.json')
  const 心法枚举 = {
    '山海心诀':山海心诀,
    '太玄经':太玄经,
    "凌海诀":凌海诀,
    // '山海心诀':山海心诀,
    // '山海心诀':山海心诀,
  }
  const params = 心法枚举?.[心法] || 山海心诀
  global.心法 = params?.心法 
  // eslint-disable-next-line no-global-assign
  window = global
  const DPS = require('../../build/static/js/getDps.js')
  // const DPS = require('./getDps.js')
  const 计算结果 = DPS?.计算秒伤?.(params)
  const fs = require('fs')
  fs.writeFile(`计算结果${params?.心法}.json`, JSON.stringify(计算结果), err => {
    if (err) {
      console.log('err',err)
    }
  })
  // console.log('计算结果',计算结果)
  return 计算结果
}

计算("凌海诀")
计算("太玄经")
计算("山海心诀")