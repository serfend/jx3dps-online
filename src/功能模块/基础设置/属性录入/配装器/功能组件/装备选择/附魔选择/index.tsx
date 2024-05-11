import { Select, SelectProps } from 'antd'
import React from 'react'
import { 附魔数据类型 } from '@/@types/附魔'
import './index.css'

interface 附魔选择入参 extends SelectProps {
  list: 附魔数据类型[]
}

function 附魔选择(props: 附魔选择入参) {
  const { list, ...rest } = props

  return (
    <Select placeholder='选择附魔' allowClear className='fumo-select' {...rest}>
      {list.map((item) => {
        return <Select.Option key={item.附魔名称}>{item.附魔名称}</Select.Option>
      })}
    </Select>
  )
}

export default 附魔选择
