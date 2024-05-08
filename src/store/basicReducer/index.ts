import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/index'

interface BasicState {
  // 关闭背景
  关闭背景图: boolean
}

const initialState: BasicState = { 关闭背景图: true }

export const basicStore = createSlice({
  name: 'basic',
  initialState,
  reducers: {
    更新当前关闭背景图片: (state, action: PayloadAction<boolean>) => {
      state.关闭背景图 = action.payload
    },
  },
})

export const { 更新当前关闭背景图片 } = basicStore.actions // 导出操作state的喊出

export const basicState = (state: RootState) => state

export default basicStore.reducer // 导出当前reducer在store/index.ts中记性全局挂
