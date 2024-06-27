import React, { useState } from 'react'
import { Button, Checkbox, Col, Drawer, Row, message } from 'antd'
import { 技能秘籍信息 } from '@/@types/秘籍'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { 更新当前秘籍信息 } from '@/store/data'
import { 触发秒伤计算 } from '@/计算模块/计算函数'
import { 获取当前职业的所有秘籍信息 } from './utils'
import 获取当前数据 from '@/数据/数据工具/获取当前数据'
import './index.css'

const { 心法所属端 } = 获取当前数据()

const 当前职业的所有秘籍信息 = 获取当前职业的所有秘籍信息()

function 秘籍选择() {
  const [visible, setVisible] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const 当前秘籍信息 = useAppSelector((state) => state?.data?.当前秘籍信息)

  const 选择秘籍 = (新秘籍列表: string[], 技能信息: 技能秘籍信息) => {
    if (新秘籍列表?.length > 4) {
      message.error('一个技能最多选择四个秘籍')
      return
    }
    const newData = {
      ...当前秘籍信息,
      [技能信息?.技能名称]: 新秘籍列表,
    }
    dispatch(更新当前秘籍信息(newData))
    dispatch(触发秒伤计算({ 是否更新显示计算结果: true }))
  }

  return (
    <>
      <Button
        size='small'
        className='miji-set-button'
        onClick={() => setVisible(true)}
        disabled={心法所属端 === '无界'}
      >
        秘籍设置
      </Button>
      <Drawer
        title={'秘籍设置'}
        width={348 + 36}
        open={visible}
        mask={false}
        placement='left'
        onClose={() => {
          setVisible(false)
        }}
      >
        {当前职业的所有秘籍信息.map((技能) => {
          return (
            <div className={'miji-selected-item'} key={技能.技能名称}>
              <h1 className={'miji-skill-title'}>{技能.技能名称}</h1>
              <Checkbox.Group
                value={当前秘籍信息?.[技能?.技能名称] || []}
                onChange={(新秘籍列表) => 选择秘籍(新秘籍列表 as string[], 技能)}
              >
                <Row>
                  {技能.技能秘籍列表.map((秘籍) => {
                    return (
                      <Col key={`${技能?.技能名称}${秘籍}`} span={8}>
                        <Checkbox value={秘籍}>{秘籍}</Checkbox>
                      </Col>
                    )
                  })}
                </Row>
              </Checkbox.Group>
            </div>
          )
        })}
      </Drawer>
    </>
  )
}

export default 秘籍选择
