/**
 * 当前只内置了部分心法的循环模拟
 */
import React from 'react'
import 山海心诀循环模拟 from './心法循环模拟/山海心诀'
import 获取当前数据 from '@/数据/数据工具/获取当前数据'
import { Button, Tooltip } from 'antd'

const 循环模拟枚举 = {
  山海心诀: <山海心诀循环模拟 />,
}

const { 名称 } = 获取当前数据()

function 循环模拟() {
  return 循环模拟枚举?.[名称] ? (
    循环模拟枚举?.[名称]
  ) : (
    <Tooltip title='该心法暂不支持循环模拟功能'>
      <Button danger size='small' disabled className={'cycle-disabled-btn'}>
        循环模拟
      </Button>
    </Tooltip>
  )
}

export default 循环模拟
