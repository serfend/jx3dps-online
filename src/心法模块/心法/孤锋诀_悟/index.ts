/**
 * @name 心法模块-山海心诀
 * 模块写入者：唐宋
 */
import type { 心法配置类型 } from '@/心法模块/interface'

import 背景图 from './资源/背景图'
import 默认数据 from './默认数据'
import 计算循环 from './计算循环'
import 奇穴数据 from './奇穴'
import 技能系数, { 技能增益 } from './技能系数'
import 端游孤锋决数据 from '../孤锋诀/index'

const 心法配置: 心法配置类型 = {
  ...端游孤锋决数据,
  名称: '孤锋诀·悟',
  简写: 'gfj_w',
  心法所属端: '无界',
  数据提供: '数据：考拉 唐宋；测试：风雪入我怀',
  奇穴数据: 奇穴数据,
  技能系数: 技能系数,
  技能增益: 技能增益,
  计算循环: 计算循环,
  默认数据: 默认数据,
  系统配置: {
    ...(端游孤锋决数据.系统配置 || {}),
    心法图标: 'https://img.jx3box.com/image/xf/10698.png',
    背景图: 背景图,
  },
}

export default 心法配置
