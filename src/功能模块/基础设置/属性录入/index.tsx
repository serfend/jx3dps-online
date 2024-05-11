import { Button } from 'antd'
import React, { useState } from 'react'
import 配装器 from './配装器'

import './index.css'

function 属性录入() {
  const [配装器弹窗显示状态, 切换配装器弹窗显示状态] = useState<boolean>(false)

  return (
    <div className={'character-set'}>
      <Button
        onClick={() => {
          切换配装器弹窗显示状态(true)
        }}
      >
        配装器
      </Button>
      <配装器
        open={配装器弹窗显示状态}
        onCancel={() => {
          切换配装器弹窗显示状态(false)
        }}
      />
    </div>
  )
}

export default 属性录入
