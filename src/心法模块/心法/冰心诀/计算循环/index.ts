import type { 循环数据 } from '@/@types/循环'

/**
 * @name 用于计算的循环数据
 * 该数据可以通过JCL分析器进行获取，也可以自己根据实际情况编写
 */

// 循环
import 朝仪_考古 from './朝仪_考古.json'
import 朝仪_三压 from './朝仪_三压.json'
import 朝仪_丛云 from './朝仪_丛云.json'
import 朱厌_丛云 from './朱厌_丛云.json'
import 朝仪_橙武 from './朝仪_橙武.json'
import 朱厌_压缩 from './朱厌_压缩.json'

const 计算循环: 循环数据[] = [朝仪_丛云, 朱厌_丛云, 朝仪_三压, 朝仪_考古, 朱厌_压缩, 朝仪_橙武]

export default 计算循环
