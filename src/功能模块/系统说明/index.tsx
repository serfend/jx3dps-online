import React from 'react'
import 当前版本 from './当前版本'
import 获取当前数据 from '@/数据/数据工具/获取当前数据'
import './index.css'

const { 名称 } = 获取当前数据()

function 顶部说明() {
  return (
    <>
      <h1 className={'title-tip'}>
        <span>{名称}-计算器</span>
        <span>感谢「可乐」提供的服务器资源</span>
      </h1>
      <当前版本 />
    </>
  )
}

export default 顶部说明
