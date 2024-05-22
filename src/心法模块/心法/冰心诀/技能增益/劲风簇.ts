import { 技能增益列表类型 } from '@/@types/技能'
import { 属性类型 } from '@/@types/属性'
import 通用增益 from './通用'

const 劲风簇增益: 技能增益列表类型[] = [
  ...通用增益,
  {
    增益名称: '彤弓',
    增益所在位置: '奇穴',
    增益类型: '全局启用',
    增益集合: [
      { 属性: 属性类型.外功会心百分比, 值: 0.1 },
      { 属性: 属性类型.郭氏外功会心效果等级, 值: 102 },
    ],
  },
  {
    增益名称: '星烨',
    增益所在位置: '奇穴',
    增益类型: '部分启用',
    增益集合: [{ 属性: 属性类型.通用增伤, 值: 1434 / 1024 }],
    // 秘籍ID 5384
  },
  {
    增益名称: '3%伤害',
    增益所在位置: '秘籍',
    增益类型: '全局启用',
    增益集合: [{ 属性: 属性类型.通用增伤, 值: 31 / 1024 }],
  },
  {
    增益名称: '2%伤害',
    增益所在位置: '秘籍',
    增益类型: '全局启用',
    增益集合: [{ 属性: 属性类型.通用增伤, 值: 21 / 1024 }],
  },
  {
    增益名称: '4%会心',
    增益所在位置: '秘籍',
    增益类型: '全局启用',
    增益集合: [{ 属性: 属性类型.外功会心百分比, 值: 0.04 }],
  },
  {
    增益名称: '3%会心',
    增益所在位置: '秘籍',
    增益类型: '全局启用',
    增益集合: [{ 属性: 属性类型.外功会心百分比, 值: 0.03 }],
  },
]

export default 劲风簇增益
