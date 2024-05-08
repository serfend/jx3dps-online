// import 赛季范围数据 from './赛季范围数据.json'

// 装备导入
export const 接口装备数据格式化 = (list,赛季范围数据) => {
  const 装备列表 = list.map((item) => {
    const wuqishanghaiObj = {}
    const isWuqi =
      item.Base1Type === 'atMeleeWeaponDamageBase' && item.Base2Type === 'atMeleeWeaponDamageRand'
    if (isWuqi) {
      wuqishanghaiObj.武器伤害_最小值 = +item.Base1Min
      wuqishanghaiObj.武器伤害_最大值 = +item.Base1Min + +item.Base2Min
    }
    const name = item.Name || '数据丢失-未知'

    const 装备特效 = 判断装备特效(item,赛季范围数据)
    return {
      id: item.ID,
      uid: item.UiID,
      装备名称: name,
      装备品级: item.Level,
      ...wuqishanghaiObj,
      ...(装备特效 ? { 装备特效 } : null),
      装备类型:
        item.GetType === 'PVX'
          ? '装备类型枚举.PVX'
          : isWuqi
          ? +item.MaxStrengthLevel === 4
            ? `装备类型枚举.特效武器`
            : +item.MaxStrengthLevel === 6
            ? `装备类型枚举.普通`
            : +item.MaxStrengthLevel === 8
            ? `装备类型枚举.大CW`
            : `装备类型枚举.小CW`
          : 装备特效?.toString()?.includes('切糕')
          ? `装备类型枚举.切糕`
          : 装备特效?.toString()?.includes('门派套装')
          ? `装备类型枚举.门派套装`
          : +item.MaxStrengthLevel === 4
          ? `装备类型枚举.副本精简`
          : +item.MaxStrengthLevel === 3
          ? `装备类型枚举.试炼精简`
          : +item.MaxStrengthLevel === 8
          ? `装备类型枚举.橙戒`
          : +item.MaxStrengthLevel === 6
          ? `装备类型枚举.普通`
          : `未匹配`,
      装备增益: Object.keys(item)
        .filter((key) => key.includes('_Magic'))
        .map((key) => {
          if (item[key]) {
            return getZengyi(item[key])
          } else {
            return null
          }
        })
        .filter((item) => item?.属性 !== '未匹配')
        .filter((a) => a),
      镶嵌孔数组: Object.keys(item)
        .filter((key) => key.includes('_DiamondAttributeID'))
        .map((key) => {
          return getXiangqian(item[key])
        })
        .filter((a) => a),
    }
  })
  return 装备列表
}

const getZengyi = ({ attr }) => {
  if (attr?.length) {
    return {
      属性: ShuxingMeiju[attr?.[0]] || '未匹配',
      值: +attr?.[1],
    }
  } else {
    return null
  }
}

const getXiangqian = (data) => {
  if (data?.length) {
    return {
      镶嵌类型: 镶嵌名称枚举[data?.[0]],
    }
  } else {
    return null
  }
}


