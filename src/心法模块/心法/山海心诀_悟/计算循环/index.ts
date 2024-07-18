import type { 循环数据 } from '@/@types/循环'

/**
 * @name 用于计算的循环数据
 * 该数据可以通过JCL分析器进行获取，也可以自己根据实际情况编写
 */

// import 测试循环 from './测试循环.json'
// import 橙武_手动_车夫 from './bak/橙武_手动_车夫.json'
// import 橙武_手动_车夫2 from './bak/橙武_手动_车夫2.json'
// import 橙武_手动_车夫3 from './bak/橙武_手动_车夫3.json'
// import 橙武_手动_车夫4 from './bak/橙武_手动_车夫4.json'
// import 橙武_手动_车夫5 from './bak/橙武_手动_车夫5.json'
// import 紫武_二动物_十九停 from './bak/紫武_二动物_十九停_旧.json'
// import 车夫旧紫武_三动物 from './bak/车夫旧紫武_三动物.json'
import 紫武_助手 from './紫武_助手.json'
import 紫武_二动物 from './紫武_二动物.json'
import 紫武_三动物 from './紫武_三动物.json'
import 橙武_手动_三动物 from './橙武_手动_三动物.json'
import 橙武_手动_二动物 from './橙武_手动_二动物.json'

const 计算循环: 循环数据[] = [
  // 测试循环,
  // 紫武_二动物_十九停,
  // 橙武_手动_车夫,
  // 橙武_手动_车夫2,
  // 橙武_手动_车夫3,
  // 橙武_手动_车夫4,
  // 橙武_手动_车夫5,
  紫武_助手,
  紫武_二动物,
  紫武_三动物,
  橙武_手动_二动物,
  橙武_手动_三动物,
] as 循环数据[]

export default 计算循环
