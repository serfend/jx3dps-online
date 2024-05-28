// 一键设置最佳附魔
import { Button, Modal, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '@/hooks'
import { RiseOutlined } from '@ant-design/icons'
import { 角色基础属性类型 } from '@/@types/角色'
import { 秒伤计算 } from '@/计算模块/计算函数'
import 获取当前数据 from '@/数据/数据工具/获取当前数据'

import 根据装备信息获取基础属性, { 五彩石计算 } from '../../工具函数/根据装备信息获取基础属性'
import './index.css'

const { 五彩石 } = 获取当前数据()

const 五彩石原始数据 = 五彩石?.[6]

function 最佳五彩石设置({ 一键替换五彩石, 对比秒伤, 对比装备信息 }) {
  const [open, setOpen] = useState<boolean>(false)
  const [最大五彩石, 更新最大五彩石] = useState<string>('')
  const [最大Dps, 更新最大Dps] = useState<number>(0)
  const [计算用时, 更新计算用时] = useState<number>(0)
  const [无五彩石装备属性, 设置无五彩石装备属性] = useState<角色基础属性类型>()

  // 所有组合的缓存数据
  const dispatch = useAppDispatch()

  useEffect(() => {
    获取当前装备信息去除五彩石加成的面板()
  }, [对比装备信息])

  const 获取当前装备信息去除五彩石加成的面板 = () => {
    const { 装备基础属性 } = 根据装备信息获取基础属性(对比装备信息, { 计算五彩石: false })
    设置无五彩石装备属性(装备基础属性)
  }

  const 计算前提示 = () => {
    Modal.confirm({
      title: `确定开始计算吗`,
      content: `共 ${五彩石原始数据?.length} 个六级五彩石，计算将造成一定卡顿`,
      okText: '我要计算',
      onOk: async () => {
        开始计算()
      },
    })
  }

  const 开始计算 = () => {
    const 开始计算时间 = new Date().valueOf()
    let 最大秒伤 = 0
    let 最大五彩石: any = {}
    if (五彩石原始数据?.length) {
      for (let i = 0; i < 五彩石原始数据?.length; i++) {
        const 修改后装备属性 = 五彩石计算(
          五彩石原始数据[i]?.五彩石名称,
          无五彩石装备属性 as 角色基础属性类型
        )
        const { 秒伤 } = dispatch(
          秒伤计算({
            更新装备信息: {
              ...对比装备信息,
              装备基础属性: 修改后装备属性,
              五彩石: 五彩石原始数据[i]?.五彩石名称,
            } as any,
          })
        )
        if (秒伤 > 最大秒伤) {
          最大秒伤 = 秒伤
          最大五彩石 = 五彩石原始数据[i]?.五彩石名称
        }
      }
    }
    更新最大五彩石(最大五彩石)
    更新最大Dps(最大秒伤)
    const 结束计算时间 = new Date().valueOf()
    const 计算用时 = 结束计算时间 - 开始计算时间
    if (最大秒伤 > 对比秒伤) {
      setOpen(true)
      更新计算用时(计算用时)
    } else {
      message.success(`当前五彩石已为最佳方案，无需替换。计算用时${计算用时}ms`)
    }
  }

  const closeModal = () => {
    setOpen(false)
    更新最大五彩石('')
    更新最大Dps(0)
  }

  return (
    <>
      <Button type='primary' size='small' style={{ marginLeft: 12 }} onClick={() => 计算前提示()}>
        一键设置五彩石
      </Button>
      {/* 设置提醒和结果弹窗 */}
      <Modal
        title={
          <div className={'max-wucaishi-modal-title'}>
            <span>最佳五彩石结果对比</span>
            <span>计算用时：{计算用时}ms</span>
          </div>
        }
        maskClosable={false}
        centered
        open={open}
        onCancel={() => setOpen(false)}
        footer={
          <Button
            type='primary'
            onClick={async () => {
              await 一键替换五彩石(最大五彩石)
              closeModal()
            }}
          >
            一键替换
          </Button>
        }
      >
        <div className={'max-wucaishi-wrap'}>
          <div className='max-wucaishi-content'>
            <h1 className={'max-wucaishi-title'}>替换前</h1>
            <h1 className='max-wucaishi-dps'>{对比秒伤}</h1>
            <div>
              <div className={`max-wucaishi-item`}>
                <span className='max-wucaishi-value'>{对比装备信息?.五彩石}</span>
              </div>
            </div>
          </div>
          <div className='max-wucaishi-content'>
            <h1 className={'max-wucaishi-title'}>替换后</h1>
            <h1 className='max-wucaishi-dps max-wucaishi-dps-up'>
              {最大Dps}
              <RiseOutlined className='max-wucaishi-dps-icon' />
            </h1>
            <div>
              <div className={`max-wucaishi-item max-wucaishi-diff`}>
                <span className='max-wucaishi-value'>{最大五彩石}</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default 最佳五彩石设置
