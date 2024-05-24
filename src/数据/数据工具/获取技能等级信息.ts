import { 技能基础数据模型, 技能等级数据类型 } from '@/@types/技能'
import { 去除对象中的无效值 } from '@/工具函数/help'

const 获取技能等级信息 = (技能信息?: 技能基础数据模型, 技能等级?: number): 技能基础数据模型 => {
  if (技能信息) {
    if (技能等级 && 技能信息?.技能等级数据) {
      const 原属性 = 技能信息
      let 等级属性 = {}

      for (const 等级 in 技能信息?.技能等级数据) {
        if (等级 === 技能等级?.toString()) {
          等级属性 = 获取等级属性中部分属性的等级转换(技能信息?.技能等级数据[等级], 技能等级)
          break
        }
        if (等级?.includes(',')) {
          const 等级数组 = 等级?.split(',')
          // 左开右闭
          if (技能等级 < +等级数组?.[1] && 技能等级 >= +等级数组?.[0]) {
            等级属性 = 获取等级属性中部分属性的等级转换(技能信息?.技能等级数据[等级], 技能等级)
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

const 获取等级属性中部分属性的等级转换 = (技能信息: 技能等级数据类型, 技能等级: number) => {
  let 技能伤害系数 = 技能信息?.技能伤害系数
  let 基础伤害_基础值 = 技能信息?.基础伤害_基础值
  let 基础伤害_浮动值 = 技能信息?.基础伤害_浮动值
  let 技能增益列表
  if (typeof 技能信息?.技能伤害系数 === 'function') {
    技能伤害系数 = 技能信息?.技能伤害系数?.(技能等级)
  }
  if (Array.isArray(技能信息?.基础伤害_基础值)) {
    基础伤害_基础值 = 技能信息?.基础伤害_基础值?.[技能等级 - 1]
  }
  if (typeof 技能信息?.基础伤害_基础值 === 'object' && 技能信息?.基础伤害_基础值 !== null) {
    基础伤害_基础值 = 技能信息?.基础伤害_基础值?.[技能等级]
  }
  if (Array.isArray(技能信息?.基础伤害_浮动值)) {
    基础伤害_浮动值 = 技能信息?.基础伤害_浮动值?.[技能等级 - 1]
  }
  if (typeof 技能信息?.基础伤害_基础值 === 'object' && 技能信息?.基础伤害_基础值 !== null) {
    基础伤害_浮动值 = 技能信息?.基础伤害_浮动值?.[技能等级]
  }
  if (技能信息?.技能增益列表?.length) {
    技能增益列表 = 技能信息?.技能增益列表
  } else {
    技能增益列表 = undefined
  }

  return 去除对象中的无效值({
    ...技能信息,
    基础伤害_基础值,
    基础伤害_浮动值,
    技能伤害系数: 技能伤害系数,
    技能增益列表,
  })
}

export default 获取技能等级信息
