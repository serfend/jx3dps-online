import { 属性类型 } from '@/@types/属性'
import { 装备部位枚举 } from '@/@types/枚举'
import { 附魔数据类型 } from '@/@types/附魔'

const 附魔数组 = [361, 327, 296]

// 按顺序位置索引
const 附魔分数索引 = [1050, 952, 783]

export const 获取体质附魔数据 = (): 附魔数据类型[] => {
  return 附魔数组.map((item, index) => {
    return {
      附魔名称: `体质+${item}`,
      附魔支持部位: [装备部位枚举.项链, 装备部位枚举.腰坠],
      增益集合: [{ 属性: 属性类型?.体质, 值: item }],
      附魔装分: 附魔分数索引[index],
    }
  })
}
