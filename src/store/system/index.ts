import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/index'

interface 系统模块类型 {
  增益面板显示状态: boolean
  背景图片显示状态: boolean
}

const 默认值: 系统模块类型 = {
  增益面板显示状态: false,
  背景图片显示状态: true,
}

export const 系统模块 = createSlice({
  name: 'basic',
  initialState: 默认值,
  reducers: {
    更新全部属性: (state, action: PayloadAction<Partial<系统模块类型>>) => {
      state = { ...state, ...action.payload }
    },
    更新背景图片显示状态: (state, action: PayloadAction<boolean>) => {
      state.背景图片显示状态 = action.payload
    },
    更新增益面板显示状态: (state, action: PayloadAction<boolean>) => {
      state.增益面板显示状态 = action.payload
    },
  },
})

export const { 更新全部属性, 更新背景图片显示状态, 更新增益面板显示状态 } = 系统模块.actions // 导出操作state的喊出

export const SystemState = (state: RootState) => state

export default 系统模块.reducer // 导出当前reducer在store/index.ts中记性全局挂
