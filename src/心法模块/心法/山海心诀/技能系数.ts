import { 属性类型 } from '@/@types/属性'
import { 技能基础数据模型 } from '@/@types/技能'
import { 计算公式计算类型 } from '@/@types/伤害计算'
import { 破招全局系数, 获取实际系数 } from '@/数据/数据工具/获取技能系数'

import 通用增益 from './技能增益/通用'
import 贯穿增益 from './技能增益/贯穿'
import 劲风簇增益 from './技能增益/劲风簇'
import 标鹄增益 from './技能增益/标鹄'
import 饮羽簇增益 from './技能增益/饮羽簇'
import 宠物增益 from './技能增益/宠物通用'
import 风矢增益 from './技能增益/风矢'

const 贯穿伤害系数 = 获取实际系数(215 * 0.7 * 1.15 * 0.9 * 0.9 * 0.9, { dot跳数: 4, dot间隔: 8 })

const 贯穿基础伤害 = 32

const 技能基础数据: 技能基础数据模型[] = [
  {
    技能名称: '标鹄',
    技能伤害系数: 获取实际系数(512 * 1.15 * 0.9 * 0.95),
    技能基础伤害_最小值: 30,
    技能基础伤害_最大值: 50,
    技能增益列表: 标鹄增益,
  },
  {
    技能名称: '劲风簇',
    技能伤害系数: 获取实际系数(175 * 0.9 * 0.9 * 0.95),
    技能基础伤害_最小值: 333,
    技能基础伤害_最大值: 338,
    武器伤害系数: 1,
    技能增益列表: 劲风簇增益,
  },
  {
    技能名称: '饮羽簇',
    技能伤害系数: 获取实际系数(552 * 0.9 * 0.9 * 0.95 * 0.9 * 0.95),
    技能基础伤害_最小值: 732,
    技能基础伤害_最大值: 742,
    武器伤害系数: 2,
    技能增益列表: 饮羽簇增益,
  },
  {
    技能名称: '霖急簇',
    技能伤害系数: 获取实际系数(160 * 1.1),
    技能基础伤害_最小值: 28,
    技能基础伤害_最大值: 33,
    武器伤害系数: 1,
    技能增益列表: 通用增益,
  },
  {
    技能名称: '风矢',
    技能伤害系数: 获取实际系数(160 * 0.1),
    技能基础伤害_最小值: 0,
    技能基础伤害_最大值: 0,
    武器伤害系数: 1,
    技能增益列表: 风矢增益,
  },
  {
    技能名称: '攻击-狼',
    统计名称: '攻击',
    技能伤害系数: 获取实际系数(276 * 1.05),
    技能基础伤害_最小值: 90,
    技能基础伤害_最大值: 110,
    技能增益列表: 宠物增益,
    宠物伤害: true,
  },
  {
    技能名称: '攻击-虎',
    统计名称: '攻击',
    技能伤害系数: 获取实际系数(828 * 1.05),
    技能基础伤害_最小值: 270,
    技能基础伤害_最大值: 330,
    技能增益列表: 宠物增益,
    宠物伤害: true,
  },
  {
    技能名称: '攻击-鹰',
    统计名称: '攻击',
    技能伤害系数: 获取实际系数(607 * 1.05),
    技能基础伤害_最小值: 200,
    技能基础伤害_最大值: 240,
    技能增益列表: 宠物增益,
    宠物伤害: true,
  },
  {
    技能名称: '攻击-熊',
    统计名称: '攻击',
    技能伤害系数: 获取实际系数(165 * 1.05),
    技能基础伤害_最小值: 50,
    技能基础伤害_最大值: 70,
    技能增益列表: 宠物增益,
    宠物伤害: true,
  },
  {
    技能名称: '重击', // 野猪
    技能伤害系数: 获取实际系数(276 * 1.05),
    技能基础伤害_最小值: 90,
    技能基础伤害_最大值: 110,
    技能增益列表: 宠物增益,
    宠物伤害: true,
  },
  {
    技能名称: '践踏', // 大象
    技能伤害系数: 获取实际系数(607 * 1.05),
    技能基础伤害_最小值: 200,
    技能基础伤害_最大值: 240,
    技能增益列表: 宠物增益,
    宠物伤害: true,
  },
  {
    技能名称: '贯穿·1',
    统计名称: '贯穿',
    技能伤害系数: 贯穿伤害系数,
    技能基础伤害_最小值: 贯穿基础伤害,
    技能基础伤害_最大值: 贯穿基础伤害,
    技能增益列表: 贯穿增益,
  },
  {
    技能名称: '贯穿·2',
    统计名称: '贯穿',
    技能伤害系数: 贯穿伤害系数,
    技能基础伤害_最小值: 贯穿基础伤害,
    技能基础伤害_最大值: 贯穿基础伤害,
    伤害计算次数: 2,
    技能增益列表: 贯穿增益,
  },
  {
    技能名称: '贯穿·3',
    统计名称: '贯穿',
    技能伤害系数: 贯穿伤害系数,
    技能基础伤害_最小值: 贯穿基础伤害,
    技能基础伤害_最大值: 贯穿基础伤害,
    伤害计算次数: 3,
    技能增益列表: 贯穿增益,
  },
  {
    技能名称: '贯穿·4',
    统计名称: '贯穿',
    技能伤害系数: 贯穿伤害系数,
    技能基础伤害_最小值: 贯穿基础伤害,
    技能基础伤害_最大值: 贯穿基础伤害,
    伤害计算次数: 4,
    技能增益列表: 贯穿增益,
  },
  {
    技能名称: '贯穿·5',
    统计名称: '贯穿',
    技能伤害系数: 贯穿伤害系数,
    技能基础伤害_最小值: 贯穿基础伤害,
    技能基础伤害_最大值: 贯穿基础伤害,
    伤害计算次数: 5,
    技能增益列表: 贯穿增益,
  },
  {
    技能名称: '贯穿·6',
    统计名称: '贯穿',
    技能伤害系数: 贯穿伤害系数,
    技能基础伤害_最小值: 贯穿基础伤害,
    技能基础伤害_最大值: 贯穿基础伤害,
    伤害计算次数: 6,
    技能增益列表: 贯穿增益,
  },
  {
    技能名称: '贯穿·8',
    统计名称: '贯穿',
    技能伤害系数: 贯穿伤害系数,
    技能基础伤害_最小值: 贯穿基础伤害,
    技能基础伤害_最大值: 贯穿基础伤害,
    伤害计算次数: 4 * 2,
    技能增益列表: 贯穿增益,
  },
  {
    技能名称: '贯穿·9',
    统计名称: '贯穿',
    技能伤害系数: 贯穿伤害系数,
    技能基础伤害_最小值: 贯穿基础伤害,
    技能基础伤害_最大值: 贯穿基础伤害,
    伤害计算次数: 3 * 3,
    技能增益列表: 贯穿增益,
  },
  {
    技能名称: '贯穿·10',
    统计名称: '贯穿',
    技能伤害系数: 贯穿伤害系数,
    技能基础伤害_最小值: 贯穿基础伤害,
    技能基础伤害_最大值: 贯穿基础伤害,
    伤害计算次数: 5 * 2,
    技能增益列表: 贯穿增益,
  },
  {
    技能名称: '贯穿·12',
    统计名称: '贯穿',
    技能伤害系数: 贯穿伤害系数,
    技能基础伤害_最小值: 贯穿基础伤害,
    技能基础伤害_最大值: 贯穿基础伤害,
    伤害计算次数: 4 * 3,
    技能增益列表: 贯穿增益,
  },
  {
    技能名称: '贯穿·15',
    统计名称: '贯穿',
    技能伤害系数: 贯穿伤害系数,
    技能基础伤害_最小值: 贯穿基础伤害,
    技能基础伤害_最大值: 贯穿基础伤害,
    伤害计算次数: 5 * 3,
    技能增益列表: 贯穿增益,
  },
  {
    技能名称: '贯穿·18',
    统计名称: '贯穿',
    技能伤害系数: 贯穿伤害系数,
    技能基础伤害_最小值: 贯穿基础伤害,
    技能基础伤害_最大值: 贯穿基础伤害,
    伤害计算次数: 6 * 3,
    技能增益列表: 贯穿增益,
  },
  {
    技能名称: '白虹贯日',
    技能伤害系数: 7.25,
    技能基础伤害_最小值: 400,
    技能基础伤害_最大值: 600,
    武器伤害系数: 2,
    技能增益列表: 通用增益,
  },
  {
    // 实测没有武伤
    技能名称: '朝仪万汇',
    技能伤害系数: 获取实际系数(215),
    技能基础伤害_最小值: 37,
    技能基础伤害_最大值: 42,
    技能增益列表: 通用增益,
  },
  {
    技能名称: '破',
    技能伤害系数: 破招全局系数 * 0.3,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: 通用增益,
  },
  {
    技能名称: '劲风簇·神兵',
    技能伤害系数: 获取实际系数(60),
    技能基础伤害_最小值: 20,
    技能基础伤害_最大值: 22,
    技能增益列表: 通用增益,
  },
  // CW期间饮羽命中后施加的额外伤害
  {
    技能名称: '月弦激星',
    技能伤害系数: 获取实际系数(390),
    技能基础伤害_最小值: 20,
    技能基础伤害_最大值: 22,
    技能增益列表: 通用增益,
  },
  {
    技能名称: '逐云寒蕊',
    技能伤害系数: 1.274,
    伤害计算次数: 1,
    技能增益列表: [
      ...通用增益,
      {
        增益名称: '飘黄',
        增益所在位置: '技能',
        增益类型: '全局启用',
        增益启用: true,
        增益集合: [{ 属性: 属性类型.郭氏全无视防御, 值: 1024 }],
      },
    ],
  },
  {
    // 伤腕
    技能名称: '昆吾·弦刃',
    真实伤害: 145300, // 雾海寻龙版本改为固定伤害，只吃秋肃和等级减伤
    伤害计算类型标记: [计算公式计算类型.真实伤害, 计算公式计算类型.等级减伤, 计算公式计算类型.易伤],
  },
  {
    // 伤鞋
    技能名称: '刃凌',
    真实伤害: 96900, // 雾海寻龙版本改为固定伤害，只吃秋肃和等级减伤
    伤害计算类型标记: [计算公式计算类型.真实伤害, 计算公式计算类型.等级减伤, 计算公式计算类型.易伤],
  },
  {
    // 龙门武器
    技能名称: '剑风',
    技能基础伤害_最小值: 3950,
    技能基础伤害_最大值: 3950,
    技能增益列表: 通用增益,
  },
]

export default 技能基础数据

const 技能增益 = {
  通用增益,
  贯穿增益,
  劲风簇增益,
  标鹄增益,
  饮羽簇增益,
  宠物增益,
  风矢增益,
}

export { 技能增益 }
