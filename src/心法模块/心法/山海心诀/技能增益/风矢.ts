import { 技能增益列表类型 } from '@/@types/技能'
import { 属性类型 } from '@/@types/属性'
import 通用增益 from './通用'

const 风矢增益: 技能增益列表类型[] = [
  ...通用增益,
  {
    增益名称: '万灵普通攻击增伤',
    增益所在位置: '奇穴',
    常驻增益: true,
    增益集合: [{ 属性: 属性类型.通用增伤, 值: 0.2 }],
  },
]

export default 风矢增益
