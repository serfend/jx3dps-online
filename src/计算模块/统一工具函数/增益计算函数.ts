import { 增益选项数据类型 } from '@/@types/团队增益'
import { 属性加成, 属性类型 } from '@/@types/属性'
import { 循环技能详情, 技能增益列表数据 } from '@/@types/循环'
import { 快照类型, 技能基础数据模型, 技能计算增益数据列表 } from '@/@types/技能'
import { 装备信息数据类型, 装备增益类型 } from '@/@types/装备'
import { 最终计算属性类型 } from '@/@types/计算'
import 获取当前数据 from '@/数据/数据工具/获取当前数据'

const { 装备增益数据, 小药小吃, 团队增益, 阵眼, 覆盖率 } = 获取当前数据()

// 统计增益，获取增益的集合
export const 获取装备增益 = (装备信息: 装备信息数据类型, 快照计算: 快照类型[]): 属性加成[] => {
  let 总增益集合: 属性加成[] = []
  // 如果是快照计算，不计算套装、水特效、风腰椎的加成。放到最后的增益数量里计算
  if (!快照计算?.includes('套装会心会效')) {
    if (装备信息?.装备增益?.套装会心会效) {
      // 判断套装覆盖率
      const 套装覆盖率 = 覆盖率?.套装会心会效 || 0.8
      const 装备增益覆盖率格式化 = 装备增益数据.套装会心会效.map((增益) => {
        return {
          ...增益,
          值: (增益?.值 || 0) * 套装覆盖率,
        }
      })
      // 偷懒覆盖率测试80%左右
      总增益集合 = 总增益集合.concat(装备增益覆盖率格式化)
    }
  }
  if (!快照计算?.includes('风特效')) {
    if (装备信息?.装备增益?.风特效腰坠) {
      // 判断套装覆盖率
      const 套装覆盖率 = 覆盖率?.风特效腰坠 || 0.1
      const 装备增益覆盖率格式化 = 装备增益数据.风特效腰坠.map((增益) => {
        return {
          ...增益,
          值: (增益?.值 || 0) * 套装覆盖率,
        }
      })
      // 偷懒覆盖率测试80%左右
      总增益集合 = 总增益集合.concat(装备增益覆盖率格式化)
    }
    if (装备信息?.装备增益?.风特效腰坠_英雄) {
      // 判断套装覆盖率
      const 套装覆盖率 = 覆盖率?.风特效腰坠 || 0.1
      const 装备增益覆盖率格式化 = 装备增益数据.风特效腰坠_英雄.map((增益) => {
        return {
          ...增益,
          值: (增益?.值 || 0) * 套装覆盖率,
        }
      })
      // 偷懒覆盖率测试80%左右
      总增益集合 = 总增益集合.concat(装备增益覆盖率格式化)
    }
  }
  if (!快照计算?.includes('水特效')) {
    if (装备信息?.装备增益?.水特效武器) {
      总增益集合 = 总增益集合.concat(装备增益数据.水特效武器)
    }
    if (装备信息?.装备增益?.水特效武器_英雄) {
      总增益集合 = 总增益集合.concat(装备增益数据.水特效武器_英雄)
    }
  }
  if (!快照计算?.includes('大附魔_伤腰')) {
    if (装备信息?.装备增益?.大附魔_伤腰) {
      总增益集合 = 总增益集合.concat(装备增益数据.大附魔_伤腰)
    }
  }
  if (装备信息?.装备增益?.切糕会心) {
    总增益集合 = 总增益集合.concat(装备增益数据.切糕会心)
  }
  if (装备信息?.装备增益?.切糕无双) {
    总增益集合 = 总增益集合.concat(装备增益数据.切糕无双)
  }
  if (装备信息?.装备增益?.切糕会心_英雄) {
    总增益集合 = 总增益集合.concat(装备增益数据.切糕会心_英雄)
  }
  if (装备信息?.装备增益?.切糕无双_英雄) {
    总增益集合 = 总增益集合.concat(装备增益数据.切糕无双_英雄)
  }
  if (装备信息?.装备增益?.冬至套装) {
    总增益集合 = 总增益集合.concat(装备增益数据.冬至套装)
  }
  // 大附魔增益
  if (装备信息?.装备增益?.大附魔_伤帽) {
    总增益集合 = 总增益集合.concat(装备增益数据.大附魔_伤帽)
  }
  if (装备信息?.装备增益?.大附魔_伤衣) {
    总增益集合 = 总增益集合.concat(装备增益数据.大附魔_伤衣)
  }
  if (装备信息?.装备增益?.龙门飞剑武器) {
    总增益集合 = 总增益集合.concat(装备增益数据.龙门飞剑武器)
  }

  return 总增益集合
}

