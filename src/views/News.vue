<template>
  <div class="news-page">
    <Header />
    <div class="main-container">
      <div class="page-header">
        <div class="header-left">
          <div class="tape-title-img">
            <div class="fake-tape"></div>
            <h1>养宠百科知识库</h1>
          </div>
          <p>猫狗｜小宠｜爬宠｜鸟类，全品类饲养科普与风险提示</p>
        </div>
        <div class="header-search">
          <input v-model="searchText" @keyup.enter="searchOnBaidu" type="text" placeholder="搜索饲养知识、疾病、异宠注意事项，回车直达百度" />
          <button class="search-btn" @click="searchOnBaidu">🔍 百度搜索</button>
        </div>
      </div>
      <div class="hot-banner-block">
        <div class="banner-title">🔥 热门精选百科</div>
        <div class="banner-grid">
          <div
            v-for="item in topHotList"
            :key="item.id"
            class="banner-card"
            @click="goBaiduSearch(item.title)"
          >
            <div class="banner-img">
              <img :src="item.img" alt="热门科普" />
            </div>
            <div class="banner-info">
              <span class="banner-tag" :style="{background:item.tagBg,color:item.tagColor}">{{item.tagName}}</span>
              <h4>{{ item.title }}</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="sub-nav-container">
        <div
          v-for="(tabItem, idx) in tabList"
          :key="idx"
          class="sub-nav-item"
          :class="{ active: currentTab === idx }"
          @click="handleTabChange(idx)"
        >
          {{ tabItem.label }}
        </div>
      </div>
      <div class="content-layout">
        <div class="left-feed" ref="feedWrapRef">
          <div v-if="filterArticleList.length === 0" class="empty-tip">
            没有匹配的科普文章，请换关键词搜索
          </div>
          <div class="feed-grid">
            <div
              v-for="item in pageArticleList"
              :key="item.id"
              class="feed-card"
              @click="goBaiduSearch(item.title)"
            >
              <div class="feed-card-img">
                <img :src="item.img" alt="科普图" />
              </div>
              <div class="feed-card-body">
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
          <div class="pagination-wrap" v-if="totalPage > 1">
            <button :disabled="currentPage===1" @click="goPrev">上一页</button>
            <span v-for="p in totalPage" :key="p" :class="{ 'page-active': currentPage===p }" @click="goPage(p)">
              {{p}}
            </span>
            <button :disabled="currentPage===totalPage" @click="goNext">下一页</button>
            <span class="page-tip">共 {{filterArticleList.length}} 条</span>
          </div>
        </div>
        <div class="right-sidebar">
          <div class="sidebar-widget">
            <div class="widget-header"><h3>🔥 热门百科</h3></div>
            <div class="hot-list">
              <div
                v-for="(hot,idx) in hotArticleList"
                :key="idx"
                class="hot-item"
                @click="goBaiduSearch(hot.title)"
              >
                <span class="hot-num" :class="'num-'+(idx+1)">{{String(idx+1).padStart(2,'0')}}</span>
                <p>{{hot.title}}</p>
              </div>
            </div>
          </div>
          <div class="sidebar-widget">
            <div class="widget-header"><h3>🏷️ 热门标签（点击筛选）</h3></div>
            <div class="tag-cloud">
              <span
                v-for="(tag,ti) in hotTagList"
                :key="ti"
                class="cloud-tag"
                @click="handleClickTag(tag)"
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
const feedWrapRef = ref(null)
const tabList = ref([
  { label:'🐱猫狗养护', filterKey:'catdog' },
  { label:'🐹小宠饲养', filterKey:'smallpet' },
  { label:'🦜鸟类饲养', filterKey:'bird' },
  { label:'🦎爬宠专区', filterKey:'reptile' },
  { label:'🥗饮食营养', filterKey:'food' },
  { label:'🧠行为训练', filterKey:'behavior' },
  { label:'🏥医疗体检', filterKey:'medical' },
  { label:'🚨疾病急救', filterKey:'firstaid' },
  { label:'📚 全部百科', filterKey:'all' }
])
const currentTab = ref(0)
const searchText = ref('')
const currentPage = ref(1)
const pageSize = ref(6)
function scrollToFeedTop() {
  if (feedWrapRef.value) {
    feedWrapRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
const goPrev = () => {
  currentPage.value--
  scrollToFeedTop()
}
const goNext = () => {
  currentPage.value++
  scrollToFeedTop()
}
const goPage = (p) => {
  currentPage.value = p
  scrollToFeedTop()
}
const goBaiduSearch = (titleStr)=>{
  if(!titleStr) return
  const url = `https://www.baidu.com/s?wd=${encodeURIComponent(titleStr)}`
  window.open(url,'_blank','noopener,noreferrer')
}
const articleAll = ref([
//猫狗养护
{
  id:1,
  tagName:'猫咪发腮',
  tagBg:'#E8F3FF',tagColor:'#0052D9',
  date:'2026‑10‑26',
  title:'猫咪发腮原理科普：不是所有猫都可以发腮，拒绝盲目催肥',
  desc:'只有部分公猫存在发腮特征；过度喂食催肥只会造成内脏负担，优先保证营养均衡。',
  img:'/cat.jpg',
  cate:['catdog'],
  tags:['猫咪发腮']
},
{
  id:5,
  tagName:'猫咪传腹',
  tagBg:'#E8F3FF',tagColor:'#0052D9',
  date:'2026‑10‑22',
  title:'猫传腹识别科普，早期征兆与就医建议',
  desc:'精神食欲下降、腹围变大、持续发烧；怀疑猫传腹不要自行喂药，尽快送往异宠专科医院。',
  img:'/猫传腹识别.jpg',
  cate:['catdog'],
  tags:['猫咪传腹']
},
{
  id:52,
  tagName:'新宠到家',
  tagBg:'#FFECE8',tagColor:'#E34D59',
  date:'2026‑10‑20',
  title:'新宠到家7天适应期，猫狗异宠通用过渡方案',
  desc:'刚到家先静养，不急着洗澡、遛弯、频繁互动；观察吃喝拉撒和精神状态，异常及时就医。',
  img:'/新宠物.jpg',
  cate:['catdog'],
  tags:['新宠到家','寄养注意事项','多宠混养']
},
{
  id:57,
  tagName:'用品避坑',
  tagBg:'#FFECE8',tagColor:'#E34D59',
  date:'2026‑10‑15',
  title:'宠物用品避坑清单，网红爆款不一定安全',
  desc:'带铃铛项圈、劣质玩具、松木垫料、无温控加热灯，都可能带来安全隐患。',
  img:'/宠物用品.jpg',
  cate:['catdog'],
  tags:['用品避坑','宠物除臭']
},
//小宠饲养
{
  id:9,
  tagName:'龙猫控温',
  tagBg:'#F1EAFF',tagColor:'#9365FF',
  date:'2026‑10‑18',
  title:'龙猫控温重点，怕热！夏季防暑安全要点',
  desc:'龙猫超过28℃极易中暑死亡；夏季做好降温，避免阳光直晒，环境保持通风干燥。',
  img:'/龙猫.jpg',
  cate:['smallpet'],
  tags:['龙猫控温']
},
{
  id:14,
  tagName:'仓鼠垫料选择',
  tagBg:'#F1EAFF',tagColor:'#9365FF',
  date:'2026‑10‑13',
  title:'仓鼠垫料怎么选，哪些垫料绝对不能用',
  desc:'拒绝松木、杉木木屑；无尘纸棉、白杨木刨花是优选；厚铺垫料满足仓鼠挖掘天性。',
  img:'/仓鼠.jpg',
  cate:['smallpet'],
  tags:['仓鼠垫料选择']
},
//鸟类饲养
{
  id:15,
  tagName:'鹦鹉换羽',
  tagBg:'#E0F6E9',tagColor:'#3DBE7B',
  date:'2026‑10‑12',
  title:'鹦鹉换羽期养护，营养与环境管理',
  desc:'春秋是集中换羽阶段；增加蛋白、多维营养，减少惊吓，不要频繁上手把玩。',
  img:'/鹦鹉.jpg',
  cate:['bird'],
  tags:['鹦鹉换羽']
},
{
  id:20,
  tagName:'牡丹鹦鹉养护',
  tagBg:'#E0F6E9',tagColor:'#3DBE7B',
  date:'2026‑10‑07',
  title:'牡丹鹦鹉饲养要点，性格、饮食、常见问题',
  desc:'牡丹鹦鹉性格活泼领地意识较强；主食滋养丸+谷物，搭配新鲜果蔬，注意补钙。',
  img:'/牡丹鹦鹉.jpg',
  cate:['bird'],
  tags:['牡丹鹦鹉养护']
},
//爬宠专区
{
  id:21,
  tagName:'鬃狮饲养',
  tagBg:'#E1F0FF',tagColor:'#2B65B8',
  date:'2026‑10‑06',
  title:'鬃狮蜥入门饲养，UVB晒灯、喂食与环境',
  desc:'鬃狮是日行蜥蜴，必须UVB光源；幼体多喂昆虫，成体增加蔬菜；设置冷热温度梯度。',
  img:'/鬃狮蜥.jpg',
  cate:['reptile'],
  tags:['鬃狮饲养']
},
{
  id:24,
  tagName:'爬宠补钙',
  tagBg:'#E1F0FF',tagColor:'#2B65B8',
  date:'2026‑10‑03',
  title:'各类爬宠补钙方式，钙粉、D3使用区分',
  desc:'夜行守宫、日行蜥蜴补钙方案不一样；D3不足会代谢骨骼病；喂食昆虫裹钙粉是主流方式。',
  img:'/各类爬宠补钙.jpg',
  cate:['reptile'],
  tags:['爬宠补钙']
},
//饮食营养
{
  id:28,
  tagName:'换粮过渡',
  tagBg:'#E8FFEA',tagColor:'#00B42A',
  date:'2026‑10‑26',
  title:'宠物7日换粮法，直接换粮容易软便腹泻',
  desc:'新旧粮食逐步混合，7天完成过渡；肠胃脆弱宠物拉长到10天，每一步观察粪便状态。',
  img:'/宠物7日.jpg',
  cate:['food'],
  tags:['换粮过渡']
},
{
  id:31,
  tagName:'零食挑选',
  tagBg:'#E8FFEA',tagColor:'#00B42A',
  date:'2026‑10‑23',
  title:'宠物零食选购避坑，零食热量不能超标',
  desc:'零食总热量控制每日10%以内；拒绝大量诱食剂、高盐零食；优先选择原料简单产品。',
  img:'/宠物零食.jpg',
  cate:['food'],
  tags:['零食挑选']
},
//行为训练
{
  id:34,
  tagName:'定点如厕',
  tagBg:'#F5E8FF',tagColor:'#7B61FF',
  date:'2026‑10‑20',
  title:'猫狗定点如厕训练，奖励大于惩罚',
  desc:'抓准睡醒、进食后排泄时机；做对立刻奖励；犯错不要事后打骂，彻底消除气味残留。',
  img:'/dog.jpg',
  cate:['behavior'],
  tags:['定点如厕']
},
{
  id:35,
  tagName:'爆冲纠正',
  tagBg:'#F5E8FF',tagColor:'#7B61FF',
  date:'2026‑10‑19',
  title:'遛狗爆冲纠正训练，拒绝自动伸缩牵引绳',
  desc:'爆冲就原地停下，冷静之后再前进；反复建立“主人停下=不能往前冲”的条件反射。',
  img:'/遛狗.jpg',
  cate:['behavior'],
  tags:['爆冲纠正']
},
//医疗体检
{
  id:40,
  tagName:'疫苗时间表',
  tagBg:'#FFF3D6',tagColor:'#D47500',
  date:'2026‑10‑14',
  title:'猫狗完整疫苗时间表，幼宠、成宠区分',
  desc:'幼宠完成基础免疫整套；满三月龄接种狂犬疫苗；疫苗前后一周不要洗澡。',
  img:'/猫狗疫苗.jpg',
  cate:['medical'],
  tags:['疫苗时间表']
},
{
  id:41,
  tagName:'粪便自检',
  tagBg:'#FFF3D6',tagColor:'#D47500',
  date:'2026‑10‑13',
  title:'看粪便判断宠物健康，软便、便血代表什么',
  desc:'成型黄褐色最佳；水样、带血、粘液、白色虫卵，提示肠胃或者寄生虫问题。',
  img:'/粪便.jpg',
  cate:['medical'],
  tags:['粪便自检']
},
//疾病急救
{
  id:47,
  tagName:'呛咳急救',
  tagBg:'#FFF0F5',tagColor:'#D64878',
  date:'2026‑10‑25',
  title:'宠物呛咳、卡喉急救，海姆立克法怎么做',
  desc:'突然咳、喘、呼吸困难，可能是异物卡喉；小型宠物和大型宠物操作不同，情况严重立即送医。',
  img:'/宠物呛咳.jpg',
  cate:['firstaid'],
  tags:['呛咳急救']
},
{
  id:48,
  tagName:'中暑急救',
  tagBg:'#FFF0F5',tagColor:'#D64878',
  date:'2026‑10‑24',
  title:'宠物中暑急救，夏天车里暴晒最危险',
  desc:'急促喘气、流口水、站不稳、体温升高，都是中暑信号；立刻转移阴凉处并尽快就医。',
  img:'/宠物中暑.jpg',
  cate:['firstaid'],
  tags:['中暑急救']
}
])
const topHotList = computed(()=> articleAll.value.slice(0,4))
const hotArticleList = ref([
  {title:'新手异宠选购避坑，哪些品种不适合新手？'},
  {title:'猫狗呕吐腹泻，哪些情况需要立刻送医？'},
  {title:'爬宠温度湿度怎么设置，温控设备选购指南'},
  {title:'宠物家庭常见有毒植物清单，一定要远离'},
])
const hotTagList = ref([
  '猫咪发腮',
  '猫咪传腹',
  '龙猫控温',
  '仓鼠垫料选择',
  '鹦鹉换羽',
  '鬃狮饲养',
  '爬宠补钙',
  '换粮过渡',
  '疫苗时间表',
  '呛咳急救',
  '新宠到家',
  '用品避坑'
])
const filterArticleList = computed(()=>{
  const tabKey = tabList.value[currentTab.value].filterKey
  let arr = articleAll.value
  // 关键逻辑：小宠饲养、鸟类饲养，过滤掉 id52（新宠到家）、id57（用品避坑）
  if(tabKey === 'smallpet' || tabKey === 'bird'){
    arr = arr.filter(item=> item.id !==52 && item.id!==57)
  }
  if(tabKey !== 'all'){
    arr = arr.filter(item=> item.cate.includes(tabKey))
  }
  if(searchText.value.trim()){
    const kw = searchText.value.trim().toLowerCase()
    arr = arr.filter(item=>{
      return item.title.toLowerCase().includes(kw)
        || item.desc.toLowerCase().includes(kw)
        || item.tagName.toLowerCase().includes(kw)
        || item.tags.some(t => t.toLowerCase().includes(kw))
    })
  }
  return arr
})
const totalPage = computed(()=> Math.ceil(filterArticleList.value.length / pageSize.value))
const pageArticleList = computed(()=>{
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filterArticleList.value.slice(start, end)
})
const handleTabChange = (idx)=>{
  currentTab.value = idx
  if(tabList.value[idx].filterKey === 'all'){
    searchText.value = ''
  }
  currentPage.value = 1
  scrollToFeedTop()
}
const searchOnBaidu = ()=>{
  const kw = searchText.value.trim()
  currentPage.value = 1
  scrollToFeedTop()
  if(!kw) return
  window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(kw), '_blank','noopener,noreferrer')
}
const handleClickTag = (tag)=>{
  searchText.value = tag
  currentPage.value = 1
  scrollToFeedTop()
  window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(tag), '_blank','noopener,noreferrer')
}
</script>
<style scoped>
.news-page {
  min-height: 100vh;
  background-image: url("/baike.jpg"); 
  background-size: cover;
  background-repeat: no-repeat;
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
  margin-bottom: 24px;
}
.header-left {
  position: relative;
}
.tape-title-img {
  position: relative;
  display: inline-block;
  margin-bottom: 12px;
}
.fake-tape{
  width:280px;
  height:60px;
  background:#f9eade;
  border-radius:6px;
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
  font-size: 18px;
  color: #0f0c09; 
  margin: 0;
  padding-left:8px;
  text-indent: 8em;
}
.header-search {
  display: flex;
  align-items: center;
  background: #fff;
  border: 2px dashed #D4A373;
  border-radius: 12px;
  overflow: hidden;
  width: 360px;
}
.header-search input {
  flex: 1;
  min-width: 0;
  border: none;
  padding: 11px 14px;
  outline: none;
  font-size: 14px;
  background:#fffdf9;
}
.search-btn {
  background: #5C3A21;
  color: #fff;
  border: none;
  padding: 11px 20px;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: 0.3s;
}
.search-btn:hover {
  background: #8C5E38;
}
.hot-banner-block{
  background:#fff8e8;
  border:1px dashed #D4A373;
  border-radius:20px;
  padding:20px 24px;
  margin-bottom:28px;
}
.banner-title{
  font-size:18px;
  font-weight:bold;
  color:#5C3A21;
  margin-bottom:16px;
}
.banner-grid{
  display:grid;
  grid-template-columns: repeat(4,1fr);
  gap:16px;
}
.banner-card{
  border-radius:14px;
  overflow:hidden;
  background:#FFFDF9;
  cursor:pointer;
  transition:0.25s;
  border:1px dashed #E6D0B3;
}
.banner-card:hover{
  transform:translateY(-3px);
  box-shadow:0 8px 16px rgba(0,0,0,0.06);
}
.banner-img{
  height:110px;
}
.banner-img img{
  width:100%;
  height:100%;
  object-fit:cover;
}
.banner-info{
  padding:10px 12px;
}
.banner-tag{
  font-size:11px;
  padding:2px 6px;
  border-radius:4px;
}
.banner-info h4{
  margin:6px 0 0;
  font-size:14px;
  color:#2c2c2c;
  line-height:1.4;
}
.sub-nav-container {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
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
.feed-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:20px;
}
.feed-card{
  background:#FFFDF9;
  border-radius:20px;
  border:2px dashed #D4A373;
  overflow:hidden;
  cursor:pointer;
  transition:0.3s;
}
.feed-card:hover{
  transform: translateY(-4px);
  box-shadow:0 12px 24px rgba(0,0,0,0.06);
  border-color:#5C3A21;
}
.feed-card-img{
  height:160px;
}
.feed-card-img img{
  width:100%;
  height:100%;
  object-fit:cover;
}
.feed-card-body{
  padding:18px;
}
.meta {
  display:flex;
  gap:12px;
  align-items:center;
  margin-bottom:10px;
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
.feed-card-body h3 {
  margin:0 0 8px;
  font-size:17px;
  color:#1A2B4C;
  font-weight:bold;
  line-height:1.4;
}
.feed-card-body p {
  margin:0 0 10px;
  font-size:13px;
  color:#5E6B82;
  line-height:1.6;
}
.read-more {
  font-size:13px;
  color:#D4A373;
  font-weight:bold;
}
.pagination-wrap{
  margin-top:32px;
  display:flex;
  gap:8px;
  align-items:center;
  justify-content:center;
}
.pagination-wrap button{
  border:1px dashed #D4A373;
  background:#fffdf9;
  padding:6px 12px;
  border-radius:8px;
  cursor:pointer;
}
.pagination-wrap button:disabled{
  opacity:0.4;
  cursor:not-allowed;
}
.pagination-wrap span{
  padding:6px 12px;
  border-radius:8px;
  cursor:pointer;
  border:1px dashed transparent;
}
.page-active{
  background:#5C3A21;
  color:#fff;
  border-color:#5C3A21 !important;
}
.page-tip{
  margin-left:12px;
  color:#777;
  font-size:13px;
}
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