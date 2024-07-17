import { Modal } from 'antd'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { 更新背景图片显示状态 } from '@/store/system'
import 数据迁移 from './数据迁移'

import './index.css'

function 页面右下角工具() {
  const 背景图片显示状态 = useAppSelector((state) => state?.system?.背景图片显示状态)
  const dispatch = useAppDispatch()
  const [数据迁移弹窗, 设置数据迁移弹窗] = useState<boolean>(false)

  const clearCache = () => {
    Modal.confirm({
      title:
        '⚠️警告，清除缓存将清空你的配装、增益等设置。清除后需重新配装。同时会清除在线链接其他门派的相同信息，请谨慎使用。',
      content: '仅作为计算数据异常、页面异常时使用。',
      onOk: () => {
        localStorage.clear()
        window?.location?.reload()
      },
    })
  }

  const handleChangeBackground = () => {
    dispatch(更新背景图片显示状态(!背景图片显示状态))
  }

  return (
    <div className='cache-wrapper'>
      <a
        className='cache-btn'
        href='https://www.jx3box.com/bps/79885'
        target='_blank'
        rel='noreferrer'
      >
        问题反馈
      </a>
      <span className='cache-btn' onClick={() => 设置数据迁移弹窗(true)}>
        数据迁移
      </span>
      <span className='cache-btn' onClick={handleChangeBackground}>
        {+(背景图片显示状态 || '') ? '关闭背景' : '开启背景'}
      </span>
      <span className='cache-btn' onClick={() => clearCache()}>
        清除缓存
      </span>
      <数据迁移 open={数据迁移弹窗} onCancel={() => 设置数据迁移弹窗(false)} />
    </div>
  )
}

export default 页面右下角工具
