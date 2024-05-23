import { 技能基础数据模型 } from '@/@types/技能'

const 获取技能等级信息 = (技能信息?: 技能基础数据模型, 技能等级?: number): 技能基础数据模型 => {
  if (技能信息) {
    if (技能等级 && 技能信息?.技能等级数据) {
      const 原属性 = 技能信息
      let 等级属性 = {}

      for (const 等级 in 技能信息?.技能等级数据) {
        if (等级 === 技能等级?.toString()) {
          等级属性 = 技能信息?.技能等级数据[等级]
          break
        }
        if (等级?.includes(',')) {
          const 等级数组 = 等级?.split(',')
          if (技能等级 <= +等级数组?.[1] && 技能等级 >= +等级数组?.[0]) {
            等级属性 = 技能信息?.技能等级数据[等级]
            break
          }
        }
      }

      return Object.assign({}, 原属性, 等级属性)
    } else {
      return 技能信息 as 技能基础数据模型
    }
  } else {
    return {} as 技能基础数据模型
  }
}

export default 获取技能等级信息
