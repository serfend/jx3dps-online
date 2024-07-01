import React, { useState } from 'react'
import './index.css'
import Ocr识别装备对比 from './OCR识别装备对比'

function 页面右上角工具() {
  const [识别装备对比, 设置识别装备对比] = useState<boolean>(false)

  return (
    <div className='right-top-tools'>
      <span className='cache-btn' onClick={() => 设置识别装备对比(true)}>
        识别装备对比
      </span>
      <Ocr识别装备对比 open={识别装备对比} onCancel={() => 设置识别装备对比(false)} />
    </div>
  )
}

export default 页面右上角工具
