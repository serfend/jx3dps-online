import type { 循环数据 } from '@/@types/循环'

/**
 * @name 用于计算的循环数据
 * 该数据可以通过JCL分析器进行获取，也可以自己根据实际情况编写
 */

// 循环
import 烟涛 from './烟涛.json'
// import 烟涛_2 from './烟涛_2.json'
import 怅归 from './怅归.json'
import 橙武 from './橙武.json'
// import 烟涛_期望计算 from './烟涛_期望计算.json'
// import 技能对照 from './技能对照.json'

const 计算循环: 循环数据[] = [烟涛, 怅归, 橙武] as 循环数据[]

export default 计算循环
