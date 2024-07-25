import React from 'react'
import { Button, Checkbox, Dropdown, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

function 配装组件标题({
  开启装备智能对比,
  设置开启装备智能对比,
  form,
  设置默认镶嵌宝石等级,
  保存数据并计算,
}) {
  // 设置所有镶嵌为6/8级
  const setAllXiangQian = (number) => {
    form?.validateFields().then((values) => {
      const res = { ...values }
      Object.keys(values)
        .filter(
          (item) =>
            res[item] &&
            ![
              '五彩石',
              '大附魔_伤帽',
              '大附魔_伤衣',
              '大附魔_伤腰',
              '大附魔_伤腕',
              '大附魔_伤鞋',
            ].includes(item)
        )
        .map((item) => {
          return {
            ...values[item],
            key: item,
            镶嵌孔数组: values[item]?.镶嵌孔数组?.map((a) => {
              return {
                ...a,
                镶嵌宝石等级: number,
              }
            }),
          }
        })
        .forEach((item) => {
          if (res[item.key]) {
            const newObj = { ...item }
            delete newObj.key
            res[item.key] = { ...newObj }
          }
        })
      设置默认镶嵌宝石等级(number)
      保存数据并计算(res)
    })
  }

  return (
    <div className='zhuangbei-form-header'>
      <div className='zhuangbei-form-left-1'>
        <h1 className='zhuangbei-form-title'>装备</h1>
        <span id='Guide_5'>
          <Checkbox
            checked={开启装备智能对比}
            onChange={(e) => 设置开启装备智能对比(e?.target?.checked)}
            className={'zhuangbei-diff-btn'}
          >
            <span>智能对比</span>
            <Tooltip
              overlayInnerStyle={{ width: 350 }}
              title={
                <div>
                  <p>对比默认精炼等级下切换至另一件装备dps波动。</p>
                  <p>注意：目标为橙武时不会自动切换循环。</p>
                  <p>考虑性能，暂时只开放13200品以上装备的智能对比。</p>
                  <p>开启后打开装备选择框时会略微卡顿。</p>
                </div>
              }
            >
              <QuestionCircleOutlined className={'zhuangbei-diff-tip'} />
            </Tooltip>
          </Checkbox>
        </span>
      </div>
      <div className='zhuangbei-form-left-2'>
        <h1 className='zhuangbei-form-title'>附魔</h1>
      </div>
      <div className='zhuangbei-form-left-3'>
        <h1 className='zhuangbei-form-title'>精炼</h1>
      </div>
      <div className='zhuangbei-form-left-4'>
        <h1 className='zhuangbei-form-title'>镶嵌</h1>
        <Dropdown
          menu={{
            items: [
              { label: '6级', key: '6', onClick: () => setAllXiangQian(6) },
              { label: '7级', key: '7', onClick: () => setAllXiangQian(7) },
              { label: '8级', key: '8', onClick: () => setAllXiangQian(8) },
            ],
          }}
        >
          <Button size='small' className={'zhuangbei-form-set-btn'}>
            一键镶嵌
          </Button>
        </Dropdown>
      </div>
      <div className='zhuangbei-form-left-5'>
        <h1 className='zhuangbei-form-title'>大附魔</h1>
      </div>
      <div className='zhuangbei-form-left-6'>
        <h1 className='zhuangbei-form-title'>五彩石</h1>
      </div>
    </div>
  )
}

export default 配装组件标题
