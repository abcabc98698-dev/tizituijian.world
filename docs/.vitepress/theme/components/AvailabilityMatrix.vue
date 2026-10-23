<template>
  <div class="dark-observatory-panel">
    <div class="dark-observatory-header">
      <div class="dark-observatory-title">
        <span>🎬</span>
        <span>{{ title || '流媒体 & AI 服务解锁状态矩阵 (Service Availability)' }}</span>
      </div>
      <div>
        <span class="dark-observatory-badge badge-measured">动态实测校验</span>
      </div>
    </div>

    <div style="font-size: 0.8rem; color: #94a3b8; margin-bottom: 8px; font-weight: 600;">
      🤖 AI 生产力大模型支持
    </div>
    <div class="matrix-grid" style="margin-bottom: 16px;">
      <div class="matrix-card">
        <span class="matrix-service">ChatGPT (OpenAI)</span>
        <span class="matrix-status" :class="getStatusClass(ai?.chatgpt)">
          {{ getStatusLabel(ai?.chatgpt) }}
        </span>
      </div>
      <div class="matrix-card">
        <span class="matrix-service">Claude (Anthropic)</span>
        <span class="matrix-status" :class="getStatusClass(ai?.claude)">
          {{ getStatusLabel(ai?.claude) }}
        </span>
      </div>
      <div class="matrix-card">
        <span class="matrix-service">Gemini (Google)</span>
        <span class="matrix-status" :class="getStatusClass(ai?.gemini)">
          {{ getStatusLabel(ai?.gemini) }}
        </span>
      </div>
    </div>

    <div style="font-size: 0.8rem; color: #94a3b8; margin-bottom: 8px; font-weight: 600;">
      📺 全球主流流媒体与社交平台
    </div>
    <div class="matrix-grid">
      <div class="matrix-card">
        <span class="matrix-service">Netflix (奈飞)</span>
        <span class="matrix-status" :class="getStatusClass(streaming?.netflix)">
          {{ getStatusLabel(streaming?.netflix) }}
        </span>
      </div>
      <div class="matrix-card">
        <span class="matrix-service">Disney+</span>
        <span class="matrix-status" :class="getStatusClass(streaming?.disney)">
          {{ getStatusLabel(streaming?.disney) }}
        </span>
      </div>
      <div class="matrix-card">
        <span class="matrix-service">YouTube 4K/8K</span>
        <span class="matrix-status" :class="getStatusClass(streaming?.youtube)">
          {{ getStatusLabel(streaming?.youtube) }}
        </span>
      </div>
      <div class="matrix-card">
        <span class="matrix-service">HBO Max</span>
        <span class="matrix-status" :class="getStatusClass(streaming?.hbo)">
          {{ getStatusLabel(streaming?.hbo) }}
        </span>
      </div>
      <div class="matrix-card">
        <span class="matrix-service">TikTok 跨区直连</span>
        <span class="matrix-status" :class="getStatusClass(streaming?.tiktok)">
          {{ getStatusLabel(streaming?.tiktok) }}
        </span>
      </div>
      <div class="matrix-card">
        <span class="matrix-service">Spotify</span>
        <span class="matrix-status" :class="getStatusClass(streaming?.spotify)">
          {{ getStatusLabel(streaming?.spotify) }}
        </span>
      </div>
    </div>

    <div style="margin-top: 14px; pt: 10px; border-top: 1px solid #1e293b; font-size: 0.72rem; color: #64748b;">
      注：流媒体与 AI 解锁受平台 IP 风控实时动态调整，测速结果代表基准可用性，不构成永久可用承诺。
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  ai: Object,
  streaming: Object
})

function getStatusClass(val) {
  if (val === true) return 'status-ok'
  if (val === 'partial') return 'status-partial'
  if (val === false) return 'status-no'
  return 'status-unverified'
}

function getStatusLabel(val) {
  if (val === true) return '✅ 完全解锁'
  if (val === 'partial') return '⚠️ 视节点而定'
  if (val === false) return '❌ 区域受限'
  return '⚪ 待核实'
}
</script>
