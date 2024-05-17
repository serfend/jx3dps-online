// 监听来自主线程的消息

import DpsKernelOptimizer from '@/计算模块/dps-kernel-optimizer/dps-kernel-optimizer'

// @tes-ignore
self.onmessage = function (e) {
  console.log('监听来自主线程的消息:', e.data)

  if (e.data?.计算循环) {
    console.log('开始计算')
    const res = DpsKernelOptimizer(e.data)
    console.log('res', e.data)
    console.log('res', res)
  }
}

export {}
