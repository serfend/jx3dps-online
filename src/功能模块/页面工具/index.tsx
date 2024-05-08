import { Modal } from 'antd'
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { 更新当前关闭背景图片 } from '@/store/basicReducer'
import 获取当前数据 from '@/数据/数据工具/获取当前数据'
import './index.css'

const 缓存映射 = 获取当前数据()?.缓存映射

function PageTools() {
  const 关闭背景图 = useAppSelector((state) => state?.basic?.关闭背景图)
  const dispatch = useAppDispatch()

  const clearCache = () => {
    Modal.confirm({
      title:
        '⚠️警告，清除缓存将清空你的配装、增益等设置。清除后需重新配装。同时会清除在线链接其他门派的相同信息，请谨慎使用。',
      content: '仅作为计算数据异常、页面异常时使用。',
      onOk: () => {
        localStorage.clear()
        window.location.reload()
      },
    })
  }

  const handleChangeBackground = () => {
    const newData = 关闭背景图 ? '0' : '1'
    localStorage.setItem(缓存映射.关闭背景图, newData)
    dispatch(更新当前关闭背景图片(!关闭背景图))
  }

  return (
    <div className='cache-wrapper'>
      <span className='cache-btn' onClick={handleChangeBackground}>
        {+(关闭背景图 || '') ? '开启背景' : '关闭背景'}
      </span>
      <span className='cache-btn' onClick={() => clearCache()}>
        清除缓存
      </span>
    </div>
  )
}

export default PageTools
