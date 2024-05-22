import { 属性类型 } from '@/@types/属性'
import { 小药小吃数据类型 } from '@/@types/小药小吃'
import { 小吃类型枚举 } from '@/@types/枚举'
import { 获取心法数据 } from '@/心法模块'

const 主属性 = 获取心法数据()?.主属性
const 主属性加成类型 =
  主属性 === '力道'
    ? 属性类型.力道
    : 主属性 === '身法'
    ? 属性类型.身法
    : 主属性 === '元气'
    ? 属性类型.元气
    : 属性类型.根骨

const 通用小药小吃数据: 小药小吃数据类型[] = [
  {
    小吃名称: '断浪·中品破秽散（破防）',
    小吃部位: 小吃类型枚举.药品增强,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.全破防等级, 值: 1096 }],
  },
  {
    小吃名称: '断浪·上品破秽散（破防）',
    小吃部位: 小吃类型枚举.药品增强,
    小吃品级: '紫',
    增益集合: [{ 属性: 属性类型.全破防等级, 值: 2192 }],
  },
  {
    小吃名称: '断浪·中品玉璃散（会心）',
    小吃部位: 小吃类型枚举.药品增强,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.全会心等级, 值: 1096 }],
  },
  {
    小吃名称: '断浪·上品玉璃散（会心）',
    小吃部位: 小吃类型枚举.药品增强,
    小吃品级: '紫',
    增益集合: [{ 属性: 属性类型.全会心等级, 值: 2192 }],
  },
  {
    小吃名称: '断浪·中品凝神散（破招）',
    小吃部位: 小吃类型枚举.药品增强,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.破招值, 值: 1096 }],
  },
  {
    小吃名称: '断浪·上品凝神散（破招）',
    小吃部位: 小吃类型枚举.药品增强,
    小吃品级: '紫',
    增益集合: [{ 属性: 属性类型.破招值, 值: 2192 }],
  },
  {
    小吃名称: '断浪·中品活气散（加速）',
    小吃部位: 小吃类型枚举.药品增强,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.加速等级, 值: 1096 }],
  },
  {
    小吃名称: '断浪·上品活气散（加速）',
    小吃部位: 小吃类型枚举.药品增强,
    小吃品级: '紫',
    增益集合: [{ 属性: 属性类型.加速等级, 值: 2192 }],
  },
  {
    小吃名称: '断浪·水煮肉片（破防）',
    小吃部位: 小吃类型枚举.食品增强,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.全破防等级, 值: 851 }],
  },
  {
    小吃名称: '断浪·红烧排骨（破防）',
    小吃部位: 小吃类型枚举.食品增强,
    小吃品级: '紫',
    增益集合: [{ 属性: 属性类型.全破防等级, 值: 1705 }],
  },
  {
    小吃名称: '断浪·鱼香肉丝（会心）',
    小吃部位: 小吃类型枚举.食品增强,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.全会心等级, 值: 851 }],
  },
  {
    小吃名称: '断浪·酸菜鱼（会心）',
    小吃部位: 小吃类型枚举.食品增强,
    小吃品级: '紫',
    增益集合: [{ 属性: 属性类型.全会心等级, 值: 1705 }],
  },
  {
    小吃名称: '断浪·毛血旺（破招）',
    小吃部位: 小吃类型枚举.食品增强,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.破招值, 值: 851 }],
  },
  {
    小吃名称: '断浪·白肉血肠（破招）',
    小吃部位: 小吃类型枚举.食品增强,
    小吃品级: '紫',
    增益集合: [{ 属性: 属性类型.破招值, 值: 1705 }],
  },
  {
    小吃名称: '断浪·栗子烧肉（加速）',
    小吃部位: 小吃类型枚举.食品增强,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.加速等级, 值: 851 }],
  },
  {
    小吃名称: '断浪·红烧扣肉（加速）',
    小吃部位: 小吃类型枚举.食品增强,
    小吃品级: '紫',
    增益集合: [{ 属性: 属性类型.加速等级, 值: 1705 }],
  },
  {
    小吃名称: '女儿红（加速）',
    小吃部位: 小吃类型枚举.家园酒品,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.加速等级, 值: 286 }],
  },
  {
    小吃名称: '女儿红·今朝醉（加速）',
    小吃部位: 小吃类型枚举.家园酒品,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.加速等级, 值: 572 }],
  },
  {
    小吃名称: '女儿红·六日醉（加速）',
    小吃部位: 小吃类型枚举.家园酒品,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.加速等级, 值: 858 }],
  },
  {
    小吃名称: '女儿红·旬又三（加速）',
    小吃部位: 小吃类型枚举.家园酒品,
    小吃品级: '紫',
    增益集合: [{ 属性: 属性类型.加速等级, 值: 1144 }],
  },
  {
    小吃名称: '炖豆腐（无双）',
    小吃部位: 小吃类型枚举.家园菜品,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.无双等级, 值: 716 }],
  },
  {
    小吃名称: '断浪·炖豆腐（无双）',
    小吃部位: 小吃类型枚举.家园菜品,
    小吃品级: '紫',
    增益集合: [{ 属性: 属性类型.无双等级, 值: 1074 }],
  },
  {
    小吃名称: '煎豆腐（破招）',
    小吃部位: 小吃类型枚举.家园菜品,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.破招值, 值: 716 }],
  },
  {
    小吃名称: '断浪·煎豆腐（破招）',
    小吃部位: 小吃类型枚举.家园菜品,
    小吃品级: '紫',
    增益集合: [{ 属性: 属性类型.破招值, 值: 1074 }],
  },
  {
    小吃名称: '清蒸鲈鱼（破防）',
    小吃部位: 小吃类型枚举.家园菜品,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.全破防等级, 值: 716 }],
  },
  {
    小吃名称: '断浪·清蒸鲈鱼（破防）',
    小吃部位: 小吃类型枚举.家园菜品,
    小吃品级: '紫',
    增益集合: [{ 属性: 属性类型.全破防等级, 值: 1074 }],
  },
  {
    小吃名称: '炸鱼干（会心）',
    小吃部位: 小吃类型枚举.家园菜品,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.全会心等级, 值: 716 }],
  },
  {
    小吃名称: '断浪·炸鱼干（会心）',
    小吃部位: 小吃类型枚举.家园菜品,
    小吃品级: '紫',
    增益集合: [{ 属性: 属性类型.全会心等级, 值: 1074 }],
  },
  {
    小吃名称: '断浪·水晶芙蓉宴',
    小吃部位: 小吃类型枚举.团队宴席,
    小吃品级: '紫',
    增益集合: [{ 属性: 主属性加成类型, 值: 437 }],
  },
  {
    小吃名称: '创意料理（-无双+会心）',
    小吃部位: 小吃类型枚举.家园菜品,
    小吃品级: '紫',
    增益集合: [
      { 属性: 属性类型.无双等级, 值: -858 },
      { 属性: 属性类型.全会心等级, 值: 1934 },
    ],
  },
  {
    小吃名称: '创意料理（-无双+破招）',
    小吃部位: 小吃类型枚举.家园菜品,
    小吃品级: '紫',
    增益集合: [
      { 属性: 属性类型.无双等级, 值: -858 },
      { 属性: 属性类型.破招值, 值: 1934 },
    ],
  },
  {
    小吃名称: '创意料理（-无双+破防）',
    小吃部位: 小吃类型枚举.家园菜品,
    小吃品级: '紫',
    增益集合: [
      { 属性: 属性类型.无双等级, 值: -858 },
      { 属性: 属性类型.全破防等级, 值: 1934 },
    ],
  },
  {
    小吃名称: '创意料理（-无双+攻击）',
    小吃部位: 小吃类型枚举.家园菜品,
    小吃品级: '紫',
    增益集合: [
      { 属性: 属性类型.无双等级, 值: -858 },
      { 属性: 属性类型.全基础攻击, 值: 866 },
    ],
  },
  {
    小吃名称: '创意料理（-破招+会心）',
    小吃部位: 小吃类型枚举.家园菜品,
    小吃品级: '紫',
    增益集合: [
      { 属性: 属性类型.破招值, 值: -858 },
      { 属性: 属性类型.全会心等级, 值: 1934 },
    ],
  },
  {
    小吃名称: '创意料理（-破招+破防）',
    小吃部位: 小吃类型枚举.家园菜品,
    小吃品级: '紫',
    增益集合: [
      { 属性: 属性类型.破招值, 值: -858 },
      { 属性: 属性类型.全破防等级, 值: 1934 },
    ],
  },
  {
    小吃名称: '创意料理（-破招+无双）',
    小吃部位: 小吃类型枚举.家园菜品,
    小吃品级: '紫',
    增益集合: [
      { 属性: 属性类型.破招值, 值: -858 },
      { 属性: 属性类型.无双等级, 值: 1934 },
    ],
  },
  {
    小吃名称: '创意料理（-破招+攻击）',
    小吃部位: 小吃类型枚举.家园菜品,
    小吃品级: '紫',
    增益集合: [
      { 属性: 属性类型.破招值, 值: -858 },
      { 属性: 属性类型.全基础攻击, 值: 866 },
    ],
  },
  {
    小吃名称: '创意料理（-气血+会心）',
    小吃部位: 小吃类型枚举.家园菜品,
    小吃品级: '紫',
    增益集合: [{ 属性: 属性类型.全会心等级, 值: 1934 }],
  },
  {
    小吃名称: '创意料理（-气血+破招）',
    小吃部位: 小吃类型枚举.家园菜品,
    小吃品级: '紫',
    增益集合: [{ 属性: 属性类型.破招值, 值: 1934 }],
  },
  {
    小吃名称: '创意料理（-气血+破防）',
    小吃部位: 小吃类型枚举.家园菜品,
    小吃品级: '紫',
    增益集合: [{ 属性: 属性类型.全破防等级, 值: 1934 }],
  },
  {
    小吃名称: '创意料理（-气血+无双）',
    小吃部位: 小吃类型枚举.家园菜品,
    小吃品级: '紫',
    增益集合: [{ 属性: 属性类型.无双等级, 值: 1934 }],
  },
  {
    小吃名称: '创意料理（-气血+攻击）',
    小吃部位: 小吃类型枚举.家园菜品,
    小吃品级: '紫',
    增益集合: [{ 属性: 属性类型.全基础攻击, 值: 866 }],
  },
]

export default 通用小药小吃数据
