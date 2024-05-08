/**
 * @name 心法模块-山海心决
 * 模块写入者：唐宋
 */
import { 属性类型 } from '@/@types/属性'
import type { 心法配置类型 } from '@/心法模块/interface'

import 背景图 from './资源/背景图'
import 默认秘籍 from './默认秘籍/默认秘籍.json'
import 技能系数 from './技能系数'
import 计算循环 from './计算循环'

const 心法配置: 心法配置类型 = {
  名称: '山海心诀',
  所属门派: '万灵山庄',
  主属性: '身法',
  功法: '外功',
  伤害属性: '外功',
  主属性额外加成: [
    { 属性: 属性类型.面板攻击, 值: 1485 / 1024 },
    { 属性: 属性类型.外功会心等级, 值: 594 / 1024 },
  ],
  系统配置: {
    主题色: '#dca53e',
    心法图标: 'https://img.jx3box.com/image/xf/10756.png',
    背景图: 背景图,
    背景色渐变: `linear-gradient(to right, rgba(124, 85, 2, 0.4) 5%, rgba(105, 86, 5, 0.15) 70%)`,
  },
  默认秘籍: 默认秘籍,
  技能系数: 技能系数,
  计算循环: 计算循环,
}

export default 心法配置
