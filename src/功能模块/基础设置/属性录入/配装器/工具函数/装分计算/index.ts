import { 选择装备数据类型 } from '@/@types/装备'
import { 装备列表装分计算 } from './工具函数/装备分数'
import { 获取五彩石分数 } from './工具函数/五彩石分数'

/**
 * 总分计算
 * 装备分数+精炼成长分数+五彩石+五行石
 * @return {*}
 */
function 总分计算(total: number) {
  return Math.floor(total + 0.5)
}

/**
 * 总装分计算
 * @param {*} 装备列表
 * @param {*} 五彩石 五彩石名称
 * @returns
 */
function 总装分计算(装备列表: 选择装备数据类型[], 五彩石: string): number {
  const 五彩石等级 = 五彩石?.includes('陆') ? '6' : '5'

  const 装备列表总分 = 装备列表装分计算(装备列表)
  const 五彩石总分 = 获取五彩石分数(五彩石等级)

  return 总分计算(装备列表总分 + 五彩石总分)
}

export default 总装分计算
