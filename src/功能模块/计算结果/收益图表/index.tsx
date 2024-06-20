/**
 * 收益展示
 */

import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import * as G2 from '@antv/g2'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { message, Popover, Radio } from 'antd'
import 获取当前数据 from '@/数据/数据工具/获取当前数据'
import { 秒伤计算 } from '@/计算模块/计算函数'
import { 按数字生成数组 } from '@/工具函数/help'
import {
  找到最大最小值,
  收益增益属性计算,
  获取单点属性收益列表,
  获取当前各属性最大附魔,
  获取当前比例,
} from './工具'
import './index.css'

const { 系统配置 } = 获取当前数据()

const 附魔收益列表 = 获取当前各属性最大附魔()
const 单点收益列表 = 获取单点属性收益列表()

const 百分比数组 = 按数字生成数组(101)

const checkTypeList = [
  {
    label: '附魔',
    list: 附魔收益列表,
    tip: (
      <div>
        <p>X轴：在现有装备基础上额外增加本赛季紫色附魔的对应属性</p>
        <p>Y轴：增加对应属性后秒伤和原装备秒伤的差值</p>
        <p>由于【郭氏计算】增益不线性</p>
        <p>收益部分采用【非郭氏计算】仅供参考</p>
        <p>按收益高低从左到右排序</p>
      </div>
    ),
  },
  {
    label: '单点',
    list: 单点收益列表,
    tip: (
      <div>
        <p>X轴：在现有装备基础上额外增加1点对应属性</p>
        <p>Y轴：增加对应属性后秒伤和原装备秒伤的差值</p>
        <p>由于【郭氏计算】增益不线性</p>
        <p>收益部分采用【非郭氏计算】仅供参考</p>
        <p>按收益高低从左到右排序</p>
      </div>
    ),
  },
  {
    label: '会破比',
    list: 百分比数组.map((item) => ({
      label: `${item - 1}%`,
      value: item - 1,
    })),
    tip: (
      <div>
        <p>
          根据角色目前的<b style={{ color: 系统配置?.主题色 }}> 会心/破防 </b>
          属性总和，按比例重新分配后的收益曲线
        </p>
        <p>
          X轴： <b style={{ color: 系统配置?.主题色 }}> 会心 </b> 在 会心破防属性总和 的重新分布占比
        </p>
        <p>比例和结果秒伤为近似值，仅参考作为配装的属性收益趋向参考</p>
        <p style={{ color: 'red' }}>会计算一百次，电脑性能差的慎用</p>
      </div>
    ),
  },
  {
    label: '招无比',
    list: 百分比数组.map((item) => ({
      label: `${item - 1}%`,
      value: item - 1,
    })),
    tip: (
      <div>
        <p>
          根据角色目前的<b style={{ color: 系统配置?.主题色 }}> 破招/无双 </b>
          属性总和，按比例重新分配后的收益曲线
        </p>
        <p>
          X轴： <b style={{ color: 系统配置?.主题色 }}> 破招 </b> 在 破招无双属性总和 的重新分布占比
        </p>
        <p>比例和结果秒伤为近似值，仅参考作为配装的属性收益趋向参考</p>
        <p style={{ color: 'red' }}>会计算一百次，电脑性能差的慎用</p>
      </div>
    ),
  },
]

