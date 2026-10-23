<template>
  <div class="dark-observatory-panel">
    <div class="dark-observatory-header">
      <div class="dark-observatory-title">
        <span>🗺️</span>
        <span>{{ title || '网络传输路径与拓扑架构 (Network Path Observatory)' }}</span>
      </div>
      <div>
        <span class="dark-observatory-badge badge-vendor">{{ lineType || '专线直连' }}</span>
      </div>
    </div>

    <div class="topology-flow">
      <div class="topology-step">
        <div class="topology-step-icon">1</div>
        <div class="topology-step-content">
          <div class="topology-step-title">用户终端设备 (客户端)</div>
          <div class="topology-step-desc">PC / 手机 / 软路由（经 {{ protocol || 'VLESS / Trojan' }} 强加密流量）</div>
        </div>
      </div>

      <div style="text-align: center; color: #0284c7; font-size: 0.9rem;">▼ 国内中转入口 (三网 BGP 智能接入，隐藏用户公网 IP)</div>

      <div class="topology-step">
        <div class="topology-step-icon">2</div>
        <div class="topology-step-content">
          <div class="topology-step-title">国内接入点 (上海 / 广州 BGP 入口)</div>
          <div class="topology-step-desc">动态调度最优电信/联通/移动骨干链路，降低首包抖动</div>
        </div>
      </div>

      <div style="text-align: center; color: #38bdf8; font-size: 0.9rem; font-weight: bold;">
        ═════ 跨海物理专线 ({{ lineType || 'IEPL / IPLC 内网专线' }}，不经公网 GFW，抗 QoS 干扰) ═════
      </div>

      <div class="topology-step">
        <div class="topology-step-icon">3</div>
        <div class="topology-step-content">
          <div class="topology-step-title">海外落地集群 (香港 / 东京 / 新加坡 / 洛杉矶)</div>
          <div class="topology-step-desc">原生原生住宅/机房 IP，具备流媒体与 AI 权限策略分流</div>
        </div>
      </div>

      <div style="text-align: center; color: #0284c7; font-size: 0.9rem;">▼ 目标服务直达</div>

      <div class="topology-step">
        <div class="topology-step-icon">4</div>
        <div class="topology-step-content">
          <div class="topology-step-title">全球互联网服务</div>
          <div class="topology-step-desc">ChatGPT / Claude / YouTube 4K / Netflix / GitHub</div>
        </div>
      </div>
    </div>

    <div style="margin-top: 12px; font-size: 0.75rem; color: #64748b; border-top: 1px solid #1e293b; padding-top: 8px;">
      架构核心优势: 端到端专线内网封装，有效消除晚高峰国际出口公网拥堵造成的丢包与波动。
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  lineType: String,
  protocol: String
})
</script>
