<template>
  <div class="news-page">
    <Header />
    <div class="main-container">
      <!-- 顶部胶带标题 + 搜索框 -->
      <div class="page-header">
        <div class="header-left">
          <div class="tape-title-img">
            <img class="tape-bg-img" src="/jiaotiao5.png" alt="胶带背景" />
            <h1>养宠百科知识库</h1>
          </div>
          <p>猫狗｜小宠｜爬宠｜鸟类，全品类饲养科普与风险提示</p>
        </div>
        <div class="header-search">
          <input v-model="searchText" type="text" placeholder="搜索饲养知识、疾病、异宠注意事项..." />
          <button class="search-btn" @click="doLocalSearch">🔍</button>
        </div>
      </div>

      <!-- 🤖 AI问答模块【新增】 -->
      <div class="ai-qa-block">
        <div class="qa-title">🤖 AI养宠智能问答</div>
        <div class="qa-input-row">
          <input
            v-model="aiQuestion"
            @keyup.enter="sendAiQuestion"
            placeholder="请输入你的养宠问题，例如：猫咪吃百合花会中毒吗？"
            class="qa-input"
          />
          <button class="qa-send-btn" @click="sendAiQuestion" :disabled="aiLoading">提问AI</button>
        </div>
        <div v-if="aiLoading" class="qa-loading">AI思考中，请稍候……</div>
        <div v-if="aiError" class="qa-error">{{ aiError }}</div>
        <div v-if="aiAnswer" class="qa-answer-block">
          <div class="answer-label">AI回答：</div>
          <div class="answer-text">{{ aiAnswer }}</div>
          <button class="clear-btn" @click="clearAiChat">清空回答</button>
        </div>
      </div>

      <!-- Tab分类导航 -->
      <div class="sub-nav-container">
        <div
          v-for="(tabItem, idx) in tabList"
          :key="idx"
          class="sub-nav-item"
          :class="{ active: currentTab === idx }"
          @click="currentTab = idx"
        >
          {{ tabItem.label }}
        </div>
      </div>

      <!-- 主体左右布局 -->
      <div class="content-layout">
        <!-- 左侧文章列表 -->
        <div class="left-feed">
          <div v-if="filterArticleList.length === 0" class="empty-tip">
            没有匹配的科普文章，请换关键词搜索
          </div>
          <div class="feed-list">
            <!-- 大卡片 -->
            <div
              v-for="item in filterArticleList"
              :key="item.id"
              class="feed-item-large"
              @click="openOuter(item.link)"
            >
              <div class="feed-img">
                <img :src="item.img" alt="科普图" />
              </div>
              <div class="feed-info">
                <div class="meta">
                  <span class="tag" :style="{background:item.tagBg,color:item.tagColor}">{{item.tagName}}</span>
                  <span class="date">{{item.date}}</span>
                </div>
                <h3>{{item.title}}</h3>
                <p>{{item.desc}}</p>
                <span class="read-more">阅读完整指南 →</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧侧边栏 -->
        <div class="right-sidebar">
          <div class="sidebar-widget">
            <div class="widget-header"><h3>🔥 热门百科</h3></div>
            <div class="hot-list">
              <div
                v-for="(hot,idx) in hotArticleList"
                :key="idx"
                class="hot-item"
                @click="openOuter(hot.link)"
              >
                <span class="hot-num" :class="'num-'+(idx+1)">{{String(idx+1).padStart(2,'0')}}</span>
                <p>{{hot.title}}</p>
              </div>
            </div>
          </div>
          <div class="sidebar-widget">
            <div class="widget-header"><h3>🏷️ 热门标签</h3></div>
            <div class="tag-cloud">
              <span
                v-for="(tag,ti) in hotTagList"
                :key="ti"
                class="cloud-tag"
                @click="searchText = tag; currentTab = 0; aiQuestion=tag"
              >
                {{tag}}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Header from '../components/Header.vue'

