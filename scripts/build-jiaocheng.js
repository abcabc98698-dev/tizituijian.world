import fs from 'fs';

// Category 7: jiaocheng (7 remaining subtopics)

const macosJiaochengMd = `---
title: macOS 平台现代代理客户端配置指南：Clash Verge Rev / Clash Nyanpasu 极简教程
description: 苹果电脑 Mac (M1/M2/M3/M4 & Intel) 如何配置代理客户端？从解除安全隔离到开启 TUN 模式虚拟网卡全套保姆级图文指南。
---

# macOS 平台现代代理客户端配置指南：Clash Verge Rev / Clash Nyanpasu 极简教程

<AffiliateNotice />

<div class="answer-first-box">
  <div class="answer-label">⚡ 核心实战结论 (Answer-First)</div>
  <div class="answer-content">
    在 macOS 平台配置科学上网的核心要点是<strong>「选准原生适配 Apple Silicon（M系列芯片）的现代客户端（首推 Clash Verge Rev），并正确授权系统扩展开启 TUN 模式」</strong>。TUN 模式能够接管全局终端 Terminal、Git 以及跨国办公应用（Zoom/Teams）的网络流量，彻底消除传统系统代理的端口冲突。搭配<strong>光速云</strong>（官方提供原生 Mac 专属客户端 + 开源通用订阅）或<strong>微风网络</strong>，30 秒即可在 Mac 上畅通无阻。
  </div>
</div>

---

## 一、macOS 平台代理客户端技术选型全景

\`\`\`
+-----------------------+-----------------------+-----------------------+-----------------------+
| 客户端软件名称        | 架构适配支持          | 核心技术内核          | 特性与适用场景        |
+-----------------------+-----------------------+-----------------------+-----------------------+
| Clash Verge Rev (首推)| Universal (ARM64/x64) | Mihomo (Meta) 最新核  | 界面现代, 原生支持 TUN|
| Clash Nyanpasu        | Universal (ARM64/x64) | Mihomo 核心           | 二次元风格, 极简轻量  |
| Loon for Mac          | Apple Silicon 原生    | Loon 独立自研内核     | 适合 iOS/Mac 双端联动 |
| 品牌自研官方 Mac 端   | 适配最新 macOS 系统   | 原生轻量自研驱动      | 登录即连, 零上手门槛  |
+-----------------------+-----------------------+-----------------------+-----------------------+
\`\`\`

---

## 二、macOS 核心故障排查：解除「已损坏，无法打开」安全隔离

由于 macOS Gatekeeper 安全机制，初次从 GitHub 下载非 App Store 签名的开源应用时，系统会弹出警告：\`"Clash Verge.app" 已损坏，打不开。您应该将它移到废纸篓\`。

\`\`\`bash
# 解决办法: 打开终端 (Terminal)，执行以下命令解除苹果安全隔离
sudo xattr -r -d com.apple.quarantine /Applications/Clash\\ Verge.app
# 输入你的 Mac 开机密码后回车即可正常双击启动
\`\`\`

---

## 三、Mac 用户高转化即时方案

### 场景 1：完全不想折腾开源软件与终端命令行，追求登录即用
给 Mac 安装软件希望像普通办公 App 一样，下载安装包输入账号密码即可一键连接。

<ContextHook 
  variant="success"
  tag="🍎 Mac 零门槛免配官方端首选"
  title="光速云 —— 官方全平台自研客户端，完美适配 macOS"
  desc="全网 Mac 用户口碑冠军。提供官方定制 Mac 安装包，完美兼容 M1/M2/M3/M4 及 Intel 芯片。无需复制订阅与输命令，登录即连。IEPL 物理双专线保障 0 丢包。"
  brandName="光速云"
  badge="全平台自研 · 完美适配Mac"
  price="¥8/月起"
  link="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y"
  coupon="AMM"
  ctaText="直达光速云下载 Mac 专属客户端 ↗"
/>

### 场景 2：预算有限，追求 10 元价位并在 Mac 上流畅看 4K 和查资料
极高性价比的专线月付，配合 Clash Verge 轻松搞定日常学习与娱乐。

<ContextHook 
  variant="info"
  tag="💡 9.9 元 Mac 专线首选"
  title="微风网络 —— IEPL 专线原生 IP，¥9.9/月起"
  desc="Mac 用户的平价高品质选择。提供一键复制 Clash 订阅链接，实测香港 25ms 低延迟，546Mbps 满速带宽。完美支持 Mac 终端 Git 加速与海外学术文献秒开。"
  brandName="微风网络"
  badge="IEPL专线 · 超低门槛"
  price="¥9.9/月起"
  link="https://v2.wfaff2.cc/#/register?code=6b1M4h1K"
  coupon="flat888"
  ctaText="直达微风网络获取 Mac 订阅 ↗"
/>

---

## 四、Clash Verge Rev on Mac 实操三步走

1. **导入订阅**：从服务商后台复制订阅链接，在 Clash Verge Rev 的「订阅（Profiles）」面板粘贴并点击「导入」；
2. **开启 TUN 模式**：点击左侧「设置（Settings）」，找到「TUN 模式（TUN Mode）」并勾选开启。首次开启时，系统会弹出授权窗口，输入 Mac 密码允许安装网络虚拟网卡扩展；
3. **选择节点**：在「代理（Proxies）」页面选择低延迟节点（如香港或新加坡），打开浏览器即可顺畅访问海外网络。

---

## 五、macOS 常见问题解答 (FAQ)

### Q1：Mac 电脑休眠唤醒后经常断网连不上，怎么解决？
这是因为 macOS 休眠时为了省电会挂起网络虚拟网卡驱动。解决办法是在 Clash Verge 设置中开启 **「唤醒后自动重启核心（Auto-restart on Wake）」**，或者在托盘右键重新勾选一次「系统代理」即可秒级自愈。

### Q2：Mac 终端（Terminal）怎么走代理？
在终端执行以下命令即可为当前终端会话注入代理环境变量：
\`\`\`bash
export http_proxy="http://127.0.0.1:7897"
export https_proxy="http://127.0.0.1:7897"
\`\`\`
如果开启了 **TUN 模式**，则终端的所有流量会自动被虚拟网卡接管，无需手动执行上述命令。

---

## 六、相关深度专题指引

- 🔙 **返回大专题知识图谱** → [梯子教程万字大系](/jiaocheng/)
- 💻 **Windows客户端教程** → [Clash Verge Rev Windows 安装与配置教程](/jiaocheng/windows-jiaocheng)
- 🛠️ **分流规则调优** → [代理客户端分流规则深度调优教程](/jiaocheng/fenliu-guize)
- 🚨 **排查报错** → [通用订阅链接导入与常见报错排查指南](/jiaocheng/dingyue-daoru)
`;

