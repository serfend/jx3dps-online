import { 获取数据 } from '../src/containers/系统工具/开发者工具/装备导入/tool.mjs'
import 赛季范围数据 from '../src/containers/系统工具/开发者工具/装备导入/赛季范围数据.mjs'
import fs from 'fs'
const 本次导入功法 = "外功"

const 功法枚举={
  内功:1,
  外功:2,
}

const 装备部位枚举 = {
  "武器": 0,
  "暗器": 1,
  "衣服": 2,
  "帽子": 3,
  "项链": 4,
  "戒指": 5,
  "腰带": 6,
  "腰坠": 7,
  "下装": 8,
  "鞋子": 9,
  "护腕": 10
}

// 获取全部部位的数据
function 获取全部部位的数据() {  
  // 获取装备
  Object.keys(装备部位枚举).forEach(async key => { 
    const res = await 获取数据({
      功法: 功法枚举[本次导入功法],
      装备部位: 装备部位枚举[key],
      品级范围: 赛季范围数据.本赛季默认品级
    })
    if (res?.length) {
      // 判断文件夹是否存在
      if (!fs.existsSync('导出装备')) {
        fs.mkdirSync('导出装备', { recursive: true });
      }
      if (!fs.existsSync(`导出装备/${本次导入功法}`)) {
        fs.mkdirSync(`导出装备/${本次导入功法}`, { recursive: true });
      }
      if (!fs.existsSync(`导出装备/${本次导入功法}/${key}`)) {
        fs.mkdirSync(`导出装备/${本次导入功法}/${key}`, { recursive: true });
      }
      
      const 文件名称 = `导出装备/${本次导入功法}/${key}/index.ts`
      // console.log(`${key}文件已创建`)
      fs.writeFile(文件名称, `
import { 属性类型 } from '@/@types/属性'
import { 镶嵌增伤类型枚举 } from '@/@types/枚举'
import { 装备属性信息模型, 装备特效枚举, 装备类型枚举 } from '@/@types/装备'

const ${key}装备数据: 装备属性信息模型[] = ${JSON.stringify(res).replaceAll(`"`,'').replaceAll(`装备名称:`,`装备名称:"`).replaceAll(`,装备品级`,`",装备品级`,)}

export default ${key}装备数据
      `, err => {
        if (err) {
          console.log('err',err)
        }
      })
      console.log(`${key}-文件导入成功`)
    }
  })
}

获取全部部位的数据()

// module.exports = 获取全部部位的数据