// tab配置
const tabList = ref([
  { label:'📚 全部百科', filterKey:'all' },
  { label:'🐱🐶 犬猫养护', filterKey:'catdog' },
  { label:'🐹 小宠饲养', filterKey:'smallpet' },
  { label:'🦜 鸟类饲养', filterKey:'bird' },
  { label:'🐍 爬宠专区', filterKey:'reptile' },
  { label:'🍽️ 饮食营养', filterKey:'food' },
  { label:'🧠 行为训练', filterKey:'behavior' },
  { label:'🏥 医疗体检', filterKey:'medical' },
  { label:'🩹 疾病急救', filterKey:'firstaid' },
  { label:'⚠️ 饲养风险', filterKey:'risk' },
  { label:'🛒 用品避坑', filterKey:'goods' }
])
const currentTab = ref(0)
const searchText = ref('')

// ========== AI问答新增变量 ==========
const aiQuestion = ref('')
const aiAnswer = ref('')
const aiLoading = ref(false)
const aiError = ref('')

// 模拟全部科普文章数据
const articleAll = ref([
  {
    id:1,
    tagName:'犬猫养护',
    tagBg:'#E8F3FF',tagColor:'#0052D9',
    date:'2026‑10‑26',
    title:'老年宠物照护要点：猫狗进入高龄后该如何调整饮食与居住环境',
    desc:'7岁以后猫狗逐步步入老年，关节退化、肾脏负担上升、感官衰退。需要调整喂食方案、地面防滑、减少剧烈运动，定期做老年专项体检。',
    img:'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?q=80&w=600&auto=format&fit=crop',
    link:'https://www.petfoodindustry.com/',
    cate:['catdog','medical']
  },
  {
    id:2,
    tagName:'小宠饲养',
    tagBg:'#F1EAFF',tagColor:'#9365FF',
    date:'2026‑10‑22',
    title:'家兔饲养误区：兔子不能只喂蔬菜，无限提摩西草才是核心主食',
    desc:'大量新手只给兔子喂青菜水果，引发肠胃胀气、腹泻死亡。讲解牧草配比、饮水、磨牙需求、笼舍空间与常见皮肤病预防。',
    img:'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?q=80&w=600&auto=format&fit=crop',
    link:'https://www.petfoodchina.com/',
    cate:['smallpet','risk']
  },
  {
    id:3,
    tagName:'鸟类饲养',
    tagBg:'#E0F6E9',tagColor:'#3DBE7B',
    date:'2026‑10‑24',
    title:'虎皮鹦鹉喂养避坑：这些人类食物绝对不能喂给鹦鹉',
    desc:'牛油果、巧克力、含盐含糖零食对鹦鹉剧毒。很多家庭随手投喂，造成鸟类急性中毒。科普适合鹦鹉主食、辅食、补钙方式。',
    img:'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=600&auto=format&fit=crop',
    link:'https://www.petfoodchina.com/',
    cate:['bird','food','risk']
  },
  {
    id:4,
    tagName:'爬宠专区',
    tagBg:'#E1F0FF',tagColor:'#2B65B8',
    date:'2026‑10‑21',
    title:'豹纹守宫入门：温度、湿度、喂食全套饲养指南',
    desc:'守宫是变温动物，需要加热垫制造冷热区；补钙维生素D3必不可少；不能使用松散沙质垫料，防止误食肠梗阻。',
    img:'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=600&auto=format&fit=crop',
    link:'https://www.petfoodchina.com/',
    cate:['reptile']
  },
  {
    id:5,
    tagName:'饮食营养',
    tagBg:'#E8FFEA',tagColor:'#00B42A',
    date:'2026‑10‑23',
    title:'猫狗热量怎么算：不同体重、年龄每日喂食量参考',
    desc:'幼宠、成宠、老年、绝育之后热量需求完全不同，盲目多喂极易肥胖，科学计算每日克数。',
    img:'https://images.unsplash.com/photo-1600240644413-4624a9bf1928?q=80&w=600&auto=format&fit=crop',
    link:'https://www.petfoodchina.com/',
    cate:['food','catdog']
  },
  {
    id:6,
    tagName:'行为训练',
    tagBg:'#F5E8FF',tagColor:'#7B61FF',
    date:'2026‑10‑22',
    title:'猫咪乱尿完整分析：到底是发情、应激还是泌尿系统疾病',
    desc:'猫咪到处乱尿，优先排除疾病，再排查环境应激、猫砂盆数量问题，不要一味打骂。',
    img:'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?q=80&w=600&auto=format&fit=crop',
    link:'https://www.petfoodchina.com/',
    cate:['behavior','catdog','firstaid']
  },
  {
    id:7,
    tagName:'医疗体检',
    tagBg:'#FFF3D6',tagColor:'#D47500',
    date:'2026‑10‑21',
    title:'猫狗疫苗与驱虫完整时间表，幼宠和成宠分别怎么做',
    desc:'区分核心疫苗和非核心疫苗；体内体外驱虫频率；疫苗间隔、过敏反应观察要点。',
    img:'https://images.unsplash.com/photo-1628009362854-d1870b4553da?q=80&w=600&auto=format&fit=crop',
    link:'https://www.petfoodchina.com/',
    cate:['medical','catdog']
  },
  {
    id:8,
    tagName:'疾病急救',
    tagBg:'#FFF0F5',tagColor:'#D64878',
    date:'2026‑10‑20',
    title:'宠物误食中毒家庭应急处理，什么情况绝对不能催吐',
    desc:'巧克力、葡萄、洋葱中毒的基础处置。强酸强碱类物品误食，盲目催吐会二次灼伤食道。',
    img:'https://images.unsplash.com/photo-1601758124096-1fd661873b95?q=80&w=600&auto=format&fit=crop',
    link:'https://www.petfoodchina.com/',
    cate:['firstaid','risk','catdog']
  },
  {
    id:9,
    tagName:'饲养风险',
    tagBg:'#FFECE8',tagColor:'#E34D59',
    date:'2026‑10‑27',
    title:'家庭宠物高危植物清单，家中绿植哪些对宠物有毒',
    desc:'百合对猫咪剧毒；滴水观音、绿萝、万年青会口腔灼伤；很多网红室内绿植看着好看，啃咬后会造成严重中毒。',
    img:'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?q=80&w=600&auto=format&fit=crop',
    link:'https://www.petfoodchina.com/',
    cate:['risk']
  },
  {
    id:10,
    tagName:'用品避坑',
    tagBg:'#FFF9EC',tagColor:'#C27900',
    date:'2026‑10‑20',
    title:'宠物网购用品黑名单：这些网红爆款不要盲目购买',
    desc:'带铃铛项圈、劣质猫薄荷玩具、松木木屑仓鼠垫料、无温控陶瓷加热灯，解析网红用品背后的安全隐患。',
    img:'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=600&auto=format&fit=crop',
    link:'https://www.petfoodchina.com/',
    cate:['goods']
  }
])