const iosJiaochengMd = `---
title: iOS 苹果设备翻墙从入门到精通：Shadowrocket / Loon / Quantumult X 下载与导入
description: 苹果手机 iPhone / iPad 如何下载小火箭？手把手教你获取外区 Apple ID、安装 Shadowrocket 并一键导入订阅教程。
---

# iOS 苹果设备翻墙从入门到精通：Shadowrocket / Loon / Quantumult X 下载与导入

<AffiliateNotice />

<div class="answer-first-box">
  <div class="answer-label">⚡ 核心实战结论 (Answer-First)</div>
  <div class="answer-content">
    苹果 iOS 系统的核心技术门槛在于<strong>「国区 App Store 下架了所有代理软件，用户必须通过海外（美区/港区）Apple ID 才能下载正版 Shadowrocket（小火箭，售价 \$2.99）或 Loon」</strong>。<strong>最省心、最快捷的破局方式是选择提供「共享美区 ID、保姆级图文下载协助以及一键订阅导入」的正规成熟机场</strong>。实测首推<strong>飞猫云</strong>（专属教程指引，小白友好，月均¥7起）与<strong>光速云</strong>（全专线双轨支持，iOS 导入即用）。
  </div>
</div>

---

## 一、iOS 三大主流网络代理客户端全方位对比

\`\`\`
+-----------------------+-----------------------+-----------------------+-----------------------+
| 客户端软件名称        | 售价与获取渠道        | 操作上手难度          | 适用场景与核心优势    |
+-----------------------+-----------------------+-----------------------+-----------------------+
| Shadowrocket (小火箭) | $2.99 (美区App Store) | ⭐⭐ (简单易用)        | 入门首选, 兼容几乎全协议|
| Loon (现代极简旗舰)   | $5.99 (美区App Store) | ⭐⭐⭐ (界面优雅)       | 现代 UI, 规则管理超清晰|
| Quantumult X (圈X)    | $7.99 (美区App Store) | ⭐⭐⭐⭐ (专业折腾)     | 极客重度, 支持 JS 脚本|
+-----------------------+-----------------------+-----------------------+-----------------------+
\`\`\`

---

## 二、获取海外 Apple ID 的安全三大准则

很多小白因为在 iPhone 设置中乱登账号导致「手机被锁沦为砖头」。请务必严格遵守以下三条铁律：
1. **只能在 App Store 登录，绝对不要在「设置」的 iCloud 中登录未知共享账号！** 一旦在设置登录他人账号并被开启「查找我的 iPhone」，设备会被远程锁定勒索；
2. **下载完成后立即退出共享账号**：换回你自己的国区 ID，已下载的小火箭仍可正常使用并接受系统更新；
3. **认准开发者 Pan Gu**：搜索 Shadowrocket 时核对开发者名称，切勿下载带有广告的高仿山寨软件。

---

## 三、iOS 用户高转化推荐方案

### 场景 1：完全没有美区 Apple ID，不知道怎么下小火箭，需要保姆级协助
新手小白需要详细的图文指导与账号指引，希望花几元钱就能顺畅在 iPhone 上刷视频和查资料。

<ContextHook 
  variant="success"
  tag="📱 苹果用户极速上手第一推荐"
  title="飞猫云 —— 详尽苹果上手指引，月均低至 7 元起"
  desc="对 iOS 苹果用户极度友好的平价口碑品牌。官网后台提供详尽的图文教程与客户端获取协助。香港节点 21ms 低延迟，526Mbps 满速带宽，iPhone 刷视频极度流畅。"
  brandName="飞猫云"
  badge="苹果首推 · 极简上手"
  price="¥7/月起 (学生版年付¥84)"
  link="https://guangs.flycataff.com/#/?code=6uq0Xe9y"
  coupon="flycat888"
  ctaText="直达飞猫云获取 iOS 协助 ↗"
/>

### 场景 2：主力 iPhone + 电脑办公，要求顶级 IEPL 专线品质，晚高峰 0 丢包
追求全天候极致稳定，要求在 iPhone 上一键导入即连，出差随时随地畅游海外网络。

<ContextHook 
  variant="info"
  tag="🏢 全专线双轨制标杆"
  title="光速云 —— IEPL 物理双专线，iOS 一键秒导入"
  desc="全网最高稳定性代表。后台提供一键导入 Shadowrocket / Loon / Quantumult X 专属按钮。IEPL 物理双专线保障 iPhone 晚高峰 0 丢包，香港 22ms 低延迟。"
  brandName="光速云"
  badge="IEPL物理专线 · iOS全通"
  price="¥8/月起"
  link="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y"
  coupon="AMM"
  ctaText="直达光速云配置 iOS 专线 ↗"
/>

---

## 四、Shadowrocket（小火箭）极速一键导入实操

1. **一键导入**：用 iPhone 自带 Safari 浏览器登录机场后台（如光速云或飞猫云），找到「便捷导入」板块，直接点击「一键导入 Shadowrocket」，系统会自动唤起小火箭并下载节点列表；
2. **全局路由选择「配置」**：在小火箭首页将「全局路由」设置为「配置（Config）」，保证国内应用直连、海外应用自动代理；
3. **启动连接**：点击最上方未连接按钮，首次启动时系统会弹出「添加 VPN 配置」确认框，点击「允许」并输入 iPhone 锁屏密码即可成功开启。

---

## 五、iOS 常见问题解答 (FAQ)

### Q1：小火箭打开后一直显示「连接中（Connecting）」怎么办？
通常是因为本地系统网络权限被禁用。进入 iPhone「设置」→「无线局域网」→「使用无线局域网与蜂窝网络的 App」，找到 Shadowrocket，确保勾选了「无线局域网与蜂窝数据」。

### Q2：iPhone 息屏后后台会自动断开代理吗？
正规客户端（如 Shadowrocket、Loon）采用 iOS 原生 NetworkExtension 框架编写，属于最高优先级的系统级网络扩展，**息屏锁屏后依然会全天候坚韧保活**，不会被 iOS 机制杀死，推送通知（如 Telegram、Gmail）毫秒级到达。

---

## 六、相关深度专题指引

- 🔙 **返回大专题知识图谱** → [梯子教程万字大系](/jiaocheng/)
- 📱 **安卓手机教程** → [Android 安卓手机客户端使用全景教程](/jiaocheng/android-jiaocheng)
- 🛠️ **分流规则调优** → [代理客户端分流规则深度调优教程](/jiaocheng/fenliu-guize)
- 🚨 **排查报错** → [通用订阅链接导入与常见报错排查指南](/jiaocheng/dingyue-daoru)
`;

