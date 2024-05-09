import { configureStore } from '@reduxjs/toolkit'
import 系统模块 from './system'
import 数据模块 from './data'

const store = configureStore({
  reducer: {
    system: 系统模块,
    data: 数据模块,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
