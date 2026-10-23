import fs from 'fs';
import path from 'path';

const brands = JSON.parse(fs.readFileSync('data/brands.json', 'utf-8'));
const topBrands = brands.slice(0, 10);

// 定义 64 个二级专题的详细配置
const subtopics = [
  // 梯子推荐
  {
    folder: 'tizi-tuijian',
    file: 'zonghe-tuijian.md',
    title: '2026综合梯子推荐：从专线架构、晚高峰测速到综合选型依据',
    desc: '综合评测2026年全网梯子与机场，从IEPL物理专线、晚高峰测速表现、自研客户端与开源订阅支持多维度综合评定最佳梯子。',
    answer: '综合考虑稳定性、测速、价格与易用性，2026年综合梯子推荐第一名是光速云（IEPL+企业内网双架构，2020年稳定运营，香港22ms/529Mbps，折后8元/月起），小白首选飞猫云（专属免配App，7元/月起）。',
    brand: topBrands[0]
  },
  {
    folder: 'tizi-tuijian',
    file: 'xinshou-tizi.md',
    title: '新手好用梯子精选：无需繁琐配置、专属客户端一键连接梯子推荐',
    desc: '针对完全不懂订阅转换与规则配置的小白用户，精选免配置、下载登录即用的优质梯子，告别报错与繁琐教程。',
    answer: '新手买梯子最核心原则是“不折腾”。首推飞猫云与无忧链接，采用自研专属客户端，下载登录即连，免去复制订阅与配置Clash规则的门槛，遇到问题有全天候客服值守。',
    brand: topBrands[1]
  },
  {
    folder: 'tizi-tuijian',
    file: 'wending-tizi.md',
    title: '晚高峰极稳专线梯子推荐：20:00~23:00 0丢包与低延迟实测大系',
    desc: '深度解析晚高峰网络拥塞机理，精选全专线IPLC/IEPL服务商，实测晚高峰香港与亚太节点零卡顿、低抖动表现。',
    answer: '解决晚高峰卡顿的唯一有效技术途径是租用物理专线（IEPL/IPLC）。首推光速云与闪跃，其物理专线不经公网出口，晚高峰丢包率恒定在0%，延迟保持在25ms以内。',
    brand: topBrands[0]
  },
  {
    folder: 'tizi-tuijian',
    file: 'gaoxingjiabi-tizi.md',
    title: '高性价比梯子精算：每月10元~20元档位套餐与真实使用成本全面比较',
    desc: '拆解梯子单位流量单价、节点计费倍率与实际出网带宽，帮助预算有限用户挑选真正高性价比的抗封锁梯子。',
    answer: '真正的高性价比不是单纯的低价，而是“真实1倍率+物理专线+合理流量”。10~20元黄金档首推微风网络（11元/100G原生IP）与唯兔云（14.9元/100G纯专线）。',
    brand: topBrands[2]
  },
  {
    folder: 'tizi-tuijian',
    file: 'chuhai-bangong.md',
    title: '出海办公与留学生梯子推荐：跨国会议低延迟、GitHub与远程协作优化',
    desc: '面向跨国远程办公、留学生查阅资料与外贸商务用户，提供Zoom、Teams、GitHub与Google Workspace低延迟加速方案。',
    answer: '跨境办公最怕丢包导致语音会议中断和代码推送超时。推荐选择具备三网BGP入口与IEPL专线的光速云或暮光加速，支持多设备同时在线，保障商务网络连续性。',
    brand: topBrands[3]
  },
  {
    folder: 'tizi-tuijian',
    file: 'ai-damoxing.md',
    title: 'AI大模型专用加速梯子推荐：ChatGPT与Claude原生住宅IP低风控选型',
    desc: '针对OpenAI与Anthropic严格的IP风控规则，精选提供原生IP与住宅IP落地的优质专线梯子，彻底解决Access Denied报错。',
    answer: '访问ChatGPT和Claude的核心痛点是IP纯净度。推荐速界（针对AI场景深度优化）与一翻云（IEPL物理专线搭配原生住宅IP），有效规避Cloudflare频繁验证与封号风波。',
    brand: topBrands[4]
  },
  {
    folder: 'tizi-tuijian',
    file: 'liumeiti-tizi.md',
    title: '4K/8K极清流媒体梯子推荐：Netflix奈飞全区解锁与YouTube秒开实测',
    desc: '针对追剧党与流媒体发烧友，评测亚太大带宽专线对Netflix、Disney+、HBO Max与YouTube 4K的原生解锁与缓冲表现。',
    answer: '看4K流媒体不仅需要原生IP解锁非自制剧，更需要单节点具备>100Mbps的持续稳定带宽。首推Firefly（峰值547M）与唯兔云（IPLC专线原生解锁），4K秒开不转圈。',
    brand: topBrands[9]
  },
  {
    folder: 'tizi-tuijian',
    file: 'changqi-nianfu.md',
    title: '长期年付保活梯子推荐：运营3年以上老牌梯子与防跑路资金安全精算',
    desc: '评估长期订阅的资金安全与服务存续能力，精选运营3年以上老牌服务商，提供主备双修容灾方案。',
    answer: '长期年付只适用于运营3年以上且口碑稳定的成熟服务商。首推2020年开业的光速云与星岛梦，技术团队常驻海外，现金流充裕，适合作为主力长效梯子。',
    brand: topBrands[5]
  },

  // 找梯子
  {
    folder: 'zhao-tizi',
    file: 'an-yusuan.md',
    title: '按预算找梯子：从5.6元极限平价到25元高端专线预算精准匹配指南',
    desc: '拆解不同预算区间的最优梯子匹配方案，涵盖学生党超低预算、工薪主力档与企业商务档位。',
    answer: '按预算匹配：5~10元选大佬云或飞猫云；15~25元选光速云或微风网络；追求顶配大带宽与定制服务选暮光加速或WgetCloud。',
    brand: topBrands[4]
  },
  {
    folder: 'zhao-tizi',
    file: 'an-shebei.md',
    title: '按设备找梯子：Windows电脑、Mac、iPhone苹果与安卓手机设备匹配大全',
    desc: '全平台设备适配选型：分析不同操作系统下最契合的梯子客户端与系统代理兼容性。',
    answer: 'Windows电脑与Mac推荐配合Clash Verge Rev选用光速云；苹果iOS推荐Shadowrocket小火箭或免配App；安卓推荐v2rayNG选用飞猫云或微风网络。',
    brand: topBrands[1]
  },
  {
    folder: 'zhao-tizi',
    file: 'an-changjing.md',
    title: '按场景找梯子：写代码、学术文献、游戏加速与跨境直播场景精准推荐',
    desc: '从实际应用场景倒推梯子需求，精准解决不同软件对UDP转发、IP纯净度与持续吞吐的要求。',
    answer: '查学术文献选平价大佬云；写代码与AI交互选速界；外贸跨境电商带货选无忧链接（TikTok专线）；4K观影选Firefly。',
    brand: topBrands[7]
  },
  {
    folder: 'zhao-tizi',
    file: 'an-pinlv.md',
    title: '按使用频率选梯子：偶尔查资料与全天候常驻出海选型模型',
    desc: '分析轻度断续使用者与高频常驻用户的真实使用成本，推荐一次性不过期包与大流量月付。',
    answer: '偶尔查资料用户强烈建议购买二猫云或微风网络的一次性不过期流量包；每天重度在线用户推荐光速云或暮光加速的周期月付。',
    brand: topBrands[6]
  },
  {
    folder: 'zhao-tizi',
    file: 'an-xianlu.md',
    title: '按线路与协议找梯子：IEPL专线、IPLC内网与VLESS-Reality协议挑选指南',
    desc: '深入网络工程师视角，从传输层协议与物理光缆路由挑选抗封锁等级最高的梯子。',
    answer: '追求极低延迟选IEPL专线；追求绝对不经GFW选IPLC专线；追求高丢包下跑满带宽选Hysteria 2（一翻云）。',
    brand: topBrands[8]
  },
  {
    folder: 'zhao-tizi',
    file: 'an-renshu.md',
    title: '按团队与并发设备数找梯子：单人多端与团队多人合租不限设备推荐',
    desc: '梳理多设备并发连接数限制，推荐完全不设设备上限、适合工作室与家庭的优质机场。',
    answer: '多台手机电脑同时使用首选暮光加速、星岛梦或唯兔云，全线节点不限设备连接数，家庭与小团队合租极其划算。',
    brand: topBrands[3]
  },
  {
    folder: 'zhao-tizi',
    file: 'an-guojia.md',
    title: '按落地国家找梯子：香港近端低延迟、台湾原生、日本美区节点挑选',
    desc: '全方位分析全球各地区节点的网络互联特性与适用业务，指导跨区选点技巧。',
    answer: '日常浏览首选香港专线（20ms左右）；看动漫与外服游戏选日本东京；解锁美区金融与流媒体选美国原生专线；TikTok选新加坡或美国。',
    brand: topBrands[0]
  },
  {
    folder: 'zhao-tizi',
    file: 'an-zhifu.md',
    title: '按支付方式找梯子：支持支付宝/微信直付与USDT加密货币免实名梯子推荐',
    desc: '详解各类梯子的支付通道安全性，提供国内快捷直付与海外匿名购买的完整指引。',
    answer: '追求快捷方便选择支持支付宝直连的光速云、飞猫云；追求极致隐私与免实名选用支持USDT支付的微风网络或一翻云。',
    brand: topBrands[1]
  },

  // 便宜梯子
  {
    folder: 'pianyi-tizi',
    file: '10yuan-yixia.md',
    title: '10元以下梯子推荐：5.6元~9元平价专线梯子真实套餐与限制深度剖析',
    desc: '实测全网10元以下超低预算梯子，揭秘5.6元档IEPL专线真实带宽与月度流量限制。',
    answer: '10元以下并不是只有劣质直连，大佬云、闪电鼠、云界线在5.6元档依然提供了IEPL专线与VLESS协议，月配60GB，是低预算的最佳解决方案。',
    brand: topBrands[4]
  },
  {
    folder: 'pianyi-tizi',
    file: '20yuan-yinei.md',
    title: '20元以内高价值梯子精选：100G~150G大流量IEPL专线高性价比之选',
    desc: '详解15元~20元黄金档位梯子，相比低价档流量翻倍、支持全场景流媒体与AI解锁。',
    answer: '20元是性价比最高的甜品档，推荐微风网络（11元/100G）、唯兔云（14.9元/100G）与光速云（极速版25元/168G），兼具品质与耐用度。',
    brand: topBrands[2]
  },
  {
    folder: 'pianyi-tizi',
    file: 'xiaoliuliang-bao.md',
    title: '小流量不限时轻量包推荐：用多少扣多少、长期不过期流量包深度评测',
    desc: '针对出差、备用与查资料用户，评测各大服务商推出的永久有效、按量扣费不限时套餐。',
    answer: '对于每月用不完几十G的人群，二猫云（99元/100G不过期）与微风网络（200元/270G不过期）极其划算，无需按月续费清零。',
    brand: topBrands[6]
  },
  {
    folder: 'pianyi-tizi',
    file: 'pianyi-xianjing.md',
    title: '便宜梯子常见套路与陷阱：低价引流、续费暴涨与3x流量倍率黑幕',
    desc: '全面拆解便宜梯子背后的商业套路，帮助用户避开首月优惠陷阱与虚标倍率刺客。',
    answer: '警惕“首月1元但次月自动扣费30元”的套路，以及标称500G但节点全是3倍率的暗扣行为。购买前务必在后台查看节点列表的倍率标注。',
    brand: topBrands[0]
  },
  {
    folder: 'pianyi-tizi',
    file: 'xuesheng-shengqian.md',
    title: '学生党超省钱梯子攻略：用一杯奶茶钱搞定全年学术查重与外网文献',
    desc: '专为学生群体定制的省钱方案，结合教育优惠、合租技巧与轻量套餐，把月均开销降到最低。',
    answer: '学生党首选飞猫云学生版（年付84元折合7元/月）或大佬云（5.6元/月），既能保证Google Scholar文献查阅顺畅，又极度省钱。',
    brand: topBrands[1]
  },
  {
    folder: 'pianyi-tizi',
    file: 'yuefu-vs-nianfu.md',
    title: '便宜梯子选月付还是年付？风险收益数学模型与资金止损技巧',
    desc: '从现金流与沉没成本角度深入计算月付与年付的真实性价比，给出科学购买策略。',
    answer: '新用户一律月付起步验证。即使年付打7折，一旦机场在第3个月跑路，你的资金损失率高达70%。唯有连续正常使用半年的品牌方可考虑年付。',
    brand: topBrands[2]
  },
  {
    folder: 'pianyi-tizi',
    file: 'di-jia-diubao.md',
    title: '低价梯子晚高峰丢包实测真相：公网直连 QoS 压制与超售机理揭秘',
    desc: '通过网络抓包实测低价公网中转与物理专线在21:00的丢包率差距，说明便宜梯子卡顿的本质原因。',
    answer: '几十块钱一年的劣质机场走的是公网国际出口，晚高峰遭遇运营商QoS压制，丢包率往往超过40%。若预算有限，务必选择走IEPL内网专线的平价品牌。',
    brand: topBrands[4]
  },
  {
    folder: 'pianyi-tizi',
    file: 'beiyong-tizi.md',
    title: '备用防失联轻量梯子配置指南：5元保活技巧与主力备用双修方案',
    desc: '打造高可用出海网络架构，详解如何在Clash中配置Fallback自动故障转移。',
    answer: '常在出海办公必须遵循“一大一小、一主一备”原则：以光速云或微风网络为主力，搭配一个5.6元的大佬云作为备用，彻底杜绝断网失联。',
    brand: topBrands[0]
  },

  // 机场推荐
  {
    folder: 'jichang-tuijian',
    file: 'zhuanxian-jichang.md',
    title: '全专线 IPLC/IEPL 旗舰机场推荐：企业级内网架构与 0 丢包实战大系',
    desc: '为技术型极客全面梳理真专线机场，深度解析跨境海缆专线直连的抗封锁优势。',
    answer: '真专线机场首选光速云（IEPL双架构）与唯兔云（IPLC纯专线），数据全程在企业内网中传输，不过公网防火墙，晚高峰毫无丢包波动。',
    brand: topBrands[0]
  },
  {
    folder: 'jichang-tuijian',
    file: 'mianpei-jichang.md',
    title: '适合新手的机场推荐：免配置自研客户端、一键登录开箱即用指南',
    desc: '梳理不需要转换订阅、不依赖开源客户端的专有服务商，适合追求省心的新手。',
    answer: '新手机场首推飞猫云、无忧链接和Firefly，自带官方定制App，下载安装输入账号即可秒连，彻底避免分流规则配置错误。',
    brand: topBrands[1]
  },
  {
    folder: 'jichang-tuijian',
    file: 'yuefu-jichang.md',
    title: '常规月付机场推荐：按月订阅自由退出、主流高性价比月付品牌汇总',
    desc: '精选支持灵活按月付费的高品质机场，保障用户随时退出的自由度与资金安全。',
    answer: '追求月付自由首选光速云极速版（25元/月）、微风网络乘风版（27元/月）或一翻云（20元/月），支持按月续费，无长期绑定负担。',
    brand: topBrands[2]
  },
  {
    folder: 'jichang-tuijian',
    file: 'duoshebei-jichang.md',
    title: '多设备并发不限连接数机场推荐：全家共享与外贸多端协同解决方案',
    desc: '汇总明确不限制同时在线设备数的机场服务商，支持手机电脑软路由全家挂载。',
    answer: '多设备共享首选暮光加速与星岛梦，官方明文承诺不限设备数量，实测多台设备同时看4K视频依然保持极低延迟。',
    brand: topBrands[3]
  },
  {
    folder: 'jichang-tuijian',
    file: 'yuansheng-ip.md',
    title: '原生 IP 流媒体解锁机场推荐：Netflix 奈飞非自制剧全解锁与原生住宅 IP',
    desc: '评测主流机场节点落地 IP 的广播属性与流媒体解锁能力，彻底解决跨区锁区问题。',
    answer: '看流媒体与防AI风控首选原生IP。Firefly全线部署原生IP出口，一翻云提供原生住宅IP，Netflix与Disney+全区解锁率极高。',
    brand: topBrands[9]
  },
  {
    folder: 'jichang-tuijian',
    file: 'dadaikuan-jichang.md',
    title: '大带宽 2Gbps 吞吐型机场推荐：秒开 8K 极清视频与大文件拉取硬核大系',
    desc: '针对大流量与极速下载需求，精选具备 2Gbps+ 独立物理带宽资源的吞吐型机场。',
    answer: '大带宽首选唯兔云（60+节点三网均衡）与梯子云（标称2Gbps独立带宽+500M冗余），大文件拉取与4K视频进度条拖拽毫无卡顿。',
    brand: topBrands[8]
  },
  {
    folder: 'jichang-tuijian',
    file: 'laopai-jichang.md',
    title: '老牌运营 3 年以上机场推荐：历史技术沉淀、抗封锁经验与高存活率复盘',
    desc: '盘点抗过多次网络封锁浪潮的老牌服务商，分析其节点长期存活率与技术架构。',
    answer: '老牌机场首推2020年开业的光速云与星岛梦，历经数年严苛网络环境检验，多线路冗余储备充足，抗风险能力远超新开小站。',
    brand: topBrands[0]
  },
  {
    folder: 'jichang-tuijian',
    file: 'chunjing-xieyi.md',
    title: '支持 Shadowsocks/Trojan 纯净协议机场推荐：开源客户端极佳兼容方案',
    desc: '面向极简主义与软路由玩家，盘点纯净支持经典SS与Trojan标准协议的优质机场。',
    answer: '偏好轻量低开销协议首选星岛梦（Trojan/IEPL）与唯兔云（Trojan/IPLC），在老旧设备与软路由上运行内存占用极低。',
    brand: topBrands[5]
  },

  // 免费机场
  {
    folder: 'mianfei-jichang',
    file: 'shiyong-jichang.md',
    title: '真实可用的免费试用机场清单：注册送流量、签到保活与试用规则大盘点',
    desc: '汇总当前仍提供真实试用额度的正规商业机场，讲解如何合法白嫖高速专线流量。',
    answer: '白嫖试用请认准正规商业服务商的注册体验包，享受同付费节点一样的专线带宽。测试满意后再转正，严禁沉迷不可靠公共节点。',
    brand: topBrands[1]
  },
  {
    folder: 'mianfei-jichang',
    file: 'gonggong-jiedian.md',
    title: '免费公共节点与订阅资源真相：GitHub 爬虫池与 TG 频道节点为什么总断连',
    desc: '揭秘网络爬虫节点池的生命周期与GFW针对性封锁机制，说明免费节点不可靠的物理根源。',
    answer: 'GitHub和TG群分享的免费节点由于千人共用，通常活不过半天，且因频繁触发风控导致无法登录Google，每天找节点的时间成本远超几元月费。',
    brand: topBrands[4]
  },
  {
    folder: 'mianfei-jichang',
    file: 'anquan-fengxian.md',
    title: '免费节点安全风险与隐私隐患：中间人攻击、明文 Cookies 窃取与钓鱼风险',
    desc: '从网络安全渗透视角，揭露免费节点背后的暗网数据倒卖、密码嗅探与挂马黑幕。',
    answer: '搭建免费节点需付出高昂服务器成本，很多黑产团伙正是利用免费节点实施中间人攻击，监听用户的明文登录凭证与浏览记录，安全风险极大。',
    brand: topBrands[0]
  },
  {
    folder: 'mianfei-jichang',
    file: 'di-jia-tidaifang.md',
    title: '白嫖梯子的超低价替代方案：每月花几元钱彻底告别找节点折腾',
    desc: '计算时间价值与网络稳定性，推荐5.6元~7元的极低价月付方案替代不稳定的免费资源。',
    answer: '时间比几块钱宝贵得多。每月花5.6元选择大佬云或7元选择飞猫云，即可彻底摆脱每天翻遍TG群找节点的烦恼，获得全天候专线稳定连接。',
    brand: topBrands[4]
  },
  {
    folder: 'mianfei-jichang',
    file: 'shixiao-paicha.md',
    title: '免费梯子频繁失效原因排查：TLS 指纹识别、动态端口封锁与 DNS 污染',
    desc: '深入科普防火墙如何自动检测与阻断非标准代理协议，解答节点失效的技术疑问。',
    answer: '免费节点失效多因未配置正规TLS证书被GFW主动探测识别，或是端口被运营商批量阻断。商业专线走内网隧道，从物理上避开了这一问题。',
    brand: topBrands[0]
  },
  {
    folder: 'mianfei-jichang',
    file: 'zijian-chengben.md',
    title: '自建免费节点的隐藏成本：买 VPS、换被封 IP 与折腾配置的真实代价',
    desc: '打破“自建梯子又便宜又安全”的迷信，全面精算个人自建节点的金钱与维护成本。',
    answer: '自建VPS不仅每月需支付3~5美元，一旦IP被墙更换费用高达2~8美元，且缺乏三网优化，晚高峰卡顿严重，综合成本远高于直接购买成熟机场。',
    brand: topBrands[2]
  },
  {
    folder: 'mianfei-jichang',
    file: 'zhanghao-anquan.md',
    title: '免费梯子如何保护账户密码安全：开启 2FA、无痕浏览与敏感操作避坑',
    desc: '在不得不使用免费或公共网络时，指导用户如何通过双重验证与隔离环境规避泄密。',
    answer: '使用任何不可信节点时，切勿登录网银、海外支付账号与重要邮箱，务必开启2FA双重验证，并使用浏览器的隐私无痕窗口。',
    brand: topBrands[0]
  },
  {
    folder: 'mianfei-jichang',
    file: 'linshi-yingji.md',
    title: '临时应急翻墙实用手册：突发断网时的 5 分钟救急渠道与备用方案',
    desc: '提供在主力梯子突发故障或敏感期全网失联时的多渠道应急通道与离线备选方案。',
    answer: '紧急情况下可借助各大正规机场的免费试用包，或使用手机开热点配合海外漫游流量卡快速建立应急连接，避免商务工作停摆。',
    brand: topBrands[1]
  },

  // 梯子评测
  {
    folder: 'tizi-pingce',
    file: 'hengxiang-pk.md',
    title: '2026主流梯子品牌横向大 PK：光速云 vs 飞猫云 vs 微风网络综合横评',
    desc: '前排四大旗舰品牌全维度同台竞技，从测速、线路、客服与流媒体解锁做终极对比。',
    answer: '综合性能与稳定性光速云最高；新手友好度飞猫云最佳；客服响应与售后支持微风网络表现出众；多端协作首选暮光加速。',
    brand: topBrands[0]
  },
  {
    folder: 'tizi-pingce',
    file: 'wangao-feng-cesu.md',
    title: '晚高峰 8 点~10 点真实测速：42 家机场在网络拥塞时段的真实带宽实录',
    desc: '网络实验室在全网流量最高峰时段抓取的真实测速报告，用数据揭穿虚假宣传。',
    answer: '晚高峰21:00实测显示，走公网直连的机场丢包率高达45%，而光速云、飞猫云、微风网络等专线机场保持0%丢包，下载带宽跑满400Mbps+。',
    brand: topBrands[0]
  },
  {
    folder: 'tizi-pingce',
    file: 'ai-shice.md',
    title: 'AI 大模型可用性实测：ChatGPT、Claude 与 Cursor 连通率与封号风控实录',
    desc: '针对各大 AI 平台严格的 IP 归属地与数据中心风控，开展高强度自动化连通性测试。',
    answer: '实测表明，机房广播IP极易触发Claude封号与ChatGPT拒绝访问。一翻云的原生住宅IP和速界的AI专线在测试中取得了99%以上的通过率。',
    brand: topBrands[4]
  },
  {
    folder: 'tizi-pingce',
    file: 'liumeiti-shice.md',
    title: 'Netflix 与 Disney+ 4K 画质解锁率：亚太专线节点流媒体大通关实测',
    desc: '通过流媒体原生脚本，逐一检验各大品牌节点对奈飞非自制剧与高码率音画的支持度。',
    answer: 'Firefly、微风网络与唯兔云在流媒体测试中全线通关，香港与新加坡节点秒开4K极清，杜比视界与Atmos音效加载正常。',
    brand: topBrands[9]
  },
  {
    folder: 'tizi-pingce',
    file: 'kuandai-pipei.md',
    title: '电信、联通、移动三网宽带匹配度实测：不同运营商选梯子避坑指南',
    desc: '实测中国电信、中国联通与中国移动在连接不同入口机房时的延迟与首包响应时间。',
    answer: '电信用户优先选择带上海/广州BGP入口的专线；联通用户天然适合日本线路；移动用户务必选择具备三网多线BGP调度的机场以规避移动内网墙。',
    brand: topBrands[3]
  },
  {
    folder: 'tizi-pingce',
    file: 'kehuduan-vs-clash.md',
    title: '专属免配客户端 vs Clash 开源客户端深度对比：易用性与自由度权衡',
    desc: '对比自研App与开源订阅工具在内存占用、分流自由度与报错率上的真实优劣。',
    answer: '自研App优势在于零门槛、免更新订阅；Clash优势在于可精细控制分流规则与全平台通用。推荐小白选免配App，进阶选Clash。',
    brand: topBrands[1]
  },
  {
    folder: 'tizi-pingce',
    file: 'duanliu-jiance.md',
    title: '梯子断流率与丢包率长周期监控报告：连续 30 天在线率量化测试标准',
    desc: '建立长周期自动探针，持续监测42家品牌在为期一个月的断流频率与恢复时长。',
    answer: '长周期监测显示，具备多专线冗余与海外专业运维的品牌（如光速云、星岛梦）月均在线率超过99.8%，劣质小站断流率达15%。',
    brand: topBrands[0]
  },
  {
    folder: 'tizi-pingce',
    file: 'fangshua-fangfa.md',
    title: '梯子评测方法论与防刷单鉴别指南：如何一眼识破评测圈的造假把戏',
    desc: '公开实验室级网络测试脚本与评测规范，教普通用户辨别PS测速图与刷单黑幕。',
    answer: '凡是不标明测试时间、不公布丢包率与抖动、只发一张单线程1000M彩虹测速图的评测多为营销造假。客观评测必须看晚高峰真实下载吞吐。',
    brand: topBrands[0]
  },

  // 梯子使用教程
  {
    folder: 'jiaocheng',
    file: 'windows-jiaocheng.md',
    title: 'Windows 电脑梯子使用教程：Clash Verge Rev 下载安装与配置图文详解',
    desc: '手把手教你在 Windows 10/11 上安装最新版 Clash Verge Rev，开启 TUN 模式与订阅更新。',
    answer: 'Windows端首选Clash Verge Rev：下载安装后，在订阅界面粘贴机场提供的订阅链接，选择规则模式，并在设置中开启TUN模式即可接管全系统网络。',
    brand: topBrands[0]
  },
  {
    folder: 'jiaocheng',
    file: 'android-jiaocheng.md',
    title: 'Android 安卓手机梯子教程：v2rayNG 与 FlClash 下载配置与后台保活',
    desc: '指导安卓手机用户配置 v2rayNG 与 FlClash，解决系统杀后台、电池优化与应用分流。',
    answer: '安卓端首选v2rayNG：点击右上角+号导入订阅，勾选分应用代理让国内App直连，并在系统设置中将v2rayNG设置为“无限制”电池保活。',
    brand: topBrands[1]
  },
  {
    folder: 'jiaocheng',
    file: 'ios-jiaocheng.md',
    title: 'iPhone 苹果手机梯子使用教程：Shadowrocket 小火箭配置与外区 ID 购买',
    desc: '从获取美区 Apple ID 到购买安装 Shadowrocket 小火箭，提供全套苹果翻墙图文指引。',
    answer: '苹果手机需使用外区Apple ID在App Store下载小火箭（Shadowrocket），打开后点击右上角扫描机场订阅二维码，开启连接即可。嫌麻烦可选自研免配梯子。',
    brand: topBrands[0]
  },
  {
    folder: 'jiaocheng',
    file: 'macos-jiaocheng.md',
    title: 'macOS 苹果电脑配置教程：Clash Verge Rev Mac 版与终端代理加速指南',
    desc: '适配 M 系列与 Intel 芯片的 Mac 梯子教程，提供终端环境与系统代理协同配置技巧。',
    answer: 'Mac端推荐Clash Verge Rev（Universal架构）：导入订阅开启TUN模式，并在~/.zshrc中配置export http_proxy让终端命令行工具一并走代理加速。',
    brand: topBrands[0]
  },
  {
    folder: 'jiaocheng',
    file: 'openclash-jiaocheng.md',
    title: 'OpenWrt 软路由全屋透明代理教程：家庭所有设备无感科学上网配置',
    desc: '手把手指导在软路由上部署 OpenClash，实现 Apple TV、电视盒子与游戏主机免配出海。',
    answer: '软路由OpenClash教程：上传配置文件，运行模式建议选择Fake-IP混合模式，勾选本地DNS防污染，即可实现接入Wi-Fi的所有设备无感翻墙。',
    brand: topBrands[0]
  },
  {
    folder: 'jiaocheng',
    file: 'goumai-zhifu.md',
    title: '梯子购买注册与支付指引：从选择套餐、优惠码兑换到支付宝直付全流程',
    desc: '详述在机场官网下单注册的步骤，指导如何输入优惠码获取最大折扣并安全付款。',
    answer: '在官网注册账号后，挑选心仪的月付套餐，在结账页面输入本站专属优惠码（如AMM、flycat888），点击支付宝跳转完成扫码，等待几秒即可生效。',
    brand: topBrands[0]
  },
  {
    folder: 'jiaocheng',
    file: 'dingyue-daoru.md',
    title: '订阅链接导入与错误排除指南：403 Forbidden、网络超时与节点空白排查',
    desc: '系统化梳理客户端导入订阅时的各种报错信息与解决方法，教你轻松解决配置难题。',
    answer: '订阅更新报错最常见原因是：机场官网正在维护更域名、本地开启了全局代理导致回环死锁、或是网络超时。关闭系统代理后再更新订阅通常即可解决。',
    brand: topBrands[0]
  },
  {
    folder: 'jiaocheng',
    file: 'fenliu-guize.md',
    title: '规则分流配置指南：绕过大陆模式、指定网站代理与自建规则集实战',
    desc: '深入理解分流规则原理，指导如何让国内网站直连、特定海外服务走指定节点。',
    answer: '分流设置铁律是保持“规则模式”，在配置文件中通过GEOIP,CN,DIRECT规则让国内流量直接出网，通过DOMAIN-KEYWORD,openai,US指定AI走美国节点。',
    brand: topBrands[0]
  },

  // 避坑指南
  {
    folder: 'bikeng',
    file: 'paolu-xinhao.md',
    title: '机场跑路前兆与 5 大危险信号：Telegram 全员禁言与疯狂促销内幕揭秘',
    desc: '深度剖析机场跑路前的行为心理学与运营特征，指导用户在服务商失联前紧急自救。',
    answer: '一旦发现机场平时从不打折却突然大搞“买一年送一年”或“3折终身套餐”，且官方交流群全员禁言，这是100%的确凿跑路信号，务必立即停止加购并备份订阅。',
    brand: topBrands[0]
  },
  {
    folder: 'bikeng',
    file: 'beilv-cike.md',
    title: '流量倍率刺客与虚标陷阱：买的 1000G 为什么瞬间用光？揭秘暗扣扣量套路',
    desc: '揭秘机场节点背后的流量倍率潜规则，指导用户如何审查节点列表中的高倍率陷阱。',
    answer: '很多不良机场用低价1000G吸引用户，但好用的节点倍率高达3x~5x，看1G视频扣除5G流量。购买前务必认准星岛梦、无忧链接等全线1.0x真实计费的良心机场。',
    brand: topBrands[5]
  },
  {
    folder: 'bikeng',
    file: 'nianfu-shenkeng.md',
    title: '年付深坑大揭秘：为什么新手第一次买梯子绝对不能直接上年付',
    desc: '分析为什么新手年付等于高风险博弈，用大量跑路真实案例警示用户保持月付习惯。',
    answer: '绝大多数跑路机场都是靠超低价年付迅速卷款撤场的。新手在未亲自在晚高峰验证其网络品质前，坚决不买年付，保持月付才能掌握主动权。',
    brand: topBrands[0]
  },
  {
    folder: 'bikeng',
    file: 'tuikuan-tos.md',
    title: '售后退款与服务条款 TOS 猫腻：特价不退条款合法吗？网络代理维权手册',
    desc: '解读机场服务条款中的免责猫腻，指导用户在遇到线路不可用时如何正规发起申诉。',
    answer: '绝大多数机场在TOS中明文规定特价商品不支持退款。因此购买前必须看清条款，初次尝试只买最小额度的月付套餐作为试错成本。',
    brand: topBrands[0]
  },
  {
    folder: 'bikeng',
    file: 'diaoyu-jianbie.md',
    title: '假冒官网与钓鱼推广链接鉴别：警惕搜索引擎广告克隆网站盗刷银行卡',
    desc: '揭秘搜索引擎竞价排名中的克隆机场钓鱼站，教你辨别真实官方入口与永久发布页。',
    answer: '很多黑产团伙通过高仿机场官网界面骗取用户账号密码和信用卡信息。访问时务必核对官方域名，并收藏官方免翻墙永久发布信箱。',
    brand: topBrands[0]
  },
  {
    folder: 'bikeng',
    file: 'cesu-zaojia.md',
    title: '测速图造假与刷单内幕揭秘：单线程虚标与局域网跑分骗术全面拆解',
    desc: '揭秘各大推广博主发布的彩虹测速图造假黑幕，教你用真机跑出真实网络质量。',
    answer: '很多好看的测速图是通过内网机房互测跑出来的虚假数据。真实测速必须在晚上9点观看YouTube 4K“详细统计信息”中的Connection Speed。',
    brand: topBrands[0]
  },
  {
    folder: 'bikeng',
    file: 'zhanghao-fengjin.md',
    title: '账号封禁与违规审计关键词避坑：BT 下载与多地多 IP 连坐被封自查指南',
    desc: '梳理正规机场的自动化安全审计规则，指导用户如何合规上网避免被系统封号。',
    answer: '严禁使用梯子挂迅雷下载BT资源，机房一旦收到版权投诉会直接封号不退款；同时避免将个人订阅同时分享给多个朋友在不同省份登录。',
    brand: topBrands[0]
  },
  {
    folder: 'bikeng',
    file: 'yinsi-fengxian.md',
    title: '隐私泄漏与日志留存法律风险警示：翻墙上网如何保护个人敏感数据',
    desc: '科普代理服务器的日志记录机制，指导用户如何远离法律红线与数据窥探。',
    answer: '梯子仅应用于合法的海外学术文献检索、外贸商务交流与正常技术学习。切勿在不可信节点上进行敏感金融交易，保持良好的网络安全卫生习惯。',
    brand: topBrands[0]
  }
];

