import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { Divider } from 'antd'
import { useAppSelector } from '@/hooks'
import 获取当前数据 from '@/数据/数据工具/获取当前数据'

import 结果统计 from './结果统计'
import 收益图表 from './收益图表'
import './index.css'

const { 系统配置 } = 获取当前数据()

function 计算结果() {
  const 增益面板显示状态 = useAppSelector((state) => state?.system?.增益面板显示状态)
  const 当前计算结果 = useAppSelector((state) => state?.data?.当前计算结果)
  const [技能统计弹窗, 打开技能统计弹窗] = useState<boolean>(false)

  const incomeRef = useRef<any>()

  useEffect(() => {
    setTimeout(() => {
      incomeRef?.current?.initChart()
    })
  }, [当前计算结果])

  return 当前计算结果?.秒伤 ? (
    <div
      className={`dps ${增益面板显示状态 ? `dps-zengyi-visible` : ''}`}
      style={{ backgroundColor: 系统配置?.背景色 || 'rgba(0, 0, 0, 0.5)' }}
    >
      <h1 className={'dps-title'}>伤害计算</h1>
      <Divider />
      <div className='dps-number-count-wrap'>
        <div className={'dps-number-count'}>
          <div className={'dps-number-count-text'}>{当前计算结果?.秒伤}</div>
          <div className={'dps-number-count-skill'} onClick={() => 打开技能统计弹窗(true)}>
            技能统计
          </div>
        </div>
        <div className='dps-number-count-time'>
          <span className={'dps-number-count-time-label'}>战斗时间：</span>
          {当前计算结果?.秒伤计算时间}秒
        </div>
      </div>
      <p className={'dps-number-tip'}>数值仅供参考，请以实际游戏内数值为准</p>
      <收益图表 ref={incomeRef} />
      <结果统计 visible={技能统计弹窗} onClose={() => 打开技能统计弹窗(false)} />
    </div>
  ) : null
}

export default forwardRef(计算结果)
