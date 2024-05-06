/**
 * 剑3内置的属性名对照表
 * 参考文章：https://www.jx3box.com/tool/8137
 * 具体该技能/Buff加成类型请自行查阅对应属性名称
 */

/**
 * @description 属性说明
 *
 * 基础数值
 * - 没有加“郭氏”和“百分比”的数值，为具体数值
 *
 * 郭氏XX
 * - 郭氏XX代表 该值在实际计算时参与 郭氏计算
 * - 公式：值 / 1024
 * - 即：剑纯阵眼会心效果 郭氏值为 150，实际会心效果加成为 150 / 1024
 *
 * XX百分比
 * - XX百分比代表直接百分比计算，常见于会心加成
 * - 公式：值 / 10000
 * - 即：门派套装 外功会心百分比 400，实际加成为 400 / 10000 (4%)
 */

export enum 属性类型 {
  // 基础属性
  全属性 = 'atBasePotentialAdd',
  体质 = 'atVitalityBase',
  力道 = 'atStrengthBase',
  元气 = 'atSpunkBase',
  身法 = 'atAgilityBase',
  根骨 = 'atSpiritBase',
  郭氏体质 = 'atVitalityBasePercentAdd',
  郭氏力道 = 'atStrengthBasePercentAdd',
  郭氏身法 = 'atAgilityBasePercentAdd',
  郭氏根骨 = 'atSpiritBasePercentAdd',
  郭氏元气 = 'atSpunkBasePercentAdd',

  // 会心
  全会心等级 = 'atAllCriticalStrike',
  全会心等级百分比 = 'atAllCriticalStrikeBaseRate',
  内功会心等级 = 'atMagicCriticalStrike',
  外功会心等级 = 'atPhysicsCriticalStrike',
  混元内功会心等级 = 'atNeutralCriticalStrike',
  阳性内功会心等级 = 'atSolarCriticalStrike',
  毒性内功会心等级 = 'atPoisonCriticalStrike',
  阴性内功会心等级 = 'atLunarCriticalStrike',
  所有会心等级 = 'atAllTypeCriticalStrike',
  外功会心百分比 = 'atPhysicsCriticalStrikeBaseRate',
  阴性内功会心百分比 = 'atLunarCriticalStrikeBaseRate',
  混元内功会心百分比 = 'atNeutralCriticalStrikeBaseRate',
  阳性内功会心百分比 = 'atSolarCriticalStrikeBaseRate',
  毒性内功会心百分比 = 'atPoisonCriticalStrikeBaseRate',

  // 会心效果
  全会心效果等级 = 'atAllTypeCriticalDamagePowerBase',
  郭氏全会心效果 = 'atAllCriticalDamagePowerBaseKiloNumRate',
  外功会心效果等级 = 'atPhysicsCriticalDamagePowerBase',
  内功会心效果等级 = 'atMagicCriticalDamagePowerBase',
  郭氏外功会心效果 = 'atPhysicsCriticalDamagePowerBaseKiloNumRate',
  郭氏内功会心效果 = 'atMagicCriticalDamagePowerBaseKiloNumRate',
  郭氏阴性内功会心效果 = 'atLunarCriticalDamagePowerBaseKiloNumRate',
  郭氏阳性内功会心效果 = 'atSolarCriticalDamagePowerBaseKiloNumRate',
  郭氏混元内功会心效果 = 'atNeutralCriticalDamagePowerBaseKiloNumRate',
  郭氏毒性内功会心效果 = 'atPoisonCriticalDamagePowerBaseKiloNumRate',