// 根据增益信息修改最终循环内容
export const 根据增益修改最终循环 = (
  装备信息: 装备信息数据类型,
  计算循环,
  战斗时间
): 循环技能详情[] => {
  let 最终循环: 循环技能详情[] = [...计算循环]
  if (装备信息?.装备增益?.大附魔_伤腕) {
    if (!最终循环?.some((item) => item.技能名称 === '昆吾·弦刃')) {
      最终循环.push({
        技能名称: '昆吾·弦刃',
        技能数量: Math.floor(战斗时间 / 15),
      })
    }
  } else {
    最终循环 = 最终循环.filter((item) => item.技能名称 !== '昆吾·弦刃')
  }

  if (装备信息?.装备增益?.大附魔_伤鞋) {
    if (!最终循环?.some((item) => item.技能名称 === '刃凌')) {
      最终循环.push({
        技能名称: '刃凌',
        技能数量: Math.floor(战斗时间 / 10),
      })
    }
  } else {
    最终循环 = 最终循环.filter((item) => item.技能名称 !== '刃凌')
  }

  if (装备信息?.装备增益?.龙门飞剑武器) {
    最终循环.push({
      技能名称: '剑风',
      技能数量: Math.floor((战斗时间 * 6) / 30),
    })
  }

  return 最终循环
}

// 对增益进行排序
export const 增益排序 = (list: 属性加成[]): 属性加成[] => {
  const SortKeyList = Object.values(属性类型)

  const newList = [...list]

  newList.sort((a, b) => {
    return SortKeyList.indexOf(a.属性) - SortKeyList.indexOf(b.属性)
  })

  return newList.filter((item) => !!item)
}

// 对增益进行同类合并，然后再排序返回
export const 增益合并并排序 = (list: 属性加成[]): 属性加成[] => {
  const obj = {}
  list.forEach((item) => {
    if (item) {
      if (obj[item.属性]) {
        if (item.属性 === 属性类型.技能系数) {
          obj[item.属性] = obj[item.属性] * item.值
        } else {
          obj[item.属性] += item.值
        }
      } else {
        obj[item.属性] = item.值
      }
    }
  })
  const SortKeyList = Object.values(属性类型)

  const newList: any[] = Object.keys(obj).map((key) => {
    return { 属性: key, 值: obj[key] }
  })

  newList.sort((a, b) => {
    return SortKeyList.indexOf(a.属性) - SortKeyList.indexOf(b.属性)
  })

  return newList.filter((item) => !!item)
}

/**
 * 计算增益选项带来的增益。获取增益集合
 */
