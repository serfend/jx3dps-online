import { 获取页面参数 } from '@/工具函数/help'
import type { 心法配置类型 } from '@/心法模块/interface'
import 心法数据 from '../心法'

const 默认心法 = Object.keys(心法数据)?.[0] || '山海心诀'

export const 获取心法数据 = (心法?): 心法配置类型 => {
  let 获取页面参数中的心法 = 获取页面参数('心法') || ''
  // 判断该心法是否已尽内置
  if (!心法数据[获取页面参数中的心法]) {
    获取页面参数中的心法 = 默认心法
  }
  const 应显示心法 = 获取页面参数中的心法 || 默认心法
  if (window.心法 !== 应显示心法) {
    window.心法 = 应显示心法
  }
  const 当前心法 = 应显示心法
  const 目标心法 = 心法 || 当前心法
  const 目标心法数据 = 心法数据?.[目标心法]
  return {
    ...目标心法数据,
  }
}
