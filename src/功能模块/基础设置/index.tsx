import React from 'react'
import { useAppSelector } from '@/hooks'

import 基础设置标题 from './基础设置标题'
import 公用设置 from './公用设置'
import './index.css'

function 基础设置() {
  const 增益面板显示状态 = useAppSelector((state) => state?.system?.增益面板显示状态)

  return (
    <div className={'basic-set'}>
      <div className={'basic-set-info'}>
        <基础设置标题 />
        {/* 公用设置/目标/循环/输出时间 */}
        <公用设置 />
      </div>
      <div className={`basic-set-zengyi ${增益面板显示状态 ? 'basic-set-zengyi-visible' : null}`} />
    </div>
  )
}

export default 基础设置
