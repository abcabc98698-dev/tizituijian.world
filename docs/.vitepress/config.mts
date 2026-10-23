import { defineConfig } from 'vitepress'
import { pagefindPlugin } from 'vitepress-plugin-pagefind'
import fs from 'fs'
import path from 'path'

function getCanonicalUrl(relativePath: string): string {
  const clean = relativePath.replace(/\.md$/, '')
  if (clean === 'index') {
    return 'https://tizituijian.world/'
  }
  if (clean.endsWith('/index')) {
    return `https://tizituijian.world/${clean.slice(0, -6)}/`
  }
  return `https://tizituijian.world/${clean}`
}

const categoryNames: Record<string, string> = {
  'tizi-tuijian': '梯子推荐',
  'zhao-tizi': '找梯子',
  'pianyi-tizi': '便宜梯子',
  'jichang-tuijian': '机场推荐',
  'mianfei-jichang': '免费机场',
  'tizi-pingce': '梯子评测',
  'jiaocheng': '使用教程',
  'bikeng': '避坑指南',
  'brands': '机场品牌库'
}

// 从正文提取真实的问答对，仅当真实存在 2 个以上问题时生成 FAQPage Schema
function extractFaqSchema(filePath: string) {
  try {
    if (!fs.existsSync(filePath)) return null
    const content = fs.readFileSync(filePath, 'utf8')
    const faqRegex = /###\s+(?:Q\d+[:：]|常见问题[:：]?)?\s*(.*?)\r?\n([\s\S]*?)(?=(?:###|\n---|\n##|$))/g
    const questions: any[] = []
    let match: RegExpExecArray | null
    while ((match = faqRegex.exec(content)) !== null) {
      const qText = match[1].replace(/^[Q0-9:：\s]+/, '').trim()
      const aText = match[2].replace(/<[^>]*>/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim()
      if (qText && aText && (qText.endsWith('？') || qText.endsWith('?') || match[0].includes('Q'))) {
        questions.push({
          '@type': 'Question',
          name: qText,
          acceptedAnswer: {
            '@type': 'Answer',
            text: aText.slice(0, 300)
          }
        })
      }
    }
    if (questions.length >= 2) {
      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: questions
      }
    }
  } catch (e) {
    // ignore
  }
  return null
}

// 站长平台验证代码配置 (支持环境变量注入或直接填入 Token)
const verificationConfig = {
  google: process.env.GOOGLE_SITE_VERIFICATION || '',
  bing: process.env.BING_SITE_VERIFICATION || '',
  shenma: process.env.SHENMA_SITE_VERIFICATION || '',
  baidu: process.env.BAIDU_SITE_VERIFICATION || ''
}

const verificationHeadTags: any[] = []
if (verificationConfig.google) {
  verificationHeadTags.push(['meta', { name: 'google-site-verification', content: verificationConfig.google }])
}
if (verificationConfig.bing) {
  verificationHeadTags.push(['meta', { name: 'msvalidate.01', content: verificationConfig.bing }])
}
if (verificationConfig.shenma) {
  verificationHeadTags.push(['meta', { name: 'shenma-site-verification', content: verificationConfig.shenma }])
}
if (verificationConfig.baidu) {
  verificationHeadTags.push(['meta', { name: 'baidu-site-verification', content: verificationConfig.baidu }])
}

