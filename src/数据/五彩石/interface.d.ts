import { 属性类型 } from '@/@types/属性'

export interface 五彩石数据类型 {
  五彩石名称: string
  五彩石等级: number
  装备增益: Array<{
    增益数值: number
    增益名称: 五彩石增益类型枚举
    增益类型: 属性类型
  }>
  DiamondCount1: string // 条件1达成 全身的(五行石)大于等于
  DiamondCount2: string // 条件2达成 全身的(五行石)大于等于
  DiamondCount3: string // 条件3达成 全身的(五行石)大于等于
  DiamondIntensity1: string // 条件1达成 (五行石)等级和大于等于90级
  DiamondIntensity2: string // 条件2达成 (五行石)等级和大于等于90级
  DiamondIntensity3: string // 条件3达成 (五行石)等级和大于等于90级
}

export enum 五彩石增益类型枚举 {
  全属性 = '全属',
  力道 = '力道',
  身法 = '身法',
  元气 = '元气',
  根骨 = '根骨',
  外功基础攻击 = '外攻',
  内功基础攻击 = '内攻',
  破防等级 = '破防',
  会心效果等级 = '会效',
  武器伤害 = '武伤',
  加速等级 = '加速',
  会心等级 = '会心',
  无双等级 = '无双',
  破招值 = '破招',
}
