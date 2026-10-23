import fs from 'fs';

async function testHttpSample() {
  const sampleUrls = [
    '/',
    '/tizi-tuijian/',
    '/tizi-tuijian/zonghe-tuijian',
    '/tizi-tuijian/xinshou-tizi',
    '/tizi-tuijian/wending-tizi',
    '/zhao-tizi/',
    '/zhao-tizi/an-yusuan',
    '/zhao-tizi/an-shebei',
    '/zhao-tizi/an-xianlu',
    '/pianyi-tizi/',
    '/pianyi-tizi/10yuan-yixia',
    '/pianyi-tizi/20yuan-yinei',
    '/jichang-tuijian/',
    '/jichang-tuijian/zhuanxian-jichang',
    '/jichang-tuijian/yuefu-jichang',
    '/mianfei-jichang/',
    '/mianfei-jichang/di-jia-tidaifang',
    '/mianfei-jichang/shiyong-jichang',
    '/tizi-pingce/',
    '/tizi-pingce/hengxiang-pk',
    '/tizi-pingce/wangao-feng-cesu',
    '/jiaocheng/',
    '/jiaocheng/windows-jiaocheng',
    '/jiaocheng/macos-jiaocheng',
    '/bikeng/',
    '/bikeng/paolu-xinhao',
    '/bikeng/nianfu-shenkeng',
    '/brands/',
    '/brands/guangsu',
    '/brands/feimao',
    '/about',
    '/methodology',
    '/privacy',
    '/terms',
    '/disclosure',
    '/non-existent-page-test-404'
  ];

  console.log('=== 1.5 HTTP 抽样状态码与软 404 诊断 ===\n');
  let count200 = 0;
  let count404 = 0;
  let countErrors = 0;
  let soft404List = [];

  for (const url of sampleUrls) {
    try {
      const res = await fetch('http://localhost:5188' + url);
      const text = await res.text();
      const status = res.status;
      const is404 = status === 404;
      const isSoft404 = status === 200 && (text.length < 500 || text.includes('页面未找到') || text.includes('PAGE NOT FOUND'));

      if (status === 200) {
        count200++;
        if (isSoft404) {
          soft404List.push({ url, length: text.length });
        }
      } else if (is404) {
        count404++;
      } else {
        countErrors++;
      }
      console.log(`[HTTP ${status}] ${url.padEnd(35)} (Length: ${text.length}B)`);
    } catch (e) {
      console.error(`[CONN_ERR] ${url}:`, e.message);
      countErrors++;
    }
  }

  console.log('\n--- 1.5 统计结果 ---');
  console.log(`抽样总数: ${sampleUrls.length}`);
  console.log(`200 OK 数量: ${count200}`);
  console.log(`404 Not Found (含故意测试页): ${count404}`);
  console.log(`其他异常状态码 (500/502/503/403): ${countErrors}`);
  console.log(`疑似 Soft 404 页面数: ${soft404List.length}`);
  if (soft404List.length > 0) {
    console.log('Soft 404 页面:', soft404List);
  }
}

testHttpSample();
