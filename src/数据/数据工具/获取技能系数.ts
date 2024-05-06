// 获取实际系数
export const 获取实际系数 = (系数: number, 参数: 获取实际系数入参类型 = { 功法: '外功' }) => {
  const { 功法: 入参功法, dot跳数, dot间隔 } = 参数

  const 功法 = 入参功法 || '外功'

  const 基础系数 = (功法 === '外功' ? 16 : 19) * 10
  if (dot跳数 && dot间隔) {
    return Math.max(
      (Math.floor(系数) * Math.max(Math.floor((dot跳数 * dot间隔) / 12), 16)) /
        dot跳数 /
        16 /
        基础系数,
      0.0625
    )
  }

  return Math.floor(系数) / 基础系数
}

interface 获取实际系数入参类型 {
  功法?: '外功' | '内功'
  dot跳数?: number
  dot间隔?: number
}

export const 破招全局系数 = 13.1925
