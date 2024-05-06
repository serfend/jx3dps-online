import { 心法配置类型 } from '@/心法模块/interface'
import { 团队增益数据类型 } from './团队增益/interface'
import { 小药小吃数据类型 } from './小药小吃/interface'
import { 镶嵌孔数据类型 } from './镶嵌孔/interface'
import { 完整五彩石数据类型 } from './五彩石/外功'
import { 附魔数据类型 } from './附魔/interface'

// 当前使用的所有数据
export interface 数据类型 extends 心法配置类型 {
  团队增益: 团队增益数据类型
  阵眼: 阵眼数据类型
  小药小吃: 小药小吃数据类型
  镶嵌孔: 镶嵌孔数据类型[]
  五彩石: 完整五彩石数据类型
  附魔: 附魔数据类型[]
}