// 侧边热门
const hotArticleList = ref([
  {title:'新手异宠选购避坑，哪些品种不适合新手？',link:'https://www.petfoodchina.com/'},
  {title:'猫狗呕吐腹泻，哪些情况需要立刻送医？',link:'https://www.petfoodchina.com/'},
  {title:'爬宠温度湿度怎么设置，温控设备选购指南',link:'https://www.petfoodchina.com/'},
  {title:'宠物家庭常见有毒植物清单，一定要远离',link:'https://www.petfoodchina.com/'},
])
const hotTagList = ref(['仓鼠饲养','守宫温控','鹦鹉喂养','老年宠物照护','家兔牧草','宠物中毒急救','行为应激','绝育护理','爬宠法律风险'])

// 过滤文章：tab + 本地搜索
const filterArticleList = computed(()=>{
  const tabKey = tabList.value[currentTab.value].filterKey
  let arr = articleAll.value
  if(tabKey !== 'all'){
    arr = arr.filter(item=> item.cate.includes(tabKey))
  }
  if(searchText.value.trim()){
    const kw = searchText.value.trim().toLowerCase()
    arr = arr.filter(item=>{
      return item.title.toLowerCase().includes(kw) || item.desc.toLowerCase().includes(kw) || item.tagName.toLowerCase().includes(kw)
    })
  }
  return arr
})

