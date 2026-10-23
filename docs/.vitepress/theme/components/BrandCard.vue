<template>
  <div class="brand-card-item">
    <div>
      <div class="brand-card-top">
        <div>
          <span v-if="brand.rank <= 3" style="background: #fef08a; color: #854d0e; font-size: 0.72rem; font-weight: 800; padding: 2px 6px; border-radius: 4px; margin-right: 6px;">
            TOP {{ brand.rank }}
          </span>
          <span class="brand-card-name">{{ brand.name }}</span>
        </div>
        <div class="brand-card-price">{{ brand.startPrice?.split(' ')[0] || '详见官网' }}</div>
      </div>

      <div style="font-size: 0.85rem; color: #64748b; margin-bottom: 8px;">
        {{ brand.summary }}
      </div>

      <div class="brand-card-features">
        <span class="brand-feature-pill" v-for="(proto, idx) in brand.protocols" :key="idx">
          {{ proto }}
        </span>
        <span class="brand-feature-pill" style="background: #e0f2fe; color: #0369a1;">
          {{ brand.lineType?.split(' ')[0] }}
        </span>
        <span class="brand-feature-pill" :class="'badge-' + brand.dataStatus" style="font-weight: 600;">
          {{ brand.statusLabel }}
        </span>
      </div>

      <div v-if="brand.coupon" style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 6px; padding: 6px 10px; font-size: 0.8rem; margin: 10px 0; display: flex; justify-content: space-between; align-items: center;">
        <span>优惠码: <strong style="color: #0284c7;">{{ brand.coupon }}</strong></span>
        <span style="color: #64748b; font-size: 0.75rem;">{{ brand.couponDiscount }}</span>
      </div>

      <div v-if="brand.speedtest && brand.speedtest.length" style="background: #0f172a; color: #f8fafc; border-radius: 6px; padding: 8px 12px; font-family: monospace; font-size: 0.78rem; margin: 10px 0;">
        <div style="color: #38bdf8; margin-bottom: 4px;">实测样本 (2026-10):</div>
        <div v-for="(st, i) in brand.speedtest.slice(0, 2)" :key="i" style="display: flex; justify-content: space-between;">
          <span>{{ st.node }}: {{ st.ping }}</span>
          <span style="color: #34d399;">{{ st.download }}</span>
        </div>
      </div>
    </div>

    <div>
      <div class="brand-card-actions">
        <a :href="'/brands/' + brand.slug" class="btn-brand-secondary">
          详细评测
        </a>
        <a 
          v-if="brand.affLink" 
          :href="brand.affLink" 
          target="_blank" 
          rel="nofollow sponsored noopener" 
          class="btn-brand-primary"
        >
          直达官网 ↗
        </a>
        <span v-else class="btn-brand-secondary" style="opacity: 0.6; cursor: not-allowed;">
          入口核实中
        </span>
      </div>
      <div style="font-size: 0.68rem; color: #94a3b8; text-align: center; margin-top: 6px;">
        含推广链接，支持本站独立评测运营
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  brand: {
    type: Object,
    required: true
  }
})
</script>
