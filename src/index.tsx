import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import antdZhCN from 'antd/lib/locale-provider/zh_CN'
import { Provider } from 'react-redux'

import 获取当前数据 from '@/数据/数据工具/获取当前数据'
import store from '@/store/index'
import 'antd/dist/antd.variable.min.css'
import '@/utils/axios'

import Layout from './components/Layout'

const 主题色 = 获取当前数据()?.系统配置?.主题色 || '#dca53e'

ConfigProvider.config({
  theme: {
    primaryColor: 主题色,
  },
})

import App from './pages/index'
import './style/base.css'

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
