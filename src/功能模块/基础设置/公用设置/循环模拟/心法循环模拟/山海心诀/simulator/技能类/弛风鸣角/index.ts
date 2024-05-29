import 循环模拟技能基础数据 from '../../../constant/skill'
import { 根据加速等级获取虚拟加速值 } from '../../utils'
import 技能统一类 from '../../通用类/技能统一类'
import { 待生效事件 } from '../../type'
import { 获取实际帧数 } from '../../../utils'

class 弛风鸣角 extends 技能统一类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '弛风鸣角')
  static 作用间隔帧 = 5
  static 作用次数 = 3

  constructor(模拟循环) {
    super(模拟循环)
    // 根据加速修改实际读条帧
    const 循环加速值 = 根据加速等级获取虚拟加速值(this.模拟循环.加速等级)
    弛风鸣角.作用间隔帧 = 获取实际帧数(5, 循环加速值)
  }

  生命周期() {
    this.模拟循环.添加战斗日志?.({
      日志: '弛风鸣角',
      日志类型: '释放技能',
    })
    // this.读条()
    this.释放后()
  }

  获取读条时间() {
    const 读条持续时间 = 弛风鸣角.作用间隔帧 * 弛风鸣角.作用次数
    return 读条持续时间
  }

  读条(读条开始时间) {
    // 开始读条
    this.读条弛风鸣角(读条开始时间)
    return
  }

  读条弛风鸣角(读条开始时间 = 0) {
    const 待生效事件队列: 待生效事件[] = []
    for (let i = 0; i < 弛风鸣角.作用次数; i++) {
      待生效事件队列.push({
        事件名称: '技能读条',
        事件时间: 读条开始时间 + (i + 1) * 弛风鸣角.作用间隔帧,
        事件备注: {
          技能名称: '白羽流星',
        },
      })
    }
    this.模拟循环.添加待生效事件队列(待生效事件队列)
  }

  // 顺序不可随意更改
  读条伤害() {
    if (this.模拟循环.角色状态信息?.箭袋信息?.length > 0) {
      this.模拟循环.棘矢引爆贯穿判定(`弛风鸣角`)
      this.模拟循环.金乌箭判定()
      this.模拟循环.标鹄判定()
      this.触发伤害行为('劲风簇')
      this.模拟循环.消耗箭('弛风鸣角')
    }
  }

  释放后() {
    // this.模拟循环.增加时间(15)
    this.模拟循环.卸除buff({ 名称: '劲风簇追', 对象: '自身' })
  }
}

export default 弛风鸣角

export const 弛风鸣角类型 = typeof 弛风鸣角
