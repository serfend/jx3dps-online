import { 属性类型 } from '@/@types/属性'
import { 小药小吃数据类型 } from '@/@types/小药小吃'
import { 小吃类型枚举 } from '@/@types/枚举'
import 通用小药小吃数据 from '../通用'

const 外功小药小吃数据: 小药小吃数据类型[] = [
  {
    小吃名称: '断浪·中品亢龙散（外攻）',
    小吃部位: 小吃类型枚举.药品增强,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.外功基础攻击, 值: 494 }],
  },
  {
    小吃名称: '断浪·上品亢龙散（外攻）',
    小吃部位: 小吃类型枚举.药品增强,
    小吃品级: '紫',
    增益集合: [{ 属性: 属性类型.外功基础攻击, 值: 988 }],
  },
  {
    小吃名称: '炼气·秘境·增（外攻）',
    小吃部位: 小吃类型枚举.药品增强,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.外功基础攻击, 值: 223 }],
  },
  {
    小吃名称: '断浪·中品轻身丹（身法）',
    小吃部位: 小吃类型枚举.药品辅助,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.身法, 值: 246 }],
  },
  {
    小吃名称: '断浪·上品轻身丹（身法）',
    小吃部位: 小吃类型枚举.药品辅助,
    小吃品级: '紫',
    增益集合: [{ 属性: 属性类型.身法, 值: 492 }],
  },
  {
    小吃名称: '断浪·中品大力丸（力道）',
    小吃部位: 小吃类型枚举.药品辅助,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.力道, 值: 246 }],
  },
  {
    小吃名称: '断浪·上品大力丸（力道）',
    小吃部位: 小吃类型枚举.药品辅助,
    小吃品级: '紫',
    增益集合: [{ 属性: 属性类型.力道, 值: 492 }],
  },
  {
    小吃名称: '断浪·煎饼果子（外攻）',
    小吃部位: 小吃类型枚举.食品增强,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.外功基础攻击, 值: 384 }],
  },
  {
    小吃名称: '断浪·太后饼（外攻）',
    小吃部位: 小吃类型枚举.食品增强,
    小吃品级: '紫',
    增益集合: [{ 属性: 属性类型.外功基础攻击, 值: 768 }],
  },
  {
    小吃名称: '强身·秘境·增（外攻）',
    小吃部位: 小吃类型枚举.食品增强,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.外功基础攻击, 值: 173 }],
  },
  {
    小吃名称: '断浪·杂碎汤（身法）',
    小吃部位: 小吃类型枚举.食品辅助,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.身法, 值: 191 }],
  },
  {
    小吃名称: '断浪·杂锦鱼球粥（身法）',
    小吃部位: 小吃类型枚举.食品辅助,
    小吃品级: '紫',
    增益集合: [{ 属性: 属性类型.身法, 值: 382 }],
  },
  {
    小吃名称: '断浪·三鲜汤（力道）',
    小吃部位: 小吃类型枚举.食品辅助,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.力道, 值: 191 }],
  },
  {
    小吃名称: '断浪·三鲜粥（力道）',
    小吃部位: 小吃类型枚举.食品辅助,
    小吃品级: '紫',
    增益集合: [{ 属性: 属性类型.力道, 值: 382 }],
  },
  {
    小吃名称: '断浪·瀑沙磨石（外攻）',
    小吃部位: 小吃类型枚举.武器磨石,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.外功基础攻击, 值: 329 }],
  },
  {
    小吃名称: '断浪·瀑沙熔锭（外攻）',
    小吃部位: 小吃类型枚举.武器磨石,
    小吃品级: '紫',
    增益集合: [{ 属性: 属性类型.外功基础攻击, 值: 658 }],
  },
  {
    小吃名称: '汾酒·旬又三（力道）',
    小吃部位: 小吃类型枚举.家园酒品,
    小吃品级: '紫',
    增益集合: [{ 属性: 属性类型.力道, 值: 256 }],
  },
  {
    小吃名称: '汾酒·六日醉（力道）',
    小吃部位: 小吃类型枚举.家园酒品,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.力道, 值: 192 }],
  },
  {
    小吃名称: '汾酒·今朝醉（力道）',
    小吃部位: 小吃类型枚举.家园酒品,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.力道, 值: 128 }],
  },
  {
    小吃名称: '汾酒（力道）',
    小吃部位: 小吃类型枚举.家园酒品,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.力道, 值: 64 }],
  },
  {
    小吃名称: '关外白酒·旬又三（身法）',
    小吃部位: 小吃类型枚举.家园酒品,
    小吃品级: '紫',
    增益集合: [{ 属性: 属性类型.身法, 值: 256 }],
  },
  {
    小吃名称: '关外白酒·六日醉（身法）',
    小吃部位: 小吃类型枚举.家园酒品,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.身法, 值: 192 }],
  },
  {
    小吃名称: '关外白酒·今朝醉（身法）',
    小吃部位: 小吃类型枚举.家园酒品,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.身法, 值: 128 }],
  },
  {
    小吃名称: '关外白酒（身法）',
    小吃部位: 小吃类型枚举.家园酒品,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.身法, 值: 64 }],
  },
  {
    小吃名称: '葫芦叫花鸡（外攻）',
    小吃部位: 小吃类型枚举.家园菜品,
    小吃品级: '蓝',
    增益集合: [{ 属性: 属性类型.外功基础攻击, 值: 320 }],
  },
  {
    小吃名称: '断浪·葫芦叫花鸡（外攻）',
    小吃部位: 小吃类型枚举.家园菜品,
    小吃品级: '紫',
    增益集合: [{ 属性: 属性类型.外功基础攻击, 值: 480 }],
  },
  {
    小吃名称: '断浪·玉笛谁家听落梅',
    小吃部位: 小吃类型枚举.团队宴席,
    小吃品级: '紫',
    增益集合: [
      { 属性: 属性类型.外功基础攻击, 值: 439 },
      { 属性: 属性类型.全会心等级, 值: 975 },
      { 属性: 属性类型.破招值, 值: 975 },
    ],
  },
  {
    小吃名称: '创意料理（-破招+攻击）',
    小吃部位: 小吃类型枚举.家园菜品,
    小吃品级: '紫',
    增益集合: [
      { 属性: 属性类型.全基础攻击, 值: 866 },
      { 属性: 属性类型.破招值, 值: -858 },
    ],
  },
  {
    小吃名称: '创意料理（-无双+攻击）',
    小吃部位: 小吃类型枚举.家园菜品,
    小吃品级: '紫',
    增益集合: [
      { 属性: 属性类型.全基础攻击, 值: 866 },
      { 属性: 属性类型.无双等级, 值: -858 },
    ],
  },
  {
    小吃名称: '创意料理（-气血+攻击）',
    小吃部位: 小吃类型枚举.家园菜品,
    小吃品级: '紫',
    增益集合: [{ 属性: 属性类型.全基础攻击, 值: 866 }],
  },
  ...通用小药小吃数据,
]

