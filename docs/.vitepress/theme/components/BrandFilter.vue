<template>
  <div style="margin: 20px 0;">
    <!-- 筛选控制台 -->
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px; margin-bottom: 24px;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-bottom: 14px;">
        <!-- 搜索输入 -->
        <div>
          <label style="font-size: 0.8rem; font-weight: 600; color: #475569; display: block; margin-bottom: 4px;">搜索品牌 / 协议 / 特征</label>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="例如: 光速云, IEPL, VLESS, 免配客户端..."
            style="width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.88rem;"
          />
        </div>

        <!-- 线路筛选 -->
        <div>
          <label style="font-size: 0.8rem; font-weight: 600; color: #475569; display: block; margin-bottom: 4px;">线路专线类型</label>
          <select v-model="filterLine" style="width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.88rem;">
            <option value="all">全部线路</option>
            <option value="IEPL">IEPL 内网专线</option>
            <option value="IPLC">IPLC 国际专线</option>
            <option value="BGP">BGP 优化调度</option>
          </select>
        </div>

        <!-- 客户端类型 -->
        <div>
          <label style="font-size: 0.8rem; font-weight: 600; color: #475569; display: block; margin-bottom: 4px;">客户端支持方式</label>
          <select v-model="filterClient" style="width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.88rem;">
            <option value="all">全部客户端模式</option>
            <option value="proprietary">专属客户端（免配即连）</option>
            <option value="hybrid">自研 + 第三方订阅（双支持）</option>
            <option value="third_party">第三方标准订阅（Clash等）</option>
          </select>
        </div>

        <!-- 数据状态 -->
        <div>
          <label style="font-size: 0.8rem; font-weight: 600; color: #475569; display: block; margin-bottom: 4px;">实测与核实状态</label>
          <select v-model="filterStatus" style="width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.88rem;">
            <option value="all">全部数据状态</option>
            <option value="measured">2026-10 最新实测</option>
            <option value="vendor">品牌自述</option>
            <option value="historical">历史归档 (待核实)</option>
          </select>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.82rem; color: #64748b;">
        <span>共匹配到 <strong style="color: #0284c7;">{{ filteredBrands.length }}</strong> 家梯子与机场品牌</span>
        <button @click="resetFilters" style="background: none; border: none; color: #0284c7; cursor: pointer; text-decoration: underline;">
          重置所有筛选
        </button>
      </div>
    </div>

    <!-- 品牌卡片流 -->
    <div class="brand-showcase-grid">
      <BrandCard v-for="brand in filteredBrands" :key="brand.id" :brand="brand" />
    </div>

    <div v-if="filteredBrands.length === 0" style="text-align: center; padding: 40px; color: #64748b;">
      <p style="font-size: 1.2rem;">🔍 未找到符合条件的机场品牌</p>
      <p style="font-size: 0.9rem;">请尝试调整筛选关键词，或点击“重置所有筛选”。</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BrandCard from './BrandCard.vue'
import brandsData from '../../../../data/brands.json'

const brands = ref(brandsData)
const searchQuery = ref('')
const filterLine = ref('all')
const filterClient = ref('all')
const filterStatus = ref('all')

const filteredBrands = computed(() => {
  return brands.value.filter(item => {
    // 搜索匹配
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      const inName = item.name.toLowerCase().includes(q)
      const inSummary = item.summary?.toLowerCase().includes(q)
      const inProto = item.protocols?.some(p => p.toLowerCase().includes(q))
      const inDesc = item.clientDesc?.toLowerCase().includes(q)
      if (!inName && !inSummary && !inProto && !inDesc) return false
    }

    // 线路匹配
    if (filterLine.value !== 'all') {
      if (!item.lineType?.includes(filterLine.value)) return false
    }

    // 客户端匹配
    if (filterClient.value !== 'all') {
      if (item.clientType !== filterClient.value) return false
    }

    // 状态匹配
    if (filterStatus.value !== 'all') {
      if (item.dataStatus !== filterStatus.value) return false
    }

    return true
  })
})

function resetFilters() {
  searchQuery.value = ''
  filterLine.value = 'all'
  filterClient.value = 'all'
  filterStatus.value = 'all'
}
</script>
