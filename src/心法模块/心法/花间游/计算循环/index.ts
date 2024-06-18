import type { 循环数据 } from '@/@types/循环'

/**
 * @name 用于计算的循环数据
 * 该数据可以通过JCL分析器进行获取，也可以自己根据实际情况编写
 */

// 循环
import 焚玉 from './焚玉.json'
import 故幽 from './故幽.json'
import 橙武 from './橙武.json'
import 橙武_故幽 from './橙武_故幽.json'
// import 测试循环 from './测试循环.json'
// import 橙武加速测试 from './橙武加速测试.json'

const 计算循环: 循环数据[] = [焚玉, 故幽, 橙武, 橙武_故幽] as 循环数据[]

export default 计算循环
