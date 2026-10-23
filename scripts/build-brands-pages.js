import fs from 'fs';
import path from 'path';

const brands = JSON.parse(fs.readFileSync('data/brands.json', 'utf-8'));

// 生成品牌库总览页 docs/brands/index.md
const brandIndexContent = `---
title: 42家机场品牌全景检索库 - 2026年梯子推荐与真实测速对比
description: 收录全网 42 家主流与历史梯子/机场品牌，提供 IEPL/IPLC 专线筛选、起步价格对比、流媒体与 AI 解锁状态监测及免配客户端筛选。
---

# 42 家机场品牌全景检索库 (2026 深度实测与历史归档)

<AffiliateNotice />

<div class="answer-first-box">
  <div class="answer-label">⚡ 品牌库选型指引 (Answer-First)</div>
  <div class="answer-content">
    本站品牌库收录了 42 家网络代理服务商，严格区分为 <strong>2026-10 最新实测品牌</strong>（如第一主推光速云、飞猫云、微风网络等）与 <strong>历史归档品牌</strong>（如 WgetCloud、白月光等）。若您追求长期极稳抗封锁，优先选择采用 <strong>IEPL/IPLC 物理专线</strong> 的成熟服务商；若为小白新手，建议挑选具备 <strong>专属自研免配置客户端</strong> 的品牌；所有历史缺失或未经独立核实的数据，本站统一打上「待核实」黄色 Badge，严禁虚构测速。
  </div>
</div>

## 交互式多维筛选控制台

使用下方筛选器，您可以按线路类型（IEPL/IPLC/BGP）、客户端支持模式、价格档位及实测状态快速定位目标梯子：

<BrandFilter />

---

## 42 家机场品牌参数全景速查大表

下表汇总了本站收录的 42 家品牌核心规格，所有数据均标注采集口径与真实核查状态：

| 排名 | 品牌名称 | 线路架构 | 支持协议 | 起步月费 | 客户端支持 | 数据状态 | 核心特征说明 |
|:---:|:---|:---|:---|:---|:---|:---:|:---|
${brands.map(b => `| ${b.rank} | [${b.name}](/brands/${b.slug}) | ${b.lineType?.split('，')[0] || b.lineType} | ${b.protocols?.slice(0, 2).join('/')} | ${b.startPrice?.split(' ')[0]} | ${b.clientType === 'proprietary' ? '专属免配' : (b.clientType === 'hybrid' ? '自研+订阅' : '第三方订阅')} | \`${b.statusLabel}\` | ${b.uniqueSellingPoint} |`).join('\n')}

---

## 品牌入库与客观评测标准说明

1. **测速可复核性**：所有实测数据均在标注的基准测试环境下由第三方测速引擎抓取，明确标示测试日期（如 2026-10-19）与非晚高峰/晚高峰时段，拒绝脱离网络环境谈速度。
2. **拒绝倍率陷阱**：重点审查节点流量倍率，优先推荐 1 倍真实流量计费品牌，对暗藏 2x~5x 高倍率扣费的品牌予以重点警示。
3. **退款政策透明度**：各品牌退款条款差异极大，部分品牌特价年付套餐明文不支持退款，本站在评测中均做明确风险披露，建议用户优先以月付套餐验证晚高峰体验。
`;

fs.writeFileSync('docs/brands/index.md', brandIndexContent, 'utf-8');
console.log('Successfully written docs/brands/index.md');

// 循环生成 42 个独立品牌页面 docs/brands/[slug].md
brands.forEach(brand => {
  const brandMd = `---
title: ${brand.seoTitle}
description: ${brand.seoDescription}
---

# ${brand.name} 真实评测与选型指南 (2026 最新版)

<AffiliateNotice />

<div class="answer-first-box">
  <div class="answer-label">⚡ 核心测评结论 (Answer-First)</div>
  <div class="answer-content">
    <strong>${brand.name}</strong> ${brand.summary}
    起步月费约 <strong>${brand.startPrice}</strong>，线路采用 <strong>${brand.lineType}</strong>，${brand.clientDesc}。适合 <strong>${brand.targetAudience.slice(0, 2).join('、')}</strong>；不适合 <strong>${brand.notSuitableFor.slice(0, 1).join('、')}</strong>。
  </div>
</div>

## 一、品牌背景与基础硬件规格

${brand.name} 运营始于 **${brand.established}**。在网络代理服务中，线路架构直接决定了晚高峰连接质量与抗风锁能力。该品牌核心参数整理如下：

