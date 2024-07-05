import { 属性类型 } from '@/@types/属性'
import { 技能增益列表类型 } from '@/@types/技能'

const 门派套装增益: 技能增益列表类型[] = [
  // 对阵招式提高5%
  // 4件套
  {
    增益名称: '套装技能增伤_1',
    增益所在位置: '装备',
    增益启用: false,
    增益类型: '全局启用',
    增益集合: [{ 属性: 属性类型.通用增伤, 值: 51 / 1024 }],
  },
  // 2件套
  {
    增益名称: '套装技能增伤_2',
    增益所在位置: '装备',
    增益启用: false,
    增益类型: '全局启用',
    增益集合: [{ 属性: 属性类型.通用增伤, 值: 51 / 1024 }],
  },
]

export default 门派套装增益
