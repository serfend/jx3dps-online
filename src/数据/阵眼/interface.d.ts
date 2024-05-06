import { 属性加成 } from '@/@types/属性'

export interface 阵眼数据类型 {
  /**
   * @name 阵眼名称
   */
  阵眼名称: string
  /**
   * @name 所属心法
   * 非当前心法不会展示
   */
  所属心法?: string
  /**
   * @name 增益集合
   */
  增益集合?: 属性加成[]
  /**
   * @name 伤害提升百分比
   */
  伤害提升百分比?: number
  /**
   * @name 伤害是否提升
   */
  伤害是否提升?: boolean
  /**
   * @name 伤害排名
   */
  伤害排名?: number
}
