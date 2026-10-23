import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import './custom.css'
import SpeedtestReport from './components/SpeedtestReport.vue'
import AvailabilityMatrix from './components/AvailabilityMatrix.vue'
import NetworkTopology from './components/NetworkTopology.vue'
import BrandCard from './components/BrandCard.vue'
import BrandFilter from './components/BrandFilter.vue'
import AffiliateNotice from './components/AffiliateNotice.vue'
import JsonLd from './components/JsonLd.vue'
import ContextHook from './components/ContextHook.vue'
import AuthorBox from './components/AuthorBox.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(AuthorBox)
    })
  },
  enhanceApp({ app }) {
    app.component('SpeedtestReport', SpeedtestReport)
    app.component('AvailabilityMatrix', AvailabilityMatrix)
    app.component('NetworkTopology', NetworkTopology)
    app.component('BrandCard', BrandCard)
    app.component('BrandFilter', BrandFilter)
    app.component('AffiliateNotice', AffiliateNotice)
    app.component('JsonLd', JsonLd)
    app.component('ContextHook', ContextHook)
    app.component('AuthorBox', AuthorBox)
  }
}
