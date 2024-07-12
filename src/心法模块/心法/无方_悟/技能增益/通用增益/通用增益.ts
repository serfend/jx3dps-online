import { 属性类型 } from '@/@types/属性'
import { 技能增益列表类型 } from '@/@types/技能'
import { 按数字生成数组 } from '@/工具函数/help'
import 获取快照增益 from '@/心法模块/统一数据/快照增益'

const 无界通用增伤15函数 = () => {
  const 数组 = 按数字生成数组(5)
  // 70161
  return 数组.map((item) => {
    return {
      增益名称: `无界_通用增伤_15·${item}`,
      增益所在位置: '技能',
      增益类型: '部分启用',
      增益集合: [{ 属性: 属性类型.通用增伤, 值: (154 * item) / 1024 }],
    } as 技能增益列表类型
  })
}

const 无界通用易伤10函数 = () => {
  const 数组 = 按数字生成数组(5)
  // 70161
  return 数组.map((item) => {
    return {
      增益名称: `无界_通用易伤_10·${item}`,
      增益所在位置: '技能',
      增益类型: '部分启用',
      增益集合: [{ 属性: 属性类型.易伤增伤, 值: (103 * item) / 1024 }],
    } as 技能增益列表类型
  })
}

const 大橙武增伤函数 = () => {
  const 数组 = 按数字生成数组(5)
  // 70161
  return 数组.map((item) => {
    return {
      增益名称: `大橙武增伤·${item}`,
      增益所在位置: '技能',
      增益类型: '部分启用',
      增益集合: [{ 属性: 属性类型.通用增伤, 值: (82 * item) / 1024 }],
    } as 技能增益列表类型
  })
}

const 通用增益: 技能增益列表类型[] = [
  ...获取快照增益('内功'),
  {
    增益名称: '非侠',
    增益所在位置: '职业',
    增益启用: true,
    增益类型: '全局启用',
    增益集合: [{ 属性: 属性类型.非侠增伤, 值: 461 / 1024 }],
  },
  {
    增益名称: '无视防御',
    增益所在位置: '职业',
    增益启用: true,
    增益类型: '全局启用',
    增益集合: [{ 属性: 属性类型.郭氏全无视防御, 值: 614 }],
  },
  {
    增益名称: '鬼门·悟',
    增益所在位置: '奇穴',
    增益类型: '全局启用',
    // 50%血以下斩杀，按50%覆盖率算
    增益集合: [{ 属性: 属性类型.易伤增伤, 值: 205 / 2 / 1024 }],
  },

  // 套装双会特效
  {
    增益名称: '断肠',
    增益所在位置: '装备',
    增益类型: '部分启用',
    快照类型: '套装会心会效',
    依赖装备增益: '套装会心会效',
    增益集合: [
      { 属性: 属性类型.内功会心百分比, 值: 0.04 },
      { 属性: 属性类型.郭氏内功会心效果等级, 值: 41 },
    ],
  },
  ...无界通用易伤10函数(),
  ...无界通用增伤15函数(),
  ...大橙武增伤函数(),
]

export default 通用增益