export default defineConfig({
  title: '梯子推荐网',
  titleTemplate: ':title - 梯子推荐与选购决策站 (tizituijian.world)',
  description: '面向知道梯子具体购买什么产品的用户，提供梯子推荐、好用的梯子、便宜梯子、稳定梯子及梯子怎么买的硬核选型、技术参数对比与购买决策。',
  lang: 'zh-CN',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: 'https://tizituijian.world',
    transformItems(items) {
      return items.map(item => ({
        ...item,
        lastmod: '2026-10-23',
        changefreq: item.url === 'https://tizituijian.world/' ? 'daily' : 'weekly',
        priority: item.url === 'https://tizituijian.world/' ? 1.0 : 0.8
      }))
    }
  },
  head: [
    ['link', { rel: 'icon', type: 'image/jpeg', href: '/avatar.jpg' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', href: '/avatar.jpg' }],
    ['meta', { name: 'keywords', content: '梯子推荐,好用的梯子,便宜梯子,稳定梯子,梯子怎么买,机场推荐,Clash节点,VLESS,IEPL专线' }],
    ['meta', { name: 'author', content: '梯子选型与网络安全评测组' }],
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }],
    ['meta', { property: 'og:site_name', content: '梯子推荐网 tizituijian.world' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ...verificationHeadTags
  ],
  transformHead({ pageData }) {
    const canonicalUrl = getCanonicalUrl(pageData.relativePath)
    const pageTitle = pageData.title ? `${pageData.title} - 梯子推荐网` : '梯子推荐网 - 梯子推荐与选购决策站'
    const pageDesc = pageData.description || '面向知道梯子具体购买什么产品的用户，提供梯子推荐、好用的梯子、便宜梯子、稳定梯子及梯子怎么买的硬核选型、技术参数对比与购买决策。'

    const head: any[] = [
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:title', content: pageTitle }],
      ['meta', { property: 'og:description', content: pageDesc }],
      ['meta', { property: 'og:image', content: 'https://tizituijian.world/avatar.jpg' }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: pageTitle }],
      ['meta', { name: 'twitter:description', content: pageDesc }],
      ['meta', { name: 'twitter:image', content: 'https://tizituijian.world/avatar.jpg' }]
    ]

    const clean = pageData.relativePath.replace(/\.md$/, '')
    const parts = clean.split('/')

    // BreadcrumbList JSON-LD
    const breadcrumbList: any = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: '首页',
          item: 'https://tizituijian.world/'
        }
      ]
    }

    if (parts.length > 1 && categoryNames[parts[0]]) {
      breadcrumbList.itemListElement.push({
        '@type': 'ListItem',
        position: 2,
        name: categoryNames[parts[0]],
        item: `https://tizituijian.world/${parts[0]}/`
      })

      if (parts[1] && parts[1] !== 'index') {
        breadcrumbList.itemListElement.push({
          '@type': 'ListItem',
          position: 3,
          name: pageData.title || parts[1],
          item: canonicalUrl
        })
      }
    } else if (clean !== 'index') {
      breadcrumbList.itemListElement.push({
        '@type': 'ListItem',
        position: 2,
        name: pageData.title || clean,
        item: canonicalUrl
      })
    }

    head.push([
      'script',
      { type: 'application/ld+json' },
      JSON.stringify(breadcrumbList)
    ])

    // Schema: WebSite & Organization on Homepage
    if (clean === 'index') {
      const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: '梯子推荐网',
        alternateName: 'tizituijian.world',
        url: 'https://tizituijian.world/',
        description: '2026年梯子推荐与选购决策站，提供便宜梯子、稳定梯子、机场推荐与硬核评测。',
        publisher: {
          '@type': 'Organization',
          name: '梯子推荐网 tizituijian.world',
          url: 'https://tizituijian.world/',
          logo: {
            '@type': 'ImageObject',
            url: 'https://tizituijian.world/avatar.jpg'
          }
        }
      }
      head.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify(websiteSchema)
      ])
    } else if (parts[1] === 'index') {
      // Category Pillar Page -> CollectionPage
      const collectionSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        headline: pageData.title,
        description: pageDesc,
        url: canonicalUrl,
        inLanguage: 'zh-CN',
        isPartOf: {
          '@type': 'WebSite',
          name: '梯子推荐网',
          url: 'https://tizituijian.world/'
        }
      }
      head.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify(collectionSchema)
      ])
    } else {
      // Content / Review Article -> TechArticle
      const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: pageData.title || '梯子推荐与选购评测',
        description: pageDesc,
        inLanguage: 'zh-CN',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl
        },
        author: {
          '@type': 'Organization',
          name: '梯子选型与网络安全评测组',
          url: 'https://tizituijian.world/about'
        },
        publisher: {
          '@type': 'Organization',
          name: '梯子推荐网',
          url: 'https://tizituijian.world/',
          logo: {
            '@type': 'ImageObject',
            url: 'https://tizituijian.world/avatar.jpg'
          }
        },
        datePublished: '2026-01-15T08:00:00+08:00',
        dateModified: '2026-10-23T15:00:00+08:00'
      }
      head.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify(articleSchema)
      ])

      head.push(
        ['meta', { property: 'article:published_time', content: '2026-01-15T08:00:00+08:00' }],
        ['meta', { property: 'article:modified_time', content: '2026-10-23T15:00:00+08:00' }],
        ['meta', { property: 'article:author', content: '梯子选型与网络安全评测组' }],
        ['meta', { property: 'article:section', content: categoryNames[parts[0]] || '技术评测' }]
      )
    }

    // 针对包含真实 FAQ 问答的页面，提取并注入 FAQPage Schema
    const filePath = path.resolve('docs', pageData.relativePath)
    const faqSchema = extractFaqSchema(filePath)
    if (faqSchema) {
      head.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify(faqSchema)
      ])
    }

    return head
  },
  vite: {
    plugins: [
      pagefindPlugin({
        btnPlaceholder: '搜索梯子与评测...',
        placeholder: '输入关键词搜索品牌、协议、测速、教程...',
        emptyText: '未找到相关结果',
        heading: '搜索结果：{{searchResult}}',
        filter(searchResult) {
          return searchResult
        }
      })
    ]
  },
  themeConfig: {
    logo: { src: '/avatar.jpg', alt: '梯子推荐网 Logo' },
    siteTitle: '梯子推荐网',
    nav: [
      { text: '首页', link: '/' },
      { text: '梯子推荐', link: '/tizi-tuijian/' },
      { text: '找梯子', link: '/zhao-tizi/' },
      { text: '便宜梯子', link: '/pianyi-tizi/' },
      { text: '机场推荐', link: '/jichang-tuijian/' },
      { text: '免费机场', link: '/mianfei-jichang/' },
      { text: '梯子评测', link: '/tizi-pingce/' },
      { text: '使用教程', link: '/jiaocheng/' },
      { text: '避坑指南', link: '/bikeng/' },
      { text: '品牌库', link: '/brands/' },
      {
        text: '关于实验室',
        items: [
          { text: '关于我们与团队', link: '/about' },
          { text: '评测方法论与标准', link: '/methodology' },
          { text: '商业推广披露白皮书', link: '/disclosure' },
          { text: '隐私政策', link: '/privacy' },
          { text: '服务条款', link: '/terms' }
        ]
      }
    ],
    sidebar: {
      '/tizi-tuijian/': [
        {
          text: '梯子推荐专题',
          items: [
            { text: '梯子推荐知识图谱 (万字大系)', link: '/tizi-tuijian/' },
            { text: '2026综合梯子推荐', link: '/tizi-tuijian/zonghe-tuijian' },
            { text: '新手好用梯子精选', link: '/tizi-tuijian/xinshou-tizi' },
            { text: '晚高峰极稳专线梯子', link: '/tizi-tuijian/wending-tizi' },
            { text: '高性价比梯子精算', link: '/tizi-tuijian/gaoxingjiabi-tizi' },
            { text: '海外留学生/跨国办公梯子', link: '/tizi-tuijian/chuhai-bangong' },
            { text: 'AI大模型专用加速梯子', link: '/tizi-tuijian/ai-damoxing' },
            { text: '4K/8K极清流媒体梯子', link: '/tizi-tuijian/liumeiti-tizi' },
            { text: '长期年付保活梯子', link: '/tizi-tuijian/changqi-nianfu' }
          ]
        }
      ],
      '/zhao-tizi/': [
        {
          text: '按需找梯子决策罗盘',
          items: [
            { text: '找梯子全景决策指南 (万字大系)', link: '/zhao-tizi/' },
            { text: '按预算找梯子 (10元/20元档)', link: '/zhao-tizi/an-yusuan' },
            { text: '按设备找梯子 (电脑/手机/软路由)', link: '/zhao-tizi/an-shebei' },
            { text: '按场景找梯子 (AI办公/视频娱乐)', link: '/zhao-tizi/an-changjing' },
            { text: '按使用频率找梯子 (偶尔/长期)', link: '/zhao-tizi/an-pinlv' },
            { text: '按线路协议找梯子 (IEPL/IPLC/VLESS)', link: '/zhao-tizi/an-xianlu' },
            { text: '按团队人数找梯子 (单人/多设备共享)', link: '/zhao-tizi/an-renshu' },
            { text: '按海外落地国家找梯子 (港台日美新)', link: '/zhao-tizi/an-guojia' },
            { text: '按支付方式找梯子 (支付宝/USDT)', link: '/zhao-tizi/an-zhifu' }
          ]
        }
      ],
      '/pianyi-tizi/': [
        {
          text: '便宜梯子专区',
          items: [
            { text: '便宜梯子选购决策大系 (万字大系)', link: '/pianyi-tizi/' },
            { text: '10元以下极限平价梯子', link: '/pianyi-tizi/10yuan-yixia' },
            { text: '20元以内高价值梯子', link: '/pianyi-tizi/20yuan-yinei' },
            { text: '小流量不限时轻量包', link: '/pianyi-tizi/xiaoliuliang-bao' },
            { text: '便宜梯子常见套路与陷阱', link: '/pianyi-tizi/pianyi-xianjing' },
            { text: '学生党超省钱梯子攻略', link: '/pianyi-tizi/xuesheng-shengqian' },
            { text: '便宜月付 vs 便宜年付风险核算', link: '/pianyi-tizi/yuefu-vs-nianfu' },
            { text: '低价梯子晚高峰丢包实测真相', link: '/pianyi-tizi/di-jia-diubao' },
            { text: '备用防失联轻量梯子配置', link: '/pianyi-tizi/beiyong-tizi' }
          ]
        }
      ],
      '/jichang-tuijian/': [
        {
          text: '机场推荐大系',
          items: [
            { text: '2026机场推荐全景指南 (万字大系)', link: '/jichang-tuijian/' },
            { text: '全专线 IPLC/IEPL 旗舰机场', link: '/jichang-tuijian/zhuanxian-jichang' },
            { text: '小白专属客户端免配机场', link: '/jichang-tuijian/mianpei-jichang' },
            { text: '月付周期高灵活性机场', link: '/jichang-tuijian/yuefu-jichang' },
            { text: '多设备并发不限连接数机场', link: '/jichang-tuijian/duoshebei-jichang' },
            { text: '原生IP流媒体解锁机场', link: '/jichang-tuijian/yuansheng-ip' },
            { text: '大带宽 2Gbps 吞吐型机场', link: '/jichang-tuijian/dadaikuan-jichang' },
            { text: '老牌3年以上不跑路机场', link: '/jichang-tuijian/laopai-jichang' },
            { text: '支持 Shadowsocks/Trojan 纯净机场', link: '/jichang-tuijian/chunjing-xieyi' }
          ]
        }
      ],
      '/mianfei-jichang/': [
        {
          text: '免费机场与试用',
          items: [
            { text: '免费机场与安全实战大系 (万字大系)', link: '/mianfei-jichang/' },
            { text: '真实可用的免费试用机场清单', link: '/mianfei-jichang/shiyong-jichang' },
            { text: '免费公共节点与订阅资源', link: '/mianfei-jichang/gonggong-jiedian' },
            { text: '免费节点安全风险与隐私泄露', link: '/mianfei-jichang/anquan-fengxian' },
            { text: '白嫖梯子的替代方案 (几元月付)', link: '/mianfei-jichang/di-jia-tidaifang' },
            { text: '免费梯子常见失效原因与排查', link: '/mianfei-jichang/shixiao-paicha' },
            { text: '自建免费节点的隐藏时间与服务器成本', link: '/mianfei-jichang/zijian-chengben' },
            { text: '免费梯子如何保护账户密码安全', link: '/mianfei-jichang/zhanghao-anquan' },
            { text: '临时应急翻墙实用手册', link: '/mianfei-jichang/linshi-yingji' }
          ]
        }
      ],
      '/tizi-pingce/': [
        {
          text: '梯子深度评测',
          items: [
            { text: '梯子评测实验室标准大系 (万字大系)', link: '/tizi-pingce/' },
            { text: '2026主流梯子品牌横向大PK', link: '/tizi-pingce/hengxiang-pk' },
            { text: '晚高峰8点~10点真实网络测速', link: '/tizi-pingce/wangao-feng-cesu' },
            { text: 'ChatGPT与Claude大模型可用性实测', link: '/tizi-pingce/ai-shice' },
            { text: 'Netflix与Disney+4K画质解锁率', link: '/tizi-pingce/liumeiti-shice' },
            { text: '不同宽带(电信/联通/移动)匹配度实测', link: '/tizi-pingce/kuandai-pipei' },
            { text: '自研客户端 vs Clash通用订阅对比', link: '/tizi-pingce/kehuduan-vs-clash' },
            { text: '梯子断流率与丢包率长周期监测', link: '/tizi-pingce/duanliu-jiance' },
            { text: '梯子评测方法论与防刷单鉴别', link: '/tizi-pingce/fangshua-fangfa' }
          ]
        }
      ],
      '/jiaocheng/': [
        {
          text: '使用教程大全',
          items: [
            { text: '梯子客户端下载与配置通识 (万字大系)', link: '/jiaocheng/' },
            { text: 'Windows使用教程 (Clash Verge Rev/v2rayN)', link: '/jiaocheng/windows-jiaocheng' },
            { text: 'Android安卓使用教程 (v2rayNG/FlClash)', link: '/jiaocheng/android-jiaocheng' },
            { text: 'iOS苹果教程 (Shadowrocket小火箭/Stash)', link: '/jiaocheng/ios-jiaocheng' },
            { text: 'macOS苹果电脑配置教程', link: '/jiaocheng/macos-jiaocheng' },
            { text: '软路由与OpenClash全屋透明代理', link: '/jiaocheng/openclash-jiaocheng' },
            { text: '梯子购买、注册与支付宝/USDT支付', link: '/jiaocheng/goumai-zhifu' },
            { text: '订阅链接导入与常见更新错误解决', link: '/jiaocheng/dingyue-daoru' },
            { text: '分流规则设置：绕过大陆与指定应用代理', link: '/jiaocheng/fenliu-guize' }
          ]
        }
      ],
      '/bikeng/': [
        {
          text: '避坑指南',
          items: [
            { text: '梯子选购避坑防骗百科 (万字大系)', link: '/bikeng/' },
            { text: '机场跑路前兆与5大危险信号', link: '/bikeng/paolu-xinhao' },
            { text: '流量倍率刺客与虚假虚标陷阱', link: '/bikeng/beilv-cike' },
            { text: '年付深坑：为什么新手千万别一上来买多年', link: '/bikeng/nianfu-shenkeng' },
            { text: '售后退款与服务条款(TOS)免责猫腻', link: '/bikeng/tuikuan-tos' },
            { text: '假冒官网与钓鱼推广链接鉴别', link: '/bikeng/diaoyu-jianbie' },
            { text: '节点测速图造假与刷单内幕揭秘', link: '/bikeng/cesu-zaojia' },
            { text: '账号被封禁与违规审计关键词避坑', link: '/bikeng/zhanghao-fengjin' },
            { text: '隐私泄漏与日志留存法律风险警示', link: '/bikeng/yinsi-fengxian' }
          ]
        }
      ],
      '/brands/': [
        {
          text: '机场品牌库',
          items: [
            { text: '42家机场品牌全景检索库', link: '/brands/' },
            { text: '光速云 (TOP 1 主推)', link: '/brands/guangsu' },
            { text: '飞猫云 (TOP 2 免配)', link: '/brands/feimao' },
            { text: '微风网络 (TOP 3 专线)', link: '/brands/weifeng' },
            { text: '暮光加速 (TOP 4 多端)', link: '/brands/muguang' },
            { text: '大佬云 (5.6元平价)', link: '/brands/dalaoyun' },
            { text: '星岛梦 (2020老牌)', link: '/brands/xingdaomeng' },
            { text: '二猫云 (稳定专线)', link: '/brands/ermao' },
            { text: '无忧链接 (TikTok跨境)', link: '/brands/wuyou' },
            { text: '唯兔云 (IPLC专线)', link: '/brands/weitu' },
            { text: 'Firefly (原生IP)', link: '/brands/firefly' },
            { text: 'U1S1 (2Gbps专线)', link: '/brands/u1s1' },
            { text: '一翻云 (住宅IP)', link: '/brands/yifan' },
            { text: 'SOGO云 (15国节点)', link: '/brands/sogo' },
            { text: '速界 (AI针对优化)', link: '/brands/sujie' },
            { text: '闪跃 (骨干IPLC)', link: '/brands/shanyue' },
            { text: '全球云 (60+节点)', link: '/brands/quanqiu' },
            { text: '梯子云 (双模式客户端)', link: '/brands/tiziyun' },
            { text: 'WgetCloud (高端专线)', link: '/brands/wgetcloud' },
            { text: '查看更多品牌...', link: '/brands/' }
          ]
        }
      ]
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    },
    footer: {
      message: '基于客观真实测速与网络实验数据发布 | <a href="/disclosure">商业推广合规披露</a> | <a href="/about">关于我们</a> | <a href="/methodology">评测方法论</a> | <a href="/privacy">隐私政策</a> | <a href="/terms">服务条款</a>',
      copyright: 'Copyright © 2026 tizituijian.world 梯子推荐网'
    }
  }
})
