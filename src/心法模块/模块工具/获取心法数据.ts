import 心法 from '../心法'
import type { 心法配置类型 } from '@/心法模块/interface'

const 默认心法 = Object.keys(心法)?.[0] || '山海心决'
const 当前心法 = window?.['心法'] || 默认心法

export const 获取心法数据 = (心法?): 心法配置类型 => {
  const 目标心法 = 心法 || 当前心法
  const 目标心法数据 = 心法?.[目标心法]
  return {
    ...目标心法数据,
  }
}
