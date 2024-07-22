import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { App as AntdApp, ConfigProvider } from 'antd'
import antdZhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import 获取当前数据 from '@/数据/数据工具/获取当前数据'
import Layout from '@/组件/Layout'
import store from '@/store/index'
import '@/工具函数/axios'

import App from './页面/index'

dayjs.locale('zh-cn')

import './style/base.css'

const 主题色 = 获取当前数据()?.系统配置?.主题色 || '#dca53e'

ConfigProvider.config({ theme: { primaryColor: 主题色 } })

const root = ReactDOM.createRoot(document.getElementById('root') as any)

root.render(
  <Provider store={store}>
    <ConfigProvider
      locale={antdZhCN}
      theme={{
        token: {
          colorPrimary: 主题色,
        },
      }}
    >
      <AntdApp>
        <Layout>
          <App />
        </Layout>
      </AntdApp>
    </ConfigProvider>
  </Provider>
)
