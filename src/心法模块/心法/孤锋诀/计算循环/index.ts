import type { 循环数据 } from '@/@types/循环'

/**
 * @name 用于计算的循环数据
 * 该数据可以通过JCL分析器进行获取，也可以自己根据实际情况编写
 */

import DMI_六破 from './DMI_六破.json'
import 油门_六破 from './油门_六破.json'
import 橙武 from './橙武.json'

const 计算循环: 循环数据[] = [DMI_六破, 油门_六破, 橙武]

export default 计算循环
