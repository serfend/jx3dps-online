import axios from 'axios'

const 魔盒配装接口 = axios.create({
  baseURL: 'https://node.jx3box.com', // 设置 baseURL 为您的服务器地址
  timeout: 5000, // 设置超时时间
  headers: {
    'Content-Type': 'application/json',
    // 可以根据需要设置其他请求头
  },
})
// 根据配装ID获取配装方案
export const getPzDataById = (params) =>
  axios.get(`/api/cms/app/pz/${params.id}`, { params: params })

// 查询武器
export const 获取魔盒武器数据 = (params) => 魔盒配装接口.get(`/equip/weapon`, { params: params })
export const 获取魔盒装备数据 = (params) => 魔盒配装接口.get(`/equip/armor`, { params: params })
export const 获取魔盒饰品数据 = (params) => 魔盒配装接口.get(`/equip/trinket`, { params: params })

// 根据附魔ID获取附魔
export const getFumoDataById = (params) => axios.get(`/enchant/primary`, { params: params })

// 根据附魔
export const getWuCaiShiDataById = (params) => axios.get(`/enchant/stone`, { params: params })