// 判断该装备能造成什么特效伤害
export const 判断装备特效 = (item,赛季范围数据) => {
  let 特效效果 = undefined
  // 大CW
  if (item.BelongMap === '橙武') {
    特效效果 = "装备特效枚举.大橙武特效"
  }
  // 小CW
  if (item.BelongMap?.includes('小橙武')) {
    Object.keys(item).forEach((key) => {
      if (key.includes('_Magic')) {
        const data = item[key]?.attr
        if (data?.[0] === 'atSetEquipmentRecipe') {
          特效效果 = "装备特效枚举.小橙武特效"
        }
      }
    })
    特效效果 = "装备特效枚举.大橙武特效"
  }
  // 特效腰坠
  if (item.SubType === 7) {
    if (item?._SkillDesc?.includes('大幅度提升自身')) {
      if (item.Level > 赛季范围数据.赛季英雄普通区分品级) {
        特效效果 = "装备特效枚举.风特效腰坠_英雄"
      } else {
        特效效果 = "装备特效枚举.风特效腰坠"
      }
    }
  }
  if (item.GetType === '生活技能') {
    if (item._SetData) {
      Object.keys(item._SetData).forEach((key) => {
        if (item._SetData[key]?.attr?.[0] === 'atAllTypeCriticalStrike') {
          if (item.Level > 赛季范围数据.赛季英雄普通区分品级) {
            特效效果 = "装备特效枚举.切糕_英雄"
          } else {
            特效效果 = "装备特效枚举.切糕_普通"
          }
        }
      })
    }
  }
  if (item.BelongSchool !== '精简' && item.BelongSchool !== '通用') {
    if (item.GetType === '道具换取' && item.Name?.includes('·')) {
      if (item.Level > 赛季范围数据.赛季英雄普通区分品级) {
        特效效果 = "装备特效枚举.门派套装_英雄"
      } else {
        特效效果 = "装备特效枚举.门派套装_普通"
      }
    }
  }
  if (item.BelongSchool !== '精简' && item.BelongSchool !== '通用') {
    if (item.GetType === '活动' && item.Name?.includes('·')) {
      特效效果 = "装备特效枚举.冬至套装"
    }
  }
  if (item.BelongMap?.includes('龙门飞剑')) {
    特效效果 = "装备特效枚举.龙门飞剑武器"
  }
  if (!特效效果) {
    Object.keys(item).forEach((key) => {
      if (key.includes('_Magic')) {
        const data = item[key]?.label
        if (data?.includes('水·灭虚')) {
          if (item.Level > 赛季范围数据.赛季英雄普通区分品级) {
            特效效果 = "装备特效枚举.内功_水特效武器_英雄"
          } else {
            特效效果 = "装备特效枚举.内功_水特效武器"
          }
        } else if (data?.includes('水·斩流')) {
          if (item.Level > 赛季范围数据.赛季英雄普通区分品级) {
            特效效果 = "装备特效枚举.外功_水特效武器_英雄"
          } else {
            特效效果 = "装备特效枚举.外功_水特效武器"
          }
        }
      }
    })
  }
  return 特效效果
}

// 属性类型枚举（转化魔盒的属性类型为本地属性类型
const ShuxingMeiju = {
  atVitalityBase: '属性类型.体质',
  atStrengthBase: '属性类型.力道',
  atAgilityBase: '属性类型.身法',
  atSpunkBase: '属性类型.元气',
  atSpiritBase: '属性类型.根骨',
  atHasteBase: '属性类型.加速等级',
  atStrainBase: '属性类型.无双等级',
  atPVXAllRound: '属性类型.全能等级',
  atSurplusValueBase: '属性类型.破招值',
  atMeleeWeaponDamageBase: '属性类型.武器伤害',
  atPhysicsAttackPowerBase: '属性类型.外功基础攻击',
  atPhysicsCriticalStrike: '属性类型.外功会心等级',
  atPhysicsCriticalDamagePowerBase: '属性类型.外功会心效果等级',
  atPhysicsOvercomeBase: '属性类型.外功破防等级',
  atMagicAttackPowerBase: '属性类型.内功基础攻击',
  atMagicCriticalStrike: '属性类型.内功会心等级',
  atMagicCriticalDamagePowerBase: '属性类型.内功会心效果等级',
  atMagicOvercomeBase: '属性类型.内功破防等级',
}

const 镶嵌名称枚举 = {
  atVitalityBase: '镶嵌增伤类型枚举.体质',
  atStrengthBase: '镶嵌增伤类型枚举.力道',
  atAgilityBase: '镶嵌增伤类型枚举.身法',
  atSpunkBase: '镶嵌增伤类型枚举.元气',
  atSpiritBase: '镶嵌增伤类型枚举.根骨',
  atMaxLifeAdditional: '镶嵌增伤类型枚举.气血',
  atStrainBase: '镶嵌增伤类型枚举.无双',
  atPVXAllRound: '镶嵌增伤类型枚举.全能',
  atSurplusValueBase: '镶嵌增伤类型枚举.破招',
  atPhysicsAttackPowerBase: '镶嵌增伤类型枚举.外攻',
  atPhysicsCriticalStrike: '镶嵌增伤类型枚举.会心',
  atPhysicsCriticalDamagePowerBase: '镶嵌增伤类型枚举.会效',
  atPhysicsOvercomeBase: '镶嵌增伤类型枚举.破防',
  atMagicAttackPowerBase: '镶嵌增伤类型枚举.内攻',
  atMagicCriticalStrike: '镶嵌增伤类型枚举.会心',
  atMagicCriticalDamagePowerBase: '镶嵌增伤类型枚举.会效',
  atMagicOvercomeBase: '镶嵌增伤类型枚举.破防',
}
