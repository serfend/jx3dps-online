import { message } from 'antd'
import { 循环技能详情, 循环详情, 技能增益列表数据 } from '@/@types/循环'

import commonMap from './common'

import 凌海诀 from './职业技能映射枚举/凌海诀.json'
import 太玄经 from './职业技能映射枚举/太玄经.json'
import 无方 from './职业技能映射枚举/无方.json'
import 花间游 from './职业技能映射枚举/花间游.json'
import 山海心诀悟 from './职业技能映射枚举/山海心诀悟.json'
import 无方悟 from './职业技能映射枚举/无方悟.json'

export const 心法枚举 = {
  凌海诀: 凌海诀,
  太玄经: 太玄经,
  无方: 无方,
  花间游: 花间游,
  '山海心诀·悟': 山海心诀悟,
  '无方·悟': 无方悟,
}

const 无界统一buff = ['70161', '70188']
const DOT直接生成层数心法 = ['花间游', '无方', '无方·悟']

export const 获取数据 = ({ 心法, 数据, 最大时间, 最小时间 }): 循环详情 => {
  const 心法数据枚举 = 心法枚举[心法]
  const JSONData = JSON.parse(数据 || '{}')
  const res: 循环技能详情[] = []

  // 判断有没有战斗角色
  const PlayersId = JSONData?.players && Object.keys(JSONData?.players)?.[0]
  const TargetId = JSONData?.targets?.[PlayersId]?.[0]

  const 解析战斗数据 = JSONData?.records?.[PlayersId]?.[TargetId] || JSONData

  let 初始时间 = 0
  let 战斗时间 = 0
  if (心法数据枚举) {
    Object.keys(解析战斗数据).forEach((技能实例) => {
      // ID/等级/层数;ID/等级/层数
      const 所有技能信息 = 技能实例?.split(';') // 第一个为当前技能 ID/等级/层数
      const 当前技能信息 = 所有技能信息[0]?.split('/') // ID/等级/层数
      if (当前技能信息?.length) {
        // ————————基础取值部分————————
        let 技能名称ID = 当前技能信息[0] // 当前技能ID
        let 技能等级 = +当前技能信息[1] === 1 ? undefined : +当前技能信息[1] // 当前技能的等级
        const 技能层数 = 当前技能信息[2] ? Number(当前技能信息[2]) : undefined // 技能层数，常见于dot上

        // 特殊处理当同一个技能，id相同等级不同调用不同伤害名称时，修正技能ID，用于快速找到映射。例万花 墨海、临源
        if (心法数据枚举?.技能带等级?.includes(技能名称ID)) {
          技能名称ID = `${技能名称ID}_${技能等级 || 1}`
        }

        // dot触发技能特殊，第一个技能为dot技能id，第二个技能为触发技能id
        if (所有技能信息?.length > 1 && !!所有技能信息?.[1]) {
          const dot技能 = 所有技能信息?.[0]
          const 触发技能 = 所有技能信息?.[1]
          const dot技能信息 = dot技能?.split('/')
          const 触发技能信息 = 触发技能?.split('/')
          // 用拼接的方式区分不同技能触发的不同dot，例万花 钟林、不同技能上的钟林dot系数不同，调用不同伤害实例
          技能名称ID = `${dot技能信息[0]}_${触发技能信息[0]}`
          // 技能等级同理，由触发技能决定
          技能等级 = +触发技能信息[1] === 1 ? undefined : +触发技能信息[1]
        }

        let 技能名称 = 心法数据枚举?.skills?.[技能名称ID]
        // 对部分心法，未支持dot的多层声明的情况，采用这种方式特殊处理，例：万灵 贯穿 dot 10层 调用为 贯穿·十
        // 后续新门派均不采用次方法，已经支持门派参考 DOT直接生成层数心法 可以节省大量代码
        if (技能名称?.includes('DOT') && !DOT直接生成层数心法?.includes(心法)) {
          if (技能层数) {
            技能名称 = `${技能名称}·${commonMap?.StackMap?.[技能层数]}`
          }
        }
        // 该技能携带增益造成伤害的各情况时间序列
        const 技能增益结果对象 = 解析战斗数据[技能实例]
        // ————————基础取值部分————————END

        // ————————技能解析部分————————
        let 技能数量 = 0
        let 技能增益列表: 技能增益列表数据[] = []

        // 声明部分调用函数
        const 判断时间增加数量 = (时间数组) => {
          let 增益数量获取 = 1
          const 造成伤害时间 = 时间数组[时间数组.length - 1]?.[0] || 0
          if (造成伤害时间 <= 最大时间 * 16 && 造成伤害时间 >= 最小时间 * 16) {
            增益数量获取 = 时间数组?.length || 1
            if (typeof 造成伤害时间 === 'number') {
              if (战斗时间 < 造成伤害时间) {
                战斗时间 = 造成伤害时间
              }
              if (!初始时间 || 造成伤害时间 < 初始时间) {
                初始时间 = 造成伤害时间
              }
            }
            技能数量 += 增益数量获取
          }
        }

        // 解析技能实际伤害序列
        ;(Object.keys(技能增益结果对象) || []).forEach((增益Buff列表) => {
          // 没有携带任何增益的该技能伤害
          if (增益Buff列表 === ';;') {
            const 战斗时间数组 = 技能增益结果对象[增益Buff列表]
            判断时间增加数量(战斗时间数组)
          } else {
            // 分号分割成三部分 当前Buff，快照Buff，目标Buff
            const 用分号分割 = 增益Buff列表?.split(';')
            const 是否吃快照 = 心法数据枚举?.吃快照技能?.includes(技能名称ID)
            const 是否是NPC技能 = 心法数据枚举?.npc技能?.includes(技能名称ID)
            // 对buff判断快照、npc情况。得到最后技能实际携带的buff列表
            const 最终增益Buff数组: string[] = 快照判断(
              用分号分割,
              是否吃快照,
              心法数据枚举,
              是否是NPC技能
            )
            if (最终增益Buff数组?.length) {
              const 增益buff名称列表: string[] = []
              最终增益Buff数组.forEach((增益) => {
                const 增益数组 = 增益?.split('/')
                if (增益数组?.length) {
                  let 增益名称ID = 增益数组[0]
                  const 增益等级 = Number(增益数组[1])
                  const 增益层数 = Number(增益数组[2])
                  // 无界统一buff，例70161增伤 70188易伤 统一处理
                  if (无界统一buff?.includes(增益名称ID)) {
                    增益名称ID = `${增益名称ID}_${增益等级}`
                  }
                  let 增益名称 =
                    心法数据枚举?.buff?.[增益名称ID] || 心法数据枚举?.buff?.[`;${增益名称ID}`]
                  // 判断伤腰大附魔
                  if (增益等级 > 1 && 增益名称 && 增益名称ID === '15455') {
                    增益名称 = `${增益名称}·${增益等级}`
                  }
                  // 处理部分buff同id等级不同增益不同的特殊情况
                  if (增益名称 && 心法数据枚举?.Buff带等级?.includes(增益名称ID)) {
                    增益名称 = `${增益名称}·${增益等级}`
                  }
                  // 处理buff可以有多层的情况
                  if (增益名称 && 心法数据枚举?.Buff带层数?.includes(增益名称ID)) {
                    增益名称 = `${增益名称}·${增益层数}`
                  }
                  if (增益名称) {
                    if (!增益buff名称列表?.includes(增益名称)) {
                      // 处理该技能实际不吃某增益但是携带了对应buff，增加计算效率
                      // 例如无妨大部分技能携带了植物温性，但是实际只有苍棘缚地吃这个增益
                      if (!心法数据枚举?.技能过滤增益?.[技能名称ID]?.[增益名称ID]) {
                        增益buff名称列表.push(增益名称)
                      } else {
                        console.log(`${技能名称ID}不吃${增益名称ID}，已过滤`)
                      }
                    }
                  } else {
                    // 过滤部分id、大附魔帽等
                    if (!['15436', '71182']?.includes(增益名称ID)) {
                      console.log(`增益名称ID未匹配${增益名称ID}`)
                    }
                  }
                }
              })
              const 战斗时间数组 = 技能增益结果对象[增益Buff列表]
              // 获取该战斗时间数组内在最大时间范围内的数量
              const 生效战斗时间数组 = 战斗时间数组.filter(
                (item) => Number(item?.[0] <= 最大时间 * 16) && Number(item?.[0] >= 最小时间 * 16)
              )
              // 对增益进行排序，方便对比
              增益buff名称列表.sort((a, b) => a.localeCompare(b))

              if (生效战斗时间数组?.length) {
                // 先增加总数量
                判断时间增加数量(生效战斗时间数组)

                // 增加增益列表那数量
                const 增益buff列表名字 = 增益buff名称列表.join(',')
                const 该增益技能数量 = 生效战斗时间数组?.length || 1
                if (技能增益列表?.some((item) => item?.增益名称 === 增益buff列表名字)) {
                  技能增益列表 = 技能增益列表.map((item) => {
                    return item?.增益名称 === 增益buff列表名字
                      ? {
                          ...item,
                          增益技能数: item.增益技能数 + 该增益技能数量,
                        }
                      : item
                  })
                } else {
                  技能增益列表.push({
                    增益名称: 增益buff列表名字,
                    增益技能数: 该增益技能数量,
                  })
                }
              }
            } else {
              console.log('此技能无增益', 技能名称)
              const 战斗时间数组 = 技能增益结果对象[增益Buff列表]
              判断时间增加数量(战斗时间数组)
            }
          }
        })

        // 这里如果不排序就是按考拉的顺序显示，方便对比
        技能增益列表.sort((a, b) => a.增益名称.localeCompare(b.增益名称))
        if (技能层数) {
          res.push({
            技能名称,
            技能等级,
            伤害层数: 技能层数,
            技能数量,
            技能增益列表,
          })
        } else {
          res.push({
            技能名称,
            技能等级,
            技能数量,
            技能增益列表,
          })
        }

        // ————————异常提示————————
        if (!技能名称) {
          message.error(`技能名称ID未获取：${技能名称ID}`)
        }
      }
    })
  }

  console.log('res', res)
  // 对技能名称进行排序
  res.sort((a, b) => a.技能名称?.localeCompare(b?.技能名称))

  console.log('战斗时间', 战斗时间)
  console.log('初始时间', 初始时间)

  return {
    // 战斗时间: 战斗时间 / 16,
    战斗时间: (战斗时间 - 初始时间) / 16,
    技能详情: res,
  }
}

