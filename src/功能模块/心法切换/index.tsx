import React from 'react'
import 全部心法 from '@/心法模块/心法'
import 获取当前数据 from '@/数据/数据工具/获取当前数据'
import { Dropdown, Menu } from 'antd'
import 所有心法数据 from '@/心法模块/心法'

import './index.css'

const 当前数据 = 获取当前数据()

function 心法切换() {
  const 当前Logo = 当前数据?.系统配置?.心法图标

  const 切换至对应心法 = (目标心法) => {
    const 目标心法简写 = 所有心法数据?.[目标心法]?.简写
    const allPathList = location.href?.split('/')
    // allPathList[allPathList.length - 1] = `?心法=${目标心法}`
    if (目标心法简写) {
      allPathList[allPathList.length - 1] = `?xf=${目标心法简写}`
    } else {
      allPathList[allPathList.length - 1] = `?心法=${目标心法}`
    }
    const newPath = allPathList.join('/')
    if (window) {
      window.location.href = newPath
    }
  }
  const menu = (
    <Menu
      items={Object.keys(全部心法).map((心法) => {
        const 当前心法数据 = 全部心法[心法]
        const 是当前心法 = 当前心法数据.名称 === 当前数据.名称
        return {
          key: 心法,
          label: (
            <div className={`school-switch-list-item`}>
              <img className='school-switch-list-img' src={当前心法数据?.系统配置?.心法图标} />
              <span className={是当前心法 ? 'school-switch-list-active' : ''}>
                {当前心法数据?.名称}
              </span>
            </div>
          ),
          onClick: () => 切换至对应心法(心法),
          className: 是当前心法 ? 'school-switch-list-item-active' : '',
        }
      })}
    />
  )

  return (
    <div className='school-switch'>
      <Dropdown overlay={menu}>
        <img src={当前Logo} className='school-switch-img' />
      </Dropdown>
      {当前数据?.心法所属端 === '无界' ? <div className='school-switch-wujie-bg' /> : null}
    </div>
  )
}

export default 心法切换