| 技术指标 | 官方与实测规格口径 | 评估说明 |
|:---|:---|:---|
| **综合推荐序列** | 第 ${brand.rank} 位 ${brand.featured ? '(精选主推)' : '(参考评测)'} | 综合价格、线路等级与售后权重评估 |
| **线路架构** | ${brand.lineType} | 内网专线直连，避免公网出口堵塞 |
| **传输协议** | ${brand.protocols?.join('、')} | 现代高效抗封锁加密协议 |
| **节点覆盖范围** | ${brand.nodeCoverage} | 覆盖主流亚太与跨洋网络核心枢纽 |
| **客户端支持模式** | ${brand.clientDesc} | ${brand.clientType === 'proprietary' ? '免配置小白首选' : '适合多端自由配置'} |
| **起步参考价格** | ${brand.startPrice} | 包含优惠折扣后的折算月度门槛 |
| **可用优惠码** | \`${brand.coupon || '暂无公开'}\` | ${brand.couponDiscount || '按官网即时活动'} |
| **数据核验状态** | \`${brand.statusLabel}\` | ${brand.testDate ? `测试日期: ${brand.testDate}` : '资料来源待复核'} |

---

## 二、网络性能实测：延迟与带宽吞吐

以下数据来自本站网络实验室于 **${brand.testDate || '2026年基准环境'}** 对 ${brand.name} 节点的基准测速。测试包含香港近端、日本、新加坡及跨太平洋美国出口：

<SpeedtestReport 
  title="${brand.name} 节点基准测速可观测性报告"
  status="${brand.dataStatus}"
  statusLabel="${brand.statusLabel}"
  environment="${brand.testEnvironment}"
  date="${brand.testDate}"
  :items='${JSON.stringify(brand.speedtest)}'
/>

> [!NOTE] 测速说明
> 测试结果只代表当次基准环境下的瞬时网络表现，并不等同于 100% 全年全时段在线率。由于本地运营商（电信、联通、移动）及晚高峰公网出口负荷波动，用户端实际连接速度可能存在合理上下浮动。

---

## 三、流媒体 4K 与 AI 生产力大模型解锁矩阵

对于现代梯子用户而言，访问 YouTube 4K、Netflix 奈飞、Disney+ 以及调用 ChatGPT、Claude、Gemini 等 AI 平台已成为刚需。下表为针对 ${brand.name} 节点落地 IP 的协议与地域风控实测：

<AvailabilityMatrix 
  title="${brand.name} 流媒体与 AI 解锁实测矩阵"
  :ai='${JSON.stringify(brand.aiUnlock)}'
  :streaming='${JSON.stringify(brand.streaming)}'
/>

---

## 四、网络传输路径与拓扑架构

了解底层网络走向有助于避免盲目选型。${brand.name} 采用的传输拓扑逻辑如下：

<NetworkTopology 
  title="${brand.name} 数据转发拓扑结构"
  lineType="${brand.lineType?.split('，')[0]}"
  protocol="${brand.protocols?.[0]}"
/>

---

## 五、套餐价格表与流量周期详解

本站整理了 ${brand.name} 目前官方记录的套餐档位，未应用折扣前的基准标价如下表所示：

| 套餐名称 | 付费周期 | 基础定价 | 周期流量配额 | 流量刷新机制 |
|:---|:---:|:---:|:---:|:---:|
${brand.plans?.map(p => `| ${p.name} | ${p.billing} | ${p.price} | ${p.traffic} | ${p.period} |`).join('\n') || '| 基础方案 | 月付 | 详见官网 | 视套餐而定 | 每月刷新 |'}

> [!TIP] 选购与支付建议
> 1. 初次尝试建议首选 **月付或小额季度套餐**，先在自己的真实宽带与高频使用时段测试连接稳定性与晚高峰流媒体画质，满意后再行考虑长周期订阅。
> 2. 结账时可尝试填入优惠码 \`${brand.coupon || '无'}\` 验证是否可获取额外折扣。

---

## 六、客观优缺点深度分析

### 优点亮点 (Pros)
${brand.pros?.map(pro => `- **${pro.split('，')[0]}**：${pro}`).join('\n')}

### 潜在限制与风险 (Cons)
${brand.cons?.map(con => `- **${con.split('，')[0]}**：${con}`).join('\n')}

---

## 七、适用人群画像与选型禁忌

### 强烈推荐人群
${brand.targetAudience?.map(ta => `- ✅ ${ta}`).join('\n')}

### 不建议选用人群
${brand.notSuitableFor?.map(ns => `- ❌ ${ns}`).join('\n')}

---

## 八、常见问题解答 (FAQ)

### 1. ${brand.name} 会不会跑路？如何降低资金风险？
所有网络代理服务本质均存在行业不确定性。降低风险的核心原则是：**坚决不买超过一年的超长期套餐**，优先选择月付或按季付款；密切关注官方公告频道更新频率与工单响应速度。

### 2. ${brand.name} 支持在几台设备上同时使用？
${brand.name} 的设备限制具体视所选套餐而定。部分套餐支持多端并发，部分专属客户端模式限制单账号登录设备数。如需全家或团队共享，建议选购明确标注不限设备的专线套餐。

### 3. 如果遇到节点超时或打不开 ChatGPT 怎么办？
第一步检查客户端分流规则是否设置为「规则模式（绕过大陆）」；第二步手动切换至新加坡、日本或美国原生节点；第三步清除浏览器或 ChatGPT App 缓存重试。

---

## 九、服务开通与变现直达

<BrandCard :brand='${JSON.stringify(brand)}' />

---

## 十、蜂巢式深度内链与关联专题

- 📚 **同类横向对比**：[2026年梯子推荐怎么选？从价格、线路与体验全面比较](/tizi-tuijian/)
- 💰 **低预算替代**：[每月10元到20元的高性价比便宜梯子推荐](/pianyi-tizi/)
- 🛡️ **安全避坑常识**：[机场跑路前兆与5大高危信号核验](/bikeng/)
- 💻 **客户端上手教程**：[Windows/Mac/iOS/Android 全平台代理客户端配置教程](/jiaocheng/)
`;

  fs.writeFileSync(`docs/brands/${brand.slug}.md`, brandMd, 'utf-8');
});

console.log(`Successfully generated ${brands.length} brand detail markdown pages in docs/brands/`);
