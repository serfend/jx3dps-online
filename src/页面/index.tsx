import React from 'react'
import 基础设置 from '@/功能模块/基础设置'
import 系统工具 from '@/功能模块/系统工具'
import 心法切换 from '@/功能模块/心法切换'
import './index.css'

function 主页面() {
  return (
    <>
      <基础设置 />
      {/* 顶部说明 */}
      {/* <TitleTip /> */}
      {/* 角色设置 */}
      {/* <BasicSet getDps={getDps} zengyiVisible={zengyiVisible} setZengyiVisible={setZengyiVisible} /> */}
      {/* Dps计算 */}
      {/* <Dps zengyiVisible={zengyiVisible} ref={dpsRef} /> */}
      {/* 更新日志 */}
      {/* <Log /> */}
      <系统工具 />
      <心法切换 />
    </>
  )
}

export default 主页面
