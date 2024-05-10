import { 属性加成 } from './属性'
import { 计算公式计算类型 } from './伤害计算'

/**
 * @name 技能基础数据模型
 * @description 描述技能的基础数据，为后续技能计算提供基础属性
 */
export interface 技能基础数据模型 {
  /**
   * @name 技能名称
   * @description 实际造成的技能伤害名称
   */
  技能名称: string
  /**
   * @name 技能伤害系数
   * @description 游戏面板技能伤害 / 角色面板攻击
   * @default 0
   */
  技能伤害系数?: number
  /**
   * @name 技能基础伤害-基础值（最小值）
   * @description 游戏面板技能造成基础伤害
   * @default 0
   */
  技能基础伤害_最小值?: number
  /**
   * @name 技能基础伤害-浮动值（最大值）
   * @description 游戏面板技能造成浮动伤害
   * @default 0
   */
  技能基础伤害_最大值?: number
  /**
   * @name 武器伤害系数
   * @description 游戏面板描述 “造成xxx%武器伤害”
   * @default 0
   */
  武器伤害系数?: number
  /**
   * @name 伤害计算次数
   * @description 计算原始伤害时计算几次（例如4层流血则计算4次伤害）
   * @default 1
   */
  伤害计算次数?: number
  /**
   * @name 技能增益列表
   */
  技能增益列表?: 技能增益列表类型[]
  /**
   * @name 技能破招系数
   * @description 游戏面板描述 “破招伤害：xxxx%破招值”
   * @default 0
   */
  技能破招系数?: number
  /**
   * @name 宠物伤害
   * @description 是否为宠物造成的伤害
   */
  宠物伤害?: boolean
  /**
   * @name 真实伤害
   * @description 大部分百战技能和大附魔技能的伤害
   * @description 只吃秋肃和等级减伤
   */
  真实伤害?: number
  /**
   * @name 伤害计算类型标记
   * @description 计算伤害时是否对某些环节进行计算
   * @default [增伤, 破防, 会心, 等级减伤, 无双, 非侠, 易伤]
   */
  伤害计算类型标记?: 计算公式计算类型[]
}

/**
 * @name 技能增益列表
 * @description 技能增益的计算要符合郭氏理论：https://www.jx3box.com/bps/12752
 */
export interface 技能增益列表类型 {
  /**
   * @name 增益启用增益类型
   * @description 全局启用 - 对整个循环内所有该技能生效
   * @description 部分启用 - 是否生效需要判断循环传入的技能是否携带了该增益
   */
  增益类型: '全局启用' | '部分启用'
  /**
   * @name 增益是否启用
   */
  增益启用?: boolean
  /**
   * @name 增益名称
   */
  增益名称: string
  /**
   * @name 增益所在位置
   */
  增益所在位置: '秘籍' | '奇穴' | '技能' | '职业' | '装备'
  /**
   * @name 增益集合
   * @description 当一个增益有多个效果时
   */
  增益集合?: 属性加成[]
}