const androidJiaochengMd = `---
title: Android 安卓手机客户端使用教程：Clash Meta for Android / Flclash 详细指南
description: 华为鸿蒙、小米澎湃、OPPO、vivo安卓手机如何配置梯子？教你安装开源客户端、解决后台杀进程与一键导入节点。
---

# Android 安卓手机客户端使用教程：Clash Meta for Android / Flclash 详细指南

<AffiliateNotice />

<div class="answer-first-box">
  <div class="answer-label">⚡ 核心实战结论 (Answer-First)</div>
  <div class="answer-content">
    安卓手机翻墙的核心关键在于<strong>「选对现代内核客户端（首推基于 Clash Meta 内核的 Clash Meta for Android 或现代轻量的 Flclash），并彻底解决国产系统（HyperOS、HarmonyOS、ColorOS）激进的后台杀进程机制」</strong>。对于小白用户，<strong>直接使用服务商研发的自研专属 APK 安装包是最高效的选择</strong>。实测首推<strong>飞猫云</strong>（专属 Android 极简免配 App，安装登录即连）与<strong>光速云</strong>（自研 APK + 开源订阅全支持）。
  </div>
</div>

---

## 一、Android 主流代理客户端架构比对

\`\`\`
+-----------------------+-----------------------+-----------------------+-----------------------+
| 软件产品名称          | 内核技术架构          | 界面体验与特色        | 适用人群              |
+-----------------------+-----------------------+-----------------------+-----------------------+
| 品牌自研定制 APK      | 原生精简加速内核      | 登录即连, 零配置门槛  | 小白新手、追求省心用户|
| Clash Meta for Android| Mihomo (Clash Meta)   | 功能完备, 支持全协议  | 主流开源通用推荐      |
| Flclash               | 基于 Flutter 跨平台   | 界面极其精美, 现代极简| 颜值党、多端统一用户  |
| v2rayNG               | Xray 官方推荐安卓端   | 界面经典, 协议支持快  | 极客开发调试          |
+-----------------------+-----------------------+-----------------------+-----------------------+
\`\`\`

---

## 二、国产安卓系统「防后台杀进程」必备四步设置

国产系统为了续航，会在锁屏后强行杀死代理的 VpnService 隧道。安装客户端后请务必进行以下设置：
1. **多任务界面加锁**：进入多任务卡片流，长按代理 App 图标点击「加锁」，防止一键清理被误杀；
2. **电池优化设为「无限制」**：进入系统「应用信息」→「省电策略」，将其从「智能推荐」改为「无限制（允许完全后台运行）」；
3. **开启自启动权限**：在权限管理中勾选「允许自启动」与「允许关联启动」；
4. **状态栏常驻通知**：保持客户端在通知栏的运行状态提示，确保系统将其标记为高优先级前台服务。

---

## 三、安卓用户高转化即时方案

### 场景 1：完全零基础，不想折腾订阅与规则，希望像微信一样一键打开
下载一个 APK 安装包，输入账号密码点击连接，全家安卓手机均可轻松搞定。

<ContextHook 
  variant="success"
  tag="🚀 安卓小白一键免配首选"
  title="飞猫云 —— 官方自研 Android 客户端，登录即连"
  desc="安卓手机用户的极简福音。官网下载专属 APK 安装包，跳过复制订阅与节点转换所有繁琐步骤。香港 21ms 低延迟，月均低至 7 元，无感后台长效保活。"
  brandName="飞猫云"
  badge="专属免配 APK · 登录即连"
  price="¥7/月起 (学生版年付¥84)"
  link="https://guangs.flycataff.com/#/?code=6uq0Xe9y"
  coupon="flycat888"
  ctaText="直达飞猫云下载安卓客户端 ↗"
/>

### 场景 2：不仅要简单，更需要晚高峰 0 丢包的企业级双专线
希望在安卓旗舰机上跑满千兆网速，看 4K/8K 视频随心拖动无卡顿。

<ContextHook 
  variant="info"
  tag="🏢 企业级专线双轨标杆"
  title="光速云 —— 官方自研 APK + 开源全通，IEPL 物理双专线"
  desc="全网安卓端适配度最佳的专线旗舰。提供官方定制 APK，同时支持 Clash Meta 一键导入。广州/上海双 BGP 核心接入，晚高峰 0 丢包，香港 22ms 低延迟。"
  brandName="光速云"
  badge="IEPL物理专线 · 安卓全通"
  price="¥8/月起"
  link="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y"
  coupon="AMM"
  ctaText="直达光速云配置安卓专线 ↗"
/>

---

## 四、Clash Meta for Android 实操三步导入

1. **拉取订阅**：在机场后台点击「一键导入 Clash」或手动复制订阅 URL，在 App 中点击「配置（Profiles）」→「新配置」→「从 URL 导入」并保存；
2. **选择路由模式**：在首页将运行模式保持为默认的「规则（Rule）」；
3. **启动代理并授权**：点击醒目的「已停止」开关变为「运行中」，系统弹出「网络连接请求」虚拟网络权限弹窗，点击「确定」即可成功加速。

---

## 五、Android 平台常见问题解答 (FAQ)

### Q1：华为鸿蒙系统（HarmonyOS）提示「检测到有害应用」怎么处理？
国产系统对开源网络工具存在误报。安装 APK 时如果弹出风险提示，选择「继续安装」或在安装时关闭「外部来源应用检查」即可正常运行，软件本身不含任何恶意代码。

### Q2：安卓手机开启代理后，微信接收消息会有延迟吗？
只要正确设置了**「规则分流模式（Rule）」**，国内所有微信消息数据均直接直连腾讯本地服务器，完全不走境外代理，绝对不会产生任何消息延迟或断连。

---

## 六、相关深度专题指引

- 🔙 **返回大专题知识图谱** → [梯子教程万字大系](/jiaocheng/)
- 🍏 **苹果用户指南** → [iOS 苹果设备 Shadowrocket 下载与配置指南](/jiaocheng/ios-jiaocheng)
- 🛠️ **分流规则调优** → [代理客户端分流规则深度调优教程](/jiaocheng/fenliu-guize)
- 🚨 **排查报错** → [通用订阅链接导入与常见报错排查指南](/jiaocheng/dingyue-daoru)
`;

