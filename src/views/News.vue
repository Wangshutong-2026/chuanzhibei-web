<template>
  <div class="news-page">
    <Header />
    
    <div class="main-container">
      <!-- 顶部标题区 -->
      <div class="page-header">
        <div class="header-left">
          <h1>行业智库与数据情报</h1>
          <p>追踪最前沿的监管动态、宏观数据与市场深度洞察</p>
        </div>
        <div class="header-search">
          <input type="text" placeholder="搜索行业报告、政策或品牌..." />
          <button class="search-btn">🔍</button>
        </div>
      </div>

      <!-- 1. 焦点大图区 -->
      <section class="featured-news" @click="openExternalNews('https://www.petfoodchina.com/')">
        <div class="featured-img-box">
          <div class="featured-tag">🔥 焦点重磅</div>
          <img src="/toutiao.jpg" alt="焦点资讯" />
        </div>
        <div class="featured-content">
          <div class="meta">
            <span class="tag">行业合规</span>
            <span class="date">2026-10-24</span>
            <span class="source">来源：农业农村部</span>
          </div>
          <h2>2026 版宠物饲料国家标准正式实施：原料溯源与“碳足迹”指标全面升级</h2>
          <p>农业农村部于本月正式实施最新修订版国标。新规不仅对宠物食品的原料溯源、粗蛋白等营养指标提出了极高的要求，更是首次将“供应链碳足迹”纳入审查。这将直接导致市面上一大批依赖“廉价肉粉”和“高污染代工”的劣质产品面临淘汰...</p>
          <button class="read-btn">阅读完整报告 →</button>
        </div>
      </section>

      <!-- 2. 核心二级导航栏 -->
      <div class="sub-nav-container">
        <div class="sub-nav-item" :class="{ active: currentTab === 0 }" @click="currentTab = 0">📰 最新动态</div>
        <div class="sub-nav-item" :class="{ active: currentTab === 1 }" @click="currentTab = 1">📊 宏观数据</div>
        <div class="sub-nav-item" :class="{ active: currentTab === 2 }" @click="currentTab = 2">🏛️ 政策法规</div>
        <div class="sub-nav-item" :class="{ active: currentTab === 3 }" @click="currentTab = 3">🕵️ 黑榜曝光</div>
      </div>

      <!-- 3. 左右分栏布局 -->
      <div class="content-layout">
        
        <!-- 左侧：主资讯区 -->
        <div class="left-feed">
          
          <!-- Tab 1: 最新动态 -->
          <div v-if="currentTab === 0" class="tab-content">
            <div class="feed-list">
              <div class="feed-item-large" @click="openExternalNews('https://www.petfoodindustry.com/')">
                <div class="feed-img"><img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=600&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag">行业洞察</span><span class="date">2026-10-22</span></div>
                  <h3>2026宠物食品供应链数字化趋势：AI Agent 正接管配方核算</h3>
                  <p>随着大模型技术的深度普及，越来越多的宠物粮代工厂开始使用 AI 智能体（Agent）进行实时的配方成本核算与多源原料溯源管理...</p>
                  <span class="read-more">阅读全文 →</span>
                </div>
              </div>
              <div class="feed-item-small" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img-small"><img src="https://images.unsplash.com/photo-1548681528-6a5c45b66b42?q=80&w=400&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag green">行业合规</span><span class="date">2026-10-20</span></div>
                  <h4>2026 下半年宠物食品标签合规审查要点与职业打假应对</h4>
                  <p>近期因“功能性宣称”不规范引发的职业打假案件频发，新规下企业如何在包装上合规标识...</p>
                </div>
              </div>
              <div class="feed-item-small" @click="openExternalNews('https://www.cngrain.com/')">
                <div class="feed-img-small"><img src="https://images.unsplash.com/photo-1555529733-0e670560f7e1?q=80&w=400&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag purple">宏观数据</span><span class="date">2026-10-18</span></div>
                  <h4>2026 Q3 饲料级鸡肉粉价格指数持续走低，宠物粮有望降价</h4>
                  <p>受全球养殖端供应过剩及饲料成本下降影响，近期国内饲料级鸡肉粉原料价格出现明显回落...</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab 2: 宏观数据 -->
          <div v-if="currentTab === 1" class="tab-content data-board">
            <div class="board-header">
              <h3>📊 宠物食品宏观市场实时大盘</h3>
              <span class="live-tag"><span class="live-dot"></span> 数据实时刷新中</span>
            </div>
            
            <div class="chart-box">
              <div class="chart-header">
                <span class="chart-title">核心原料价格指数走势</span>
                <div class="time-switch">
                  <span :class="{ active: timeRange === 'day' }" @click="timeRange = 'day'">日</span>
                  <span :class="{ active: timeRange === 'week' }" @click="timeRange = 'week'">周</span>
                  <span :class="{ active: timeRange === 'month' }" @click="timeRange = 'month'">月</span>
                </div>
              </div>
              
              <div class="chart-container">
                <div class="grid-line" style="top: 0;"></div>
                <div class="grid-line" style="top: 25%;"></div>
                <div class="grid-line" style="top: 50%;"></div>
                <div class="grid-line" style="top: 75%;"></div>
                <div class="grid-line" style="top: 100%;"></div>
                
                <svg class="fake-chart" viewBox="0 0 1000 300" preserveAspectRatio="none" :key="timeRange">
                  <defs>
                    <linearGradient id="grad-blue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#0052D9" stop-opacity="0.3" />
                      <stop offset="100%" stop-color="#0052D9" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                  <template v-if="timeRange === 'day'">
                    <path d="M0,220 L200,210 L400,230 L600,200 L800,210 L1000,190 L1000,300 L0,300 Z" fill="url(#grad-blue)" class="fade-in" />
                    <path d="M0,220 L200,210 L400,230 L600,200 L800,210 L1000,190" fill="none" stroke="#0052D9" stroke-width="3" class="draw-line" />
                    <path d="M0,260 L200,250 L400,270 L600,240 L800,255 L1000,230" fill="none" stroke="#E34D59" stroke-width="3" class="draw-line" />
                  </template>
                  <template v-else-if="timeRange === 'week'">
                    <path d="M0,150 L200,180 L400,120 L600,160 L800,80 L1000,110 L1000,300 L0,300 Z" fill="url(#grad-blue)" class="fade-in" />
                    <path d="M0,150 L200,180 L400,120 L600,160 L800,80 L1000,110" fill="none" stroke="#0052D9" stroke-width="3" class="draw-line" />
                    <path d="M0,250 L200,220 L400,260 L600,190 L800,210 L1000,140" fill="none" stroke="#E34D59" stroke-width="3" class="draw-line" />
                  </template>
                  <template v-else>
                    <path d="M0,100 L200,150 L400,80 L600,180 L800,60 L1000,40 L1000,300 L0,300 Z" fill="url(#grad-blue)" class="fade-in" />
                    <path d="M0,100 L200,150 L400,80 L600,180 L800,60 L1000,40" fill="none" stroke="#0052D9" stroke-width="3" class="draw-line" />
                    <path d="M0,200 L200,280 L400,220 L600,260 L800,210 L1000,150" fill="none" stroke="#E34D59" stroke-width="3" class="draw-line" />
                  </template>
                </svg>
              </div>
            </div>

            <div class="data-combo-row">
              <div class="combo-card">
                <div class="combo-title">近5月全网新增品牌数 (个)</div>
                <div class="bar-chart">
                  <div class="bar-item"><div class="bar-val">1.2k</div><div class="bar blue-bar" style="height: 40%;"></div></div>
                  <div class="bar-item"><div class="bar-val">1.8k</div><div class="bar blue-bar" style="height: 60%;"></div></div>
                  <div class="bar-item"><div class="bar-val">2.1k</div><div class="bar blue-bar" style="height: 75%;"></div></div>
                  <div class="bar-item"><div class="bar-val">1.9k</div><div class="bar blue-bar" style="height: 65%;"></div></div>
                  <div class="bar-item"><div class="bar-val">2.5k</div><div class="bar red-bar" style="height: 90%;"></div></div>
                </div>
              </div>
              <div class="combo-card">
                <div class="combo-title">全网高危违规类型占比</div>
                <div class="pie-chart-wrapper">
                  <div class="pie-chart"></div>
                  <div class="pie-legend">
                    <div><span class="dot red"></span>蛋白虚标 45%</div>
                    <div><span class="dot blue"></span>虚假溯源 30%</div>
                    <div><span class="dot green"></span>菌落超标 25%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab 3: 政策法规 -->
          <div v-if="currentTab === 2" class="tab-content policy-timeline">
            <div class="timeline-item" @click="openExternalNews('http://www.moa.gov.cn/')">
              <div class="time-node"><div class="dot"></div></div>
              <div class="time-content">
                <div class="policy-header">
                  <div class="pdf-badge">PDF</div>
                  <h4>农业农村部关于印发《宠物饲料管理办法》的通知</h4>
                </div>
                <p>农农发〔2026〕1号 | 2026-10-15</p>
                <button class="text-btn">查看原文 →</button>
              </div>
            </div>
            <div class="timeline-item" @click="openExternalNews('http://www.moa.gov.cn/')">
              <div class="time-node"><div class="dot"></div></div>
              <div class="time-content">
                <div class="policy-header">
                  <div class="pdf-badge">PDF</div>
                  <h4>宠物饲料生产企业许可条件及审查标准</h4>
                </div>
                <p>农业农村部公告 第892号 | 2026-09-20</p>
                <button class="text-btn">查看原文 →</button>
              </div>
            </div>
            <div class="timeline-item" @click="openExternalNews('http://www.moa.gov.cn/')">
              <div class="time-node"><div class="dot"></div></div>
              <div class="time-content">
                <div class="policy-header">
                  <div class="pdf-badge">PDF</div>
                  <h4>关于规范宠物饲料标签标识的专项整治通报</h4>
                </div>
                <p>农办牧〔2026〕15号 | 2026-08-10</p>
                <button class="text-btn">查看原文 →</button>
              </div>
            </div>
            <div class="timeline-item" @click="openExternalNews('http://www.customs.gov.cn/')">
              <div class="time-node"><div class="dot"></div></div>
              <div class="time-content">
                <div class="policy-header">
                  <div class="pdf-badge">PDF</div>
                  <h4>进口宠物食品境外生产企业注册登记管理规定</h4>
                </div>
                <p>海关总署令 第283号 | 2026-04-05</p>
                <button class="text-btn">查看原文 →</button>
              </div>
            </div>
          </div>

          <!-- Tab 4: 黑榜曝光 -->
          <div v-if="currentTab === 3" class="tab-content single-layout">
            <div class="blacklist-card" @click="openExternalNews('https://www.petfoodchina.com/')">
              <div class="blacklist-content">
                <div class="blacklist-header">
                  <span class="warning-label">⚠️ 违规查处通报</span>
                  <span class="date">2026-10-24</span>
                </div>
                <h4>某知名网红猫粮因“粗蛋白虚标”被立案调查</h4>
                <p>处罚事由：产品标签标示粗蛋白≥45%，实际抽检仅为25.1%，涉嫌严重虚假宣传。</p>
                <div class="blacklist-footer"><span class="source">发布单位：某市市场监督管理局</span></div>
              </div>
            </div>
            <div class="blacklist-card" @click="openExternalNews('https://www.petfoodchina.com/')">
              <div class="blacklist-content">
                <div class="blacklist-header">
                  <span class="warning-label">⚠️ 违规查处通报</span>
                  <span class="date">2026-09-15</span>
                </div>
                <h4>某进口宠物冻干因“致病菌超标”被海关总署拒绝入境</h4>
                <p>处罚事由：抽检批次检出沙门氏菌超标，存在严重食品安全风险，已做退运或销毁处理。</p>
                <div class="blacklist-footer"><span class="source">发布单位：海关总署进出口食品安全局</span></div>
              </div>
            </div>
            <div class="blacklist-card" @click="openExternalNews('https://www.petfoodchina.com/')">
              <div class="blacklist-content">
                <div class="blacklist-header">
                  <span class="warning-label">⚠️ 违规查处通报</span>
                  <span class="date">2026-06-10</span>
                </div>
                <h4>某宠物零食产品因“标签与实物不符”被处罚</h4>
                <p>处罚事由：产品标签标示原料与《饲料原料目录》不一致，违反《宠物饲料标签规定》。</p>
                <div class="blacklist-footer"><span class="source">发布单位：南昌市农业农村局</span></div>
              </div>
            </div>
            <div class="blacklist-card" @click="openExternalNews('https://www.petfoodchina.com/')">
              <div class="blacklist-content">
                <div class="blacklist-header">
                  <span class="warning-label">⚠️ 违规查处通报</span>
                  <span class="date">2026-08-05</span>
                </div>
                <h4>多款猫粮因涉嫌“零谷物”虚假宣传被责令下架</h4>
                <p>处罚事由：产品宣称“100%无谷”，但抽检检出微量小麦成分，且未在标签中标注。</p>
                <div class="blacklist-footer"><span class="source">发布单位：某省消费者权益保护委员会</span></div>
              </div>
            </div>
          </div>

          <!-- 防穿帮分页器 -->
          <div class="pagination" v-if="currentTab === 0 || currentTab === 2 || currentTab === 3">
            <button class="page-btn disabled" disabled> 上一页 </button>
            <span class="page-info">第 <strong>1</strong> 页 / 共 1 页</span>
            <button class="page-btn" @click="handleNextPage">下一页 </button>
          </div>
        </div>

        <!-- 右侧：情报侧边栏 -->
        <div class="right-sidebar">
          <div class="sidebar-widget">
            <div class="widget-header"><h3>🔥 热门资讯</h3></div>
            <div class="hot-list">
              <div class="hot-item" @click="openExternalNews('https://www.petfoodchina.com/')"><span class="hot-num num-1">01</span><p>2026版新国标落地，代工厂如何应对碳足迹审查？</p></div>
              <div class="hot-item" @click="openExternalNews('https://www.petfoodchina.com/')"><span class="hot-num num-2">02</span><p>深度拆解：你买的网红猫粮，成本到底是多少？</p></div>
              <div class="hot-item" @click="openExternalNews('https://www.petfoodchina.com/')"><span class="hot-num num-3">03</span><p>AI视觉识别在宠物医疗领域的突破性应用</p></div>
              <div class="hot-item" @click="openExternalNews('https://www.petfoodchina.com/')"><span class="hot-num">04</span><p>海外宠物食品巨头宣布全面弃用植物蛋白填充物</p></div>
            </div>
          </div>
          <div class="sidebar-widget">
            <div class="widget-header"><h3>🏷️ 热门话题</h3></div>
            <div class="tag-cloud">
              <span class="cloud-tag">宠物AI大模型</span>
              <span class="cloud-tag">代工厂溯源</span>
              <span class="cloud-tag">粗蛋白虚标</span>
              <span class="cloud-tag">植物蛋白充数</span>
              <span class="cloud-tag">处方粮避坑</span>
            </div>
          </div>
          <div class="sidebar-widget subscribe-widget">
            <h3>📬 订阅每日简报</h3>
            <p>不错过任何一次行业大洗牌。</p>
            <input type="email" placeholder="输入您的邮箱..." />
            <button @click="showToastMsg('订阅成功！')">立即订阅</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 自定义极简提示条 -->
    <transition name="slide-up">
      <div v-if="toastMessage" class="custom-toast">{{ toastMessage }}</div>
    </transition>
    <!-- 沉浸式全宽宠物背景 Footer -->
    <footer class="site-footer">
      <div class="footer-overlay"></div>
      <div class="footer-inner">
        
        <div class="footer-top">
          <!-- 左侧品牌与 Slogan -->
          <div class="footer-brand">
            <h2>PawCare 智护</h2>
            <p>用数据，给毛孩子更长久的陪伴。</p>
          </div>
          
          <!-- 右侧链接矩阵 -->
          <div class="footer-links">
            <div class="link-group">
              <h4>核心业务</h4>
              <a @click="$router.push('/workspace')">食安溯源</a>
              <a @click="$router.push('/graph')">关系图谱</a>
              <a @click="$router.push('/diet')">AI 膳食</a>
            </div>
            <div class="link-group">
              <h4>健康管理</h4>
              <a @click="$router.push('/pets')">宠物档案</a>
              <a @click="$router.push('/calendar')">免疫日历</a>
              <a @click="$router.push('/history')">历史报告</a>
            </div>
            <div class="link-group">
              <h4>关于平台</h4>
              <a @click="$router.push('/news')">行业智库</a>
              <a @click="$router.push('/api')">API 接口</a>
              <a>联系我们</a>
            </div>
          </div>
        </div>

        <!-- 底部声明 -->
        <div class="footer-bottom">
          <p class="copyright">© 2026 PawCare 智护团队. All Rights Reserved.</p>
          <p class="disclaimer">免责声明：本平台数据基于公开信息测算，仅供学术交流与消费参考，不构成专业医疗建议。</p>
        </div>
        
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '../components/Header.vue'

