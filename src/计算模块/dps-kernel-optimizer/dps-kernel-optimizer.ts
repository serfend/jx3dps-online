import { optimizationTool } from './optimization-tool'
import 循环秒伤计算 from '../循环秒伤计算'
import { 装备信息数据类型 } from '@/@types/装备'
import { 循环技能详情 } from '@/@types/循环'
import { 目标属性类型 } from '@/@types/常量'
import { 快照类型, 技能基础数据模型 } from '@/@types/技能'
import { 增益选项数据类型 } from '@/@types/团队增益'

interface DpsKernelOptimizerParams {
  // 以下为获取dps结果的的基本必要参数集
  计算循环: 循环技能详情[]
  当前装备信息: 装备信息数据类型
  当前输出计算目标: 目标属性类型
  技能基础数据: 技能基础数据模型[]
  增益数据: 增益选项数据类型
  增益启用: boolean
  快照计算: 快照类型[]
}

// 计算dps最大期望值的算法
const DpsKernelOptimizer = ({
  计算循环,
  当前装备信息,
  当前输出计算目标,
  技能基础数据,
  增益启用,
  增益数据,
  快照计算,
}: DpsKernelOptimizerParams) => {
  // 当前计算环境下的原属性总量
  const 当前装备基础信息 = { ...当前装备信息 }
  /**
   * @name 传入BFGS算法的目标函数
   * !假定当前已经穿上装备的属性总量中，会心+破防的总量不变。无双+破招的总量不变
   * !动态计算会心在会心+破防的总量以及无双在无双+破招的总量中的占比，
   * !以获得在当前宗莲不变时不同占比下的最高dps
   * @param x
   * @params x[0] 代表会心比例 即会心在会心+破防总量中的占比
   * @params x[1] 代表无双比例 即会心在会心+破防总量中的占比
   * @returns number
   */

  const getDpsFunction = (x) => {
    const 新装备信息 = getNewCharacterData(当前装备基础信息, x?.[0], x?.[1])
    const { 总伤 } = 循环秒伤计算({
      计算循环,
      装备信息: 新装备信息,
      当前目标: 当前输出计算目标,
      技能基础数据,
      增益启用,
      增益数据,
      是否郭氏计算: false,
      战斗时间: 300, // 这里只需要算总dps，算固定300秒的dps
      快照计算,
    })

    // 由于dps太大，导致用1除灰远小于计算容差，所以这里取一个较大的值去除以最终结果。以达到dps越大最终结果越小的目的，用于算法计算
    return 100000000 / 总伤
  }
  const maxObj = optimizationTool({ getDpsFunction, initialGuess: [0.5, 0.5], tol: 1e-12 })

  const maxCharacterData = getNewCharacterData(
    当前装备基础信息,
    maxObj?.solution?.[0],
    maxObj?.solution?.[1]
  )

  return { maxCharacterData, maxObj }
}

/**
 * @name getNewCharacterData
 * @params x[0] 代表会心比例 即会心在会心+破防总量中的占比
 * @params x[1] 代表无双比例 即会心在会心+破防总量中的占比
 * @returns CharacterFinalDTO
 */

const getNewCharacterData = (当前装备信息: 装备信息数据类型, 会心比例, 无双比例) => {
  const 当前基础面板 = 当前装备信息?.装备基础属性
  let startDTO = { ...当前基础面板 }

  let 新会心等级 = startDTO?.会心等级
  let 新破防等级 = startDTO?.破防等级

  let 新无双等级 = startDTO?.无双等级
  let 新破招值 = startDTO?.破招值

  if (会心比例 >= 0 && 会心比例 <= 1 && 无双比例 >= 0 && 无双比例 <= 1) {
    const 会心破防总量 = startDTO?.会心等级 + startDTO?.破防等级
    新会心等级 = 会心破防总量 * 会心比例
    新破防等级 = 会心破防总量 - 新会心等级

    const 无双破招总量 = startDTO?.无双等级 + startDTO?.破招值
    新无双等级 = 无双破招总量 * 无双比例
    新破招值 = 无双破招总量 - 新无双等级
  } else {
    startDTO = {
      ...startDTO,
      面板攻击: 0,
      会心等级: 0,
      破防等级: 0,
      无双等级: 0,
      破招值: 0,
    }
    新会心等级 = 0
    新破防等级 = 0
    新无双等级 = 0
    新破招值 = 0
  }

  return {
    ...当前装备信息,
    装备基础属性: {
      ...startDTO,
      会心等级: 新会心等级,
      破防等级: 新破防等级,
      无双等级: 新无双等级,
      破招值: 新破招值,
    },
  }
}

export default DpsKernelOptimizer
