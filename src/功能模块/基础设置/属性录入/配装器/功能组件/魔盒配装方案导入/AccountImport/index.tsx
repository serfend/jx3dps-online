// 根据账号角色导入
// import { getEquipDataByName } from '@/api'
import { Button, Input, Modal, Spin, message } from 'antd'
import React, { useState } from 'react'
import { getEquipData } from './util'
import ServerCascader from '@/组件/ServerCascader'
import { getUIdByName, getEquipDataByUidV3, getEquipDataByUidV1 } from '@/api'
import 获取当前数据 from '@/数据/数据工具/获取当前数据'
import './index.css'

function AccountImport({ onOk }) {
  const [loading, setLoading] = useState(false)
  const [helpVisible, setHelpVisible] = useState(false)
  const [name, changeName] = useState<string>()
  const [server, changeServer] = useState<string>()
  const [data, setData] = useState<any>(undefined)
  const [errorMsg, setErrorMsg] = useState<string>('')

  const handleGetPzData = async (propsName?) => {
    const apiName = propsName || name
    if (!apiName) {
      return
    }
    setLoading(true)
    setData(undefined)
    setErrorMsg('')
    let res: any
    let userInfo: any = ''
    let errorMessage = ''
    try {
      userInfo = await getUIdByName({
        server: server?.[1],
        name: name,
      })?.then((res) => res?.data)
      const 校验 = 校验门派(userInfo?.forceName)
      if (!校验) {
        message.warn(`当前心法由于推烂查不到心法名称可能不匹配，导入时请注意`)
      }
      if (userInfo?.roleId) {
        const request = window?.location?.href?.includes('localhost')
          ? getEquipDataByUidV1
          : getEquipDataByUidV3

        const requestRes: any = await request({
          zone: server?.[0],
          server: server?.[1],
          game_role_id: userInfo?.roleId,
        })

        if (
          requestRes?.data &&
          requestRes?.status === 200 &&
          requestRes?.data?.data?.Equips?.length
        ) {
          res = requestRes?.data
        } else {
          errorMessage = '没有查询到角色信息，清稍后再试'
        }
      } else {
        errorMessage = '没有查询到角色信息，清稍后再试'
      }
    } catch (e) {
      errorMessage = '没有查询到角色信息，清稍后再试'
    }
    setLoading(false)
    if (!errorMessage) {
      const equipData = getPzData(res?.data)
      if (equipData) {
        setData({
          userInfo,
          equipData,
        })
      } else {
        setErrorMsg('没有查询到角色信息，清稍后再试')
      }
    } else {
      setErrorMsg(errorMessage)
    }
    return
  }

  const handleClickImport = () => {
    if (data?.equipData?.equip) {
      onOk(data?.equipData?.equip)
    }
  }

  return (
    <div>
      <div className='account-daoru-input-wrap no-padding'>
        <ServerCascader value={server} onChange={(e) => changeServer(e)} />
        <Input.Search
          className='account-daoru-input-wrap-input'
          value={name}
          loading={loading}
          onChange={(e) => changeName(e.target.value.trim())}
          placeholder='请输入角色名称'
          onPressEnter={(e: any) => {
            if (server?.length) {
              handleGetPzData(e.target.value.trim())
            }
          }}
        />
        {/* <Input
          className='account-daoru-input-wrap-input'
          value={server}
          onChange={(e) => changeServer(e.target.value.trim())}
          placeholder='请输入区服名称'
        /> */}
        <Button
          type='primary'
          disabled={loading || !name || !server?.length}
          onClick={() => handleGetPzData()}
        >
          查询角色
        </Button>
      </div>
      {loading ? (
        <div className='account-daoru-text-wrap'>
          正在获取配装方案
          <Spin style={{ marginLeft: 12 }} spinning={true} />
        </div>
      ) : (
        <>
          {data ? (
            <div className={'account-daoru-success'}>
              <p className='account-daoru-success-tip'>成功获取配装方案</p>
              <div className='account-daoru-success-content'>
                <div className='account-daoru-success-info'>
                  <img
                    className='account-daoru-success-avatar'
                    src={data?.userInfo?.personAvatar}
                    alt=''
                  />
                  <div className='account-daoru-text-content'>
                    <div className='account-daoru-success-title' title={data?.showData?.title}>
                      {data?.userInfo?.roleName}
                    </div>
                    {`${data?.userInfo?.bodyName} | ${data?.userInfo?.serverName} | 
                      ${data?.userInfo?.forceName}`}
                  </div>
                  <Button type='primary' onClick={handleClickImport}>
                    导入
                  </Button>
                </div>
              </div>
              {data?.equipData?.未识别装备列表?.length ||
              data?.equipData?.未内置附魔列表?.length ? (
                <div className={'account-daoru-res-tips'}>
                  <h1 className={'account-daoru-res-tips-title'}>
                    存在以下信息未识别，导入后请手动修改
                  </h1>
                  {data?.equipData?.未识别装备列表?.length ? (
                    <div className={'account-daoru-res-tips-text'}>
                      <p className={'account-daoru-res-tips-name'}>未识别装备：</p>
                      {data?.equipData?.未识别装备列表?.join('、')}
                    </div>
                  ) : null}
                  {data?.equipData?.未内置附魔列表?.length ? (
                    <div className={'account-daoru-res-tips-text'}>
                      <p className={'account-daoru-res-tips-name'}>未支持附魔：</p>
                      {data?.equipData?.未内置附魔列表?.join('、')}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}
          {errorMsg ? (
            <div className='account-daoru-text-wrap account-daoru-text-error'>{errorMsg}</div>
          ) : null}
        </>
      )}
      <Modal
        footer={null}
        title='如何获取角色UID'
        open={helpVisible}
        onCancel={() => setHelpVisible(false)}
      >
        {/* <p>
          1、打开你的配装方案，点击导出。
          <Image className='account-daoru-help-img' src={Img_Help_1} />
        </p>
        <p>
          2、选择数据版,复制配装ID.
          <Image className='account-daoru-help-img' src={Img_Help_2} />
        </p> */}
      </Modal>
    </div>
  )
}

export default AccountImport

// 获取配装数据
const getPzData = (data) => {
  // 获取展示信息
  if (data) {
    const res = getEquipData(data)
    console.log('res', res)
    if (Object.keys(res?.equip)?.length !== 0) {
      return res
    } else return null
  }
  return null
}

const 校验门派 = (校验名称) => {
  const { 简写 } = 获取当前数据()
  if (简写 === 'shxj') {
    return 校验名称 === '万灵山庄'
  } else if (简写 === 'lhj') {
    return 校验名称 === '蓬莱'
  } else if (简写 === 'txj') {
    return 校验名称 === '衍天宗'
  } else if (简写 === 'gfj') {
    return 校验名称 === '刀宗'
  } else if (简写 === 'w_gfj') {
    return 校验名称 === '刀宗'
  } else if (简写 === 'wf') {
    return 校验名称 === '药宗'
  } else if (简写 === 'hjy') {
    return 校验名称 === '万花'
  }
  return false
}
