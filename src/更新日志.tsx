export default [
  {
    version: '[雾海寻龙] 1.1.11',
    date: '2024-07-17 16:30:00',
    content: [
      '综合-功能',
      <p style={{ paddingLeft: 12 }} key='1.1.11.1'>
        <p>页面右下角新增「数据迁移」功能，方便在不同网址、客户端中同步数据</p>
      </p>,
      '综合-重构',
      <p style={{ paddingLeft: 12 }} key='1.1.11.2'>
        <p>重构计算函数对技能增益的计算函数</p>
        <p>
          大幅提升计算效率，在花间、蓬莱等循环较为复杂的情况下以及勾选团队增益情况下性能提升明显，约有50%提升。
        </p>
        <p>放开花间游、凌海诀的优化算法功能。若后续发现依然卡死再关闭</p>
      </p>,
      '综合-Bug',
      <p style={{ paddingLeft: 12 }} key='1.1.11.3'>
        <p>修复了「归去来棍·悟」的数值错误</p>
      </p>,
      <p style={{ paddingLeft: 12, color: 'red' }} key='1.1.11.3'>
        本次重构代码较为底层，若有问题请及时反馈
      </p>,
    ],
  },
  {
    version: '[雾海寻龙] 1.1.10',
    date: '2024-07-13 20:30:00',
    content: [
      '综合',
      <p style={{ paddingLeft: 12 }} key='1.1.10.1'>
        <p>角色配装导入额外支持按角色id查询</p>
        <p>仙王蛊鼎增伤修订为「15%」</p>
      </p>,
      '山海心诀·悟',
      <p style={{ paddingLeft: 12 }} key='1.1.10.2'>
        <p>更新了十九停「珠海哥」打的JCL生成的循环</p>
        <p>目前看大部分情况下2动物比3动物更高</p>
      </p>,
    ],
  },
  {
    version: '[雾海寻龙] 1.1.9',
    date: '2024-07-12 15:30:00',
    content: [
      '无方·悟',
      <p style={{ paddingLeft: 12 }} key='1.1.9.2'>
        <p>新增无方·悟心法</p>
        <p>内置四个循环为「长倦」打的手动循环。为1段加速计算</p>
        <p style={{ color: 'red' }}>默认按「鬼门·悟」50%覆盖计算，如不计算鬼门可手动修改奇穴</p>
      </p>,
    ],
  },
  {
    version: '[雾海寻龙] 1.1.8',
    date: '2024-07-10 12:30:00',
    content: [
      '综合',
      <p style={{ paddingLeft: 12 }} key='1.1.8.1'>
        <p>新增无界团队增益</p>
      </p>,
      '山海心诀·悟',
      <p style={{ paddingLeft: 12 }} key='1.1.8.2'>
        <p>增加二动物循环，目前由于JCL解析无界丟buff原因。可能存在波动</p>
        <p>二动物三动物打法对延迟要求不同，实际自己试试哪个高打哪个</p>
        <p>吐槽一下界万灵手动也太吃延迟了</p>
      </p>,
    ],
  },
  {
    version: '[雾海寻龙] 1.1.7',
    date: '2024-07-09 10:30:00',
    content: [
      '综合',
      <p style={{ paddingLeft: 12 }} key='1.1.7.2'>
        <p>新增了内功加速五彩石</p>
        <p>配装器内当装备精炼等级未满时，会有更清晰的提示</p>
      </p>,
      '无方',
      <p style={{ paddingLeft: 12 }} key='1.1.7.1'>
        <p>新增了避奚养荣循环</p>
      </p>,
    ],
  },
  {
    version: '[雾海寻龙] 1.1.6',
    date: '2024-07-08 09:30:00',
    content: [
      '7月8日技改',
      <p style={{ paddingLeft: 12 }} key='1.1.0.2'>
        <a
          href='https://jx3.xoyo.com/index/#/article-details?kid=1333878'
          target='_blank'
          rel='noreferrer'
        >
          技改链接
        </a>
      </p>,
      '太玄经',
      <p style={{ paddingLeft: 12 }} key='1.1.5.1'>
        <p>非侠修改为「14%」（数值144）</p>
      </p>,
      '无方',
      <p style={{ paddingLeft: 12 }} key='1.1.5.1'>
        <p>非侠修改为「10%」（数值102）</p>
        <p>修改了各循环名称，删除了应理的「终极」「初级」循环，删除武学助手循环</p>
        <p>更新了养荣循环，现在为5分钟循环</p>
      </p>,
      '孤锋诀',
      <p style={{ paddingLeft: 12 }} key='1.1.5.1'>
        <p>修复模拟器点出奇穴「周流」时识破诀锐意增加数值不正确的问题</p>
      </p>,
      '山海心诀·悟',
      <p style={{ paddingLeft: 12 }} key='1.1.5.1'>
        <p>循环变动，手动循环暂时只支持一段加速计算。近期可能会随时调整更新</p>
      </p>,
    ],
  },
  {
    version: '[雾海寻龙] 1.1.5',
    date: '2024-07-07 00:30:00',
    content: [
      '山海心诀·悟',
      <p style={{ paddingLeft: 12 }} key='1.1.5.1'>
        <p>- 新增了山海心诀·悟无界心法的计算器。</p>
        <p>- 内置三个循环：【紫武_助手】【紫武_手动】【橙武_手动】</p>
        <p style={{ color: 'red' }}>
          -
          特别说明！！目前有反馈高破招号在副本内dps异常。目前原因未知，经测试无增益情况下无异常。暂不确定是哪个增益导致异常。
          <p>目前请勿根据本计算器拍高破招装备。旗舰账号暂时不建议针对无界进行配装修改。</p>
        </p>
      </p>,
    ],
  },
  {
    version: '[雾海寻龙] 1.1.4',
    date: '2024-07-03 19:50:00',
    content: [
      '7月3日技改',
      <p style={{ paddingLeft: 12 }} key='1.1.0.2'>
        <a href='https://jx3.xoyo.com/announce/gg.html?id=1333872' target='_blank' rel='noreferrer'>
          技改链接
        </a>
      </p>,
      '花间游',
      <p style={{ paddingLeft: 12 }} key='1.1.1.3'>
        <p>- 非侠调整为11%（系数为113）</p>
      </p>,
      '无方',
      <p style={{ paddingLeft: 12 }} key='1.1.1.3'>
        <p>- 养荣额外伤害提高90%</p>
      </p>,
      '孤锋诀',
      <p style={{ paddingLeft: 12 }} key='1.1.1.3'>
        <p>- 非侠调整为18%（系数为184）</p>
        <p>- 「戗风」被动8%，吃影子额外8%（系数82）</p>
        <p>- 「击懈」诀云势增加100%非侠（系数1024）</p>
        <p>- 模拟器同步更新威声、涣衍、流岚等逻辑</p>
        <p>- 根据模拟器生成了新的六破、无影刀、橙武循环</p>
      </p>,
      '孤锋诀·悟',
      <p style={{ paddingLeft: 12 }} key='1.1.1.3'>
        <p>- 非侠调整为45%（系数为461）</p>
        <p>- 「留客雨·悟」命中存在流血buff的目标时刷新目标流血</p>
        <p>- 根据模拟器生成了新的手动、助手、橙武循环</p>
      </p>,
    ],
  },
  {
    version: '[雾海寻龙] 1.1.3',
    date: '2024-07-03 16:50:00',
    content: [
      '综合',
      <p style={{ paddingLeft: 12 }} key='1.1.3.1'>
        <p>- 服务器资源更换，感谢「冰糖雪梨橙」的大力支持</p>
        <p>- 新增角色导入功能，可以直接导入游戏内角色配装。请在配装器内查看</p>
      </p>,
    ],
  },
  {
    version: '[雾海寻龙] 1.1.2',
    date: '2024-07-01 17:00:00',
    content: [
      '综合',
      <p style={{ paddingLeft: 12 }} key='1.1.2.1'>
        <p>- 页面新增了「识别装备对比」工具功能。使用前请阅读使用说明</p>
        <p>- 花里胡哨的功能又增加了</p>
        <p>
          (
          原计划用OCR做图片识别的，后来发现免费的识别精度很低，又发现插件有文字复制功能，就改为使用文字解析
          )
        </p>
      </p>,
    ],
  },
  {
    version: '[雾海寻龙] 1.1.1',
    date: '2024-06-28 12:00:00',
    content: [
      '综合',
      <p style={{ paddingLeft: 12 }} key='1.1.1.1'>
        <p>- 修正了由于引入孤锋诀悟心法导致的其他心法加速阈值计算错误的问题</p>
        <p>- 优化了无界破招伤害的取整函数，和攻击力计算分开走取整链然后合并计算</p>
      </p>,
      '孤锋诀·悟',
      <p style={{ paddingLeft: 12 }} key='1.1.1.3'>
        <p>- 根据风雪的JCL导入了助手循环</p>
        <p>- 修正了流血buff计算未计算加速导致横云势和留客雨伤害异常的问题</p>
      </p>,
    ],
  },
  {
    version: '[雾海寻龙] 1.1.0',
    date: '2024-06-27 09:00:00',
    content: [
      '综合',
      <p style={{ paddingLeft: 12 }} key='1.1.0.1'>
        <p>- 面板属性增加伤帽的破防属性显示（之前没显示是为了对齐之前的魔盒）</p>
      </p>,
      '孤锋诀',
      <p style={{ paddingLeft: 12 }} key='1.1.0.2'>
        <p>- 修复了刀宗非侠按通用增伤计算的bug</p>
      </p>,
      '孤锋诀·悟',
      <p style={{ paddingLeft: 12 }} key='1.1.0.3'>
        <p>- 新增了孤锋诀·悟无界心法的计算器。包含模拟器同步更新</p>
        <p>- 内置三个循环：【紫武_助手】【紫武_手动】【橙武_手动】</p>
        <p style={{ color: 'red' }}>
          - 特别说明，由于目前无界武学助机制尚未研究明白。经过多次测试完全找不到规律。
        </p>
        <p style={{ color: 'red' }}>
          - 当前的紫武助手循环为哪个亮了点哪个，且模拟助手释放留客雨时的卡顿效果生成的循环
        </p>
        <p>- 武学助手机制尚未测试完成，暂不开放模拟器内的武学助手功能。</p>
        <p>
          <a href='https://www.jx3box.com/bps/82408' target='_blank' rel='noreferrer'>
            - 点击查看无界刀宗不完全攻略指南
          </a>
        </p>
      </p>,
    ],
  },
  {
    version: '[雾海寻龙] 1.0.14',
    date: '2024-06-23 14:00:00',
    content: [
      '综合',
      <p style={{ paddingLeft: 12 }} key='1.0.14.1'>
        <p>- 删除装备库数据中未支持心法的装备。以压缩代码体积</p>
      </p>,
      '太玄经',
      <p style={{ paddingLeft: 12 }} key='1.0.14.2'>
        <p>- 新增「鬼追」一键宏新手流派。</p>
        <p>- 该流派JCL来源于「奶茶」在成都打死粉茶茶的完整战斗数据，数据已计算枭神斩杀效果</p>
      </p>,
    ],
  },
  {
    version: '[雾海寻龙] 1.0.13',
    date: '2024-06-18 09:00:00',
    content: [
      '综合',
      <p style={{ paddingLeft: 12 }} key='1.0.13.1'>
        <p>- 新增全局伤害因子独立乘区，应用场景例【青冠】【正律】</p>
        <p>- 配装器装备选择区间下降至12100品</p>
        <p>- 配装器装备新增10100赠送橙武</p>
        <p>- 在外部显示了技能数量统计。考虑布局原因。在打开增益面板时会隐藏技能统计</p>
        <p>- 优化了查看模拟战斗技能详情的按钮样式，使其更容易被认为是可以点击按钮</p>
      </p>,
      '花间游',
      <p style={{ paddingLeft: 12 }} key='1.0.13.2'>
        <p>{`- 应「蔓海赋尘」大佬支持。新增花间游心法`}</p>
        <p>{`- 支持循环：`}</p>
        <p>{`- 紫武：1、2段加速「焚玉」；1、2段加速「故幽」`}</p>
        <p>{`- 橙武：2段加速「焚玉」；2段加速「故幽」`}</p>
        <p style={{ color: 'red' }}>注意</p>
        <p>- 橙武循环无视配装加速情况，固定按2段加速计算</p>
        <p>- 紫武循环只计算1、2段加速配装，0段加速面板计算结果直接返回0</p>
      </p>,
    ],
  },
  {
    version: '[雾海寻龙] 1.0.12',
    date: '2024-06-12 18:00:00',
    content: [
      '综合',
      <p style={{ paddingLeft: 12 }} key='1.0.12.1'>
        <p>- 新增会破比、招无比两个收益图表（花里胡哨的功能又增加了）</p>
      </p>,
      '太玄经',
      <p style={{ paddingLeft: 12 }} key='1.0.12.2'>
        <p>{`- 压缩了背景图片的尺寸`}</p>
      </p>,
    ],
  },
  {
    version: '[雾海寻龙] 1.0.11',
    date: '2024-06-11 10:00:00',
    content: [
      '综合',
      <p style={{ paddingLeft: 12 }} key='1.0.11.1'>
        <p>- 新增三个试炼之地目标，方便计算。数据来源魔盒</p>
        <p>- 冷龙峰副本Boss防御数据与124级木桩相同，不额外添加</p>
      </p>,
      '太玄经',
      <p style={{ paddingLeft: 12 }} key='1.0.5.2'>
        <p>{`- 配装器武器选择增加5600品归一`}</p>
      </p>,
    ],
  },
  {
    version: '[雾海寻龙] 1.0.10',
    date: '2024-06-07 18:00:00',
    content: [
      '综合',
      <p style={{ paddingLeft: 12 }} key='1.0.10.1'>
        <p>- 订正负数破招系数的计算函数</p>
        <p>- 优化了计算程序函数，理论计算效率提升一倍</p>
        <p>- 优化了在开启智能对比后，无论是否展开阵眼弹窗都会重复多次计算导致性能损耗的BUG</p>
      </p>,
    ],
  },
  {
    version: '[雾海寻龙] 1.0.9',
    date: '2024-05-30 18:00:00',
    content: [
      '综合',
      <p style={{ paddingLeft: 12 }} key='1.0.9.1'>
        <p>- 增加了端午节日增益粽子和小吃，在团队增益弹窗中可选</p>
      </p>,
      '凌海诀',
      <p style={{ paddingLeft: 12 }} key='1.0.9.2'>
        <p>
          - 新增了凌海诀「怅归」循环，
          <span style={{ color: 'red' }}>默认按一段加速计算。非一段加速配装会返回0</span>
        </p>
      </p>,
    ],
  },
  {
    version: '[雾海寻龙] 1.0.8',
    date: '2024-05-29 11:15:00',
    content: [
      '山海心诀',
      <p style={{ paddingLeft: 12 }} key='1.0.8.2'>
        <p>{`- 生成了新的丛云朝仪循环，时间为第五轮大招打完`}</p>
        <p>{`- 对循环进行重新订正`}</p>
        <p>{`- 模拟器增加了对倒读条技能的延迟补偿逻辑`}</p>
        <p>{`- 订正了模拟器对于同时间Dot伤害和叠加Dot行为先后顺序逻辑`}</p>
      </p>,
    ],
  },
  {
    version: '[雾海寻龙] 1.0.7',
    date: '2024-05-28 12:40:00',
    content: [
      '综合',
      <p style={{ paddingLeft: 12 }} key='1.0.7.1'>
        <p>{`- 修改了全局的DOT系数计算公式，使其更加合理易懂`}</p>
        <p>{`- 新增了新的增益类型，无双百分比。对面板无双乘法计算，例：养荣`}</p>
      </p>,
      '无方',
      <p style={{ paddingLeft: 12 }} key='1.0.7.2'>
        <p>{`- 新增无方心法`}</p>
        <p>{`- 无方循环数据均由长倦大佬提供`}</p>
        <p>养荣循环经长倦确认定为按千枝全程覆盖计算</p>
        <p style={{ color: 'red' }}>注意，无方循环目前均为一段加速固定计算。</p>
      </p>,
      '孤锋诀',
      <p style={{ paddingLeft: 12 }} key='1.0.7.2'>
        <p>{`- 生成了新的二段加速橙武循环`}</p>
      </p>,
      '太玄经',
      <p style={{ paddingLeft: 12 }} key='1.0.5.2'>
        <p>{`- 修复了天斗旋一个伤害秘籍的文案错误`}</p>
      </p>,
    ],
  },
  {
    version: '[雾海寻龙] 1.0.6',
    date: '2024-05-27 09:30:00',
    content: [
      '孤锋诀',
      <p style={{ paddingLeft: 12 }} key='1.0.6.2'>
        <p>{`- 非侠系数修改「6」=> 「13」`}</p>
        <p>{`- 流岚无视防御「40%」=>「25%」`}</p>
        <p>{`- 以上两条数值待更新后测试，133和256`}</p>
        <p>{`- 模拟器溃延减少诀云CD「10」=>「11」`}</p>
        <p>{`- 外部计算循环暂未通过模拟器重新生成，理论上溃延对结果影响较小。`}</p>
        <p style={{ color: 'red' }}>{`- 最终伤害正负1%上下浮动，约等于没变`}</p>
      </p>,
      '凌海诀',
      <p style={{ paddingLeft: 12 }} key='1.0.6.2'>
        <p>{`- 移除非侠3%加成`}</p>
        <p style={{ color: 'red' }}>{`- 最终伤害削弱2%-3%`}</p>
      </p>,
      '太玄经',
      <p style={{ paddingLeft: 12 }} key='1.0.6.2'>
        <p>{`- 由于JCL解析鬼遁丢失问题，暂时将鬼遁视作全局覆盖计算`}</p>
        <p>{`- 更新了新的橙武循环`}</p>
        <p>{`- 修复了紫武鬼列循环鬼遁覆盖计算有问题的BUG`}</p>
      </p>,
    ],
  },
  {
    version: '[雾海寻龙] 1.0.5',
    date: '2024-05-24 12:00:00',
    content: [
      '综合',
      <p style={{ paddingLeft: 12 }} key='1.0.5.1'>
        <p>{`- 修正了全局对于技能系数增伤的计算取整位置，例：涤瑕、素矰等`}</p>
        <p>{`- 新增了技能系数对技能等级的取值逻辑`}</p>
      </p>,
      '孤锋诀',
      <p style={{ paddingLeft: 12 }} key='1.0.5.2'>
        <p>{`- 修正「停云势」和「断云势」的武器伤害系数「2.5」=> 「2」`}</p>
        <p>{`- 精细破招系数的算法`}</p>
        <p>{`- 修复门派套装双会buff的覆盖率时间`}</p>
      </p>,
      '山海心诀',
      <p style={{ paddingLeft: 12 }} key='1.0.5.2'>
        <p>{`- 精细破招系数的算法`}</p>
      </p>,
      '太玄经',
      <p style={{ paddingLeft: 12 }} key='1.0.5.2'>
        <p>{`- 新增太玄经心法`}</p>
        <p>{`- 支持循环「鬼列」「堪炸」「橙武」`}</p>
        <p style={{ color: 'red' }}>注意，太玄经循环目前均为一段加速固定计算。</p>
      </p>,
    ],
  },
  {
    version: '[雾海寻龙] 1.0.4',
    date: '2024-05-21 10:45:00',
    content: [
      '综合',
      <p style={{ paddingLeft: 12 }} key='1.0.4.1'>
        <p>{`- 修复「关闭背景」功能重新进入页面没有读取缓存的问题`}</p>
        <p>{`- 修复系统中部分错别字 「决」 => 「诀」`}</p>
        <p>{`- 增加「万灵阵(从朱)」选项，覆盖率100%`}</p>
      </p>,
      '孤锋诀',
      <p style={{ paddingLeft: 12 }} key='1.0.4.2'>
        <p>- 修复孤锋诀无法选择力道五彩石的BUG</p>
        <p>
          -
          更新了孤锋诀模拟器内DOT伤害的快照拆分，（后续保存的循环会生效，外面循环目前没改。理论差距不大）
        </p>
      </p>,
    ],
  },
  {
    version: '[雾海寻龙] 1.0.3',
    date: '2024-05-17 10:40:00',
    content: [
      '综合',
      <p style={{ paddingLeft: 12 }} key='1.0.3.1'>
        <p>- 配装器快速一键附魔功能增加选择计算部位功能，大大提高计算效率</p>
        <p>- 修复切换循环没有自动切换至对应循环奇穴的BUG</p>
      </p>,
      '凌海诀',
      <p style={{ paddingLeft: 12 }} key='1.0.3.2'>
        <p>- 凌海诀计算卡顿的原因为循环细化的较为详细，计算过程更为复杂</p>
        <p>- 暂时去除了凌海诀的「优化算法」功能</p>
      </p>,
    ],
  },
  {
    version: '[雾海寻龙] 1.0.2',
    date: '2024-05-16 09:40:00',
    content: [
      '综合',
      <p style={{ paddingLeft: 12 }} key='1.0.2.1'>
        <p>- 主JS拆包，优化了首次加载的速度</p>
      </p>,
      '凌海诀',
      <p style={{ paddingLeft: 12 }} key='1.0.2.2'>
        <p>- 根据方小皮提供的橙武JCL生成了新的橙武循环</p>
        <p>- 修复了普通水特效和风特效没有生效的BUG</p>
        <p>- 增加了团队增益快捷设置</p>
      </p>,
    ],
  },
  {
    version: '[雾海寻龙] 1.0.1',
    date: '2024-05-11 16:10:00',
    content: ['支持凌海诀模块，数据提供：考拉。测试：方小皮（还在调试中）'],
  },
  {
    version: '[雾海寻龙] 1.0.0',
    date: '2024-05-11 16:10:00',
    content: [
      '合并万灵/刀宗计算器',
      '项目代码重构',
      '系统右上角可以切换心法',
      '新心法可以通过录入心法模块实现，提高了接入效率',
      '理论计算效率提升50%，1164次附魔计算本地耗时【500ms】 => 【240ms】',
      '后续提供接入文档',
    ],
  },
]
