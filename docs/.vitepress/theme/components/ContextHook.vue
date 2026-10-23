<template>
  <div class="contextual-hook-card" :class="variant + '-style'">
    <div class="hook-header">
      <span class="hook-tag" :class="'tag-' + variant">{{ tag || '⚡ 场景破局首选' }}</span>
      <span style="font-size: 0.75rem; color: #64748b;">针对痛点即时匹配</span>
    </div>
    <div class="hook-title">{{ title }}</div>
    <div class="hook-desc">{{ desc }}</div>
    <div class="hook-action-box">
      <div class="hook-brand-info">
        <span class="hook-brand-name">{{ brandName }}</span>
        <span class="hook-brand-badge">{{ badge }}</span>
        <span v-if="price" style="font-size: 0.82rem; font-weight: 700; color: #0284c7;">{{ price }}</span>
      </div>
      <div>
        <a 
          :href="link" 
          target="_blank" 
          rel="nofollow sponsored noopener" 
          class="hook-cta-btn"
        >
          {{ ctaText || '直达官网开通 ↗' }}
        </a>
      </div>
    </div>
    <div style="font-size: 0.68rem; color: #94a3b8; margin-top: 6px; text-align: right;">
      含推广合作链接，通过链接购买支持本站独立评测，不影响实际价格
    </div>
  </div>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'info' // 'info', 'warning', 'success'
  },
  tag: String,
  title: String,
  desc: String,
  brandName: String,
  badge: String,
  price: String,
  link: String,
  ctaText: String
})
</script>
