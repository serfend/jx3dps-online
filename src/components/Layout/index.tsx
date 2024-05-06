import React from 'react'
import { useAppSelector } from '@/hooks'
import { 获取心法数据 } from '@/心法模块'
import './index.css'

const 背景图 = 获取心法数据()?.系统配置?.背景图 || []

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
      <div className='layout-wrapper'>{children}</div>
      {!关闭背景图 ? (
        <img className='layout-bg' src={getRandomFromArray(背景图, 背景图?.length)} alt='' />
      ) : (
        <div className={'layout-bg-color'} />
      )}
    </div>
  )
}

export default Layout
