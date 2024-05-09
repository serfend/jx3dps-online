import React from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { Button } from 'antd'
import { 更新增益面板显示状态 } from '@/store/system'
import 保存方案 from './保存方案'

function 基础设置标题() {
  const 增益面板显示状态 = useAppSelector((state) => state?.system?.增益面板显示状态)
  const dispatch = useAppDispatch()

  const 切换增益面板显示状态 = () => {
    dispatch(更新增益面板显示状态(!增益面板显示状态))
  }

  return (
    <h1 className={'common-title'}>
      基础设置
      <div>
        <保存方案 />
        <Button
          type='text'
          size='small'
          className={'common-title-zengyi'}
          onClick={() => 切换增益面板显示状态()}
        >
          增益详情
        </Button>
      </div>
    </h1>
  )
}

export default 基础设置标题
