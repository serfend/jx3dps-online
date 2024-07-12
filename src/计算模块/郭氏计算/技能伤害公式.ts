/**
 * @name 技能伤害计算基础公式-郭氏
 */

import {
  技能基础伤害,
  无双伤害计算公式,
  破防伤害算法,
  等级减伤计算公式,
  郭氏会心率算法,
  郭氏会心伤害算法,
  破招基础伤害,
} from './伤害计算基础函数'
import { 完整技能伤害入参类型, 计算类型 } from '@/@types/计算'
import { INT } from '@/工具函数/help'

/**
 * @name 完整技能伤害公式
 * @description 计算顺序 全局伤害因子，伤害增加，移动状态增伤，破防，会效，等级减伤，无双，非侠，易伤
 * 在郭氏计算中，每一步都进行INT取整
 * 分别计算非会心伤害和计算会效的会心期望伤害，最后计算平均伤害
 */

export const 完整技能伤害 = (参数: 完整技能伤害入参类型) => {
  const { 当前技能属性, 最终人物属性, 技能总数 = 1, 额外会心率 = 0 } = 参数

  // const 伤害计算类型标记 = 当前技能属性?.伤害计算类型标记 || 默认伤害计算分类

  let 总命中伤害 = 0
  let 总会心伤害 = 0

  // 端游破招伤害
  if (当前技能属性?.技能名称 === '破') {
    const { 命中伤害 = 0, 会心伤害 = 0 } = 技能命中和会心伤害(参数, '端游破招')
    总命中伤害 += 命中伤害
    总会心伤害 += 会心伤害
  } else {
    // 普通内外功伤害
    const { 命中伤害 = 0, 会心伤害 = 0 } = 技能命中和会心伤害(参数, '普通伤害')
    总命中伤害 += 命中伤害
    总会心伤害 += 会心伤害
  }
  // 无界破招伤害
  if (当前技能属性?.技能破招系数) {
    const { 命中伤害 = 0, 会心伤害 = 0 } = 技能命中和会心伤害(参数, '无界破招')
    总命中伤害 += 命中伤害
    总会心伤害 += 会心伤害
  }
  // 真实伤害
  if (当前技能属性?.真实伤害) {
    const { 命中伤害 = 0, 会心伤害 = 0 } = 技能命中和会心伤害(参数, '真实伤害')
    总命中伤害 += 命中伤害
    总会心伤害 += 会心伤害
  }

  let 期望伤害 = 总命中伤害

  let 会心数量 = 0

  // 计算会心期望率
  if (!当前技能属性?.真实伤害) {
    // 会心几率最大上限为100%
    const 会心期望率 = Math.min(郭氏会心率算法(最终人物属性.会心等级) + 额外会心率, 1)
    会心数量 = 会心期望率 * 技能总数
    期望伤害 = 总命中伤害 + 会心期望率 * (总会心伤害 - 总命中伤害)
  }

  // debug
  // console.log('最终人物属性', 最终人物属性)
  // console.log('参数', 参数)
  // console.log('总命中伤害', 总命中伤害)
  // console.log('总会心伤害', 总会心伤害)
  // console.log('期望伤害', 期望伤害)

  const 期望技能总伤 = 期望伤害 * 技能总数

  return {
    期望技能总伤,
    会心数量,
  }
}

const 技能命中和会心伤害 = (参数: 完整技能伤害入参类型, 计算类型: 计算类型) => {
  const {
    当前技能属性,
    最终人物属性,
    当前目标,
    郭氏无视防御 = 0,
    郭氏属性无视防御 = 0,
    技能增伤 = {
      全局伤害因子: 1,
      目标移动状增伤: 1,
      通用增伤: 1,
      易伤增伤: 1,
      非侠增伤: 1,
      系数增伤: 1,
    },
  } = 参数

  let 基础伤害 = 0

  // 基础伤害
  if (计算类型 === '普通伤害') {
    基础伤害 = 技能基础伤害(当前技能属性, 最终人物属性, 技能增伤)
  } else if (计算类型 === '无界破招') {
    基础伤害 = 破招基础伤害(
      当前技能属性?.技能破招系数,
      当前技能属性?.伤害计算次数,
      最终人物属性,
      技能增伤
    )
  } else if (计算类型 === '端游破招') {
    基础伤害 = 破招基础伤害(
      当前技能属性?.技能伤害系数,
      当前技能属性?.伤害计算次数,
      最终人物属性,
      技能增伤
    )
  } else if (计算类型 === '真实伤害') {
    基础伤害 = 当前技能属性.真实伤害 || 0
  }

  // debug
  // console.log('基础伤害', 基础伤害)

  if (计算类型 !== '真实伤害') {
    // 计算伤害增加
    if (技能增伤?.通用增伤 !== 1) {
      基础伤害 = INT(基础伤害 * 技能增伤?.通用增伤)
    }
    // 计算移动状态增伤，单独乘区
    if (技能增伤?.目标移动状增伤 !== 1) {
      基础伤害 = INT(基础伤害 * 技能增伤?.目标移动状增伤)
    }
    // 计算破防
    基础伤害 = 破防伤害算法(基础伤害, 最终人物属性, 当前目标, 郭氏无视防御, 郭氏属性无视防御)
  }

  /**
   * 计算会心伤害
   * 这里分开计算，用非会心和会心伤害计算最终伤害。最后计算平均值
   */
  const 非会心伤害 = 会心后计算公式(基础伤害, '非会心', 参数, 计算类型)
  const 会心实际伤害 = 会心后计算公式(基础伤害, '会心', 参数, 计算类型)

  return {
    命中伤害: 非会心伤害,
    会心伤害: 会心实际伤害,
  }
}

const 会心后计算公式 = (
  原始伤害,
  计算类型: '会心' | '非会心',
  参数: 完整技能伤害入参类型,
  伤害计算类型: 计算类型
) => {
  const {
    最终人物属性,
    当前目标,
    郭氏额外会效果值 = 0,
    郭氏额外无双等级 = 0,
    技能增伤 = { 非侠增伤: 1, 易伤增伤: 1 },
  } = 参数
  let 计算基础伤害 = 原始伤害

  // 是否计算会心
  if (计算类型 === '会心' && 伤害计算类型 !== '真实伤害') {
    计算基础伤害 = 郭氏会心伤害算法(计算基础伤害, 最终人物属性?.会心效果等级, 郭氏额外会效果值)
  }

  // 计算目标等级减伤
  计算基础伤害 = 等级减伤计算公式(计算基础伤害, 最终人物属性, 当前目标)

  if (伤害计算类型 !== '真实伤害') {
    // 无双增伤
    计算基础伤害 = 无双伤害计算公式(计算基础伤害, 最终人物属性, 郭氏额外无双等级)

    // 非侠士增伤
    if (技能增伤.非侠增伤 !== 1) {
      计算基础伤害 = INT(计算基础伤害 * 技能增伤.非侠增伤)
    }
  }

  // 易伤增伤
  if (技能增伤.易伤增伤 !== 1) {
    计算基础伤害 = INT(计算基础伤害 * 技能增伤.易伤增伤)
  }

  return 计算基础伤害
}

export default 完整技能伤害
