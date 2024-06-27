export const 快捷添加数据: 快捷添加数据类型[] = [
  {
    名称: '横留横',
    技能序列: ['横云势·一', '留客雨', '横云势·二'],
    color: 'blue',
  },
  {
    名称: '停留',
    技能序列: ['停云势', '留客雨'],
    color: 'purple',
  },
  {
    名称: '行行行',
    技能序列: ['行云势·一', '行云势·二', '行云势·三'],
    color: 'magenta',
  },
  {
    名称: '灭孤',
    技能序列: ['灭影追风', '孤风破浪'],
    color: 'red',
  },
]

export interface 快捷添加数据类型 {
  名称: string
  技能序列: string[]
  color?: string
}
