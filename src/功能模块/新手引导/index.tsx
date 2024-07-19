import { useAppDispatch, useAppSelector } from '@/hooks'
import {
  切换配装器弹窗显示状态,
  更新增益面板显示状态,
  更新当前引导步骤,
  更新新手引导流程状态,
} from '@/store/system'
import 获取当前数据 from '@/数据/数据工具/获取当前数据'
import { Tour } from 'antd'
import { useMemo } from 'react'

const { 缓存映射 } = 获取当前数据()

const 新手引导 = () => {
  const 新手引导流程状态 = useAppSelector((state) => state.system.新手引导流程状态)
  const 当前引导步骤 = useAppSelector((state) => state.system.当前引导步骤)
  const dispatch = useAppDispatch()

  const 修改引导状态 = (e) => {
    dispatch(更新新手引导流程状态(e))
  }

  const 修改引导步骤 = (e) => {
    // 如果点击进入第二步
    if (e === 0) {
      dispatch(切换配装器弹窗显示状态(false))
      dispatch(更新当前引导步骤(e))
    } else if (当前引导步骤 === 0 && e === 1) {
      dispatch(切换配装器弹窗显示状态(true))
      setTimeout(() => {
        dispatch(更新当前引导步骤(e))
      }, 500)
    } else if (当前引导步骤 === 6 && e === 5) {
      dispatch(切换配装器弹窗显示状态(true))
      setTimeout(() => {
        dispatch(更新当前引导步骤(e))
      }, 200)
    } else if (当前引导步骤 === 5 && e === 6) {
      dispatch(切换配装器弹窗显示状态(false))
      dispatch(更新当前引导步骤(e))
    } else if (当前引导步骤 === 8 && e === 9) {
      dispatch(更新增益面板显示状态(true))
      setTimeout(() => {
        dispatch(更新当前引导步骤(e))
      }, 200)
    } else {
      dispatch(更新当前引导步骤(e))
    }
  }

  const steps = useMemo(() => {
    return [
      {
        title: '点击打开配装器',
        description: '配装器内置本赛季装备，仅支持选择本心法和通用装备',
        target: () => document.getElementById('Guide_1') as any,
      },
      {
        title: '配装导入',
        description: '您可以在这里直接导入游戏角色配装/魔盒配装方案',
        target: () => document.getElementById('Guide_2') as any,
      },
      {
        title: '手动修改配装',
        description: '在这里手动修改对应的装备、精炼、镶嵌、附魔',
        target: () => document.getElementById('Guide_3') as any,
      },
      {
        title: '装备搜索',
        description: '装备选择额外支持输入装备名、属性、品级进行搜索',
        target: () => document.getElementById('Guide_4') as any,
      },
      {
        title: '智能对比',
        description: (
          <div>
            <p>开启智能对比功能可以帮助你快速的在同位置进行比较</p>
            <p>注意，比较时橙武不会自动切换循环</p>
          </div>
        ),
        target: () => document.getElementById('Guide_5') as any,
      },
      {
        title: '保存并计算',
        description: (
          <div>
            <p>修改装备后，点击「保存并计算」更新装备和进行伤害计算</p>
            <p>注意，如未保存直接关闭弹窗，您修改的装备不会保存</p>
          </div>
        ),
        target: () => document.getElementById('Guide_6') as any,
      },
      {
        title: '计算结果秒伤',
        description: (
          <div>
            <p>这里显示当前计算出的每伤伤害期望</p>
          </div>
        ),
        target: () => document.getElementById('Guide_7') as any,
      },
      {
        title: '属性收益',
        description: (
          <div>
            <p>表示当前情况下各属性的收益，从左到右收益由高到低。</p>
          </div>
        ),
        target: () => document.getElementById('Guide_8') as any,
      },
      {
        title: '增益详情',
        description: (
          <div>
            <p>点击此按钮可以展开/收起增益详情</p>
          </div>
        ),
        target: () => document.getElementById('Guide_9') as any,
      },
      {
        title: '增益面板',
        description: (
          <div>
            <p>增益面板包含小吃小药、阵眼、团队增益等。</p>
            <p>注意，要开启「是否启用」才会在计算时计算增益</p>
          </div>
        ),
        placement: 'right',
        target: () => document.getElementById('Guide_10') as any,
      },
      {
        title: '切换心法',
        description: (
          <div>
            <p>最后，如何你想要计算其他心法，可以在这里进行切换</p>
            <p>新手引导完毕，祝您使用愉快，希望对您有所帮助。</p>
            <p>在使用中遇到问题，请至魔盒计算器帖下留言反馈</p>
          </div>
        ),
        target: () => document.getElementById('Guide_11') as any,
        nextButtonProps: {
          children: '教程结束',
        },
      },
    ] as any
  }, [])

  return (
    <Tour
      current={当前引导步骤}
      open={新手引导流程状态}
      onChange={修改引导步骤}
      onClose={() => {
        修改引导状态(false)
        修改引导步骤(0)
        localStorage.setItem(缓存映射.新手引导, 'true')
      }}
      onFinish={() => {
        修改引导步骤(0)
        localStorage.setItem(缓存映射.新手引导, 'true')
      }}
      steps={steps}
    />
  )
}

export default 新手引导
