import { 循环技能详情, 循环详情, 技能增益列表数据 } from '@/@types/循环'
import commonMap from './common'
import 凌海诀枚举 from './凌海诀/map.json'
import { message } from 'antd'

const 心法枚举 = {
  凌海诀: 凌海诀枚举,
}

export const 获取数据 = ({ 心法, 数据 }): 循环详情 => {
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
            增益数量获取 = 战斗时间数组?.length || 1
            if (typeof 最终战斗时间 === 'number') {
              if (战斗时间 < 最终战斗时间) {
                战斗时间 = 最终战斗时间
              }
            }
            技能数量 += 增益数量获取
          } else {
            // 分号分割成三部分 当前Buff，快照Buff，目标Buff
            const 用分号分割 = zengyiKey?.split(';')
            let 最终分割数组: string[] = []
            if (用分号分割?.length) {
              用分号分割.forEach((分号KEY) => {
                if (分号KEY) {
                  const 用逗号分隔 = 分号KEY?.split(',')
                  if (用逗号分隔?.length) {
                    最终分割数组 = 最终分割数组.concat(用逗号分隔)
                  }
                }
              })
            }
            if (最终分割数组?.length) {
              const 增益buff名称列表: string[] = []
              console.log('最终分割数组', 最终分割数组)
              最终分割数组.forEach((zengyi) => {
                const splitZengyi = zengyi?.split('-')
                if (splitZengyi?.length) {
                  const 增益名称ID = splitZengyi[0]
                  const 增益层数 = Number(splitZengyi[1])
                  let 增益名称 =
                    心法数据枚举?.buff?.[增益名称ID] || 心法数据枚举?.buff?.[`;${增益名称ID}`]
                  // 判断伤腰大附魔
                  if (增益层数 > 1 && 增益名称ID === '15455') {
                    增益名称 = `${增益名称}·${增益层数}`
                  }
                  if (增益名称) {
                    if (!增益buff名称列表?.includes(增益名称)) {
                      增益buff名称列表.push(增益名称)
                    }
                  } else {
                    console.log('心法数据枚举?.buff', 心法数据枚举?.buff)
                    console.log('心法数据枚举?.buff', 心法数据枚举?.buff?.[增益名称ID])
                    console.log('增益名称ID', 增益名称ID)
                    message.error(`增益名称ID未匹配${增益名称ID}`)
                  }
                }
              })
              let 增益数量获取 = 1
              const 战斗时间数组 = 技能增益结果对象[zengyiKey]
              const 最终战斗时间 = 战斗时间数组[战斗时间数组.length - 1]?.[0]
              增益数量获取 = 战斗时间数组?.length || 1
              // console.log('增益数量获取', 增益数量获取)
              if (typeof 最终战斗时间 === 'number') {
                if (战斗时间 < 最终战斗时间) {
                  战斗时间 = 最终战斗时间
                }
              }
              增益buff名称列表.sort((a, b) => a.localeCompare(b))
              const 增益buff列表名字 = 增益buff名称列表.join(',')
              console.log('增益buff列表名字', 增益buff列表名字)

              if (技能增益列表?.some((item) => item?.增益名称 === 增益buff列表名字)) {
                console.log('11111')
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