  // 破防
  全破防等级 = 'atAllOvercome',
  郭氏全破防等级 = 'atAllOvercomePercent',
  内功基础破防等级 = 'atMagicOvercome',
  外功基础破防等级 = 'atPhysicsOvercomeBase',
  毒性内功破防等级 = 'atPoisonOvercomeBase',
  混元内功破防等级 = 'atNeutralOvercomeBase',
  阳性内功破防等级 = 'atSolarOvercomeBase',
  阴性内功破防等级 = 'atLunarOvercomeBase',
  阳性及阴性破防等级 = 'atSolarAndLunarOvercomeBase',
  郭氏外功基础破防等级 = 'atPhysicsOvercomePercent',
  郭氏阳性内功基础破防 = 'atSolarOvercomePercent',
  郭氏毒性内功基础破防 = 'atPoisonOvercomePercent',
  郭氏混元内功基础破防 = 'atNeutralOvercomePercent',
  郭氏阴性内功基础破防 = 'atLunarOvercomePercent',

  // 基础攻击
  全基础攻击 = 'allAttackPowerBase',
  郭氏全基础攻击 = 'allAttackPowerPercent',
  外功基础攻击 = 'atPhysicsAttackPowerBase',
  郭氏外功基础攻击 = 'atPhysicsAttackPowerPercent',
  内功基础攻击 = 'atMagicAttackPowerBase',
  郭氏内功基础攻击 = 'atMagicAttackPowerPercent',
  毒性内功基础攻击 = 'atPoisonAttackPowerBase',
  阳性内功基础攻击 = 'atSolarAttackPowerBase',
  混元内功基础攻击 = 'atNeutralAttackPowerBase',
  阴性内功基础攻击 = 'atLunarAttackPowerBase',
  郭氏阴性内功基础攻击 = 'atLunarAttackPowerPercent',
  郭氏毒性内功基础攻击 = 'atPoisonAttackPowerPercent',
  郭氏混元内功基础攻击 = 'atNeutralAttackPowerPercent',
  郭氏阳性内功基础攻击 = 'atSolarAttackPowerPercent',

  // 无视防御
  外功基础防御等级 = 'atPhysicsShieldBase',
  郭氏外功基础防御等级 = 'atPhysicsShieldPercent',
  额外外功防御等级 = 'atPhysicsShieldAdditional',
  内功基础防御等级 = 'atMagicShield',
  阴性内功防御等级 = 'atLunarMagicShieldBase',
  毒性内功防御等级 = 'atPoisonMagicShieldBase',
  阳性内功防御等级 = 'atSolarMagicShieldBase',
  混元内功防御等级 = 'atNeutralMagicShieldBase',
  郭氏阳性内功基础防御 = 'atSolarMagicShieldPercent',
  郭氏阴性内功基础防御 = 'atLunarMagicShieldPercent',
  郭氏混元内功基础防御 = 'atNeutralMagicShieldPercent',
  郭氏毒性内功基础防御 = 'atPoisonMagicShieldPercent',
  郭氏无视防御 = 'atAllShieldIgnorePercent',
  // 面板攻击
  面板攻击 = 'toPhysicsAttackPowerCof',
  // 加速等级
  加速等级 = 'atHasteBase',
  郭氏加速等级 = 'atHasteBasePercentAdd',
  郭氏突破上限加速 = 'atUnlimitHasteBasePercentAdd',
  // 破招无双全能
  全能等级 = 'atPVXAllRound',
  破招值 = 'atSurplusValueBase',
  无双等级 = 'atStrainBase',
  郭氏无双 = 'atStrainRate', // 这两个比较特殊，暂时加在一起计算
  无双等级百分比 = 'atStrainPercent', // 这两个比较特殊，暂时加在一起计算
  // 武器伤害
  武器伤害 = 'atMeleeWeaponDamageBase',
  郭氏武器伤害 = 'atMeleeWeaponDamagePercent',
  // 技能增伤 同类增伤相加计算，系数增伤相乘计算。具体看计算公式
  通用增伤 = 'a',
  易伤增伤 = 'b',
  非侠增伤 = 'c',
  技能系数 = 'd',
}

export interface 属性加成 {
  属性: 属性类型
  值: number
}