function 收益图表(_, ref) {
  const 增益面板显示状态 = useAppSelector((state) => state?.system?.增益面板显示状态)
  const 装备信息 = useAppSelector((state) => state?.data?.装备信息)

  const [chartData, setChartData] = useState<any>()
  const [currentIncomeType, setCurrentIncomeType] = useState<string>('附魔')

  const currentIncomeList = useRef<any>(附魔收益列表)

  const limitRef: any = useRef<any>()

  const dispatch = useAppDispatch()

  // 计算单点增益
  const 计算增加后收益 = (装备基础属性) => {
    const { 秒伤: 新秒伤 } = dispatch(
      秒伤计算({
        是否郭氏计算: false,
        更新装备信息: {
          ...装备信息,
          装备基础属性: {
            ...装备信息?.装备基础属性,
            ...装备基础属性,
          },
        },
      })
    )
    return 新秒伤
  }

  const getDataSource = (type) => {
    if (['附魔', '单点'].includes(type) || !type) {
      const list = currentIncomeList?.current || 附魔收益列表
      const { 秒伤: 旧秒伤 } = dispatch(
        秒伤计算({
          是否郭氏计算: false,
        })
      )
      const sortList = list.map((item) => {
        const 增益后装备基础数据 = 收益增益属性计算(item?.收益, item?.值, 装备信息?.装备基础属性)
        const 新秒伤 = 计算增加后收益(增益后装备基础数据)
        const 收益 = Number(新秒伤 - 旧秒伤)
        // const 收益结果 = 增益面板显示状态 ? Number(收益.toFixed(3)) : Number(收益.toFixed(1))
        const 收益结果 = Number(收益.toFixed(1))
        return {
          // key: `${item.收益}${item?.值 !== 1 ? item?.值 : ''}`,
          key: `${item.收益}`,
          收益: 收益结果,
        }
      })
      sortList.sort((a, b) => b.收益 - a.收益)
      return sortList
    } else if (type === '会破比') {
      const list = currentIncomeList?.current || []

      const 当前会心破防总和 =
        (装备信息?.装备基础属性?.破防等级 || 0) + (装备信息?.装备基础属性?.会心等级 || 0)

      const res = list.map((item) => {
        const 计算会心等级 = (item?.value / 100) * 当前会心破防总和
        const 计算破防等级 = 当前会心破防总和 - 计算会心等级

        const 新秒伤 = 计算增加后收益({
          ...装备信息?.装备基础属性,
          会心等级: 计算会心等级,
          破防等级: 计算破防等级,
        })

        return {
          比例: item.label,
          收益: Number(新秒伤.toFixed(3)),
        }
      })
      return res
    } else if (type === '招无比') {
      const list = currentIncomeList?.current || []

      const 当前破招无双总和 =
        (装备信息?.装备基础属性?.破招值 || 0) + (装备信息?.装备基础属性?.无双等级 || 0)

      const res = list.map((item) => {
        const 计算破招值 = (item?.value / 100) * 当前破招无双总和
        const 计算无双等级 = 当前破招无双总和 - 计算破招值

        const 新秒伤 = 计算增加后收益({
          ...装备信息?.装备基础属性,
          破招值: 计算破招值,
          无双等级: 计算无双等级,
        })

        return {
          比例: item.label,
          收益: Number(新秒伤.toFixed(3)),
        }
      })
      return res
    } else {
      return []
    }
  }

  useImperativeHandle(ref, () => ({
    initChart: initChart,
  }))

  const handleChangeType = (e) => {
    const list = checkTypeList?.find((item) => item.label === e)?.list
    if (list) {
      currentIncomeList.current = list
      setCurrentIncomeType(e)
      initChart(e)
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

  const initChart = (type?) => {
    const currentType = type || currentIncomeType

    const 计算图表类型 =
      ['附魔', '单点'].includes(currentType) || !currentType ? '柱状图' : '折线图'
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

    if (!chartData) {
      setChartData(chart)
    }

    const dataSource = getDataSource(currentType)

    chart.clear()

    if (计算图表类型 === '柱状图') {
      柱状图渲染(chart)
    } else {
      const 当前比例 = 获取当前比例(currentType, 装备信息?.装备基础属性)
      const { max } = 找到最大最小值(dataSource)
      const 当前收益 = dataSource?.find((item) => item.比例 === `${当前比例}%`)?.收益
      折线图渲染(chart, max, 当前比例, 当前收益)
    }

    chart.data(dataSource)
    chart.render()

    setTimeout(() => {
      limitRef.current = false
    }, 10)
  }

  const 柱状图渲染 = (chart) => {
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
  }

  const 折线图渲染 = (chart, max, 当前比例, 当前收益) => {
    chart.axis('收益', false)

    chart
      .line()
      .position('比例*收益')
      .size(3)
      .color(系统配置?.收益柱形图颜色 || 系统配置?.主题色)

    if (max) {
      chart.annotation().dataMarker({
        top: true,
        position: max,
        text: {
          content: '最佳比例：' + max.比例,
          style: { fill: '#FFF', fontSize: 16, fontWeight: 500 },
        },
        line: {
          length: 100,
        },
      })
    }

    chart.annotation().dataMarker({
      position: [当前比例, 当前收益],
      text: {
        content: '当前比例：' + `${当前比例}%`,
        style: { fill: '#FFF', fontSize: 16, fontWeight: 500 },
      },
      line: {
        length: 50,
      },
    })
  }

  return (
    <>
      <div>
        <div className={'income-chart'} id='income-chart' />
        <div className='income-type-wrapper'>
          <div className={'income-chart-title'}>收益图表</div>
          <Radio.Group
            className='income-type-select-radio'
            value={currentIncomeType}
            onChange={(e) => handleChangeType(e?.target.value)}
          >
            {checkTypeList.map((item) => {
              return (
                <Radio.Button key={item.label} value={item.label}>
                  <Popover title='图表说明' content={item.tip}>
                    {item.label}
                  </Popover>
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