export const 根据增益选项获取增益集合 = (
  增益数据: 增益选项数据类型,
  过滤阵眼触发类增益?: boolean
): 属性加成[] => {
  let 增益集合: 属性加成[] = []

  if (增益数据?.小吃) {
    const 小吃数据集合 = 小药小吃.filter((item) => 增益数据?.小吃?.includes(item.小吃名称))
    if (小吃数据集合?.length) {
      小吃数据集合.forEach((a) => {
        if (a?.增益集合?.length) {
          增益集合 = 增益集合.concat(a?.增益集合)
        }
      })
    }
  }

  if (增益数据?.团队增益?.length) {
    const 团队增益集合 = 增益数据?.团队增益
      ?.filter((item) => item.启用)
      .map((item) => {
        const data: any = 团队增益.find((a) => a.增益名称 === item.增益名称)
        return {
          ...data,
          增益集合: data?.增益集合.map((c) => {
            return {
              ...c,
              值: (c?.值 * item?.层数 * item?.覆盖率) / 100,
            }
          }),
        }
      })

    if (团队增益集合?.length) {
      团队增益集合.forEach((item) => {
        增益集合 = 增益集合.concat(item.增益集合)
      })
    }
  }

  if (增益数据?.阵眼) {
    const 增益阵眼 = 阵眼.find((item) => item.阵眼名称 === 增益数据?.阵眼)
    if (增益阵眼 && 增益阵眼?.增益集合?.length) {
      if (过滤阵眼触发类增益) {
        增益集合 = 增益集合.concat(增益阵眼.增益集合.filter((增益) => !增益?.触发型增益))
      } else {
        增益集合 = 增益集合.concat(增益阵眼.增益集合)
      }
    }
  }

  return 增益集合
}

/**
 * @name 该技能数量下同时计算的多个增益的增益集合
 * getGainList
 */
export const 计算该技能下多个增益的增益集合 = (
  增益: 技能增益列表数据,
  当前技能属性: 技能基础数据模型,
  装备增益: 装备增益类型,
  快照计算: 快照类型[]
) => {
  // 将该数量下同时计算的多个增益转为数组
  const 该技能增益列表 = 增益.增益名称.split(',')

  // 该技能数量下同时计算的多个增益的增益集合
  let 增益集合列表: 技能计算增益数据列表[] = []

  该技能增益列表.forEach((i) => {
    const 该技能增益 = (当前技能属性?.技能增益列表 || [])?.find((item) => {
      if (item.增益名称 === i && item.增益类型 === '部分启用') {
        if (item?.增益所在位置 === '奇穴') {
          return item?.增益启用
        } else if (item?.依赖装备增益) {
          if (item?.快照类型) {
            return !!装备增益?.[item?.依赖装备增益] && 快照计算?.includes(item?.快照类型)
          } else {
            return !!装备增益?.[item?.依赖装备增益]
          }
        } else {
          return true
        }
      }
      return false
    })

    if (该技能增益) {
      const 该技能增益列表: 技能计算增益数据列表[] = (该技能增益?.增益集合 || []).map((item) => {
        return {
          ...item,
          增益启用: true,
          增益来源: 该技能增益?.增益名称,
        }
      })
      增益集合列表 = 增益集合列表.concat(该技能增益列表)
    }
  })

  return 增益集合列表
}

/**
 * 计算不同的增益对属性、技能增伤的影响
 * 返回最终参与技能伤害计算的人物属性、技能增伤等数据
 * 计算A类增伤，所有增伤害相加
 */
