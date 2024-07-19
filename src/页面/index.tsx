import React, { useEffect } from 'react'
import 基础设置 from '@/功能模块/基础设置'
import 系统工具 from '@/功能模块/系统工具'
import 心法切换 from '@/功能模块/心法切换'
import 系统说明 from '@/功能模块/系统说明'
import 计算结果 from '@/功能模块/计算结果'
import 新手引导 from '@/功能模块/新手引导'

import { 秒伤计算 } from '@/计算模块/计算函数'
import { useAppDispatch } from '@/hooks'

import './index.css'

function 主页面() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(秒伤计算({ 是否更新显示计算结果: true }))
  }, [])

  return (
    <>
      <系统说明 />
      <基础设置 />
      <计算结果 />
      <系统工具 />
      <心法切换 />
      <新手引导 />
    </>
  )
}

export default 主页面
