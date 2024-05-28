import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Select, Spin, message } from 'antd'
import { 心法枚举, 获取数据 } from './tool'
import './index.css'

const 支持导入心法列表 = Object.keys(心法枚举)

function JCL战斗记录解析() {
  const [结果数据, 更新结果数据] = useState<any>()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    form?.setFieldsValue({
      目标心法: 支持导入心法列表?.[0],
      战斗时间: 301,
    })
  }, [form, 支持导入心法列表])

  const 获取远程数据 = async () => {
    form.validateFields().then(async (values) => {
      setLoading(true)
      const res = await 获取数据({
        心法: values?.目标心法,
        数据: values?.数据,
        最大时间: values?.战斗时间,
      })
      if (res?.技能详情?.length) {
        更新结果数据(res)
      } else {
        message.error('解析出错')
      }
      setLoading(false)
    })
  }

  const copy = () => {
    const res = document.getElementById('tools-jcl-result')
    if (res) {
      const text = res?.innerHTML
      if (text) {
        const input = document.createElement('input')
        document.body.appendChild(input)
        input.setAttribute('value', text)
        input.select()
        document.execCommand('copy') // 执行浏览器复制命令
        if (document.execCommand('copy')) {
          document.execCommand('copy')
          message.success('复制成功')
        }
        // if (text?.includes('未匹配')) {
        //   message.warning('存在未匹配装备')
        // }
        document.body.removeChild(input)
      }
    }
  }

  return (
    <div>
      <Spin spinning={loading}>
        <Form form={form} className={'tools-jcl-params'} layout='vertical'>
          <Form.Item className={'tools-jcl-form-item'} name='目标心法' label='心法' required>
            <Select
              className={'tools-jcl-params-select'}
              options={支持导入心法列表.map((item) => ({ value: item, label: item }))}
              placeholder={'请选择解析心法'}
            />
          </Form.Item>
          <Form.Item className={'tools-jcl-form-item-2'} name='战斗时间' label='战斗时间' required>
            <Input style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name='数据' label='数据' required>
            <Input.TextArea className={'tool-jcl-input-area'} />
          </Form.Item>
        </Form>
        <div className={'tools-jcl-btns'}>
          <Button type='primary' className='tools-jcl-btn' onClick={获取远程数据}>
            获取数据
          </Button>
          <Button disabled={!结果数据} className='tools-jcl-btn' onClick={copy}>
            复制
          </Button>
        </div>
        {结果数据 && (
          <div id='tools-jcl-result' className={'tools-jcl-result'}>
            {JSON.stringify(结果数据)}
          </div>
        )}
      </Spin>
    </div>
  )
}

export default JCL战斗记录解析
