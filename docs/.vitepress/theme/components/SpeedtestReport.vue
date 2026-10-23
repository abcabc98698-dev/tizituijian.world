<template>
  <div class="dark-observatory-panel">
    <div class="dark-observatory-header">
      <div class="dark-observatory-title">
        <span>🌐</span>
        <span>{{ title || '节点测速可观测性报告' }}</span>
      </div>
      <div>
        <span class="dark-observatory-badge" :class="'badge-' + (status || 'measured')">
          {{ statusLabel || '2026-10 实测' }}
        </span>
      </div>
    </div>

    <div v-if="environment" style="font-size: 0.78rem; color: #94a3b8; margin-bottom: 14px;">
      测试环境: {{ environment }}
    </div>

    <div class="speed-bar-container" v-if="items && items.length">
      <div v-for="(item, idx) in items" :key="idx" class="speed-row">
        <div class="speed-node">🟢 {{ item.node }}</div>
        <div class="speed-ping">{{ item.ping }}</div>
        <div class="speed-dl">{{ item.download }}</div>
        <div class="speed-progress-bg">
          <div class="speed-progress-bar" :style="{ width: calculateWidth(item.download) }"></div>
        </div>
      </div>
    </div>
    <div v-else style="font-size: 0.82rem; color: #64748b; padding: 10px 0;">
      暂无公开实测数据（历史记录或品牌方自述状态）
    </div>

    <div style="margin-top: 16px; pt: 10px; border-top: 1px solid #1e293b; display: flex; justify-content: space-between; font-size: 0.75rem; color: #64748b;">
      <span>数据口径: {{ date || '2026-10-19' }} 基准测速</span>
      <span>[tizituijian.world 网络实验室]</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  status: String,
  statusLabel: String,
  environment: String,
  date: String,
  items: Array
})

function calculateWidth(dl) {
  if (!dl) return '0%'
  const num = parseFloat(dl)
  if (isNaN(num)) return '20%'
  // 以 600Mbps 为基准满速
  const pct = Math.min(Math.round((num / 600) * 100), 100)
  return Math.max(pct, 5) + '%'
}
</script>
