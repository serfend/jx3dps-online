import { Modal } from 'antd'
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { 更新背景图片显示状态 } from '@/store/system'
import './index.css'

function 页面右下角工具() {
  const 背景图片显示状态 = useAppSelector((state) => state?.system?.背景图片显示状态)
  const dispatch = useAppDispatch()

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
      <span className={'cache-btn'}>特别感谢「可乐」提供的服务器支持</span>
      <span className='cache-btn' onClick={handleChangeBackground}>
        {+(背景图片显示状态 || '') ? '关闭背景' : '开启背景'}
      </span>
      <span className='cache-btn' onClick={() => clearCache()}>
        清除缓存
      </span>
    </div>
  )
}

export default 页面右下角工具
