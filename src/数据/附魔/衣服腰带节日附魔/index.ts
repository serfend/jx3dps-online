import { 装备部位枚举 } from '@/@types/枚举'
import { 属性类型 } from '@/@types/属性'
import { 附魔数据类型 } from '@/@types/附魔'

const 附魔数组 = [291, 264]

export const 获取衣服腰带节日附魔数据 = (): 附魔数据类型[] => {
  return 附魔数组.map((item) => {
    return {
      附魔名称: `无双+${item}`,
      附魔支持部位: [装备部位枚举.衣服, 装备部位枚举.腰带],
      增益集合: [{ 属性: 属性类型.无双等级, 值: item }],
    }
  })
}
