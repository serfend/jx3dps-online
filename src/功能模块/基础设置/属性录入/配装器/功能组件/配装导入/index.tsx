import { Badge, Modal, Tabs } from 'antd'
import React, { useState } from 'react'

import Jx3BoxImport from './Jx3BoxImport'
import AccountImport from './AccountImport'
import './index.css'

function 魔盒配装方案导入({ visible, onClose, onOk }) {
  const [active, setActive] = useState('account')
  const beforeClose = () => {
    onClose()
  }

  const beforeOk = (e) => {
    onOk(e)
    beforeClose()
  }

  const items = [
    {
      label: (
        <Badge count='New' size='small' offset={[0, -6]}>
          <span>角色导入</span>
        </Badge>
      ),
      key: 'account',
    },
    { label: '魔盒导入', key: 'jx3box' },
  ]

  return (
    <Modal
      className={'pz-daoru-modal'}
      title={
        <div>
          <Tabs className={'pz-daoru-tabs'} items={items} onChange={setActive} />
        </div>
      }
      open={visible}
      centered
      onCancel={() => beforeClose()}
      footer={null}
      width={600}
    >
      {active === 'jx3box' ? <Jx3BoxImport onOk={beforeOk} /> : <AccountImport onOk={beforeOk} />}
    </Modal>
  )
}

export default 魔盒配装方案导入
