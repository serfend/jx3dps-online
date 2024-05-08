// import { 获取魔盒武器数据, 获取魔盒装备数据, 获取魔盒饰品数据 } from '@/api/mohe'
import axios from 'axios'

const 魔盒配装接口 = axios.create({
  baseURL: 'https://node.jx3box.com', // 设置 baseURL 为您的服务器地址
  timeout: 5000, // 设置超时时间
  headers: {
    'Content-Type': 'application/json',
    // 可以根据需要设置其他请求头
  },
})

// 查询武器
const 获取魔盒武器数据 = (params) => 魔盒配装接口.get(`/equip/weapon`, { params: params })
const 获取魔盒装备数据 = (params) => 魔盒配装接口.get(`/equip/armor`, { params: params })
const 获取魔盒饰品数据 = (params) => 魔盒配装接口.get(`/equip/trinket`, { params: params })


import { 接口装备数据格式化 } from './utils.mjs'
import 赛季范围数据 from './赛季范围数据.mjs'

export const 获取数据 = async ({ 功法, 装备部位, 品级范围, 装备质量 }) => {
  const 接口 = [0, 1]?.includes(装备部位)
    ? 获取魔盒武器数据
    : [4, 5]?.includes(装备部位)
    ? 获取魔盒饰品数据
    : 获取魔盒装备数据

  const 参数 = {
    position: 装备部位,
    pv_type: '1,3', // 1PVE 3PVX
    duty: 功法,
    // MagicKind: '力道,身法,外功',
    Quality: 装备质量 || undefined, // 4 紫武 ，5 橙武
    page: 1,
    per: 500,
    min_level: Math.max(品级范围?.[0] - 1, 0), // 防止左开右闭，多查一层
    max_level: Math.max(品级范围?.[1] + 1, 0),
  }

  const 结果 = await 接口(参数)

  const 处理后数据 = 接口装备数据格式化(结果?.data?.list,赛季范围数据)
  return 处理后数据
}
