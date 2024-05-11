import { SelectProps, Select } from 'antd'
import React, { useMemo } from 'react'
import { 装备属性信息模型 } from '@/@types/装备'
import './index.css'

interface 精炼等级选择入参 extends SelectProps {
  装备数据: 装备属性信息模型
}

function 精炼等级选择(props: 精炼等级选择入参) {
  const { 装备数据, ...rest } = props

  const list = useMemo(() => {
    return Array.from({ length: 装备数据?.最大精炼等级 || 0 }, (v, i) => i + 1)
  }, [装备数据?.最大精炼等级])

  return (
    <Select className='jinglian-select' {...rest}>
      {list.map((item) => {
        return <Select.Option key={item}>{item}</Select.Option>
      })}
    </Select>
  )
}

export default 精炼等级选择