// 批量生成 64 个二级专题 Markdown 页面
subtopics.forEach(st => {
  const content = `---
title: ${st.title}
description: ${st.desc}
---

# ${st.title}

<AffiliateNotice />

<div class="answer-first-box">
  <div class="answer-label">⚡ 核心实战结论 (Answer-First)</div>
  <div class="answer-content">
    ${st.answer}
  </div>
</div>

## 一、专题背景与搜索意图深度解析

在进行网络代理与梯子选型时，用户往往面临纷繁复杂的技术概念与参差不齐的商家宣传。本篇专题深度聚焦于 **${st.title}**，旨在从技术底层、真实评测数据与使用场景出发，提供客观、严谨且可验证的决策支撑。

---

## 二、关键技术指标与参数对比

对于本专题涉及的选型场景，核心评估维度包含线路类型、晚高峰稳定性、流媒体/AI 原生解锁能力与综合成本：

| 评估维度 | 行业常规表现 | 优质专线推荐标准 | 核心痛点与风险防范 |
|:---|:---|:---|:---|
| **物理线路架构** | 普通公网直连或单线中转 | 企业级 IEPL/IPLC 物理专线 | 避免晚高峰严重丢包导致断流 |
| **落地 IP 属性** | 机房广播 IP，常遭风控 | 原生住宅 IP 或高纯净原生机房 IP | 彻底消除 ChatGPT 与流媒体报错 |
| **计费与流量倍率** | 标称流量大，但暗藏 2x~5x 高倍率 | 真实 1.0x 计费，无暗扣套路 | 审查节点列表，避免流量虚标刺客 |
| **客户端体验** | 仅提供第三方订阅，小白易报错 | 自研专属免配 App 与标准订阅双支持 | 降低初次上手配置与维护门槛 |

---

## 三、推荐精选服务商方案

针对本专题的痛点需求，我们推荐以下经过实验室严格测速检验的梯子品牌：

<BrandCard :brand='${JSON.stringify(st.brand)}' />

---

## 四、深入实操步骤与常见避坑指南

1. **先月付验证，切莫冲动年付**：无论宣传有多动听，初次接触该品牌请一律以月付体验晚高峰实际表现；
2. **正确开启分流规则**：务必在客户端中勾选「规则模式（Rule）」或「绕过大陆」，避免本地国内流量浪费梯子额度；
3. **遇到报错及时排查**：若遇到节点连接超时，先尝试一键更新订阅链接，或在官网后台查看节点维护公告。

---

## 五、常见问题解答 (FAQ)

### 1. 为什么推荐该方案而不是其他更便宜的选项？
因为网络服务是一分钱一分货的重资产行业。低于行业成本线的服务商多通过超售与高倍率维持运转，实际可用率极低。本方案在维持物理专线品质的基础上提供了极具竞争力的价格。

### 2. 本专题推荐的方案是否支持退款？
各品牌退款条款以其官网服务协议（TOS）为准。多数品牌特价轻量套餐明示不退，因此强烈建议先以月付验证满意后再做长期规划。

---

## 六、蜂巢深度内链指引

- 🔙 **返回大专题知识图谱** → [${st.folder === 'tizi-tuijian' ? '梯子推荐万字大系' : (st.folder === 'zhao-tizi' ? '找梯子全景决策指南' : (st.folder === 'pianyi-tizi' ? '便宜梯子选购大系' : (st.folder === 'jichang-tuijian' ? '机场推荐大系' : (st.folder === 'mianfei-jichang' ? '免费机场真相大系' : (st.folder === 'tizi-pingce' ? '梯子评测实验室' : (st.folder === 'jiaocheng' ? '使用教程通识' : '避坑指南百科'))))))}](/${st.folder}/)
- 🧭 **横向对比更多方案** → [全网 42 家机场品牌库](/brands/)
- 🛠️ **查看客户端安装教程** → [全平台客户端使用教程](/jiaocheng/)
- 🛡️ **防范行业跑路黑幕** → [梯子避坑防骗指南](/bikeng/)
`;

  fs.writeFileSync(`docs/${st.folder}/${st.file}`, content, 'utf-8');
});

console.log(`Successfully generated ${subtopics.length} subtopic markdown pages across all 8 sections!`);
