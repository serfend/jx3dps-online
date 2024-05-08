export const 按数字生成数组 = (number) => {
  return Array.from({ length: number - 1 + 1 }, (_, index) => index + 1)
}

export const hexToRgba = (hex, alpha) => {
  // 将16进制颜色代码转换为RGB
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  // 返回RGBA字符串
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export const hexToRgbaToDark = (hex, alpha, num = 10) => {
  // 将16进制颜色代码转换为RGB
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  const dark_r = Math.max(r - num, 0)
  const dark_g = Math.max(g - num, 0)
  const dark_b = Math.max(b - num, 0)

  // 返回RGBA字符串
  return `rgba(${dark_r}, ${dark_g}, ${dark_b}, ${alpha})`
}
