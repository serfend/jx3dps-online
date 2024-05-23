const 每秒帧数 = 16
const 外功系数 = 10
const 内功系数 = 12

const dot系数 = 12

// 获取实际系数
export const 获取实际系数 = (系数: number, 参数: 获取实际系数入参类型 = { 功法: '外功' }) => {
  const { 功法: 入参功法, dot跳数, dot间隔 } = 参数

  const 功法 = 入参功法 || '外功'

  const 基础系数 = (功法 === '外功' ? 外功系数 : 内功系数) * 每秒帧数
  if (dot跳数 && dot间隔) {
    return Math.max(
      (Math.floor(系数) * Math.max(Math.floor((dot跳数 * dot间隔) / dot系数), 每秒帧数)) /
        dot跳数 /
        每秒帧数 /
        基础系数,
      0.0625
    )
  }

  return Math.floor(系数) / 基础系数
}

export const 获取破招实际系数 = (系数) => {
  return (((系数 + (系数 < 0 ? 1 : 0)) / 1024 + 1024) / 1024) * 破招全局系数
}

interface 获取实际系数入参类型 {
  功法?: '外功' | '内功'
  dot跳数?: number
  dot间隔?: number
}

export const 破招全局系数 = 13.192