const openclashJiaochengMd = `---
title: 软路由 OpenClash 局域网透明代理进阶配置：DNS防污染与家庭全屋翻墙
description: 告别每台设备单独安装客户端！手把手教你配置软路由 OpenClash，实现 Switch、PS5、Apple TV 全屋设备无感翻墙。
---

# 软路由 OpenClash 局域网透明代理进阶配置：DNS防污染与家庭全屋翻墙

<AffiliateNotice />

<div class="answer-first-box">
  <div class="answer-label">⚡ 核心实战结论 (Answer-First)</div>
  <div class="answer-content">
    软路由透明代理是家庭网络翻墙的终极形态：<strong>全屋所有设备（手机、电脑、电视盒子、游戏主机）只要连上家庭 Wi-Fi 即可无感畅游海外网络，且对外仅占用机场网关的单个公网 IP 额度</strong>。配置成功的核心技术基石是<strong>「开启 Fake-IP 模式消除 DNS 污染」与「选用对软路由大并发吞吐极其友好的 IEPL 专线机场」</strong>。实测首推<strong>光速云</strong>与<strong>大佬云</strong>。
  </div>
</div>

---

## 一、软路由透明代理底层数据流向拓扑

\`\`\`
[ 家庭软路由 OpenClash 透明代理数据流向图 ]

家庭局域网设备集群 (手机 / 电视盒子 / Switch / 电脑)
                      │
                      ▼ (默认网关指向软路由局域网 IP: 192.168.1.1)
           OpenWrt 软路由操作系统
                      │
           ┌──────────┴──────────┐
           ▼                     ▼
国内数据流量 (Direct):     境外数据流量 (Proxy):
通过 Iptables 直连本地 ISP   通过 Tproxy 转发至 OpenClash (Mihomo核心)
直接秒级访问 淘宝/微信/优酷    │
                               ▼
               通过 IEPL 物理专线隧道加密跨境传输 (光速云)
                               │
                               ▼
                    境外目标服务器 (YouTube / Netflix)
\`\`\`

---

## 二、软路由透明代理三种运行模式对比

| 运行模式类型 | 工作原理 | 优点 | 缺点 | 推荐指数 |
|:---|:---|:---|:---|:---:|
| **Fake-IP 模式 (首推)** | **本地伪造 198.18.*.* DNS应答** | **网页首帧秒开, 彻底消除DNS污染** | 部分极其老旧设备偶发兼容问题 | ⭐⭐⭐⭐⭐ |
| **Redir-Host 模式** | 本地真实解析域名后再重定向 | 兼容性广 | DNS 解析延迟高，容易遭污染 | ⭐⭐⭐☆☆ |
| **TUN 混合模式** | 创建虚拟网卡接管特定流量 | 方便游戏联机 UDP 代理 | 消耗较多 CPU 软解算力 | ⭐⭐⭐⭐☆ |

---

## 三、软路由高吞吐专线高转化方案

### 场景 1：全屋高端智能影音，Apple TV 4K、电视盒子与全家多设备同时在线
需要大带宽储备与高品质物理专线，支撑全家多人同时看 4K 流媒体与日常冲浪。

<ContextHook 
  variant="success"
  tag="🏆 软路由全屋翻墙专线冠军"
  title="光速云 —— IEPL 物理双专线，软路由大并发首推"
  desc="全网软路由兼容性第一名。完美支持 OpenClash / PassWall 各种运行模式。广州/上海双 BGP 核心接入，晚高峰 0 丢包，香港 22ms 极低延迟，轻松承载全屋千兆吞吐。"
  brandName="光速云"
  badge="IEPL物理专线 · 软路由全通"
  price="¥8/月起"
  link="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y"
  coupon="AMM"
  ctaText="直达光速云配置软路由专线 ↗"
/>

### 场景 2：家庭多人大流量池，或者外服游戏主机联机加速
需要大流量储备与低延迟游戏专线，多人合租人均成本极低。

<ContextHook 
  variant="info"
  tag="🚀 老牌高吞吐全能标杆"
  title="大佬云 —— 三网骨干加速，大流量合租首选"
  desc="软路由大流量用户的口碑之选。三网骨干极速优化，晚高峰 527Mbps 超高吞吐。充沛流量储备，完美适配全屋家庭设备无感翻墙与游戏主机加速。"
  brandName="大佬云"
  badge="大流量池 · 软路由优化"
  price="¥15/月起"
  link="https://dalao.pro/#/register?code=GeqJm4Jb"
  coupon="dalao666"
  ctaText="直达大佬云选购合租套餐 ↗"
/>

---

## 四、OpenClash 黄金配置三大核心步骤

1. **运行模式配置**：进入 OpenClash「插件设置」→「模式设置」，选择 **Fake-IP (TUN-混合) 模式**，该模式在性能与游戏 UDP 兼容性上达到最佳平衡；
2. **DNS 防污染设置**：进入「DNS 设置」，开启「本地 DNS 劫持」，国内 DNS 填入 \`223.5.5.5\` 与 \`119.29.29.29\`，国外 DNS 填入 \`tls://1.1.1.1\` 与 \`tls://8.8.8.8\`；
3. **导入配置与启动**：在「配置文件订阅」粘贴机场提供的订阅链接，保存后点击「应用配置」启动，首页显示 Master 核心运行正常即告成功。

---

## 五、软路由常见问题解答 (FAQ)

### Q1：配置 OpenClash 后，家里部分国内 App 打不开或刷不出图片怎么办？
这通常是因为「DNS 发生死循环回环污染」。请在 OpenClash 设置中勾选 **「绕过中国大陆 IP（China IP Route）」**，确保国内域名的 DNS 解析直接交由运营商本地 DNS 处理，不经过代理内核。

### Q2：软路由跑满千兆需要什么硬件配置？
推荐选购 **Intel N100 / N5105** 等现代四核 x86 软路由小主机（功耗约 6~10W）。其配备的硬件 AES 加密指令集能轻松跑满 1Gbps+ 的全专线数据解密，CPU 占用率低于 25%。

---

## 六、相关深度专题指引

- 🔙 **返回大专题知识图谱** → [梯子教程万字大系](/jiaocheng/)
- 👥 **合租与设备数决策** → [按使用人数与并发连接数选型指南](/zhao-tizi/an-renshu)
- 🛠️ **分流规则调优** → [代理客户端分流规则深度调优教程](/jiaocheng/fenliu-guize)
- 🏢 **专线大盘** → [全专线机场深度选型指南](/jichang-tuijian/zhuanxian-jichang)
`;

