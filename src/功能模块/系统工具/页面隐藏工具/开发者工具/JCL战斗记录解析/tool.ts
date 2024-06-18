import { 循环技能详情, 循环详情, 技能增益列表数据 } from '@/@types/循环'
import commonMap from './common'
import 凌海诀枚举 from './凌海诀/map.json'
import 太玄经枚举 from './太玄经/map.json'
import 无方枚举 from './无方/map.json'
import 花间游枚举 from './花间游/map.json'
import { message } from 'antd'

export const 心法枚举 = {
  凌海诀: 凌海诀枚举,
  太玄经: 太玄经枚举,
  无方: 无方枚举,
  花间游: 花间游枚举,
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
      const splitSkillKey = key?.split(';')
      const splitKey = splitSkillKey[0]?.split('/')
      if (splitKey?.length) {
        let 技能名称ID = splitKey[0]
        const 原始技能ID = splitKey[0]
        let 技能等级 = +splitKey[1] === 1 ? undefined : +splitKey[1]
        if (心法数据枚举?.技能带等级?.includes(技能名称ID)) {
          技能名称ID = `${技能名称ID}_${技能等级 || 1}`
        }
        let 技能层数 = splitKey[2] ? Number(splitKey[2]) : undefined

        // dot触发技能特殊，第一个技能为dot技能id，第二个技能为触发技能id
        if (splitSkillKey?.length > 1 && !!splitSkillKey?.[1]) {
          const dot技能 = splitSkillKey?.[0]
          const dotSplitKey = dot技能?.split('/')
          const 触发技能 = splitSkillKey?.[1]
          const actionSplitKey = 触发技能?.split('/')
          技能名称ID = `${dotSplitKey[0]}_${actionSplitKey[0]}`
          技能等级 = +actionSplitKey[1] === 1 ? undefined : +actionSplitKey[1]
          技能层数 = Number(actionSplitKey[2])
        }
        // console.log('splitKey', splitKey)
        // console.log('key', key)

        let 技能名称 = 心法数据枚举?.skills?.[技能名称ID]
        if (技能名称?.includes('DOT') && 心法 !== '花间游') {
          if (技能层数) {
            技能名称 = `${技能名称}·${commonMap?.StackMap?.[技能层数]}`
          }
        }
        if (!技能名称) {
          console.log('key', key)
          console.log(`技能名称ID未获取：${技能名称ID}`)
          message.error(`技能名称ID未获取：${技能名称ID}`)
        }
        let 技能数量 = 0
        let 技能增益列表: 技能增益列表数据[] = []
        const 技能增益结果对象 = 解析战斗数据[key]

        ;(Object.keys(技能增益结果对象) || []).forEach((zengyiKey) => {
          if (zengyiKey === ';;') {
            let 增益数量获取 = 1
            const 战斗时间数组 = 技能增益结果对象[zengyiKey]
            const 最终战斗时间 = 战斗时间数组[战斗时间数组.length]?.[0] || 0
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
            const 最终分割数组: string[] = 快照判断(用分号分割, 是否吃快照, 心法数据枚举, 心法)
            if (最终分割数组?.length) {
              const 增益buff名称列表: string[] = []
              最终分割数组.forEach((zengyi) => {
                const splitZengyi = zengyi?.split('/')
                if (splitZengyi?.length) {
                  const 增益名称ID = splitZengyi[0]
                  const 增益等级 = Number(splitZengyi[1])
                  const 增益层数 = Number(splitZengyi[2])
                  let 增益名称 =
                    心法数据枚举?.buff?.[增益名称ID] || 心法数据枚举?.buff?.[`;${增益名称ID}`]
                  // 判断伤腰大附魔
                  if (增益等级 > 1 && 增益名称 && 增益名称ID === '15455') {
                    增益名称 = `${增益名称}·${增益等级}`
                  }
                  if (增益名称 && 心法数据枚举?.Buff带等级?.includes(增益名称ID)) {
                    增益名称 = `${增益名称}·${增益等级}`
                  }
                  if (增益名称 && 心法数据枚举?.Buff带层数?.includes(增益名称ID)) {
                    增益名称 = `${增益名称}·${增益层数}`
                  }
                  if (增益名称) {
                    if (!增益buff名称列表?.includes(增益名称)) {
                      if (!心法数据枚举?.技能过滤增益?.[原始技能ID]?.[增益名称ID]) {
                        增益buff名称列表.push(增益名称)
                      } else {
                        console.log(`${原始技能ID}不吃${增益名称ID}，已过滤`)
                      }
                    }
                  } else {
                    console.log(`增益名称ID未匹配${增益名称ID}`)
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
              if (生效战斗时间数组?.length) {
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
              }
            } else {
              console.log('技能名称', 技能名称)
              console.log('zengyiKey', zengyiKey)
            }
          }
        })

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
      }
    })
  }
  console.log('res', res)
  res.sort((a, b) => a.技能名称?.localeCompare(b?.技能名称))

  return {
    战斗时间: 战斗时间 / 16,
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

const 快照判断 = (数组: string[] = [], 是否吃快照 = false, 心法数据枚举, 心法): string[] => {
  const 最终Buff: string[] = []
  const 当前Buff = 数组?.[0]?.split(',')
  const 快照Buff = 数组?.[1]?.split(',')
  const 目标Buff = 数组?.[2]?.split(',')
  const 非快照buff = [...(当前Buff || []), ...(目标Buff || [])]

  if (是否吃快照) {
    if (快照Buff?.length) {
      快照Buff.forEach((增益) => {
        const splitZengyi = 增益?.split('/')
        const 增益名称ID = splitZengyi[0]
        // !特殊处理养荣
        // if (增益 && 增益名称ID && 增益名称ID === '20699') {
        //   if (!最终Buff?.includes('20699_2')) {
        //     最终Buff.push('20699_2')
        //   }
        // } else {
        if (增益 && 增益名称ID && 心法数据枚举?.快照Buff列表?.includes(增益名称ID)) {
          if (!最终Buff?.includes(增益)) {
            最终Buff.push(增益)
          }
        }
        // }
      })
    }
    非快照buff.forEach((增益) => {
      const splitZengyi = 增益?.split('/')
      const 增益名称ID = splitZengyi[0]
      // !特殊处理养荣
      // if (增益 && 增益名称ID && 增益名称ID === '20699') {
      //   if (!最终Buff?.includes('20699_1')) {
      //     最终Buff.push('20699_1')
      //   }
      // } else {
      if (增益 && 增益名称ID && !心法数据枚举?.快照Buff列表?.includes(增益名称ID)) {
        if (!最终Buff?.includes(增益)) {
          最终Buff.push(增益)
        }
      }
      // }
    })
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

  // !养荣循环默认全覆盖
  if (!最终Buff?.includes('20699') && 心法 === '无方') {
    最终Buff.push('20699')
  }
  return 最终Buff
}
