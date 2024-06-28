/**
 * @name 业务算法函数工具
 * @description 对于剑三数据的一些业务算法工具
 */
import { 增益选项数据类型 } from '@/@types/团队增益'
import { 属性类型 } from '@/@types/属性'
import 获取当前数据 from '@/数据/数据工具/获取当前数据'

const { 小药小吃, 基础GCD = 1.5 } = 获取当前数据()

export const 获取郭氏结果值 = (原值 = 0, 郭氏值 = 0) => {
  return Math.floor((原值 * 郭氏值) / 1024)
}

export const 获取郭氏加成值 = (原值 = 0, 郭氏值 = 0) => {
  return 原值 + (郭氏值 ? 获取郭氏结果值(原值, 郭氏值) : 0)
}

export const 获取非郭氏结果值 = (原值 = 0, 郭氏值 = 0) => {
  return (原值 * 郭氏值) / 1024
}

export const 获取非郭氏加成值 = (原值 = 0, 郭氏值 = 0) => {
  return 原值 + (郭氏值 ? 获取非郭氏结果值(原值, 郭氏值) : 0)
}

export const 获取加速等级 = (number) => {
  if (基础GCD === 1.5) {
    return (number || 0) < 95
      ? 0
      : number < 4241
      ? 1
      : number < 8857
      ? 2
      : number < 13851
      ? 3
      : number < 19316
      ? 4
      : 5
  } else {
    // 1秒GCD
    return (number || 0) < 95
      ? 0
      : number < 6502
      ? 1
      : number < 13851
      ? 2
      : number < 22331
      ? 3
      : number < 32225
      ? 4
      : 5
  }
}

export const 计算增益数据中加速值 = (增益数据: 增益选项数据类型) => {
  let number = 0
  ;(增益数据.小吃 || []).forEach((item) => {
    const 当前小药 = 小药小吃.find((a) => a.小吃名称 === item)
    if (当前小药 && 当前小药.增益集合?.length) {
      当前小药.增益集合.forEach((a) => {
        if (a.属性 === 属性类型.加速等级) {
          number = number + a.值
        }
      })
    }
  })
  return number
}
