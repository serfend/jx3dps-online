import { 属性加成 } from '@/@types/属性'

export interface 团队增益数据类型 {
  增益名称: string
  覆盖率: number
  层数: number
  增益集合: 属性加成[]
  团队增益类型?: 团队增益类型
  覆盖率支持手动录入?: boolean
  层数选项数组?: number[]
  冲突增益?: string[]
  增益图片: string
  增益描述?: string
  增益来源?: string
}

export type 团队增益类型 =
  | '常用增益'
  | '目标减益'
  | '坦克Buff增益'
  | '治疗Buff增益'
  | '食物增益'
  | '稀缺增益'
