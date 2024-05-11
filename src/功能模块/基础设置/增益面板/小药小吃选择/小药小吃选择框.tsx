import { 小药小吃数据类型 } from '@/@types/小药小吃'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { 秒伤计算 } from '@/计算模块/计算函数'
import { Select, SelectProps } from 'antd'
import React, { useState } from 'react'

interface 小药小吃选择框入参 extends SelectProps {
  开启智能对比?: boolean
  data?: 小药小吃数据类型[]
}

const 小药小吃选择框: React.FC<小药小吃选择框入参> = (props) => {
  const { 开启智能对比, data, ...rest } = props

  const 增益数据 = useAppSelector((state) => state?.data?.增益数据)
  const 增益启用 = useAppSelector((state) => state?.data?.增益启用)
  const 当前计算结果 = useAppSelector((state) => state?.data?.当前计算结果)
  const [dpsUpList, setDpsUpList] = useState<Array<{ key: string; dpsUp: number }>>([])
  const dispatch = useAppDispatch()

  const getDpsUpList = () => {
    if (开启智能对比 && 增益启用 && 当前计算结果?.秒伤) {
      const newDpsUpList = data
        // 加速的暂不参与计算
        ?.filter((item) => !item.小吃名称?.includes('加速'))
        ?.map((item) => {
          const newDps = getAfterChangeXiaochiDps(item.小吃名称)
          return {
            key: item.小吃名称,
            dpsUp: newDps - (当前计算结果?.秒伤 || 0),
          }
        })
      setDpsUpList(newDpsUpList || [])
    }
  }

  // 计算阵眼收益
  const getAfterChangeXiaochiDps = (小吃名称) => {
    const 过滤原小吃数组 = 增益数据.小吃.filter((item) => !data?.some((a) => a.小吃名称 === item))
    const { 秒伤 } = dispatch(
      秒伤计算({
        更新增益数据: { ...增益数据, 小吃: [...(过滤原小吃数组 || []), 小吃名称] },
      })
    )
    return 秒伤 || 0
  }

  return (
    <Select
      allowClear
      placeholder='请选择'
      className='zengyi-xiaochi-select'
      optionFilterProp='label'
      {...rest}
      onDropdownVisibleChange={(e) => {
        if (e) {
          getDpsUpList()
        } else {
          setDpsUpList([])
        }
      }}
      listHeight={300}
      showSearch
      filterOption={(input, option) => {
        return option?.value?.toString()?.includes(input) || false
      }}
    >
      {(data || []).map((item) => {
        const upDps = (
          dpsUpList?.find((up) => up.key === `${item?.小吃名称}`) || {
            dpsUp: 0,
          }
        )?.dpsUp

        return (
          <Select.Option key={item?.小吃名称} value={item?.小吃名称} label={item.小吃名称}>
            <div className={'xiaochi-diff-item'}>
              <span>
                {item?.小吃名称?.split('（')?.[0]}
                {/* {item?.小吃名称} */}
                {item?.小吃名称?.split('（')?.[1] ? (
                  <span className={`${item?.小吃品级 === '紫' ? 'xiaochi-zi' : 'xiaochi-lan'}`}>
                    （{item?.小吃名称?.split('（')?.[1]}
                  </span>
                ) : null}
              </span>
              {upDps !== 0 ? (
                <span className={`${upDps > 0 ? 'dps-up' : 'dps-down'}`}>
                  {upDps > 0 ? '+' : ''}
                  {upDps}
                </span>
              ) : null}
            </div>
          </Select.Option>
        )
      })}
    </Select>
  )
}

export default 小药小吃选择框
