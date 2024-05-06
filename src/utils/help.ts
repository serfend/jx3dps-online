export const 按数字生成数组 = (number) => {
  return Array.from({ length: number - 1 + 1 }, (_, index) => index + 1)
}
