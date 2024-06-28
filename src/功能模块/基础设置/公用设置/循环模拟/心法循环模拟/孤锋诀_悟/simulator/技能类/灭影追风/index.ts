// import 循环主类 from '../main'
import { 每秒郭氏帧 } from '../../../constant'
import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 灭影追风 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '灭影追风')

  constructor(模拟循环) {
    super(模拟循环)

    this.初始化技能运行数据(灭影追风.技能数据)
  }

  减少调息时间(减少时间) {
    const 层数 = this.技能运行数据.当前层数
    const 计划下次充能时间点 = this.技能运行数据.计划下次充能时间点 || 0
    // 没有层数才需要处理
    if (!层数 && 计划下次充能时间点) {
      const 减少后充能节点 = Math.max(计划下次充能时间点 - 每秒郭氏帧 * 减少时间, 0)
      if (减少后充能节点 <= (this.模拟循环.当前时间 || 0)) {
        this.技能运行数据 = {
          当前层数: 1,
        }
      } else {
        this.技能运行数据 = {
          ...this.技能运行数据,
          计划下次充能时间点: 减少后充能节点,
        }
      }
      this.模拟循环.添加战斗日志?.({
        日志: `行3触发满锐减CD，灭影追风释放CD时间变为${减少后充能节点}`,
        日志类型: '技能释放结果',
      })
    }
  }

  命中() {
    this.模拟循环.添加buff?.({ 名称: '灭影追风·悟', 对象: '自身' })
    this.保存释放记录()
  }

  释放() {
    this.释放技能回复锐意(30, '灭影追风·悟')
  }

  释放后() {
    this.减少绝技技能CD(3)
  }

  保存释放记录() {
    const 造成buff数据 = this.获取施加重要buff信息('灭影追风·悟')
    this.本次释放记录 = 造成buff数据 ? { 造成buff数据 } : {}
  }
}

export default 灭影追风

export const 灭影随风类型 = typeof 灭影追风