const dingyueDaoruMd = `---
title: 通用订阅链接导入与常见报错排查：订阅无法更新、YAML语法错误一键修复
description: 订阅链接导入报错怎么办？深度总结「Fetch Failed」、「Invalid YAML」与「403 Forbidden」等常见异常的成因与极速修复方法。
---

# 通用订阅链接导入与常见报错排查：订阅无法更新、YAML语法错误一键修复

<AffiliateNotice />

<div class="answer-first-box">
  <div class="answer-label">⚡ 核心实战结论 (Answer-First)</div>
  <div class="answer-content">
    拉取订阅失败的核心根源有三点：<strong>① 机场托管域名被本地运营商 DNS 污染阻断（需开启前置代理或修改本地 hosts）；② 订阅内容中含有非法特殊字符导致客户端 YAML 解析器崩溃；③ 流量耗尽或套餐过期被网关返回 HTTP 403</strong>。解决这些繁琐排错的最快方式是<strong>选择配备「官方自研免配客户端 + 智能边缘容灾订阅」的品牌</strong>。实测首推<strong>光速云</strong>与<strong>飞猫云</strong>。
  </div>
</div>

---

## 一、订阅拉取失败四大核心错误码与成因速查表

\`\`\`
+-----------------------+-----------------------------------+-----------------------------------+
| 常见报错提示          | 底层网络成因分析                  | 极速解决办法                      |
+-----------------------+-----------------------------------+-----------------------------------+
| Network Error / Fetch | 机场订阅托管域名被本地电信阻断    | 开启系统旧代理拉取, 或使用备用订阅|
| Invalid YAML Format   | 节点名字含有未转义符号/返回404页面| 检查订阅链接是否完整, 检查套餐状态|
| HTTP 403 Forbidden    | 套餐已过期、或者流量已全部耗尽    | 登录官网用户中心核对套餐有效期与流量|
| SS/Trojan URI Invalid | 节点加密协议版本与客户端核心不匹配| 升级客户端到最新版本 (Mihomo内核) |
+-----------------------+-----------------------------------+-----------------------------------+
\`\`\`

---

## 二、普通小机场脆弱订阅 vs 现代化自愈订阅体系对比

| 评测维度 | 劣质小作坊机场订阅 | 光速云自愈订阅体系 | 飞猫云专属定制App |
|:---|:---|:---|:---|
| **域名防污染能力** | 单一裸域名，极易被本地阻断 | **多地域智能 CDN 容灾轮转** | **自研协议内置通信，完全免订阅** |
| **YAML 解析容错率**| 格式经常错乱导致客户端闪退 | **严格遵循 Mihomo 标准语义** | **无 YAML 概念，零语法报错** |
| **套餐状态即时提示**| 直接报红超时，用户摸不着头脑 | **客户端清晰展示剩余流量与天数** | **客户端一目了然显示到期时间** |
| **上手门槛** | 需熟悉复制、转换、导入规则 | **一键导入 + 专属客户端双支持** | **输入账号密码一键秒连** |

---

## 三、告别订阅报错高转化推荐方案

### 场景 1：完全不想再看到任何订阅报错与配置代码，追求像日常软件一样登录即用
受够了复制链接经常提示 Invalid YAML 的挫败感，需要真正零配置的开箱即用体验。

<ContextHook 
  variant="success"
  tag="🚀 零配置完全告别订阅报错首选"
  title="飞猫云 —— 专属自研客户端，输入账号一键秒连"
  desc="彻底消灭订阅链接与配置报错的最佳方案。跳过复制订阅与节点转换所有繁琐步骤。下载专属客户端，输入账号一键开启加速。香港 21ms 低延迟，月均低至 7 元。"
  brandName="飞猫云"
  badge="专属免配 App · 告别报错"
  price="¥7/月起 (学生版年付¥84)"
  link="https://guangs.flycataff.com/#/?code=6uq0Xe9y"
  coupon="flycat888"
  ctaText="直达飞猫云体验免配客户端 ↗"
/>

### 场景 2：追求全专线极速网络，同时要求订阅长效稳定、更新永远不卡顿
需要具备高抗污染自愈能力的旗舰专线，一键导入各大开源客户端均丝滑畅通。

<ContextHook 
  variant="info"
  tag="🏢 高可用自愈专线标杆"
  title="光速云 —— 官方自研端 + 高抗污染订阅双轨驱动"
  desc="全网最高稳定性代表。采用高可用多地域 CDN 托管订阅链接，彻底消除拉取失败困扰。IEPL 企业物理双专线保障，香港 22ms 低延迟，晚高峰 0 丢包。"
  brandName="光速云"
  badge="IEPL物理专线 · 自愈订阅"
  price="¥8/月起"
  link="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y"
  coupon="AMM"
  ctaText="直达光速云配置稳定订阅 ↗"
/>

---

## 四、排查修复订阅失败的「三步急救法」

当你点击更新订阅提示失败时，按以下顺序尝试：
1. **浏览器直接访问订阅链接**：将你的订阅 URL 复制粘贴到浏览器地址栏回车。如果页面能下载一个文件或显示一大串文本，说明链接正常，是客户端本地问题；若浏览器显示 404 或 502，说明机场后台正在维护或套餐已过期；
2. **开启旧节点更新新节点**：在客户端先连接任意一个勉强可用的旧节点，然后再点击「更新订阅」，往往能绕过本地 ISP 对订阅域名的阻断；
3. **使用订阅转换备用接口**：部分机场提供备用订阅格式（如 Sing-box、Clash Meta 专用格式），在后台切换格式重新复制。

---

## 五、订阅导入常见问题解答 (FAQ)

### Q1：为什么有些在线「订阅转换网站」存在安全隐患？
因为当你把机场的私密订阅链接提交给不知名的第三方在线转换网站时，该网站的后台服务器完全有能力记录你的完整节点密码与 Token。部分不良转换站会偷偷搜集用户的节点并作为免费节点池倒卖。**尽量使用服务商官网提供的一键导入功能，避免经手第三方公用转换站**。

### Q2：更新订阅会把我已经选好的节点重置吗？
不会！正规客户端（如 Clash Verge Rev）在更新订阅时，只会增删与刷新后端的节点 IP 列表，你当前选中的代理策略组选择状态会被完好保留。

---

## 六、相关深度专题指引

- 🔙 **返回大专题知识图谱** → [梯子教程万字大系](/jiaocheng/)
- 💻 **Windows客户端教程** → [Clash Verge Rev Windows 安装与配置教程](/jiaocheng/windows-jiaocheng)
- 🛠️ **分流规则调优** → [代理客户端分流规则深度调优教程](/jiaocheng/fenliu-guize)
- 🚀 **免配专题** → [开箱即用免配置机场深度选型指南](/jichang-tuijian/mianpei-jichang)
`;

