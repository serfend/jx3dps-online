import { 属性简写枚举 } from '@/@types/枚举'
import 获取当前数据 from '@/数据/数据工具/获取当前数据'

const { 附魔 } = 获取当前数据()

// 获取配装数据
export const getEquipData = (data) => {
  const equip: any = {}
  let msg = ''
  try {
    Object.keys(data).map((item) => {
      if (EquipPositionMap[item]) {
        const basicData = data[item]
        const 附魔属性 = basicData?.enhance?.Attribute1ID
        const 附魔值 = basicData?.enhance?.Attribute1Value1

        const 附魔数据判断 = 附魔?.find((item) => item?.附魔名称 === `${附魔属性}+${附魔值}`)
        if (!属性简写枚举[附魔属性]) {
          console.warn(`存在计算器未内置附魔${附魔属性}${附魔值}`)
        }
        if (
          !附魔数据判断 &&
          属性简写枚举[附魔属性] &&
          !['atVitalityBase', 'atDecriticalDamageBase', 'atToughnessBase'].includes(附魔属性)
        ) {
          console.warn(`存在计算器未内置附魔${附魔属性}${附魔值}，已跳过。不影响导入。`)
        }
        equip[EquipPositionMap[item]] = {
          当前精炼等级: basicData?.strength,
          id: basicData?.equip.ID,
          装备部位: EquipPositionMap[item].split('_')?.[0],
          镶嵌孔数组: basicData?.embedding?.map((a) => {
            if (!属性简写枚举[a?.raw?.[0]]) {
              console.warn(`存在计算器未内置镶嵌孔${a?.raw?.[0]}`)
            }
            return {
              镶嵌类型: 属性简写枚举[a?.raw?.[0]],
              镶嵌宝石等级: a?.level,
            }
          }),
          附魔: 属性简写枚举[附魔属性] && 附魔值 ? `${属性简写枚举[附魔属性]}+${附魔值}` : '',
        }

        // 判断大附魔
        if (DaFuMoMap[item] && !!basicData?.enchant) {
          equip[DaFuMoMap[item]] = 1
        }

        if (item === 'PRIMARY_WEAPON' && basicData?.stone) {
          equip.五彩石 = basicData?.stone.Name
        }
      }
    })
  } catch (e) {
    msg = '获取方案异常'
  }
  return {
    equip,
    errorMsg: msg ? (
      <span>
        <p>{msg}</p>
        {/* <p>请联系计算器作者（QQ：372103645）并提供异常的配装ID</p> */}
      </span>
    ) : null,
  }
}

const DaFuMoMap = {
  HAT: '大附魔_伤帽',
  JACKET: '大附魔_伤衣',
  BELT: '大附魔_伤腰',
  WRIST: '大附魔_伤腕',
  SHOES: '大附魔_伤鞋',
}

const EquipPositionMap = {
  HAT: '帽子_1',
  JACKET: '衣服_2',
  BELT: '腰带_3',
  WRIST: '护腕_4',
  BOTTOMS: '下装_5',
  SHOES: '鞋子_6',
  NECKLACE: '项链_7',
  PENDANT: '腰坠_8',
  RING_1: '戒指_9',
  RING_2: '戒指_10',
  SECONDARY_WEAPON: '暗器_11',
  PRIMARY_WEAPON: '武器_12',
}
