import type { 循环数据 } from '@/@types/循环'

/**
 * @name 用于计算的循环数据
 * 该数据可以通过JCL分析器进行获取，也可以自己根据实际情况编写
 */

// 循环
// import 测试循环 from './测试循环.json'
import 终极战犯 from './终极战犯.json'
import 资深战犯 from './资深战犯.json'
import 初级战犯 from './初级战犯.json'
import 养荣_紫武 from './养荣_紫武.json'
import 武学助手_紫武 from './武学助手_紫武.json'
import 应理_橙武 from './应理_橙武.json'
import 养荣_橙武 from './养荣_橙武.json'
import 武学助手_橙武 from './武学助手_橙武.json'

const 计算循环: 循环数据[] = [
  // 测试循环,
  终极战犯,
  资深战犯,
  初级战犯,
  养荣_紫武,
  武学助手_紫武,
  应理_橙武,
  养荣_橙武,
  武学助手_橙武,
] as 循环数据[]

export default 计算循环
