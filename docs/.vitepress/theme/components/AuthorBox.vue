<template>
  <div v-if="shouldShow" class="author-eeat-box">
    <div class="author-header">
      <img src="/avatar.jpg" alt="梯子推荐网技术评测实验室" class="author-avatar" />
      <div class="author-info">
        <div class="author-title-row">
          <span class="author-name">梯子选型与网络安全评测组</span>
          <span class="author-badge">实测核验</span>
          <span class="author-role">CCIE 认证网络架构师领衔</span>
        </div>
        <p class="author-bio">
          由 12 年跨国网络优化经验工程师与协议安全研究员组成，长期跟踪 BGP 跨境路由调优、Shadowsocks-2022、VLESS-Reality 与 Hysteria 2 协议实现。所有数据均基于分布式真实机房挂机测试，恪守中立评测准则。
        </p>
      </div>
    </div>

    <div class="author-meta-grid">
      <div class="meta-item">
        <span class="meta-icon">🔬</span>
        <div class="meta-text">
          <strong>评测物理基准：</strong>
          <span>电信(CN2) / 联通(9929) / 移动(CMIN2) 三网千兆 FTTH</span>
        </div>
      </div>
      <div class="meta-item">
        <span class="meta-icon">⏱️</span>
        <div class="meta-text">
          <strong>数据复核周期：</strong>
          <span>2026年10月最新晚高峰压测复核完成</span>
        </div>
      </div>
    </div>

    <div class="author-trust-footer">
      <span class="trust-pill">🛡️ 100% 自费实测验证</span>
      <span class="trust-pill">⚖️ 商业佣金绝不影响中立客观立场</span>
      <span class="trust-pill">❌ 绝不接受付费删除真实差评</span>
      <div class="trust-links">
        <a href="/methodology">评测方法论 ↗</a>
        <a href="/about">关于实验室 ↗</a>
        <a href="/disclosure">推广合规披露 ↗</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter, page } = useData()

const shouldShow = computed(() => {
  return frontmatter.value.layout !== 'home' && !page.value.isNotFound
})
</script>

<style scoped>
.author-eeat-box {
  margin: 3rem 0 1.5rem;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-left: 4px solid var(--vp-c-brand-1);
  border-radius: 8px;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.author-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.author-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--vp-c-brand-1);
  flex-shrink: 0;
}

.author-info {
  flex: 1;
}

.author-title-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.35rem;
}

.author-name {
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--vp-c-text-1);
}

.author-badge {
  background: #10b981;
  color: #fff;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.1rem 0.45rem;
  border-radius: 4px;
}

.author-role {
  font-size: 0.8rem;
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.author-bio {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}

.author-meta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 0.75rem;
  margin: 1rem 0;
  padding: 0.75rem 0;
  border-top: 1px dashed var(--vp-c-divider);
  border-bottom: 1px dashed var(--vp-c-divider);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
}

.meta-icon {
  font-size: 1.1rem;
}

.meta-text {
  color: var(--vp-c-text-2);
}

.meta-text strong {
  color: var(--vp-c-text-1);
}

.author-trust-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  flex-wrap: wrap;
  font-size: 0.78rem;
}

.trust-pill {
  background: var(--vp-c-bg-mute);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  color: var(--vp-c-text-2);
}

.trust-links {
  display: flex;
  gap: 0.75rem;
  margin-left: auto;
}

.trust-links a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 600;
}

.trust-links a:hover {
  text-decoration: underline;
}

@media (max-width: 640px) {
  .author-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .author-title-row {
    justify-content: center;
  }
  .trust-links {
    margin-left: 0;
    width: 100%;
    justify-content: center;
  }
}
</style>
