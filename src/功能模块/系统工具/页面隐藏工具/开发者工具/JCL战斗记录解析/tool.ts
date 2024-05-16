import { 循环技能详情, 循环详情, 技能增益列表数据 } from '@/@types/循环'
import commonMap from './common'
import 凌海诀枚举 from './凌海诀/map.json'
import { message } from 'antd'

const 心法枚举 = {
  凌海诀: 凌海诀枚举,
}

export const 获取数据 = ({ 心法, 数据, 最大时间 }): 循环详情 => {
  const 心法数据枚举 = 心法枚举[心法]
  const JSONData = JSON.parse(数据 || '{}')
  const res: 循环技能详情[] = []

  // 判断有没有战斗角色
  const PlayersId = JSONData?.players && Object.keys(JSONData?.players)?.[0]
  const TargetId = JSONData?.targets?.[PlayersId]?.[0]

  const 解析战斗数据 = JSONData?.records?.[PlayersId]?.[TargetId] || JSONData

  let 战斗时间 = 0
  if (心法数据枚举) {
    Object.keys(解析战斗数据).forEach((key) => {
      const splitKey = key?.split('-')
      if (splitKey?.length) {
        const 技能名称ID = splitKey[0]
        const 技能层数 = Number(splitKey[2])
        let 技能名称 = 心法数据枚举?.skills?.[技能名称ID]
        if (技能名称?.includes('DOT')) {
          技能名称 = `${技能名称}·${commonMap?.StackMap?.[技能层数]}`
        }
        if (!技能名称) {
          message.error(`技能名称ID未获取：${技能名称ID}`)
        }
        let 技能数量 = 0
        let 技能增益列表: 技能增益列表数据[] = []
        const 技能增益结果对象 = 解析战斗数据[key]

        ;(Object.keys(技能增益结果对象) || []).forEach((zengyiKey) => {
          if (zengyiKey === ';;') {
            let 增益数量获取 = 1
            const 战斗时间数组 = 技能增益结果对象[zengyiKey]?.[0]
            const 最终战斗时间 = 战斗时间数组[战斗时间数组.length]?.[0]
            if (最终战斗时间 <= 最大时间 * 16) {
              增益数量获取 = 战斗时间数组?.length || 1
              if (typeof 最终战斗时间 === 'number') {
                if (战斗时间 < 最终战斗时间) {
                  战斗时间 = 最终战斗时间
                }
              }
              技能数量 += 增益数量获取
            }
          } else {
            // 分号分割成三部分 当前Buff，快照Buff，目标Buff
            const 用分号分割 = zengyiKey?.split(';')
            const 是否吃快照 = 心法数据枚举?.吃快照技能?.includes(技能名称ID)
            const 最终分割数组: string[] = 快照判断(用分号分割, 是否吃快照, 心法数据枚举)

            if (最终分割数组?.length) {
              const 增益buff名称列表: string[] = []
              最终分割数组.forEach((zengyi) => {
                const splitZengyi = zengyi?.split('-')
                if (splitZengyi?.length) {
                  const 增益名称ID = splitZengyi[0]
                  const 增益层数 = Number(splitZengyi[1])
                  let 增益名称 =
                    心法数据枚举?.buff?.[增益名称ID] || 心法数据枚举?.buff?.[`;${增益名称ID}`]
                  // 判断伤腰大附魔
                  if (增益层数 > 1 && 增益名称 && 增益名称ID === '15455') {
                    增益名称 = `${增益名称}·${增益层数}`
                  }
                  if (增益名称) {
                    if (!增益buff名称列表?.includes(增益名称)) {
                      增益buff名称列表.push(增益名称)
                    }
                  } else {
                    // message.error(`增益名称ID未匹配${增益名称ID}`)
                  }
                }
              })
              let 增益数量获取 = 1
              const 战斗时间数组 = 技能增益结果对象[zengyiKey]
              // 获取该战斗时间数组内在最大时间范围内的数量
              const 生效战斗时间数组 = 战斗时间数组.filter((item) =>
                Number(item?.[0] <= 最大时间 * 16)
              )
              增益数量获取 = 生效战斗时间数组?.length || 1
              增益buff名称列表.sort((a, b) => a.localeCompare(b))
              const 最终战斗时间 = 生效战斗时间数组[生效战斗时间数组.length - 1]?.[0]

              if (typeof 最终战斗时间 === 'number') {
                if (战斗时间 < 最终战斗时间) {
                  战斗时间 = 最终战斗时间
                }
              }
              const 增益buff列表名字 = 增益buff名称列表.join(',')

              if (技能增益列表?.some((item) => item?.增益名称 === 增益buff列表名字)) {
                技能增益列表 = 技能增益列表.map((item) => {
                  return item?.增益名称 === 增益buff列表名字
                    ? {
                        ...item,
                        增益技能数: item.增益技能数 + 增益数量获取,
                      }
                    : item
                })
              } else {
                技能增益列表.push({
                  增益名称: 增益buff列表名字,
                  增益技能数: 增益数量获取,
                })
              }
              技能数量 += 增益数量获取
            } else {
              console.log('zengyiKey', zengyiKey)
            }
          }
        })

        技能增益列表.sort((a, b) => a.增益名称.localeCompare(b.增益名称))

        res.push({
          技能名称,
          技能数量,
          技能增益列表,
        })
      }
    })
  }
  res.sort((a, b) => a.技能名称.localeCompare(b.技能名称))

  return {
    战斗时间: 战斗时间 / 16,
    技能详情: res,
  }
}

/**
 * 快照那个逻辑我再复述一遍你看看我理解的对不对
 * 先声明一个吃快照的属性集合
 * 然后在判断 一个 吃快照的技能时
 * 吃快照的属性只检查第二个数组的情况
 * 不吃快照的属性只检查第一个数组和第三个分组的情况
 * @params 数组 当前Buff，快照Buff，目标Buff
 */

const 快照判断 = (数组: string[] = [], 是否吃快照 = false, 心法数据枚举): string[] => {
  const 最终Buff: string[] = []
  const 当前Buff = 数组?.[0]?.split(',')
  const 快照Buff = 数组?.[1]?.split(',')
  const 目标Buff = 数组?.[2]?.split(',')
  const 非快照buff = [...(当前Buff || []), ...(目标Buff || [])]

  if (是否吃快照) {
    if (快照Buff?.length) {
      快照Buff.forEach((增益) => {
        const splitZengyi = 增益?.split('-')
        const 增益名称ID = splitZengyi[0]
        if (增益 && 增益名称ID && 心法数据枚举?.快照Buff列表?.includes(增益名称ID)) {
          if (!最终Buff?.includes(增益)) {
            最终Buff.push(增益)
          }
        }
      })
    }
    非快照buff.forEach((增益) => {
      const splitZengyi = 增益?.split('-')
      const 增益名称ID = splitZengyi[0]
      if (增益 && 增益名称ID && !心法数据枚举?.快照Buff列表?.includes(增益名称ID)) {
        if (!最终Buff?.includes(增益)) {
          最终Buff.push(增益)
        }
      }
    })
  } else {
    非快照buff.forEach((增益) => {
      const splitZengyi = 增益?.split('-')
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
