import React from 'react'
import { useAppSelector } from '@/hooks'
import 获取当前数据 from '@/数据/数据工具/获取当前数据'

import { 默认系统渐变色 } from './default'
import './index.css'
import { hexToRgbaToDark } from '@/工具函数/help'

const 系统配置 = 获取当前数据()?.系统配置 || {}

console.log('获取当前数据()', 获取当前数据())

const 背景图 = 系统配置.背景图 || []
const 背景色渐变 = 系统配置.背景色渐变 || 默认系统渐变色(系统配置.主题色)

interface LayoutProps {
  children: any
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props
  const 关闭背景图 = useAppSelector((state) => state?.basic?.关闭背景图)

  // 丛长度为N的数组中随机取一个值
  function getRandomFromArray(arr, n) {
    const randomIndex = Math.floor(Math.random() * n)
    return arr[randomIndex]
  }

  return (
    <div className='layout'>
      <div
        className='layout-wrapper'
        style={{
          backgroundImage: 背景色渐变,
        }}
      >
        {children}
      </div>
      {!关闭背景图 ? (
        <img className='layout-bg' src={getRandomFromArray(背景图, 背景图?.length)} alt='' />
      ) : (
        <div
          className={'layout-bg-color'}
          style={{ backgroundColor: `${hexToRgbaToDark(系统配置.主题色, '1', 225)}` }}
        />
      )}
    </div>
  )
}

export default Layout
