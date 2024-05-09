import React from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { Select } from 'antd'
import { 更新当前输出计算目标名称 } from '@/store/data'
import { 目标集合 } from '@/数据/常量'

function 目标选择() {
  const dispatch = useAppDispatch()
  const 当前输出计算目标名称 = useAppSelector((state) => state?.data?.当前输出计算目标名称)

  const 切换目标 = (v) => {
    dispatch(更新当前输出计算目标名称(v))
  }

  return (
    <div className='common-item'>
      <h1 className='common-label'>目标</h1>
      <div className='common-content'>
        <Select
          className='current-boss'
          value={当前输出计算目标名称}
          onChange={(v) => {
            切换目标(v)
          }}
        >
          {目标集合.map((item) => {
            return (
              <Select.Option value={item?.名称} key={item.名称}>
                {item.名称}
              </Select.Option>
            )
          })}
        </Select>
      </div>
    </div>
  )
}

export default 目标选择
