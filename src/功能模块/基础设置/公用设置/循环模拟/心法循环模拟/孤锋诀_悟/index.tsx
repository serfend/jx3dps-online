// 循环模拟器
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Modal, Tooltip, message } from 'antd'
import { ReactSortable } from 'react-sortablejs'

import { CopyOutlined, DeleteOutlined, AlertOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@/hooks'

import 循环模拟技能基础数据 from './constant/skill'

import { getDpsCycle } from './utils'
import {
  循环日志数据类型,
  循环基础技能数据类型,
  ShowCycleSingleSkill,
  模拟信息类型,
} from './simulator/type'

import 模拟循环 from './simulator/index'
import { 每秒郭氏帧 } from './constant'

import CycleModalHeader from './components/CycleModalHeader'
import StatusBar from './components/StatusBar'
import CycleSkillItem from './components/CycleSkillItem'
import AddCycleSkillBtns from './components/AddCycleSkillBtns'
import SaveCustomCycleModal from './components/SaveCustomCycleModal'
import { 循环详情 } from '@/@types/循环'
import 获取当前数据 from '@/数据/数据工具/获取当前数据'
import './index.css'
import { 获取加速等级 } from '@/工具函数/data'
import { 秒伤计算 } from '@/计算模块/计算函数'
import { 当前计算结果类型 } from '@/@types/输出'
import { 更新当前自定义循环列表 } from '@/store/data'
import AutoSkillListContent from './components/AutoSkillListContent'

const { 缓存映射 } = 获取当前数据()

const 加速等级枚举 = {
  0: 0,
  1: 95,
  2: 6502,
  3: 13851,
  4: 22331,
  5: 32225,
}

interface CycleSimulatorProps {
  打开循环模拟器?: () => void
  disabled?: boolean
}

function CycleSimulator(props: CycleSimulatorProps) {
  const { 打开循环模拟器, disabled } = props
  const [logData, setLogData] = useState<循环日志数据类型[]>([])

  const [模拟DPS结果, 更新模拟DPS结果] = useState<当前计算结果类型>({
    秒伤: 0,
    总伤: 0,
    秒伤计算时间: 0,
    计算结果技能列表: [],
  })

  const [模拟信息, 更新模拟信息] = useState<模拟信息类型>({
    角色状态信息: {
      锐意: 60,
    },
    当前时间: 0,
    当前自身buff列表: {},
    当前目标buff列表: {},
    循环执行结果: '成功',
    循环异常信息: {},
    技能基础数据: [...循环模拟技能基础数据],
    技能释放记录: [],
    当前各技能运行状态: {},
    当前DOT运行状态: {},
    当前GCD组: {},
  })

  // 基础弹窗
  const [basicModalOpen, setBasicModalOpen] = useState<boolean>(false)
  // 循环
  const [cycle, setCycle] = useState<循环基础技能数据类型[]>([])
  const [自定义循环保存弹窗, 设置自定义循环保存弹窗] = useState<boolean>(false)
  // 当前面板加速值
  const 外部加速值 = useAppSelector((state) => state?.data?.装备信息?.装备基础属性)?.加速等级 || 0
  const 大橙武模拟 = useAppSelector((state) => state?.data?.装备信息?.装备增益)?.大橙武特效 || false
  const [加速等级, 更新加速等级] = useState<number>(0)
  const 外部延迟 = useAppSelector((state) => state?.data?.网络延迟) || 0
  const [网络延迟, 更新网络延迟] = useState<number>(0)
  // 自定义循环
  const 自定义循环列表 = useAppSelector((state) => state?.data?.自定义循环列表)
  // 是否开启武学助手
  const [开启武学助手, 设置开启武学助手] = useState<boolean>(false)

  const 加速值 = useMemo(() => {
    return 加速等级枚举[加速等级] || 0
  }, [加速等级])

  // 是否实时计算
  const 是否实时计算 = true

  const [起手留层数, 设置起手留层数] = useState<number>(5)

  // 奇穴
  const 奇穴信息 = useAppSelector((state) => state?.data?.当前奇穴信息)
  // const [奇穴信息, 更新奇穴信息] = useState<string[]>([])
  // const [奇穴弹窗展示, 更新奇穴弹窗展示] = useState<boolean>(false)

  const [buff覆盖数据, 更新buff覆盖数据] = useState<number[]>([])
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (basicModalOpen) {
      // 设置外面选择的默认奇穴信息
      // 更新奇穴信息(reduxQixuedata)
      更新加速等级(获取加速等级(外部加速值))
      更新网络延迟(外部延迟)
    } else {
      setLogData([])
      setBasicModalOpen(false)
      setCycle([])
      更新模拟DPS结果({ 秒伤: 0, 总伤: 0, 秒伤计算时间: 0, 计算结果技能列表: [] })
    }
  }, [basicModalOpen, 外部加速值, 外部延迟])

  useEffect(() => {
    if (是否实时计算 && basicModalOpen) {
      simulator({})
    }
  }, [basicModalOpen, cycle, 是否实时计算, 起手留层数, 网络延迟, 加速值, 奇穴信息, 开启武学助手])

  const simulator = (props?) => {
    const { 传入加速 = 加速值, 传入延迟 = 网络延迟, 更新展示 = true, 奇穴 } = props
    const res = 模拟循环({
      测试循环: cycle.map((item) => item?.技能名称) || [],
      加速值: 传入加速 !== undefined ? 传入加速 : 加速值,
      网络延迟: 传入延迟 !== undefined ? 传入延迟 : 网络延迟,
      奇穴: 奇穴 || 奇穴信息,
      起手留层数,
      大橙武模拟,
      开启武学助手,
    })

    const {
      最终日志,
      当前自身buff列表: 处理后自身buff,
      当前目标buff列表: 处理后目标buff,
      角色状态信息: 处理后角色状态信息,
      ...rest
    } = res
    if (更新展示) {
      setLogData(最终日志)
      计算dps(最终日志, rest?.当前时间)
      更新模拟信息({
        当前自身buff列表: 处理后自身buff,
        当前目标buff列表: 处理后目标buff,
        角色状态信息: 处理后角色状态信息,
        ...rest,
      })
    }
    return { 最终日志, ...rest }
  }

  // 计算DPS日志
  const 计算dps = (data: 循环日志数据类型[], 战斗时间) => {
    const 获取用于计算的技能组 = getDpsCycle(data, 战斗时间)
    const { 秒伤, 计算结果技能列表, 秒伤计算时间, 总伤 } = dispatch(
      秒伤计算({
        更新循环技能列表: 获取用于计算的技能组,
        更新计算时间: 战斗时间 / 每秒郭氏帧,
        更新奇穴数据: 奇穴信息,
      })
    )
    更新模拟DPS结果({
      秒伤: 战斗时间 > 0 ? 秒伤 : 0,
      总伤: 战斗时间 > 0 ? 总伤 : 0,
      秒伤计算时间: 秒伤计算时间,
      计算结果技能列表: 计算结果技能列表,
    })
  }

  // 向循环内新增技能
  const 新增循环技能 = (item: 循环基础技能数据类型) => {
    const newCycle = [...(cycle || []), item]
    setCycle(newCycle)
  }

  const 批量新增循环 = (item: 循环基础技能数据类型[]) => {
    const newCycle = [...(cycle || []), ...item]
    setCycle(newCycle)
  }

  // 从循环内删除技能
  const 删除循环技能 = (index) => {
    const newCycle = [...(cycle || [])]
    newCycle.splice(index, 1)
    setCycle(newCycle)
  }

  // 根据循环计算更适合展示的多层数组，用于显示
  const 处理循环结果对象 = useMemo(() => {
    const res: ShowCycleSingleSkill[][] = []
    cycle.map((item, index) => {
      const 找到当前技能释放记录 = 模拟信息?.技能释放记录?.[index]
      const data = {
        ...item,
        ...找到当前技能释放记录,
      }
      if (index === 0) {
        res[res?.length] = [{ ...data, index: index || 0 }]
      } else {
        res[res?.length - 1] = [...(res[res?.length - 1] || []), { ...data, index: index || 0 }]

        const 打完本技能换行 = data?.技能名称 === '横云势·二'
        // const 打完本技能换行 = data?.技能名称 === '横云势二'

        if (打完本技能换行) {
          res[res?.length] = []
        }
      }
      return data
    })

    return { 显示循环: res, 完整循环: cycle }
  }, [cycle, 模拟信息])

  // 拖拽更新循环
  const 拖拽更新循环 = (newList, type) => {
    if (type == '轮次内') {
      // 首先获取被替换轮次的第一个元素的index索引
      const minIndex = newList.reduce(function (min, obj) {
        return Math.min(min, obj.index)
      }, Infinity)
      // 获取最大的索引，判断拖拽生效范围
      const maxIndex = newList.reduce(function (min, obj) {
        return Math.max(min, obj.index)
      }, Number.NEGATIVE_INFINITY)
      // 将数组哪索引范围内跌元素替换为新的数组元素
      const newCycle = cycle.map((item, index) => {
        if (index < minIndex || index > maxIndex) {
          return { ...item }
        } else {
          return newList[index - minIndex]
        }
      })
      // 更新循环
      setCycle(newCycle)
    } else if (type === '整个轮次拖拽') {
      const res: 循环基础技能数据类型[] = []
      newList.forEach((item) => {
        item.forEach((a) => {
          if (a.技能名称) {
            const 当前技能数据 = 模拟信息?.技能基础数据?.find((b) => b?.技能名称 === a.技能名称)
            if (当前技能数据) {
              res.push(当前技能数据)
            }
          }
        })
      })
      setCycle(res)
    }
  }

  // 复制本轮到最后
  const 复制本轮至最后 = (轮次) => {
    const newCycle = cycle.concat(轮次)
    setCycle(newCycle)
  }

  // 删除本轮次
  const 删除本轮次 = (轮次) => {
    const minIndex = 轮次.reduce(function (min, obj) {
      return Math.min(min, obj.index)
    }, Infinity)
    // 获取最大的索引，判断拖拽生效范围
    const maxIndex = 轮次.reduce(function (min, obj) {
      return Math.max(min, obj.index)
    }, Number.NEGATIVE_INFINITY)
    // 将数组哪索引范围内跌元素替换为新的数组元素
    const newCycle = cycle.filter((item, index) => {
      return index < minIndex || index > maxIndex
    })
    // 更新循环
    setCycle(newCycle)
  }

  // 删除本轮后全部循环
  const 删除本轮后全部循环 = (轮次) => {
    Modal.confirm({
      title: '确认删除本轮后全部循环吗？',
      onOk() {
        // 获取最大的索引，判断生效范围
        const maxIndex = 轮次.reduce(function (min, obj) {
          return Math.max(min, obj.index)
        }, Number.NEGATIVE_INFINITY)
        // 将数组哪索引范围内跌元素替换为新的数组元素
        const newCycle = cycle.filter((item, index) => {
          return index <= maxIndex
        })
        // 更新循环
        setCycle(newCycle)
      },
    })
  }

  // 确认保存自定义循环
  const 确认保存循环 = (名称, 加速选项, 延迟选项) => {
    // 获取各加速下 各网络延迟的循环
    const 各延迟枚举 = 延迟选项?.length ? 延迟选项 : [0, 1, 2, 3]
    const 各加速枚举 = 加速选项?.length ? 加速选项 : [0, 1, 2, 3, 4, 5]

    const 保存循环结果: 循环详情[] = []

    const 异常结果: any[] = []

    各加速枚举.forEach((加速) => {
      const 实际加速值 = 加速等级枚举[加速]
      各延迟枚举.forEach((延迟) => {
        // 保存循环数据的时候，把镇机和界破的数据一起保存，生成两套并存的数据，方便后续切换比较
        const 模拟结果 = simulator({
          传入加速: Number(实际加速值),
          传入延迟: Number(延迟),
          更新展示: false,
          奇穴: [...奇穴信息],
        })
        const 本次日志 = 模拟结果?.最终日志
        const 循环执行结果 = 模拟结果?.循环执行结果
        // const 战斗时间 = 本次日志[本次日志.length - 1].日志时间 || 0
        const 战斗秒 = 模拟结果?.当前时间 / 每秒郭氏帧
        const 用于计算循环 = getDpsCycle(本次日志, 模拟结果?.当前时间)
        if (循环执行结果 === '成功') {
          保存循环结果.push({
            循环加速等级: 加速,
            循环延迟要求: 延迟,
            战斗时间: 战斗秒,
            技能详情: 用于计算循环,
          })
        } else {
          异常结果.push({
            加速,
            延迟,
          })
        }
      })
    })

    if (异常结果?.length) {
      message.error(
        `以下条件循环异常，将不会保存该加速的循环。异常循环：${异常结果
          .map((item) => {
            return `[加速：${item.加速}，延迟：${item.延迟}]`
          })
          .join('、')}`
      )
    }

    const 技能序列 = cycle.map((item) => item.技能名称)

    const 新自定义循环 = 自定义循环列表?.some((item) => item?.名称 === 名称)
      ? 自定义循环列表.map((item) => {
          return item.名称 === 名称
            ? {
                名称,
                标题: 名称,
                类型: '自定义',
                标记: '自定义',
                循环详情: 保存循环结果,
                奇穴: 奇穴信息,
                技能序列,
              }
            : item
        })
      : (自定义循环列表 || []).concat([
          {
            名称,
            标题: 名称,
            类型: '自定义',
            标记: '自定义',
            循环详情: 保存循环结果,
            奇穴: 奇穴信息,
            技能序列,
          },
        ])

    dispatch(更新当前自定义循环列表(新自定义循环))

    设置自定义循环保存弹窗(false)
    message.success('保存成功')
  }

  useEffect(() => {
    // redux变动，更新storage信息
    const 保存信息 = {}
    ;(自定义循环列表 || []).forEach((item) => {
      保存信息[item.名称] = {
        ...item,
      }
    })
    localStorage?.setItem(缓存映射.自定义循环, JSON.stringify(保存信息))
  }, [自定义循环列表, 奇穴信息])

  return (
    <>
      <Button
        danger
        disabled={disabled}
        size='small'
        onClick={() => {
          setBasicModalOpen(true)
          打开循环模拟器 && 打开循环模拟器()
        }}
      >
        循环模拟
      </Button>
      <Modal
        className='cycle-simulator-modal'
        maskClosable={false}
        width={'100%'}
        title={
          <CycleModalHeader
            cycle={cycle}
            设置自定义循环保存弹窗={设置自定义循环保存弹窗}
            清空循环={() => setCycle([])}
            起手留层数={起手留层数}
            设置起手留层数={设置起手留层数}
            快速导入循环={(循环, 循环标记) => {
              setCycle(循环)
              设置开启武学助手(循环标记 === '助手')
            }}
            网络延迟={网络延迟}
            更新网络延迟={更新网络延迟}
            加速等级={加速等级}
            更新加速等级={更新加速等级}
            模拟信息={模拟信息}
          />
        }
        centered
        footer={null}
        open={basicModalOpen}
        onCancel={() => setBasicModalOpen(false)}
        destroyOnClose
      >
        <div className={'cycle-simulator-setting'}>
          {/* 角色状态栏 */}
          <StatusBar
            模拟信息={模拟信息}
            完整循环={处理循环结果对象?.完整循环 as any}
            日志信息={logData}
            模拟DPS结果={模拟DPS结果}
          />
          {/* // 循环展示模块 */}
          <div className={'cycle-simulator-setting-res'}>
            {处理循环结果对象?.显示循环?.length ? (
              (处理循环结果对象?.显示循环 || []).map((轮次, index) => {
                return 轮次?.length ? (
                  <div className={`cycle-simulator-setting-turn cycle-turn-drag`} key={`${index}`}>
                    <ReactSortable
                      list={轮次.map((i) =>
                        Object.assign(i, { id: `${i?.技能名称}_${index}_${i?.index}` })
                      )}
                      setList={(e) => {
                        拖拽更新循环(e, '轮次内')
                      }}
                      className='cycle-simulator-setting-turn-drop'
                      animation={150}
                      draggable={'.cycle-simulator-setting-skill-drag'}
                    >
                      {(轮次 || []).map((item) => {
                        return (
                          <CycleSkillItem
                            技能={item}
                            删除循环技能={删除循环技能}
                            key={`${item?.技能名称}_${index}_${item?.index}`}
                            模拟信息={模拟信息}
                            buff覆盖数据={buff覆盖数据}
                            更新buff覆盖数据={更新buff覆盖数据}
                          />
                        )
                      })}
                      <div className={'cycle-turn-operate'}>
                        <Tooltip title='删除本轮后全部循环'>
                          <AlertOutlined
                            className={'cycle-turn-operate-btn'}
                            style={{ color: '#FF0000' }}
                            onClick={() => 删除本轮后全部循环(轮次)}
                          />
                        </Tooltip>
                        <Tooltip title='复制并添加到最后'>
                          <CopyOutlined
                            className={'cycle-turn-operate-btn'}
                            onClick={() => 复制本轮至最后(轮次)}
                          />
                        </Tooltip>
                        <Tooltip title='删除此轮'>
                          <DeleteOutlined
                            className={'cycle-turn-operate-btn'}
                            onClick={() => 删除本轮次(轮次)}
                          />
                        </Tooltip>
                      </div>
                    </ReactSortable>
                  </div>
                ) : (
                  <div />
                )
              })
            ) : (
              <p className={'cycle-simulator-setting-tip'}>请点击下方技能按钮生成模拟技能序列</p>
            )}
          </div>
        </div>
        {/* 武学助手技能框 */}
        <AutoSkillListContent />
        {/* 添加循环按钮组 */}
        <AddCycleSkillBtns
          新增循环技能={新增循环技能}
          批量新增循环={批量新增循环}
          处理循环结果对象={处理循环结果对象}
          模拟信息={模拟信息}
          大橙武模拟={大橙武模拟}
          开启武学助手={开启武学助手}
          设置开启武学助手={设置开启武学助手}
        />
        {/* 保存自定义循环弹窗 */}
        <SaveCustomCycleModal
          自定义循环保存弹窗={自定义循环保存弹窗}
          设置自定义循环保存弹窗={设置自定义循环保存弹窗}
          保存自定义循环={确认保存循环}
        />
        {/* 循环自定义奇穴弹窗 */}
        {/* <QixueSetModal
          奇穴信息={奇穴信息}
          更新奇穴信息={更新奇穴信息}
          奇穴弹窗展示={奇穴弹窗展示}
          更新奇穴弹窗展示={更新奇穴弹窗展示}
        /> */}
      </Modal>
    </>
  )
}

export default CycleSimulator
