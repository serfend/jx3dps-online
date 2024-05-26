import { 属性类型 } from '@/@types/属性'
import { 技能增益列表类型 } from '@/@types/技能'
import 获取快照增益 from '@/心法模块/统一数据/快照增益'

const 通用增益: 技能增益列表类型[] = [
  ...获取快照增益('外功'),
  {
    增益名称: '非侠',
    增益所在位置: '职业',
    增益类型: '全局启用',
    增益启用: true,
    增益集合: [{ 属性: 属性类型.非侠增伤, 值: 31 / 1024 }],
  },
  {
    增益名称: '梦悠_常驻',
    依赖奇穴: '梦悠',
    增益所在位置: '奇穴',
    增益类型: '全局启用',
    增益集合: [{ 属性: 属性类型.郭氏全无视防御, 值: 307 }],
  },
  {
    增益名称: '梦悠',
    增益所在位置: '奇穴',
    增益类型: '部分启用',
    增益集合: [{ 属性: 属性类型.郭氏全无视防御, 值: 205 }],
  },
  {
    增益名称: '羽彰',
    增益所在位置: '奇穴',
    增益类型: '部分启用',
    增益集合: [{ 属性: 属性类型.郭氏外功破防等级, 值: 205 }],
  },
  {
    增益名称: '鸿轨',
    增益所在位置: '奇穴',
    增益类型: '部分启用',
    增益集合: [
      { 属性: 属性类型.外功会心百分比, 值: 0.15 },
      { 属性: 属性类型.郭氏外功会心效果等级, 值: 205 },
    ],
  },
  {
    增益名称: '太息',
    增益所在位置: '技能',
    增益类型: '部分启用',
    增益集合: [{ 属性: 属性类型.郭氏外功基础攻击, 值: 102 }],
  },
  {
    增益名称: '神降_伤害',
    依赖奇穴: '神降',
    增益所在位置: '奇穴',
    增益类型: '部分启用',
    增益集合: [{ 属性: 属性类型.通用增伤, 值: 102 / 1024 }],
  },
  // 套装双会特效
  {
    增益名称: '羽念',
    增益所在位置: '装备',
    增益类型: '部分启用',
    快照类型: '套装会心会效',
    依赖装备增益: '套装会心会效',
    增益集合: [
      { 属性: 属性类型.外功会心百分比, 值: 0.04 },
      { 属性: 属性类型.郭氏外功会心效果等级, 值: 41 },
    ],
  },
]

export default 通用增益
