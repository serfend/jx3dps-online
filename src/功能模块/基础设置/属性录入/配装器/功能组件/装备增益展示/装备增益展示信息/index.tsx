import React, { useMemo } from 'react'
import './index.css'

function 装备增益展示信息({ 增益类型, data }: { 增益类型: string; data }) {
  const 增益简写 = useMemo(() => {
    switch (增益类型) {
      case '套装技能':
      case '冬至套装':
      case '大橙武特效':
      case '小橙武特效':
        return 增益类型
      case '切糕会心':
      case '切糕会心_英雄':
        return '切糕会心'
      case '切糕无双':
      case '切糕无双_英雄':
        return '切糕无双'
      case '套装会心会效':
        return '套装双会'
      case '风特效腰坠':
      case '风特效腰坠_英雄':
        return '特效腰坠'
      case '水特效武器':
      case '水特效武器_英雄':
        return '特效武器'
      case '龙门飞剑武器':
        return '龙门飞剑'
      default:
        return ''
    }
  }, [增益类型])
  return (
    <div className='zhuangbei-zengyi-item'>
      <div className='zhuangbei-zengyi-label'>{增益简写}</div>
      <div className={`zhuangbei-zengyi-value ${data ? 'zhuangbei-zengyi-value-open' : ''}`}>
        {data ? '开启' : '关闭'}
      </div>
    </div>
  )
}

export default 装备增益展示信息