export default 外功小药小吃数据

// {
//   小吃名称: '汾酒（力道）',
//   小吃部位: 小吃类型枚举.家园酒品,
//   小吃品级: '蓝',
//   增益集合: [{ 属性: 属性类型.力道, 值: 64 }],
// },
// {
//   小吃名称: '汾酒·今朝醉（力道）',
//   小吃部位: 小吃类型枚举.家园酒品,
//   小吃品级: '蓝',
//   增益集合: [{ 属性: 属性类型.力道, 值: 128 }],
// },
// {
//   小吃名称: '汾酒·六日醉（力道）',
//   小吃部位: 小吃类型枚举.家园酒品,
//   小吃品级: '蓝',
//   增益集合: [{ 属性: 属性类型.力道, 值: 192 }],
// },
// {
//   小吃名称: '关外白酒（身法）',
//   小吃部位: 小吃类型枚举.家园酒品,
//   小吃品级: '蓝',
//   增益集合: [{ 属性: 属性类型.身法, 值: 64 }],
// },
// {
//   小吃名称: '关外白酒·今朝醉（身法）',
//   小吃部位: 小吃类型枚举.家园酒品,
//   小吃品级: '蓝',
//   增益集合: [{ 属性: 属性类型.身法, 值: 128 }],
// },
// {
//   小吃名称: '关外白酒·六日醉（身法）',
//   小吃部位: 小吃类型枚举.家园酒品,
//   小吃品级: '蓝',
//   增益集合: [{ 属性: 属性类型.身法, 值: 192 }],
// },
