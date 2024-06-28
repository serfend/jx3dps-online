export const JCL技能序列导入 = (原序列: string) => {
  let newStr = 原序列.replaceAll('\n', '')
  Object.keys(替换枚举).forEach((key) => {
    console.log('替换枚举[key]', 替换枚举[key])
    newStr = newStr.replaceAll(key, `${替换枚举[key]},`)
  })
  const arr = newStr.split(',')
  return arr.filter((item) => item)
}

const 替换枚举 = {
  '101389': `灭影追风`,
  '101385': `横云势·一`,
  '101388': `留客雨`,
  '102220': `横云势·二`,
  '101395': `孤风破浪`,
  '101381': `行云势·一`,
  '102082': `行云势·二`,
  '102083': `行云势·三`,
  '101393': `停云势`,
}
