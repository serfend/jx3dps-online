import { Badge, Button } from 'antd'
import React, { useState } from 'react'
import 识别装备对比弹窗 from './识别装备对比'
import 配装器 from './配装器'

import './index.css'

function 属性录入() {
  const [配装器弹窗显示状态, 切换配装器弹窗显示状态] = useState<boolean>(false)
  const [识别装备对比, 设置识别装备对比] = useState<boolean>(false)

  return (
    <div className={'character-set'}>
      <Button
        className={'character-set-btn'}
        onClick={() => {
          切换配装器弹窗显示状态(true)
        }}
        danger
      >
        配装器
      </Button>
      <Badge count='New'>
        <Button
          className={'character-set-in-btn'}
          onClick={() => {
            设置识别装备对比(true)
          }}
        >
          识别装备对比
        </Button>
      </Badge>
      <配装器
        open={配装器弹窗显示状态}
        onCancel={() => {
          切换配装器弹窗显示状态(false)
        }}
      />
      <识别装备对比弹窗 open={识别装备对比} onCancel={() => 设置识别装备对比(false)} />
    </div>
  )
}

export default 属性录入
