/**
 * 收益展示
 */

import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import * as G2 from '@antv/g2'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { message, Radio, Tooltip } from 'antd'
// import { IncomeFumo, IncomeDataDTO, 单点收益列表 } from '@/数据/收益计算'
import 获取当前数据 from '@/数据/数据工具/获取当前数据'
import { 秒伤计算 } from '@/计算模块/计算函数'
import { 收益增益属性计算, 获取单点属性收益列表, 获取当前各属性最大附魔 } from './工具'
import './index.css'

const { 系统配置 } = 获取当前数据()

const 附魔收益列表 = 获取当前各属性最大附魔()
const 单点收益列表 = 获取单点属性收益列表()

const checkTypeList = [
  { label: '附魔', list: 附魔收益列表 },
  { label: '单点', list: 单点收益列表 },
]

function 收益图表(_, ref) {
  const 增益面板显示状态 = useAppSelector((state) => state?.system?.增益面板显示状态)
  const 装备信息 = useAppSelector((state) => state?.data?.装备信息)

  const [chartData, setChartData] = useState<any>()
  const [currentIncomeType, setCunrrentIncomeType] = useState<string>('附魔')

  const currentIncomeList = useRef<any>(附魔收益列表)

  const limitRef: any = useRef<any>()

  const dispatch = useAppDispatch()

  // 计算单点增益
  const 计算增加后收益 = (data) => {
    const { 秒伤: 旧秒伤 } = dispatch(
      秒伤计算({
        是否郭氏计算: false,
      })
    )

    const 增益后装备基础数据 = 收益增益属性计算(data?.收益, data?.值, 装备信息?.装备基础属性)

    const { 秒伤: 新秒伤 } = dispatch(
      秒伤计算({
        是否郭氏计算: false,
        更新装备信息: {
          ...装备信息,
          装备基础属性: 增益后装备基础数据,
        },
      })
    )

    return Number(新秒伤 - 旧秒伤)
  }

  const getDataSource = () => {
    const list = currentIncomeList?.current || 附魔收益列表

    const sortList = list.map((item) => {
      const 收益 = 计算增加后收益(item)
      const 收益结果 = Number(收益.toFixed(3))
      return {
        key: `${item.收益}${item?.值 !== 1 ? item?.值 : ''}`,
        收益: 收益结果,
      }
    })

    sortList.sort((a, b) => b.收益 - a.收益)

    return sortList
  }

  useImperativeHandle(ref, () => ({
    initChart: initChart,
  }))

  const handleChangeType = (e) => {
    const list = checkTypeList?.find((item) => item.label === e)?.list
    if (list) {
      currentIncomeList.current = list
      setCunrrentIncomeType(e)
      initChart()
    } else {
      message.error('出现异常，请联系开发者')
    }
  }

  useEffect(() => {
    limitRef.current = false
    return () => {
      limitRef.current = false
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      chartData && chartData.forceFit()
    }, 200)
  }, [增益面板显示状态])

  const initChart = () => {
    if (limitRef.current) {
      return
    }
    limitRef.current = true
    const chart = chartData
      ? chartData
      : new G2.Chart({
          container: 'income-chart',
          autoFit: true,
          renderer: 'canvas',
          padding: [48, 0, 50, 32],
        })
    chart.axis('收益', {
      grid: {
        line: {
          style: {
            opacity: 0.3,
          },
        },
      },
      label: {
        style: {
          textAlign: 'center', // 文本对齐方向，可取值为： start middle end
          fill: '#ffffff', // 文本的颜色
          fontSize: 12, // 文本大小
        },
        offset: 16,
      },
    })
    chart.axis('key', {
      label: {
        style: {
          textAlign: 'center', // 文本对齐方向，可取值为： start middle end
          fill: '#ffffff', // 文本的颜色
          fontSize: 16, // 文本大小
        },
      },
    })
    chart
      .interval()
      .position('key*收益')
      .color(系统配置?.收益柱形图颜色 || 系统配置?.主题色)
      .label('收益', {
        offset: 16,
        style: {
          fill: '#ffffff',
          fontSize: 16,
        },
      })
    if (!chartData) {
      setChartData(chart)
    }
    const dataSource = getDataSource()
    chart.data(dataSource)
    chart.render()
    setTimeout(() => {
      limitRef.current = false
    }, 10)
  }

  return (
    <>
      <div>
        <div className={'income-chart'} id='income-chart' />
        <div className='income-type-wrapper'>
          <div className={'income-chart-title'}>
            属性收益
            <Tooltip
              overlayClassName={'income-chart-tooltip'}
              title={
                <div>
                  <p>X轴：</p>
                  <p>- 在现有装备基础上额外增加对应属性</p>
                  <p>Y轴：</p>
                  <p>- 增加对应属性后秒伤和原装备秒伤的差值</p>
                  <p>由于【郭氏计算】增益不线性</p>
                  <p>收益部分采用【非郭氏计算】仅供参考</p>
                  <p>按收益高低从左到右排序</p>
                </div>
              }
            >
              <QuestionCircleOutlined />
            </Tooltip>
          </div>
          <Radio.Group
            className='income-type-select-radio'
            value={currentIncomeType}
            onChange={(e) => handleChangeType(e?.target.value)}
          >
            {checkTypeList.map((item) => {
              return (
                <Radio.Button key={item.label} value={item.label}>
                  {item.label}
                </Radio.Button>
              )
            })}
          </Radio.Group>
        </div>
      </div>
    </>
  )
}

export default forwardRef(收益图表)
