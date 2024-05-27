import type { 循环数据 } from '@/@types/循环'

/**
 * @name 用于计算的循环数据
 * 该数据可以通过JCL分析器进行获取，也可以自己根据实际情况编写
 */

// 循环
import 奶茶鉴定专家_1 from './参赛作品/紫武/奶茶鉴定专家_1.json'
import 奶茶鉴定专家_2 from './参赛作品/紫武/奶茶鉴定专家_2.json'
import 小满 from './参赛作品/紫武/小满.json'
import 神算子_1 from './参赛作品/紫武/神算子_1.json'
import 神算子_2 from './参赛作品/紫武/神算子_2.json'
import 心如刀_1 from './参赛作品/橙武/心如刀_1.json'
import 心如刀_2 from './参赛作品/橙武/心如刀_2.json'
import 心如刀_3 from './参赛作品/橙武/心如刀_3.json'
import 神算子_cw_1 from './参赛作品/橙武/神算子_1.json'
import 神算子_cw_2 from './参赛作品/橙武/神算子_2.json'
import 纸狐 from './参赛作品/橙武/纸狐.json'
import 臭猪 from './参赛作品/橙武/臭猪.json'
import 镇星入舆 from './参赛作品/橙武/镇星入舆.json'
import 风雪 from './参赛作品/紫武/风雪.json'
import 江岸停 from './参赛作品/紫武/江岸停.json'

const 计算循环: 循环数据[] = [
  奶茶鉴定专家_1,
  奶茶鉴定专家_2,
  小满,
  神算子_1,
  神算子_2,
  风雪,
  江岸停,
  // 心如刀_1,
  // 心如刀_2,
  // 心如刀_3,
  // 神算子_cw_1,
  // 神算子_cw_2,
  // 纸狐,
  // 臭猪,
  // 镇星入舆,
] as 循环数据[]

const 计算循环2: 循环数据[] = [
  // 奶茶鉴定专家_1,
  // 奶茶鉴定专家_2,
  // 小满,
  // 神算子_1,
  // 神算子_2,
  心如刀_1,
  心如刀_2,
  心如刀_3,
  神算子_cw_1,
  神算子_cw_2,
  纸狐,
  臭猪,
  镇星入舆,
] as 循环数据[]

console.log('计算循环2', 计算循环2)

export default 计算循环
