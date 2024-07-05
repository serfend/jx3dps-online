import { 技能增益列表类型 } from '@/@types/技能'
import 通用增益 from './通用增益/通用增益'
import 大橙武技能增益 from './通用增益/大橙武技能增益'
import 小橙武技能增益 from './通用增益/小橙武技能增益'
import 弓箭招式增益 from './弓箭招式增益'

const 劲风簇增益: 技能增益列表类型[] = [
  ...通用增益,
  ...大橙武技能增益,
  ...小橙武技能增益,
  ...弓箭招式增益,
]

export default 劲风簇增益
