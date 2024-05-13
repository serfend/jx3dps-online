import React from 'react'
// import { 装备部位枚举 } from '@/@types/枚举'
import { 装备信息数据类型 } from '@/@types/装备'

import 最佳附魔设置 from './最佳附魔设置'
import 最佳五彩石设置 from './最佳五彩石设置'

interface 头部组件类型 {
  /**
   * @name 对比秒伤
   * 最佳附魔对比的秒伤信息，勇于展示更换后对比情况
   * */
  对比秒伤: number
  /**
   * @name 对比装备信息
   * 最佳附魔对比的装备信息
   * */
  对比装备信息: 装备信息数据类型
  /**
   * 更新表单
   */
  更换装备计算秒伤: (单个表单值, 全部表单值) => void
  /**
   * 表单实例
   */
  form: any
}

function 头部组件(props: 头部组件类型) {
  const { 对比秒伤, 对比装备信息, form, 更换装备计算秒伤 } = props

  const 一键替换附魔 = (附魔信息) => {
    form?.validateFields().then((values) => {
      const obj = { ...values }
      Object.keys(附魔信息).forEach((附魔位置索引) => {
        // const 附魔位置 = 装备部位枚举[fumoKey]
        // const formKey = `${附魔位置}${fumoKey}`

        const 附魔属性 = Object.keys(附魔信息[附魔位置索引])?.[0]
        const 附魔值 = Object.values(附魔信息[附魔位置索引])?.[0]
        if (values[附魔位置索引]) {
          obj[附魔位置索引] = {
            ...obj[附魔位置索引],
            附魔: `${附魔属性}+${附魔值}`,
          }
        }
      })
      form.setFieldsValue({ ...obj })
      更换装备计算秒伤(undefined, { ...obj })
    })
  }

  const 一键替换五彩石 = (五彩石信息) => {
    form?.validateFields().then((values) => {
      const obj = { ...values, 五彩石: 五彩石信息 }
      form.setFieldsValue(obj)
      更换装备计算秒伤(undefined, { ...obj })
    })
  }

  return (
    <div className='zhuangbei-input-set-modal-title'>
      <span>配装器</span>
      <div className='zhuangbei-input-set-modal-title-operate'>
        {/* 最佳附魔设置 */}
        <最佳附魔设置 一键替换附魔={一键替换附魔} 对比秒伤={对比秒伤} 对比装备信息={对比装备信息} />
        {/* 最佳五彩石设置 */}
        <最佳五彩石设置
          一键替换五彩石={一键替换五彩石}
          对比秒伤={对比秒伤}
          对比装备信息={对比装备信息}
        />
      </div>
    </div>
  )
}

export default 头部组件