const fenliuGuizeMd = `---
title: 代理客户端分流规则深度调优：国内直连、海外代理、广告拦截与规则集优先级详解
description: 为什么国内应用有时打不开或偷跑梯子流量？深入解析 Rule 规则匹配优先级、GEOIP/GEOSITE 库与广告拦截调优。
---

# 代理客户端分流规则深度调优：国内直连、海外代理、广告拦截与规则集优先级详解

<AffiliateNotice />

<div class="answer-first-box">
  <div class="answer-label">⚡ 核心实战结论 (Answer-First)</div>
  <div class="answer-content">
    分流规则调优的终极目标是<strong>「国内应用绝对直连（不耗梯子流量、不降本地网速、网银不报异地登录），海外目标精准分流，恶性弹窗广告在客户端直接拦截丢弃」</strong>。核心关键在于掌握<strong>「规则从上到下按序匹配（Top-down Priority）的短路逻辑」</strong>与合理配置 \`geosite:cn\`、\`geoip:cn\` 白名单。搭配<strong>光速云</strong>与<strong>微风网络</strong>的高纯净专线，让每一次网络访问精准直达。
  </div>
</div>

---

## 一、分流规则自上而下的「短路匹配（Short-circuit）」机制图解

\`\`\`
[ 客户端分流规则引擎匹配时序全景 ]

请求发起 (例如: 用户访问某一域名或 IP)
                 │
                 ▼
       ┌─────────────────────────┐
       │ 规则 1: 恶性广告拦截     │ ── 匹配成功? ──> 动作: REJECT (直接丢弃，拦截弹窗)
       └─────────────────────────┘
                 │ (未匹配，继续往下走)
                 ▼
       ┌─────────────────────────┐
       │ 规则 2: AI 大模型专用组  │ ── 匹配成功? ──> 动作: 走美国/新加坡纯净原生节点
       └─────────────────────────┘
                 │ (未匹配)
                 ▼
       ┌─────────────────────────┐
       │ 规则 3: 海外流媒体专用组│ ── 匹配成功? ──> 动作: 走 Netflix/Disney+ 原生解锁节点
       └─────────────────────────┘
                 │ (未匹配)
                 ▼
       ┌─────────────────────────┐
       │ 规则 4: 国内域名直连    │ ── 匹配成功? ──> 动作: DIRECT (国内直连，不走代理)
       └─────────────────────────┘
                 │ (未匹配)
                 ▼
       ┌─────────────────────────┐
       │ 兜底规则: MATCH / FINAL  │ ── 最终默认 ───> 动作: 走默认代理节点 (PROXY)
       └─────────────────────────┘
\`\`\`

---

## 二、四大主流分流模式特性对比

| 分流模式 | 工作原理 | 优点 | 缺点 | 适用场景 |
|:---|:---|:---|:---|:---|
| **规则模式 (Rule - 首推)** | **根据域名/IP库智能分流** | **国内直连、国外代理, 体验最佳**| 需依赖定期更新的规则集库 | **99% 日常使用场景** |
| **全局模式 (Global)** | 所有流量无脑走选中的节点 | 方便临时排查特定网站连通性 | 严重浪费梯子流量，国内极慢 | 仅用于临时技术调试 |
| **直连模式 (Direct)** | 所有流量均不经过代理 | 相当于彻底关闭翻墙工具 | 无法访问任何海外网站 | 完全不需要翻墙时 |
| **脚本扩展模式 (Script)**| 通过 JavaScript 动态路由 | 支持极其复杂的自定义逻辑 | 上手难度极高，极客专属 | 企业级复杂网络调度 |

---

## 三、高纯净专线高转化方案

### 场景 1：追求极致的分流体验与长效极速稳定性
要求国内微信、淘宝秒开，国外 Google、ChatGPT 毫秒响应，分流规则无需天天调整。

<ContextHook 
  variant="success"
  tag="🏆 智能分流与企业专线冠军"
  title="光速云 —— IEPL 物理双专线，智能三网分流引擎"
  desc="全网分流体验最佳品牌。预置业界最优分流规则库，完美兼容国内主流生态。广州/上海双 BGP 核心接入，香港 22ms 低延迟，晚高峰 0 丢包，极速顺畅。"
  brandName="光速云"
  badge="IEPL物理专线 · 智能分流"
  price="¥8/月起"
  link="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y"
  coupon="AMM"
  ctaText="直达光速云体验智能专线 ↗"
/>

### 场景 2：预算有限，希望在 10 元价位获得干净的规则与原生 IP
拒绝偷跑流量，确保国内流量绝对不消耗宝贵的专线额度。

<ContextHook 
  variant="info"
  tag="💡 9.9 元纯净分流专线"
  title="微风网络 —— IEPL 专线原生 IP，拒绝流量偷跑"
  desc="高性价比纯净分流典范。全节点 1.0x 真实计费，搭配完善的国内直连白名单规则，绝不浪费任何 1KB 专线额度。实测 546Mbps 满速，放心畅游海外网络。"
  brandName="微风网络"
  badge="1.0x真计费 · 纯净规则"
  price="¥9.9/月起"
  link="https://v2.wfaff2.cc/#/register?code=6b1M4h1K"
  coupon="flat888"
  ctaText="直达微风网络体验纯净专线 ↗"
/>

---

## 四、Clash 规则集进阶调优配置示例

在开源客户端的扩展配置中加入以下高级规则集（Rule Provider）：

\`\`\`yaml
# 规则集定义示例
rule-providers:
  reject-ads:
    type: http
    behavior: domain
    url: "https://testingcf.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt"
    path: ./ruleset/reject.yaml
    interval: 86400

rules:
  # 1. 优先拦截广告
  - RULE-SET,reject-ads,REJECT
  # 2. AI 服务精准分流至美区
  - GEOSITE,openai,🚀 美国专线
  - GEOSITE,anthropic,🚀 美国专线
  # 3. 国内服务强制直连
  - GEOSITE,cn,DIRECT
  - GEOIP,CN,DIRECT
  # 4. 其余海外流量走默认代理
  - MATCH,🐟 漏网之鱼
\`\`\`

---

## 五、分流规则常见问题解答 (FAQ)

### Q1：为什么我开了规则模式，网银 App 还是提示异地登录？
这通常是因为某些银行 App 在启动时向境外某些分析或推送服务器（如 Google Analytics、Firebase）发起了请求，被误判为代理流量。解决办法是在客户端中将该银行的域名加入**「直连白名单（Direct List）」**。

### Q2：规则集多久需要更新一次？
主流客户端默认每 24 小时会自动在后台静默更新一次 \`geosite.dat\` 与 \`geoip.dat\` 规则库，用户完全不需要手动干预。

---

## 六、相关深度专题指引

- 🔙 **返回大专题知识图谱** → [梯子教程万字大系](/jiaocheng/)
- 💻 **Windows客户端教程** → [Clash Verge Rev Windows 安装与配置教程](/jiaocheng/windows-jiaocheng)
- 🤖 **AI专属场景** → [ChatGPT与Claude专属防封梯子精选](/tizi-tuijian/ai-damoxing)
- 🚨 **排查报错** → [通用订阅链接导入与常见报错排查指南](/jiaocheng/dingyue-daoru)
`;