// 本地搜索按钮
const doLocalSearch = ()=>{
  currentTab.value = 0
}

// ========= AI提问函数 =========
const sendAiQuestion = async ()=>{
  const q = aiQuestion.value.trim()
  if(!q){
    aiError.value = '请输入问题'
    return
  }
  aiLoading.value = true
  aiError.value = ''
  aiAnswer.value = ''
  try {
    const res = await fetch('/api/pet/qa',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        query: q
      })
    })
    if(!res.ok){
      throw new Error('AI服务暂未启用，请启动后端服务')
    }
    const data = await res.json()
    aiAnswer.value = data.answer
  } catch(err){
    aiError.value = err.message
  } finally {
    aiLoading.value = false
  }
}

// 清空AI回答
const clearAiChat = ()=>{
  aiQuestion.value = ''
  aiAnswer.value = ''
  aiError.value = ''
}

// 打开外部链接
const openOuter = (url)=>{
  window.open(url,'_blank','noopener,noreferrer')
}
</script>

<style scoped>
.news-page {
  min-height: 100vh;
  background-image: url('/home_bg.jpg');
  background-size: cover;
  background-attachment: fixed;
  background-color:rgba(253, 250, 245, 0.82);
  background-blend-mode: overlay;
  font-family: -apple-system, sans-serif;
}
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 20px 80px;
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
}
.header-left {
  position: relative;
}
.tape-title-img {
  position: relative;
  display: inline-block;
  margin-bottom: 12px;
}
.tape-bg-img {
  width:280px;
  height:60px;
  display:block;
  object-fit: contain;
}
.tape-title-img h1 {
  position:absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  margin:0;
  font-size:32px;
  color:#5C3A21;
  font-weight:900;
  letter-spacing:1px;
  white-space:nowrap;
}
.header-left p {
  font-size: 15px;
  color: #8892A0;
  margin: 0;
  padding-left:8px;
}
.header-search {
  display: flex;
  background: #fff;
  border: 2px dashed #D4A373;
  border-radius: 12px;
  overflow: hidden;
  width: 300px;
}
.header-search input {
  flex: 1;
  border: none;
  padding: 10px 16px;
  outline: none;
  font-size: 14px;
  background:#fffdf9;
}
.search-btn {
  background: #5C3A21;
  color: #fff;
  border: none;
  padding: 0 16px;
  cursor: pointer;
  transition: 0.3s;
}
.search-btn:hover {
  background: #8C5E38;
}

