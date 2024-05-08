import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import antdZhCN from 'antd/lib/locale-provider/zh_CN'

import 获取当前数据 from '@/数据/数据工具/获取当前数据'
import Layout from '@/组件/Layout'
import store from '@/store/index'
import 'antd/dist/antd.variable.min.css'
import '@/工具函数/axios'

import App from './页面/index'
import './style/base.css'

const 主题色 = 获取当前数据()?.系统配置?.主题色 || '#dca53e'

ConfigProvider.config({ theme: { primaryColor: 主题色 } })

const root = ReactDOM.createRoot(document.getElementById('root') as any)

root.render(
  <Provider store={store}>
    <ConfigProvider locale={antdZhCN}>
      <Layout>
        <App />
      </Layout>
    </ConfigProvider>
  </Provider>
)
