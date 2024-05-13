import { 属性类型 } from '@/@types/属性'
import { 技能增益列表类型 } from '@/@types/技能'
import 沧浪三叠增益 from './沧浪三叠增益'

const 沧浪三叠一增益: 技能增益列表类型[] = [
  ...沧浪三叠增益,
  {
    增益名称: '放皓',
    增益所在位置: '奇穴',
    增益类型: '全局启用',
    增益集合: [
      { 属性: 属性类型.外功会心百分比, 值: 0.1 },
      { 属性: 属性类型.郭氏外功会心效果等级, 值: 102 },
    ],
  },
]

export default 沧浪三叠一增益