/* 🤖 AI问答区块 【新增样式】 */
.ai-qa-block{
  background:#fff8e8;
  border:1px solid #e2c49c;
  border-radius:16px;
  padding:20px 24px;
  margin-bottom:32px;
}
.qa-title{
  font-size:17px;
  font-weight:bold;
  color:#8c5e38;
  margin-bottom:14px;
}
.qa-input-row{
  display:flex;
  gap:12px;
}
.qa-input{
  flex:1;
  padding:11px 14px;
  border-radius:10px;
  border:1px solid #e6d0b3;
  font-size:14px;
  background:#fffdf9;
}
.qa-send-btn{
  background: linear-gradient(135deg, #8C5E38 0%, #D4A373 100%);
  color:white;
  border:none;
  border-radius:10px;
  padding:0 22px;
  cursor:pointer;
}
.qa-send-btn:disabled{
  opacity:0.5;
  cursor:not-allowed;
}
.qa-loading{
  margin-top:14px;
  color:#6b4c32;
}
.qa-error{
  margin-top:14px;
  color:#d14343;
}
.qa-answer-block{
  margin-top:16px;
  background:#ffffff;
  padding:16px;
  border-radius:10px;
  border:1px dashed #D4A373;
}
.answer-label{
  font-weight:bold;
  color:#5C3A21;
  margin-bottom:8px;
}
.answer-text{
  line-height:1.7;
  font-size:14px;
  color:#333;
}
.clear-btn{
  margin-top:12px;
  border:none;
  background:#f3e9dd;
  color:#5C3A21;
  border-radius:6px;
  padding:4px 10px;
  cursor:pointer;
  font-size:13px;
}

/* tab导航 */
.sub-nav-container {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  position: sticky;
  top: 82px;
  z-index: 99;
  flex-wrap: wrap;
  background-color: rgba(253,250,245,0.85);
  padding:10px 0;
}
.sub-nav-item {
  padding: 8px 12px;
  background: #fff;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 600;
  color: #5E6B82;
  cursor: pointer;
  border:2px dashed #E6D0B3;
  transition: 0.3s;
  white-space: nowrap;
}
.sub-nav-item:hover {
  color: #5C3A21;
  border-color:#D4A373;
}
.sub-nav-item.active {
  background: #5C3A21;
  color: #fff;
  border-color: #5C3A21;
}

.content-layout {
  display: flex;
  gap: 30px;
  align-items: flex-start;
}
.left-feed {
  flex: 1;
  min-width:0;
}
.empty-tip {
  text-align:center;
  padding:60px 0;
  color:#8c6b4f;
  font-size:15px;
}
.feed-list {
  display:flex;
  flex-direction:column;
  gap:20px;
}
.feed-item-large {
  display:flex;
  background:#FFFDF9;
  border-radius:20px;
  padding:20px;
  border:2px dashed #D4A373;
  cursor:pointer;
  gap:24px;
  transition:0.3s;
}
.feed-item-large:hover {
  transform: translateY(-4px);
  box-shadow:0 12px 24px rgba(0,0,0,0.06);
  border-color:#5C3A21;
}
.feed-img {
  width:240px;
  height:160px;
  border-radius:12px;
  overflow:hidden;
  flex-shrink:0;
}
.feed-img img {
  width:100%;
  height:100%;
  object-fit:cover;
}
.feed-info {
  flex:1;
}
.meta {
  display:flex;
  gap:12px;
  align-items:center;
  margin-bottom:12px;
}
.tag {
  font-size:12px;
  font-weight:bold;
  padding:3px 10px;
  border-radius:8px;
}
.date {
  font-size:13px;
  color:#8892A0;
}
.feed-info h3 {
  margin:0 0 10px;
  font-size:20px;
  color:#1A2B4C;
  font-weight:bold;
  line-height:1.4;
}
.feed-info p {
  margin:0 0 14px;
  font-size:14px;
  color:#5E6B82;
  line-height:1.7;
}
.read-more {
  font-size:14px;
  color:#D4A373;
  font-weight:bold;
}

/* 侧边栏 */
.right-sidebar {
  width:320px;
  flex-shrink:0;
  display:flex;
  flex-direction:column;
  gap:24px;
}
.sidebar-widget {
  background:#FFFDF9;
  border:2px dashed #D4A373;
  border-radius:20px;
  padding:24px;
}
.widget-header h3 {
  margin:0 0 18px;
  font-size:18px;
  color:#1A2B4C;
}
.hot-list {
  display:flex;
  flex-direction:column;
  gap:14px;
}
.hot-item {
  display:flex;
  gap:10px;
  align-items:flex-start;
  cursor:pointer;
  padding-bottom:12px;
  border-bottom:1px dashed #E6D0B3;
}
.hot-item:last-child {
  border-bottom:none;
  padding-bottom:0;
}
.hot-num {
  font-size:16px;
  font-weight:900;
  font-family:monospace;
  flex-shrink:0;
}
.num-1 {color:#E34D59;}
.num-2 {color:#FF7D00;}
.num-3 {color:#FFB400;}
.hot-item p {
  margin:0;
  font-size:14px;
  color:#5E6B82;
  line-height:1.5;
}
.hot-item:hover p {
  color:#5C3A21;
}
.tag-cloud {
  display:flex;
  flex-wrap:wrap;
  gap:10px;
}
.cloud-tag {
  background:#FDFAF5;
  border:1px dashed #D4A373;
  padding:5px 11px;
  border-radius:8px;
  font-size:13px;
  color:#5E6B82;
  cursor:pointer;
}
.cloud-tag:hover {
  background:#F3E9DD;
  color:#5C3A21;
  border-color:#5C3A21;
}
</style>