const currentTab = ref(0)
const timeRange = ref('week')
const toastMessage = ref('')
let toastTimer = null

const showToastMsg = (msg) => {
  toastMessage.value = msg
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastMessage.value = '' }, 2500)
}

const handleNextPage = () => {
  showToastMsg('演示版本：已加载全部最新数据')
}

const openExternalNews = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>
<style scoped>
.news-page { min-height: 100vh; background-color: #F4F6F9; font-family: -apple-system, sans-serif; position: relative; }
.main-container { max-width: 1200px; margin: 0 auto; padding: 120px 20px 80px; }

/* ================= 顶部标题区 ================= */
.page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; }
.header-left h1 { font-size: 36px; color: #1D2129; font-weight: 900; margin: 0 0 10px 0; }
.header-left p { font-size: 15px; color: #86909C; margin: 0; }
.header-search { display: flex; background: #fff; border: 1px solid #E5E6EB; border-radius: 8px; overflow: hidden; width: 300px; }
.header-search input { flex: 1; border: none; padding: 10px 16px; outline: none; font-size: 14px; }
.search-btn { background: #0052D9; color: #fff; border: none; padding: 0 16px; cursor: pointer; transition: 0.3s; }
.search-btn:hover { background: #0043B2; }

/* ================= 1. 焦点大图区 ================= */
.featured-news { display: flex; background: #fff; border-radius: 20px; overflow: hidden; cursor: pointer; box-shadow: 0 10px 30px rgba(0,0,0,0.04); border: 1px solid #E5E6EB; margin-bottom: 40px; transition: 0.3s; }
.featured-news:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
.featured-img-box { flex: 1.2; position: relative; overflow: hidden; height: 340px; }
.featured-img-box img { width: 100%; height: 100%; object-fit: cover; transition: 0.5s; }
.featured-news:hover img { transform: scale(1.05); }
.featured-tag { position: absolute; top: 20px; left: 20px; background: rgba(0,0,0,0.7); color: #fff; padding: 6px 14px; border-radius: 6px; font-size: 13px; font-weight: bold; z-index: 2; backdrop-filter: blur(4px); }
.featured-content { flex: 1; padding: 40px; display: flex; flex-direction: column; justify-content: center; }
.meta { display: flex; align-items: center; gap: 15px; margin-bottom: 16px; }
.tag { font-size: 12px; font-weight: bold; padding: 4px 10px; border-radius: 4px; background: #E8F3FF; color: #0052D9; }
.tag.green { background: #E8FFEA; color: #00B42A; }
.tag.purple { background: #F5E8FF; color: #7B61FF; }
.date { font-size: 13px; color: #86909C; }
.source { font-size: 13px; color: #C9CDD4; }
.featured-content h2 { font-size: 26px; color: #1D2129; margin: 0 0 16px 0; line-height: 1.4; font-weight: 800; }
.featured-content p { font-size: 15px; color: #4E5969; line-height: 1.7; margin-bottom: 30px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.read-btn { align-self: flex-start; background: transparent; border: none; color: #0052D9; font-size: 15px; font-weight: bold; cursor: pointer; padding: 0; transition: 0.3s; }
.read-btn:hover { letter-spacing: 1px; }

/* ================= 2. 二级导航栏 ================= */
.sub-nav-container { display: flex; gap: 10px; margin-bottom: 30px; position: sticky; top: 80px; z-index: 100; }
.sub-nav-item { padding: 10px 20px; background: #fff; border-radius: 30px; font-size: 15px; font-weight: 600; color: #4E5969; cursor: pointer; border: 1px solid #E5E6EB; transition: 0.3s; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
.sub-nav-item:hover { color: #0052D9; border-color: #B5D4FF; }
.sub-nav-item.active { background: #0052D9; color: #fff; border-color: #0052D9; box-shadow: 0 8px 20px rgba(0,82,217,0.3); }

/* ================= 3. 左右整体布局 ================= */
.content-layout { display: flex; gap: 30px; align-items: flex-start; }
.left-feed { flex: 1; min-width: 0; }
.right-sidebar { width: 320px; flex-shrink: 0; display: flex; flex-direction: column; gap: 24px; }

/* ================= Tab 1: 最新动态 ================= */
.feed-list { display: flex; flex-direction: column; gap: 20px; }
.feed-item-large { display: flex; background: #fff; border-radius: 16px; padding: 20px; border: 1px solid #E5E6EB; cursor: pointer; transition: 0.3s; gap: 24px; }
.feed-item-large:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.06); border-color: #B5D4FF; }
.feed-img { width: 240px; height: 160px; border-radius: 12px; overflow: hidden; flex-shrink: 0; }
.feed-img img { width: 100%; height: 100%; object-fit: cover; transition: 0.5s; }
.feed-item-large:hover .feed-img img { transform: scale(1.05); }
.feed-info h3 { margin: 10px 0; font-size: 20px; color: #1D2129; font-weight: 700; line-height: 1.4; }
.feed-info p { margin: 0 0 16px 0; font-size: 14px; color: #86909C; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.read-more { font-size: 14px; color: #0052D9; font-weight: bold; }

.feed-item-small { display: flex; background: #fff; border-radius: 16px; padding: 20px; border: 1px solid #E5E6EB; cursor: pointer; transition: 0.3s; gap: 20px; }
.feed-item-small:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.06); border-color: #B5D4FF; }
.feed-img-small { width: 160px; height: 110px; border-radius: 10px; overflow: hidden; flex-shrink: 0; }
.feed-img-small img { width: 100%; height: 100%; object-fit: cover; transition: 0.5s; }
.feed-item-small:hover .feed-img-small img { transform: scale(1.05); }
.feed-item-small h4 { margin: 8px 0; font-size: 17px; color: #1D2129; font-weight: 700; line-height: 1.5; }
.feed-item-small p { margin: 0; font-size: 14px; color: #86909C; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

/* ================= Tab 2: 宏观数据看板 ================= */
.data-board { background: #fff; padding: 30px; border-radius: 16px; border: 1px solid #E5E6EB; }
.board-header { display: flex; justify-content: space-between; margin-bottom: 30px; }
.board-header h3 { margin: 0; font-size: 20px; color: #1D2129; }
.live-tag { font-size: 13px; color: #E34D59; font-weight: bold; display: flex; align-items: center; gap: 6px; }
.live-dot { width: 8px; height: 8px; background: #E34D59; border-radius: 50%; animation: pulse 1s infinite; }
@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }

/* 折线图区域 */
.chart-box { margin-bottom: 30px; background: #F8F9FA; padding: 20px; border-radius: 12px; border: 1px solid #F2F3F5; }
.chart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
.chart-title { font-size: 15px; font-weight: bold; color: #1D2129; }

/* 日周月切换 */
.time-switch { display: flex; background: #fff; border-radius: 6px; border: 1px solid #E5E6EB; overflow: hidden; }
.time-switch span { padding: 4px 16px; font-size: 13px; cursor: pointer; color: #4E5969; transition: 0.3s; }
.time-switch span:hover { background: #F4F6F9; }
.time-switch span.active { background: #0052D9; color: #fff; font-weight: bold; }

/* 图表容器 */
.chart-container { height: 200px; position: relative; border-bottom: 1px solid #E5E6EB; }
.grid-line { width: 100%; height: 1px; position: absolute; left: 0; border-top: 1px dashed #E5E6EB; background: transparent; }
.fake-chart { width: 100%; height: 100%; position: absolute; top: 0; left: 0; z-index: 2; }

/* 🌟 核心动画：线条生长 */
.draw-line { stroke-dasharray: 2000; stroke-dashoffset: 2000; animation: drawLine 1.5s ease-out forwards; }
@keyframes drawLine { to { stroke-dashoffset: 0; } }
.fade-in { opacity: 0; animation: fadeIn 1.5s ease-out forwards; }
@keyframes fadeIn { to { opacity: 1; } }

/* 底部组合图 */
.data-combo-row { display: flex; gap: 20px; margin-bottom: 30px; }
.combo-card { flex: 1; background: #F8F9FA; padding: 20px; border-radius: 12px; border: 1px solid #F2F3F5; }
.combo-title { font-size: 14px; color: #4E5969; margin-bottom: 20px; font-weight: bold; }

/* 柱状图 */
.bar-chart { display: flex; justify-content: space-around; align-items: flex-end; height: 120px; }
.bar-item { display: flex; flex-direction: column; align-items: center; width: 35px; height: 100%; justify-content: flex-end; cursor: pointer; }
.bar-val { font-size: 12px; color: #86909C; margin-bottom: 6px; font-weight: bold; opacity: 0; transition: opacity 0.3s; }
.bar-item:hover .bar-val { opacity: 1; }
.bar { width: 100%; border-radius: 4px 4px 0 0; transition: all 0.3s; }
.bar-item:hover .bar { filter: brightness(1.1); box-shadow: 0 0 15px rgba(0,82,217,0.2); }
.blue-bar { background: linear-gradient(180deg, #00D2FF 0%, #0052D9 100%); }
.red-bar { background: linear-gradient(180deg, #FF7D00 0%, #E34D59 100%); }

/* 饼图 */
.pie-chart-wrapper { display: flex; align-items: center; justify-content: center; gap: 30px; height: 120px; }
.pie-chart { width: 90px; height: 90px; border-radius: 50%; background: conic-gradient(#E34D59 0% 45%, #0052D9 45% 75%, #00B42A 75% 100%); position: relative; box-shadow: 0 4px 12px rgba(0,0,0,0.1); transition: transform 0.3s; }
.pie-chart:hover { transform: scale(1.05) rotate(10deg); }
.pie-chart::after { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 60px; height: 60px; background: #F8F9FA; border-radius: 50%; }
.pie-legend { display: flex; flex-direction: column; gap: 10px; font-size: 13px; color: #4E5969; }
.pie-legend div { display: flex; align-items: center; gap: 8px; }
.dot { width: 8px; height: 8px; border-radius: 50%; }
.dot.red { background: #E34D59; } .dot.blue { background: #0052D9; } .dot.green { background: #00B42A; }

/* ================= Tab 3: 政策法规 (时间轴排版) ================= */
.policy-timeline { position: relative; padding-left: 20px; border-left: 2px solid #E5E6EB; margin-left: 10px; }
.timeline-item { position: relative; margin-bottom: 30px; }
.time-node { position: absolute; left: -27px; top: 5px; width: 12px; height: 12px; border-radius: 50%; background: #0052D9; border: 2px solid #fff; box-shadow: 0 0 0 3px #E8F3FF; transition: all 0.3s; }
.timeline-item:hover .time-node { background: #00D2FF; box-shadow: 0 0 0 5px rgba(0,210,255,0.2); transform: scale(1.2); }
.time-content { background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #E5E6EB; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
.time-content:hover { transform: translateX(5px); box-shadow: 0 10px 20px rgba(0,82,217,0.05); border-color: #B5D4FF; }
.policy-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.pdf-badge { background: #FFECE8; color: #E34D59; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; border: 1px solid rgba(227,77,89,0.2); }
.policy-header h4 { margin: 0; font-size: 16px; color: #1D2129; line-height: 1.4; }
.time-content p { margin: 0 0 16px 0; font-size: 13px; color: #86909C; }
.text-btn { background: transparent; border: none; color: #0052D9; font-size: 14px; font-weight: bold; cursor: pointer; padding: 0; }
.time-content:hover .text-btn { text-decoration: underline; }

/* Tab 4 黑榜曝光 (极浅警示红) */
.single-layout { display: flex; flex-direction: column; gap: 20px; }
.blacklist-card { background: #FFF7F6; border: 1px solid #FFE4E1; border-radius: 16px; padding: 24px; cursor: pointer; transition: 0.3s; position: relative; overflow: hidden; }
.blacklist-card::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: #E34D59; }
.blacklist-card:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(227,77,89,0.1); background: #FFF2F0; }
.blacklist-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.warning-label { font-size: 13px; font-weight: bold; color: #E34D59; display: flex; align-items: center; gap: 6px; }
.blacklist-header .date { font-size: 13px; color: #86909C; }
.blacklist-card h4 { margin: 0 0 12px 0; font-size: 18px; color: #1D2129; font-weight: 700; }
.blacklist-card p { margin: 0 0 16px 0; font-size: 14px; color: #4E5969; line-height: 1.6; }
.blacklist-footer { display: flex; justify-content: flex-start; padding-top: 16px; border-top: 1px dashed #FFE4E1; }
.blacklist-footer .source { font-size: 12px; color: #86909C; font-weight: 500; }

/* 分页器 */
.pagination { display: flex; justify-content: center; align-items: center; gap: 20px; margin-top: 40px; }
.page-btn { background: #fff; border: 1px solid #E5E6EB; padding: 8px 16px; border-radius: 6px; cursor: pointer; color: #4E5969; font-weight: 500; transition: 0.3s; }
.page-btn:hover { color: #0052D9; border-color: #0052D9; }
.page-btn.disabled { opacity: 0.5; cursor: not-allowed; }
.page-info { font-size: 14px; color: #86909C; }
.page-info strong { color: #0052D9; font-size: 16px; }

/* 侧边栏 */
.right-sidebar { width: 320px; flex-shrink: 0; display: flex; flex-direction: column; gap: 24px; }
.sidebar-widget { background: #fff; border-radius: 16px; padding: 24px; border: 1px solid #E5E6EB; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
.widget-header { margin-bottom: 20px; }
.widget-header h3 { margin: 0; font-size: 18px; color: #1D2129; }
.hot-list { display: flex; flex-direction: column; gap: 16px; }
.hot-item { display: flex; gap: 12px; align-items: flex-start; cursor: pointer; padding-bottom: 12px; border-bottom: 1px dashed #F2F3F5; }
.hot-item:last-child { border-bottom: none; padding-bottom: 0; }
.hot-item p { margin: 0; font-size: 14px; color: #4E5969; line-height: 1.5; transition: color 0.3s; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.hot-item:hover p { color: #0052D9; }
.hot-num { font-size: 16px; font-weight: 900; color: #C9CDD4; font-family: monospace; flex-shrink: 0; }
.hot-num.num-1 { color: #E34D59; } .hot-num.num-2 { color: #FF7D00; } .hot-num.num-3 { color: #FFB400; }
.tag-cloud { display: flex; flex-wrap: wrap; gap: 10px; }
.cloud-tag { background: #F4F6F9; border: 1px solid #E5E6EB; padding: 6px 12px; border-radius: 6px; font-size: 13px; color: #4E5969; cursor: pointer; transition: 0.3s; }
.cloud-tag:hover { background: #E8F3FF; color: #0052D9; border-color: #B5D4FF; }
.subscribe-widget { background: linear-gradient(135deg, #0052D9 0%, #00D2FF 100%); color: #fff; border: none; box-shadow: 0 10px 30px rgba(0,82,217,0.2); }
.subscribe-widget h3 { color: #fff; margin: 0 0 10px 0; font-size: 18px; }
.subscribe-widget p { font-size: 13px; opacity: 0.9; margin-bottom: 20px; }
.subscribe-widget input { width: 100%; box-sizing: border-box; height: 44px; border-radius: 6px; border: none; padding: 0 16px; margin-bottom: 12px; outline: none; }
.subscribe-widget button { width: 100%; height: 44px; border-radius: 6px; border: none; background: #1D2129; color: #fff; font-weight: bold; cursor: pointer; transition: 0.3s; }
.subscribe-widget button:hover { background: #000; }

/* 提示框 */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.custom-toast { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(29, 33, 41, 0.9); color: #fff; padding: 12px 24px; border-radius: 8px; font-size: 15px; z-index: 9999; backdrop-filter: blur(4px); box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
.slide-up-enter-active, .slide-up-leave-active { transition: all 0.3s ease; }
.slide-up-enter-from, .slide-up-leave-to { opacity: 0; transform: translate(-50%, -40%); }
/* ================= 沉浸式全宽宠物背景 Footer (霸屏版) ================= */
.site-footer {
  position: relative;
  /* 破局魔法：强制突破父容器限制，100%铺满屏幕 */
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  
  /* 确保背景图铺满 */
  background-image: url('/footer.jpg'); 
  background-size: cover;
  background-position: center 30%;
  background-repeat: no-repeat;
  
  /* 上方留出巨大空间，制造呼吸感 */
  padding: 120px 0 60px; 
  margin-top: 100px;
}

/* 加深遮罩，让字绝对清晰 */
.footer-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(to right, rgba(10, 10, 12, 0.95) 0%, rgba(10, 10, 12, 0.75) 50%, rgba(10, 10, 12, 0.4) 100%),
              linear-gradient(to top, rgba(10, 10, 12, 0.95) 0%, rgba(10, 10, 12, 0) 100%);
  z-index: 1;
}

.footer-inner {
  position: relative;
  z-index: 2;
  max-width: 1300px; /* 内容区变宽 */
  margin: 0 auto;
  color: #fff;
  padding: 0 40px;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 90px; /* 上下拉开巨大距离 */
}

/* 左侧品牌区：字号超大 */
.footer-brand {
  flex: 1;
  max-width: 500px;
}
.footer-brand h2 {
  font-size: 48px; /* 超大字号 */
  font-weight: 900;
  margin: 0 0 20px 0;
  letter-spacing: 2px;
  background: linear-gradient(90deg, #FFFFFF 0%, #00D2FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.footer-brand p {
  font-size: 20px; /* 副标题也放大 */
  color: #E5E6EB;
  line-height: 1.6;
  margin: 0;
}

/* 右侧链接区：拉开间距 */
.footer-links {
  display: flex;
  gap: 120px; /* 列间距超大 */
}
.link-group h4 {
  font-size: 20px; /* 标题放大 */
  color: #fff;
  font-weight: bold;
  margin: 0 0 30px 0;
}
.link-group a {
  display: block;
  color: #C9CDD4;
  font-size: 16px; /* 链接字号放大 */
  margin-bottom: 20px; /* 行距拉开 */
  cursor: pointer;
  transition: all 0.3s;
}
.link-group a:hover {
  color: #00D2FF;
  transform: translateX(6px);
}

/* 底部声明区 */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.15); /* 分割线清晰一点 */
  padding-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.footer-bottom .copyright {
  font-size: 16px; /* 字体放大 */
  color: #C9CDD4;
  margin: 0;
}
.footer-bottom .disclaimer {
  font-size: 14px;
  color: #86909C;
  margin: 0;
  text-align: right;
  max-width: 500px;
}
</style>