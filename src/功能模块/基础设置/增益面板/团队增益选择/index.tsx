import { useAppSelector } from '@/hooks'
import { Button, Space } from 'antd'
import React, { useMemo, useState } from 'react'
import { 团队增益数据类型, 增益选项数据类型 } from '@/@types/团队增益'
import 获取当前数据 from '@/数据/数据工具/获取当前数据'
import 团队增益设置弹窗 from './团队增益设置弹窗'
import 团队增益图标 from './团队增益图标'
import './index.css'

const { 团队增益 = [] } = 获取当前数据()

function 团队增益选择({ 保存数据并计算 }) {
  const 增益数据 = useAppSelector((state) => state.data.增益数据)

  const [visible, setVisible] = useState<boolean>(false)

  const onChangeZengyi = (e: boolean | null, 增益: 团队增益数据类型, 层数?, 覆盖率?) => {
    const exist = 增益数据?.团队增益?.some((item) => item.增益名称 === 增益?.增益名称)
    const newData: 增益选项数据类型 = {
      ...增益数据,
      团队增益: [...(增益数据?.团队增益 || [])],
    }
    if (exist) {
      newData.团队增益 = 增益数据?.团队增益?.map((item) => {
        if (item.增益名称 === 增益?.增益名称) {
          return {
            ...item,
            启用: e === null ? item?.启用 : e,
            层数: 层数 || item?.层数,
            覆盖率: 覆盖率 || item?.覆盖率,
          }
        } else {
          return {
            ...item,
          }
        }
      })
    } else {
      newData.团队增益 = [
        ...newData.团队增益,
        {
          增益名称: 增益?.增益名称,
          启用: e === null ? true : e,
          层数: 层数 || 增益?.层数 || 1,
          覆盖率: 覆盖率 || 增益?.覆盖率 || 100,
        },
      ]
    }

    保存数据并计算(newData)
  }

  const 快捷设置团队增益 = (data) => {
    const newData: 增益选项数据类型 = {
      ...增益数据,
      团队增益: [...(data || [])],
    }
    保存数据并计算(newData)
  }

  const 显示团队增益 = useMemo(() => {
    return (
      团队增益
        .filter((item) => {
          return (
            (增益数据?.团队增益 || []).find((a) => item?.增益名称 === a?.增益名称)?.启用 || false
          )
        })
        .map((item) => {
          const 当前数据 = (增益数据?.团队增益 || []).find((a) => item?.增益名称 === a?.增益名称)
          return {
            ...item,
            当前数据: 当前数据,
          }
        }) || []
    )
  }, [团队增益, 增益数据])

  return (
    <div className='tuandui-zengyi'>
      <div className='tuandui-zengyi-header'>
        <h1 className='tuandui-title'>团队增益</h1>
        <Button
          className={'tuandui-setting-btn'}
          danger
          size='small'
          onClick={() => setVisible(true)}
        >
          设置增益
        </Button>
      </div>
      <div className='tuandui-list'>
        {显示团队增益?.length ? (
          <Space size={[12, 12]} wrap>
            {显示团队增益.map((item) => {
              return <团队增益图标 data={item} key={item?.增益名称} 当前数据={item?.当前数据} />
            })}
          </Space>
        ) : (
          <p className={'tuandui-empty'}>当前无团队增益</p>
        )}
      </div>
      <团队增益设置弹窗
        open={visible}
        onCancel={() => setVisible(false)}
        onChangeZengyi={onChangeZengyi}
        快捷设置团队增益={快捷设置团队增益}
      />
    </div>
  )
}

export default 团队增益选择