/**
 * 先声明一个吃快照的属性集合
 * 然后在判断 一个 吃快照的技能时
 * 吃快照的属性只检查第二个数组的情况
 * 不吃快照的属性只检查第一个数组和第三个分组的情况
 * @params 数组 当前Buff，快照Buff，目标Buff
 * 攻击会心会效无双增伤非侠吃快照
 */

const 快照判断 = (
  数组: string[] = [],
  是否吃快照 = false,
  心法数据枚举,
  是否是NPC技能 = false
): string[] => {
  const 最终Buff: string[] = []
  const 当前Buff = 数组?.[0]?.split(',')
  const 快照Buff = 数组?.[1]?.split(',')
  const 目标Buff = 数组?.[2]?.split(',')
  const 非快照buff = [...(当前Buff || []), ...(目标Buff || [])]

  let 快照Buff列表 = 心法数据枚举?.快照Buff列表
  const Buff自身存在快照区分 = 心法数据枚举?.Buff自身存在快照区分

  if (是否是NPC技能) {
    快照Buff列表 = 快照Buff列表.concat(心法数据枚举?.npc额外快照buff列表 || [])
  }

  if (是否吃快照) {
    if (快照Buff?.length) {
      快照Buff.forEach((增益) => {
        const splitZengyi = 增益?.split('/')
        const 增益名称ID = splitZengyi[0]
        // !特殊处理养荣类型buff
        if (增益 && 增益名称ID) {
          if (Buff自身存在快照区分?.includes(增益名称ID)) {
            if (!最终Buff?.includes(`${增益名称ID}_快照`)) {
              最终Buff.push(`${增益名称ID}_快照`)
            }
          } else if (快照Buff列表?.includes(增益名称ID)) {
            if (!最终Buff?.includes(增益)) {
              最终Buff.push(增益)
            }
          }
        }
      })
    }
    非快照buff.forEach((增益) => {
      const splitZengyi = 增益?.split('/')
      const 增益名称ID = splitZengyi[0]
      // !特殊处理养荣类型buff
      if (增益 && 增益名称ID) {
        if (Buff自身存在快照区分?.includes(增益名称ID)) {
          if (!最终Buff?.includes(`${增益名称ID}_常驻`)) {
            最终Buff.push(`${增益名称ID}_常驻`)
          }
        } else if (!快照Buff列表?.includes(增益名称ID)) {
          if (!最终Buff?.includes(增益)) {
            最终Buff.push(增益)
          }
        }
      }
    })
    // 判断最终buff有没有遗漏某个buff，此部分代码无实际作用，仅调试用
    const 全部buff = [...当前Buff, ...快照Buff, ...目标Buff]
    if (全部buff?.length) {
      全部buff.forEach((增益) => {
        const splitZengyi = 增益?.split('/')
        let 增益名称ID = splitZengyi[0]
        const 增益等级 = Number(splitZengyi[1])
        if (无界统一buff?.includes(增益名称ID)) {
          增益名称ID = `${增益名称ID}_${增益等级}`
        }
        if (增益 && 增益名称ID) {
          if (!最终Buff?.includes(增益)) {
            // console.log('最终Buff', 最终Buff)
            // console.log('增益', 增益)
            // console.log('增益名称ID', 增益名称ID)
            // console.log(`存在遗漏快照buff${增益名称ID}`)
          }
        }
      })
    }
  } else {
    非快照buff.forEach((增益) => {
      const splitZengyi = 增益?.split('/')
      const 增益名称ID = splitZengyi[0]
      if (增益 && 增益名称ID) {
        if (!最终Buff?.includes(增益)) {
          最终Buff.push(增益)
        }
      }
    })
  }

  return 最终Buff
}
