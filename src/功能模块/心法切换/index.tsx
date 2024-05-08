import React from 'react'
import 全部心法 from '@/心法模块/心法'
import 获取当前数据 from '@/数据/数据工具/获取当前数据'
import { Dropdown, Menu } from 'antd'
import './index.css'

const 当前数据 = 获取当前数据()

function 心法切换() {
  const 当前Logo = 当前数据?.系统配置?.心法图标
  const 切换至对应心法 = (目标心法) => {
    window.location.href = `${location.origin}/?心法=${目标心法}`
  }
  const menu = (
    <Menu
      items={Object.keys(全部心法).map((心法) => {
        const 当前心法数据 = 全部心法[心法]
        return {
          key: 心法,
          label: (
            <div className={'school-switch-list-item'}>
              <img className='school-switch-list-img' src={当前心法数据?.系统配置?.心法图标} />
              {当前心法数据?.名称}
            </div>
          ),
          onClick: () => 切换至对应心法(心法),
        }
      })}
    />
  )

  return (
    <div className='school-switch'>
      <Dropdown overlay={menu}>
        <img src={当前Logo} className='school-switch-img' />
      </Dropdown>
    </div>
  )
}

export default 心法切换