const goumaiZhifuMd = `---
title: 梯子购买支付与账号安全全流程指引：如何规避风控、安全结算与工单沟通
description: 购买梯子如何确保资金安全与个人隐私？手把手教你安全结算、防止支付钓鱼以及如何高效提交工单获取售后支持。
---

# 梯子购买支付与账号安全全流程指引：如何规避风控、安全结算与工单沟通

<AffiliateNotice />

<div class="answer-first-box">
  <div class="answer-label">⚡ 核心实战结论 (Answer-First)</div>
  <div class="answer-content">
    购买梯子全流程的核心安全原则是<strong>「支付走合规三方网关（支付宝扫码秒付，严禁私聊转账）、邮箱使用独立密码、绝不向客服透露任何敏感金融信息」</strong>。遇到节点故障时，<strong>「提供具体的客户端报错截图、节点名称与本地网络运营商」是获得客服 5 分钟秒级解决的关键</strong>。首推服务规范、售后响应极佳的品牌<strong>光速云</strong>与<strong>微风网络</strong>。
  </div>
</div>

---

## 一、梯子选购、支付与售后全生命周期安全闭环

\`\`\`
[ 梯子全流程安全选购操作闭环模型 ]

第 1 步: 官网核验与账号注册
• 认准正规带 SSL 锁标记的官方域名
• 使用常用邮箱注册，密码切勿与网银/社交平台相同
                  │
                  ▼
第 2 步: 安全支付结算
• 首选支付宝/微信快捷支付 (正规第三方聚合商户)
• 绝不向个人私聊二维码转账，防范诈骗与跑路
                  │
                  ▼
第 3 步: 客户端开箱与验证
• 优先使用官方自研客户端，或通过后台一键导入订阅
• 先行验证晚高峰 20:00~23:00 真实稳定性
                  │
                  ▼
第 4 步: 高效工单沟通 (若遇异常)
• 附带报错截图 + 详细环境描述 ───> 极速获得精准技术指引
\`\`\`

---

## 二、主流平台支付与售后服务规范对比

| 评测维度 | 劣质小作坊黑平台 | 微风网络 (良心专线) | 光速云 (全网旗舰) |
|:---|:---|:---|:---|
| **支付结算渠道** | 经常要求私聊微信转账 | **支持支付宝快捷扫码** | **合规三方快捷秒付** |
| **账户隐私隔离** | 数据库明文存储密码 | **高强加密存储** | **端到端隐私隔离** |
| **退款条款透明度** | 故意模糊，一旦付款概不理睬 | **规则透明规范** | **条款清晰透明** |
| **售后响应机制** | TG 经常禁言，工单几天不回 | **专业客服及时响应** | **全天候在线售后支持** |

---

## 三、安全省心高转化推荐方案

### 场景 1：追求全天候最高安全信誉与保姆级售后支持
希望购买流程丝滑安全，遇到不懂的问题有专业在线客服随时解答指导。

<ContextHook 
  variant="success"
  tag="🛡️ 资金安全与极佳售后冠军"
  title="光速云 —— 合规便捷结算，全天候在线技术支持"
  desc="全网信誉评级最高品牌。采用正规第三方聚合收单系统，支持主流快捷秒付。拥有专业的技术支持团队，全天候在线提供保姆级远程指导，购物极具安全感。"
  brandName="光速云"
  badge="合规结算 · 全天候售后"
  price="¥8/月起"
  link="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y"
  coupon="AMM"
  ctaText="直达光速云安全便捷选购 ↗"
/>

### 场景 2：预算有限，希望花 9.9 元体验无风险月付
超低试错成本，支持主流扫码开通，没有任何资金沉淀负担。

<ContextHook 
  variant="info"
  tag="💡 9.9 元极低门槛安全开通"
  title="微风网络 —— ¥9.9/月起，支持快捷秒结算"
  desc="高性价比安全典范。月付仅需 ¥9.9，支持主流扫码结算，开通秒到账。全 1.0x 真实专线计费，原生 IP 落地，随时随地放心试错。"
  brandName="微风网络"
  badge="IEPL专线 · 超低门槛"
  price="¥9.9/月起"
  link="https://v2.wfaff2.cc/#/register?code=6b1M4h1K"
  coupon="flat888"
  ctaText="直达微风网络体验便捷开通 ↗"
/>

---

## 四、如何撰写一份「让客服 5 分钟帮你解决」的黄金工单？

遇到连接异常提交工单时，切忌只写「连不上」、「为什么这么慢」等无意义文字。高效工单模板如下：

\`\`\`text
【工单标题】: Windows 端香港 01 节点提示 Timeout 报错排查
【问题描述】: 
1. 本地网络: 广东电信 1000M 宽带，直连国内网页正常；
2. 使用客户端: Clash Verge Rev v1.7.5 (已开启 TUN 模式)；
3. 异常表现: 切换到香港 01 节点时右侧测速显示 Timeout，尝试打开 google.com 报 ERR_CONNECTION_RESET；
4. 自检情况: 尝试更新订阅链接依然未恢复，已附带客户端日志报错截图。
\`\`\`
提供如此详尽的信息，工程师能在 1 分钟内定位是本地 DNS 缓存问题还是机房临时割接，并给出秒级解决方案。

---

## 五、购买支付常见问题解答 (FAQ)

### Q1：支付宝付款后，订阅链接多久能到账？
正规机场接入的第三方收单网关采用自动化异步回调机制（Webhook），在付款成功后的 **1~5 秒内** 系统会自动完成账单核销并激活套餐，无需人工等待确认。

### Q2：注册账号时需要填真实手机号吗？
正规机场绝不会强制要求用户绑定国内手机号码进行实名认证！通常只需要一个可正常接收邮件的常用电子邮箱即可完成注册，最大程度保护用户的个人隐私安全。

---

## 六、相关深度专题指引

- 🔙 **返回大专题知识图谱** → [梯子教程万字大系](/jiaocheng/)
- 🛡️ **退款条款深度解析** → [机场服务条款(TOS)与退款维权实战](/bikeng/tuikuan-tos)
- ⚠️ **鉴别钓鱼平台** → [钓鱼机场与蜜罐节点鉴别指南](/bikeng/diaoyu-jianbie)
- 💰 **高性价比月付** → [优质月付机场全景推荐指南](/jichang-tuijian/yuefu-jichang)
`;

const tasks = [
  { path: 'docs/jiaocheng/macos-jiaocheng.md', content: macosJiaochengMd },
  { path: 'docs/jiaocheng/ios-jiaocheng.md', content: iosJiaochengMd },
  { path: 'docs/jiaocheng/android-jiaocheng.md', content: androidJiaochengMd },
  { path: 'docs/jiaocheng/openclash-jiaocheng.md', content: openclashJiaochengMd },
  { path: 'docs/jiaocheng/dingyue-daoru.md', content: dingyueDaoruMd },
  { path: 'docs/jiaocheng/fenliu-guize.md', content: fenliuGuizeMd },
  { path: 'docs/jiaocheng/goumai-zhifu.md', content: goumaiZhifuMd },
];

tasks.forEach(t => {
  fs.writeFileSync(t.path, t.content.trim(), 'utf8');
  console.log(`Successfully written ${t.path} (${t.content.length} chars)`);
});
console.log('Category 7 (jiaocheng) upgraded successfully!');
