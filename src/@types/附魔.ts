import { 属性加成 } from '@/@types/属性'
import { 装备部位枚举 } from './枚举'

export interface 附魔数据类型 {
  /**
   * @name 附魔名称
   */
  附魔名称: string
  /**
   * @name 增益集合
   */
  增益集合?: 属性加成[]
  /**
   * @name 附魔支持部位
   */
  附魔支持部位?: 装备部位枚举[]
}
