import { 属性加成 } from '@/@types/属性'

/**
 * @name 技能秘籍数值数据
 */
export interface 小药小吃数据类型 {
  小吃名称: string
  小吃品级: '蓝' | '紫'
  小吃部位: 小吃类型枚举
  增益集合: 属性加成[]
}