export const 通用增益计算 = (增益: 属性加成, 最终计算属性: 最终计算属性类型): 最终计算属性类型 => {
  const { 值, 属性 } = 增益
  const 结果属性 = { ...最终计算属性 }

  switch (属性) {
    // 基础属性
    case 属性类型.全属性:
      结果属性.最终人物属性.力道 += 值
      结果属性.最终人物属性.根骨 += 值
      结果属性.最终人物属性.身法 += 值
      结果属性.最终人物属性.元气 += 值
      break
    case 属性类型.力道:
      结果属性.最终人物属性.力道 += 值
      break
    case 属性类型.根骨:
      结果属性.最终人物属性.根骨 += 值
      break
    case 属性类型.身法:
      结果属性.最终人物属性.身法 += 值
      break
    case 属性类型.元气:
      结果属性.最终人物属性.元气 += 值
      break
    case 属性类型.郭氏力道:
      结果属性.郭氏力道 += 值
      break
    case 属性类型.郭氏根骨:
      结果属性.郭氏根骨 += 值
      break
    case 属性类型.郭氏身法:
      结果属性.郭氏身法 += 值
      break
    case 属性类型.郭氏元气:
      结果属性.郭氏元气 += 值
      break
    // 无双等级
    case 属性类型.无双等级:
      结果属性.最终人物属性.无双等级 += 值
      break
    case 属性类型.郭氏无双:
      结果属性.郭氏无双 += 值
      break
    case 属性类型.郭氏额外无双:
      结果属性.郭氏额外无双等级 += 值
      break
    // 破招值
    case 属性类型.破招值:
      结果属性.最终人物属性.破招值 += 值
      break
    // 全能等级
    // 全能放最后计算
    case 属性类型.全能等级:
      结果属性.最终人物属性.全能等级 += 值
      // 结果属性.最终人物属性.破招值 += 值
      // 结果属性.最终人物属性.无双等级 += 值
      break
    // 基础攻击
    case 属性类型.全基础攻击:
    case 属性类型.外功基础攻击:
    case 属性类型.内功基础攻击:
      结果属性.最终人物属性.基础攻击 += 值
      break
    case 属性类型.郭氏全基础攻击:
    case 属性类型.郭氏外功基础攻击:
    case 属性类型.郭氏内功基础攻击:
      结果属性.郭氏基础攻击 += 值
      break
    // 破防
    case 属性类型.全破防等级:
    case 属性类型.外功破防等级:
    case 属性类型.内功破防等级:
      结果属性.最终人物属性.破防等级 += 值
      break
    case 属性类型.郭氏全破防等级:
    case 属性类型.郭氏外功破防等级:
    case 属性类型.郭氏内功破防等级:
      结果属性.郭氏破防等级 += 值
      break
    // 会心
    case 属性类型.全会心等级:
    case 属性类型.外功会心等级:
    case 属性类型.内功会心等级:
      结果属性.最终人物属性.会心等级 += 值
      break
    case 属性类型.全会心百分比:
    case 属性类型.外功会心百分比:
    case 属性类型.内功会心百分比:
      结果属性.额外会心率 += 值
      break
    // 会心效果
    case 属性类型.全会心效果等级:
    case 属性类型.外功会心效果等级:
    case 属性类型.内功会心效果等级:
      结果属性.最终人物属性.会心效果等级 += 值
      break
    case 属性类型.郭氏全会心效果等级:
    case 属性类型.郭氏外功会心效果等级:
    case 属性类型.郭氏内功会心效果等级:
      结果属性.郭氏额外会效果值 += 值
      break
    // 无视防御相关
    case 属性类型.内功基础防御:
    case 属性类型.外功基础防御:
      结果属性.计算目标 = {
        ...结果属性.计算目标,
        防御点数: Math.max(结果属性.计算目标.防御点数 + 值, 0),
      }
      break
    case 属性类型.郭氏外功基础防御:
    case 属性类型.郭氏内功基础防御:
      结果属性.郭氏属性无视防御 += 值
      break
    case 属性类型.郭氏全无视防御:
      结果属性.郭氏无视防御 += 值
      break
    // 加速等级
    case 属性类型.加速等级:
      结果属性.最终人物属性.加速等级 += 值
      break
    // 武器伤害
    case 属性类型.武器伤害:
      结果属性.最终人物属性.武器伤害_最小值 += 值
      结果属性.最终人物属性.武器伤害_最大值 += 值
      break
    case 属性类型.郭氏武器伤害:
      结果属性.郭氏武器伤害 += 值
      break
    case 属性类型.目标移动状增伤:
      结果属性.技能增伤.目标移动状增伤 += 值
      break
    case 属性类型.通用增伤:
      结果属性.技能增伤.通用增伤 += 值
      break
    case 属性类型.易伤增伤:
      结果属性.技能增伤.易伤增伤 += 值
      break
    case 属性类型.非侠增伤:
      结果属性.技能增伤.非侠增伤 += 值
      break
    case 属性类型.技能系数:
      // 外面已经在合并排序的时候乘过一次了，这里不仅行计算
      结果属性.技能增伤.技能系数 = 值
      // 结果属性.技能增伤.技能系数 = 结果属性.技能增伤.技能系数 * 值
      break
    default:
      break
  }

  return 结果属性
}
