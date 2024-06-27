import { Modal, Tabs } from 'antd'
import React from 'react'
import JclSkillDaoru from './JCL技能序列导入'
import WucaishiDaoru from './五彩石导入'
import EquipmentImport from './装备导入'
import JCL战斗记录解析 from './JCL战斗记录解析'
import 奇穴导入 from './奇穴导入'
import './index.css'

function DeveloperModal({ visible, onClose }) {
  const items = [
    { label: '装备导入', key: '装备导入', children: <EquipmentImport /> },
    { label: 'JCL战斗记录解析', key: 'JCL战斗记录解析', children: <JCL战斗记录解析 /> },
    { label: '奇穴导入', key: '奇穴导入', children: <奇穴导入 /> },
    { label: '五彩石导入', key: '五彩石导入', children: <WucaishiDaoru /> },
    { label: 'JCL技能序列导入', key: 'JCL技能序列导入', children: <JclSkillDaoru /> },
  ]
  return (
    <Modal
      className='tools-modal'
      title={'开发者工具'}
      centered
      width={800}
      open={visible}
      onCancel={() => onClose(false)}
      footer={null}
      destroyOnClose
    >
      <Tabs items={items} />
    </Modal>
  )
}

export default DeveloperModal
