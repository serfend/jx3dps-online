import { 技能秘籍信息 } from '@/@types/秘籍'
import 获取当前数据 from '@/数据/数据工具/获取当前数据'

const { 技能系数 = [] } = 获取当前数据()

export const 获取当前职业的所有秘籍信息 = (): 技能秘籍信息[] => {
  const 秘籍枚举对象 = {}
  技能系数.forEach((技能) => {
    const 秘籍列表 = 技能?.技能增益列表
      ?.filter((增益) => 增益?.增益所在位置 === '秘籍')
      .map((增益) => 增益?.增益名称)
    const 技能名称 = 技能?.所属武学技能 || 技能?.技能名称
    秘籍枚举对象[技能名称] = 秘籍列表 || []
  })

  const 所有技能秘籍列表 = Object.keys(秘籍枚举对象)
    .map((key) => {
      return {
        技能名称: key,
        技能秘籍列表: 秘籍枚举对象[key],
      }
    })
    .filter((item) => item?.技能秘籍列表?.length)
  return 所有技能秘籍列表
}
