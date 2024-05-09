// 默认不展示在页面上的，但是鼠标移动上去可以点击
import React, { useState } from 'react'
import DeveloperModal from './开发者工具'
import './index.css'

function 页面隐藏工具() {
  const [visible, setVisible] = useState(false)
  // const [skillVisible, setSkillVisible] = useState(false)

  return (
    <div className='tools-wrapper'>
      <span className='tools-btn' onClick={() => setVisible(true)}>
        开发者工具
      </span>
      {/* <span className='tools-btn' onClick={() => setSkillVisible(true)}>
        技能详情
      </span> */}
      <DeveloperModal visible={visible} onClose={() => setVisible(false)} />
      {/* 技能详情 */}
      {/* <SkillDamageTable visible={skillVisible} onClose={() => setSkillVisible(false)} /> */}
    </div>
  )
}

export default 页面隐藏工具
