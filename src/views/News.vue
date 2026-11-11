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

      <!-- 📌【新增：头部热门百科大板块】第一眼可见 -->
      <div class="hot-banner-block">
        <div class="banner-title">🔥 热门精选百科</div>
        <div class="banner-grid">
          <div
            v-for="item in topHotList"
            :key="item.id"
            class="banner-card"
            @click="openOuter(item.link)"
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

      <!-- 🤖 AI问答模块 -->
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
          @click="handleTabChange(idx)"
        >
          {{ tabItem.label }}
        </div>
      </div>

      <!-- 主体左右布局 -->
      <div class="content-layout">
        <!-- 左侧文章列表【改为网格布局 + 分页】 -->
        <div class="left-feed" ref="feedWrapRef">
          <div v-if="filterArticleList.length === 0" class="empty-tip">
            没有匹配的科普文章，请换关键词搜索
          </div>

          <!-- 两列网格卡片 -->
          <div class="feed-grid">
            <div
              v-for="item in pageArticleList"
              :key="item.id"
              class="feed-card"
              @click="openOuter(item.link)"
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

          <!-- ✨分页器组件【新增：点击页码自动滚到顶部】 -->
          <div class="pagination-wrap" v-if="totalPage > 1">
            <button :disabled="currentPage===1" @click="goPrev">上一页</button>
            <span v-for="p in totalPage" :key="p" :class="{ 'page-active': currentPage===p }" @click="goPage(p)">
              {{p}}
            </span>
            <button :disabled="currentPage===totalPage" @click="goNext">下一页</button>
            <span class="page-tip">共 {{filterArticleList.length}} 条</span>
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

// DOM引用，翻页滚动到列表顶部
const feedWrapRef = ref(null)

// tab大分类，严格按照你指定顺序
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

// ========== AI问答变量 ==========
const aiQuestion = ref('')
const aiAnswer = ref('')
const aiLoading = ref(false)
const aiError = ref('')

// ==========分页状态==========
const currentPage = ref(1)
const pageSize = ref(6)

// 滚动到文章列表顶部
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

// =====================文章库【严格匹配你给出的标签，每个分类下tags只放本组标签，不乱跨分类】=====================
const articleAll = ref([
// -------------------------- 🐱猫狗养护 catdog
{
  id:1,
  tagName:'猫咪发腮',
  tagBg:'#E8F3FF',tagColor:'#0052D9',
  date:'2026‑10‑26',
  title:'猫咪发腮原理科普：不是所有猫都可以发腮，拒绝盲目催肥',
  desc:'只有部分公猫存在发腮特征；过度喂食催肥只会造成内脏负担，优先保证营养均衡。',
  img:'https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['catdog'],
  tags:['猫咪发腮']
},
{
  id:2,
  tagName:'狗狗社会化',
  tagBg:'#E8F3FF',tagColor:'#0052D9',
  date:'2026‑10‑25',
  title:'狗狗社会化怎么做，幼犬阶段社交训练要点',
  desc:'幼犬3‑14周是社会化黄金期，循序渐进接触不同人、声音、环境，减少成年后胆小、吠叫问题。',
  img:'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['catdog'],
  tags:['狗狗社会化']
},
{
  id:3,
  tagName:'猫咪应激',
  tagBg:'#E8F3FF',tagColor:'#0052D9',
  date:'2026‑10‑24',
  title:'猫咪应激完整应对，搬家、来客、噪音如何降低压力',
  desc:'猫咪对环境变化高度敏感，提供躲藏空间，不要强行搂抱，给足时间自主适应。',
  img:'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['catdog'],
  tags:['猫咪应激']
},
{
  id:4,
  tagName:'幼犬训练',
  tagBg:'#E8F3FF',tagColor:'#0052D9',
  date:'2026‑10‑23',
  title:'幼犬基础训练入门，幼年好习惯养成重点',
  desc:'幼犬训练以正向奖励为主，不要体罚；优先练习简单口令，建立人与宠物信任关系。',
  img:'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['catdog'],
  tags:['幼犬训练']
},
{
  id:5,
  tagName:'猫咪传腹',
  tagBg:'#E8F3FF',tagColor:'#0052D9',
  date:'2026‑10‑22',
  title:'猫传腹识别科普，早期征兆与就医建议',
  desc:'精神食欲下降、腹围变大、持续发烧；怀疑猫传腹不要自行喂药，尽快送往异宠专科医院。',
  img:'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['catdog'],
  tags:['猫咪传腹']
},
{
  id:6,
  tagName:'狗狗关节养护',
  tagBg:'#E8F3FF',tagColor:'#0052D9',
  date:'2026‑10‑21',
  title:'狗狗关节养护：大型犬、老年犬保护要点',
  desc:'大型犬容易髋关节发育不良；控制体重，避免频繁爬楼梯，补充关节营养，减少剧烈跳跃。',
  img:'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['catdog'],
  tags:['狗狗关节养护']
},
{
  id:7,
  tagName:'猫癣护理',
  tagBg:'#E8F3FF',tagColor:'#0052D9',
  date:'2026‑10‑20',
  title:'猫癣居家护理流程，消毒与用药注意事项',
  desc:'猫癣属于真菌，坚持用药，环境定期消毒；补充B族维生素提升皮肤抵抗力，人也要做好防护避免人宠交叉感染。',
  img:'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['catdog'],
  tags:['猫癣护理']
},
{
  id:8,
  tagName:'狗狗驱虫',
  tagBg:'#E8F3FF',tagColor:'#0052D9',
  date:'2026‑10‑19',
  title:'狗狗体内外驱虫频率，室内、户外饲养区分方案',
  desc:'经常外出遛狗建议每月体外驱虫；室内可适当拉长周期；幼宠、孕宠驱虫药务必遵从兽医指导。',
  img:'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['catdog'],
  tags:['狗狗驱虫']
},

// -------------------------- 🐹小宠饲养 smallpet
{
  id:9,
  tagName:'龙猫控温',
  tagBg:'#F1EAFF',tagColor:'#9365FF',
  date:'2026‑10‑18',
  title:'龙猫控温重点，怕热！夏季防暑安全要点',
  desc:'龙猫超过28℃极易中暑死亡；夏季做好降温，避免阳光直晒，环境保持通风干燥。',
  img:'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['smallpet'],
  tags:['龙猫控温']
},
{
  id:10,
  tagName:'金丝熊造景',
  tagBg:'#F1EAFF',tagColor:'#9365FF',
  date:'2026‑10‑17',
  title:'金丝熊笼子造景，最低空间、垫料与玩具选择',
  desc:'金丝熊笼子底面积不能小于60*45cm；垫料厚铺满足挖掘，搭配大尺寸跑轮，一笼只饲养一只。',
  img:'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['smallpet'],
  tags:['金丝熊造景']
},
{
  id:11,
  tagName:'兔子球虫预防',
  tagBg:'#F1EAFF',tagColor:'#9365FF',
  date:'2026‑10‑16',
  title:'家兔球虫病预防，幼兔高危期如何防护',
  desc:'1‑6月龄幼兔球虫风险最高；保持笼舍干燥，牧草干净，定期做粪便检查，不要忽视预防。',
  img:'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['smallpet'],
  tags:['兔子球虫预防']
},
{
  id:12,
  tagName:'蜜袋鼯饲养',
  tagBg:'#F1EAFF',tagColor:'#9365FF',
  date:'2026‑10‑15',
  title:'蜜袋鼯新手饲养，群居特性与饮食禁忌',
  desc:'蜜袋鼯高度群居，单只饲养容易抑郁自残；需要专用主粮，不能拿仓鼠粮替代。',
  img:'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['smallpet'],
  tags:['蜜袋鼯饲养']
},
{
  id:13,
  tagName:'荷兰猪补钙',
  tagBg:'#F1EAFF',tagColor:'#9365FF',
  date:'2026‑10‑14',
  title:'荷兰猪饲养重点，自身无法合成维生素C',
  desc:'荷兰猪必须通过蔬果补充维C；无限量提摩西草作为主食，缺钙容易出现关节、骨骼问题。',
  img:'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['smallpet'],
  tags:['荷兰猪补钙']
},
{
  id:14,
  tagName:'仓鼠垫料选择',
  tagBg:'#F1EAFF',tagColor:'#9365FF',
  date:'2026‑10‑13',
  title:'仓鼠垫料怎么选，哪些垫料绝对不能用',
  desc:'拒绝松木、杉木木屑；无尘纸棉、白杨木刨花是优选；厚铺垫料满足仓鼠挖掘天性。',
  img:'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['smallpet'],
  tags:['仓鼠垫料选择']
},

// -------------------------- 🦜鸟类饲养 bird
{
  id:15,
  tagName:'鹦鹉换羽',
  tagBg:'#E0F6E9',tagColor:'#3DBE7B',
  date:'2026‑10‑12',
  title:'鹦鹉换羽期养护，营养与环境管理',
  desc:'春秋是集中换羽阶段；增加蛋白、多维营养，减少惊吓，不要频繁上手把玩。',
  img:'https://images.unsplash.com/photo-1552539618-7eec9b4d1796?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['bird'],
  tags:['鹦鹉换羽']
},
{
  id:16,
  tagName:'鹦鹉剪羽',
  tagBg:'#E0F6E9',tagColor:'#3DBE7B',
  date:'2026‑10‑11',
  title:'鹦鹉剪羽科普，不要剪血羽，操作风险提示',
  desc:'剪羽目的是防止飞逃；只剪成熟羽毛，红色血管血羽严禁修剪；新手建议找异宠医生操作。',
  img:'https://images.unsplash.com/photo-1552539618-7eec9b4d1796?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['bird'],
  tags:['鹦鹉剪羽']
},
{
  id:17,
  tagName:'鸟笼造景',
  tagBg:'#E0F6E9',tagColor:'#3DBE7B',
  date:'2026‑10‑10',
  title:'鹦鹉鸟笼造景，站杆、玩具布置技巧',
  desc:'使用天然树枝站杆，不同粗细保护脚爪；搭配啃咬玩具，满足鹦鹉啃咬天性。',
  img:'https://images.unsplash.com/photo-1552539618-7eec9b4d1796?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['bird'],
  tags:['鸟笼造景']
},
{
  id:18,
  tagName:'嗉囊积食急救',
  tagBg:'#E0F6E9',tagColor:'#3DBE7B',
  date:'2026‑10‑09',
  title:'鹦鹉嗉囊积食识别，家庭应急处理建议',
  desc:'喂食后嗉囊长时间不排空，精神萎靡；不要强行灌水，情况严重尽快看异宠医生。',
  img:'https://images.unsplash.com/photo-1552539618-7eec9b4d1796?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['bird'],
  tags:['嗉囊积食急救']
},
{
  id:19,
  tagName:'鹦鹉繁殖',
  tagBg:'#E0F6E9',tagColor:'#3DBE7B',
  date:'2026‑10‑08',
  title:'家庭鹦鹉繁殖注意事项，不要盲目繁殖',
  desc:'繁殖会消耗亲鸟大量身体；没有繁育经验不建议家庭自行繁殖，避免卡蛋、亲鸟弃雏风险。',
  img:'https://images.unsplash.com/photo-1552539618-7eec9b4d1796?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['bird'],
  tags:['鹦鹉繁殖']
},
{
  id:20,
  tagName:'牡丹鹦鹉养护',
  tagBg:'#E0F6E9',tagColor:'#3DBE7B',
  date:'2026‑10‑07',
  title:'牡丹鹦鹉饲养要点，性格、饮食、常见问题',
  desc:'牡丹鹦鹉性格活泼领地意识较强；主食滋养丸+谷物，搭配新鲜果蔬，注意补钙。',
  img:'https://images.unsplash.com/photo-1552539618-7eec9b4d1796?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['bird'],
  tags:['牡丹鹦鹉养护']
},

// -------------------------- 🦎爬宠专区 reptile
{
  id:21,
  tagName:'鬃狮饲养',
  tagBg:'#E1F0FF',tagColor:'#2B65B8',
  date:'2026‑10‑06',
  title:'鬃狮蜥入门饲养，UVB晒灯、喂食与环境',
  desc:'鬃狮是日行蜥蜴，必须UVB光源；幼体多喂昆虫，成体增加蔬菜；设置冷热温度梯度。',
  img:'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['reptile'],
  tags:['鬃狮饲养']
},
{
  id:22,
  tagName:'捕鸟蛛蜕皮',
  tagBg:'#E1F0FF',tagColor:'#2B65B8',
  date:'2026‑10‑05',
  title:'捕鸟蛛蜕皮完整注意事项，蜕皮期绝对不要打扰',
  desc:'看到织厚网、拒食就是蜕皮前兆；保持环境湿度，不要上手、不要投喂活体猎物。',
  img:'https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['reptile'],
  tags:['捕鸟蛛蜕皮']
},
{
  id:23,
  tagName:'角蛙饲养',
  tagBg:'#E1F0FF',tagColor:'#2B65B8',
  date:'2026‑10‑04',
  title:'角蛙两栖饲养，干湿分离，喂食禁忌',
  desc:'角蛙不能深水浸泡；环境干湿分离；不要投喂过大食物，防止消化不良。',
  img:'https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['reptile'],
  tags:['角蛙饲养']
},
{
  id:24,
  tagName:'爬宠补钙',
  tagBg:'#E1F0FF',tagColor:'#2B65B8',
  date:'2026‑10‑03',
  title:'各类爬宠补钙方式，钙粉、D3使用区分',
  desc:'夜行守宫、日行蜥蜴补钙方案不一样；D3不足会代谢骨骼病；喂食昆虫裹钙粉是主流方式。',
  img:'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['reptile'],
  tags:['爬宠补钙']
},
{
  id:25,
  tagName:'爬宠垫材选择',
  tagBg:'#E1F0FF',tagColor:'#2B65B8',
  date:'2026‑10‑02',
  title:'爬宠垫材避坑，哪些垫材容易误食肠梗阻',
  desc:'幼体蜥蜴蛇类拒绝松散沙土；厨房纸、白杨木屑安全；不同品种湿度需求选择对应垫材。',
  img:'https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['reptile'],
  tags:['爬宠垫材选择']
},
{
  id:26,
  tagName:'爬宠拒食处理',
  tagBg:'#E1F0FF',tagColor:'#2B65B8',
  date:'2026‑10‑01',
  title:'爬宠拒食排查顺序：温度＞湿度＞环境应激＞个体状态',
  desc:'绝大多数拒食根源是温湿度不对；先检查环境，不要强行填食，避免食道损伤。',
  img:'https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['reptile'],
  tags:['爬宠拒食处理']
},
{
  id:27,
  tagName:'守宫繁殖',
  tagBg:'#E1F0FF',tagColor:'#2B65B8',
  date:'2026‑09‑30',
  title:'豹纹守宫繁殖入门，交配、产卵、孵化要点',
  desc:'不要过早繁殖，母守宫需要达到合适体重；产卵后蛭石低温孵化，蛋禁止翻转。',
  img:'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['reptile'],
  tags:['守宫繁殖']
},

// -------------------------- 🥗饮食营养 food
{
  id:28,
  tagName:'换粮过渡',
  tagBg:'#E8FFEA',tagColor:'#00B42A',
  date:'2026‑10‑26',
  title:'宠物7日换粮法，直接换粮容易软便腹泻',
  desc:'新旧粮食逐步混合，7天完成过渡；肠胃脆弱宠物拉长到10天，每一步观察粪便状态。',
  img:'https://images.unsplash.com/photo-1600240644413-4624a9bf1928?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['food'],
  tags:['换粮过渡']
},
{
  id:29,
  tagName:'辅食添加',
  tagBg:'#E8FFEA',tagColor:'#00B42A',
  date:'2026‑10‑25',
  title:'猫狗辅食怎么加，辅食不能替代主粮',
  desc:'辅食只能做补充，不能超过每日总热量10%；自制辅食必须补足钙、微量元素。',
  img:'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['food'],
  tags:['辅食添加']
},
{
  id:30,
  tagName:'宠物补水',
  tagBg:'#E8FFEA',tagColor:'#00B42A',
  date:'2026‑10‑24',
  title:'提高宠物喝水量小技巧，减少泌尿疾病风险',
  desc:'多放水碗、流动饮水机；干粮喂养宠物尤其要重视补水；留意每日饮水量变化。',
  img:'https://images.unsplash.com/photo-1600240644413-4624a9bf1928?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['food'],
  tags:['宠物补水']
},
{
  id:31,
  tagName:'零食挑选',
  tagBg:'#E8FFEA',tagColor:'#00B42A',
  date:'2026‑10‑23',
  title:'宠物零食选购避坑，零食热量不能超标',
  desc:'零食总热量控制每日10%以内；拒绝大量诱食剂、高盐零食；优先选择原料简单产品。',
  img:'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['food'],
  tags:['零食挑选']
},
{
  id:32,
  tagName:'挑食纠正',
  tagBg:'#E8FFEA',tagColor:'#00B42A',
  date:'2026‑10‑22',
  title:'宠物挑食纠正，不要无底线喂零食',
  desc:'不要因为拒食就不停换粮；定时取走不吃的粮食，杜绝零食堆着吃，家长要坚持原则。',
  img:'https://images.unsplash.com/photo-1600240644413-4624a9bf1928?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['food'],
  tags:['挑食纠正']
},
{
  id:33,
  tagName:'宠物补钙',
  tagBg:'#E8FFEA',tagColor:'#00B42A',
  date:'2026‑10‑21',
  title:'宠物补钙误区，不是所有宠物都要额外补钙',
  desc:'吃合格全价主粮不需要乱补钙；幼宠、孕宠、老年宠，需要在兽医评估后补充。',
  img:'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['food'],
  tags:['宠物补钙']
},

// -------------------------- 🧠行为训练 behavior
{
  id:34,
  tagName:'定点如厕',
  tagBg:'#F5E8FF',tagColor:'#7B61FF',
  date:'2026‑10‑20',
  title:'猫狗定点如厕训练，奖励大于惩罚',
  desc:'抓准睡醒、进食后排泄时机；做对立刻奖励；犯错不要事后打骂，彻底消除气味残留。',
  img:'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
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
  img:'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['behavior'],
  tags:['爆冲纠正']
},
{
  id:36,
  tagName:'吠叫纠正',
  tagBg:'#F5E8FF',tagColor:'#7B61FF',
  date:'2026‑10‑18',
  title:'狗狗吠叫纠正，不要和狗狗对叫',
  desc:'狗狗叫的时候你大喊，会被理解成你一起叫；安静的瞬间再给予零食奖励。',
  img:'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['behavior'],
  tags:['吠叫纠正']
},
{
  id:37,
  tagName:'唤回训练',
  tagBg:'#F5E8FF',tagColor:'#7B61FF',
  date:'2026‑10‑17',
  title:'狗狗唤回训练，在家练起，再到户外',
  desc:'从低干扰室内开始，一过来马上奖励；不要唤回之后就惩罚，会破坏唤回信任。',
  img:'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['behavior'],
  tags:['唤回训练']
},
{
  id:38,
  tagName:'拆家矫正',
  tagBg:'#F5E8FF',tagColor:'#7B61FF',
  date:'2026‑10‑16',
  title:'狗狗拆家怎么矫正，大多是无聊或者焦虑',
  desc:'保证运动量，提供大量啃咬玩具；不要回家之后对着已经拆完的家具打骂。',
  img:'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['behavior'],
  tags:['拆家矫正']
},
{
  id:39,
  tagName:'咬手纠正',
  tagBg:'#F5E8FF',tagColor:'#7B61FF',
  date:'2026‑10‑15',
  title:'幼犬咬手纠正，咬到立刻停止游戏',
  desc:'牙齿碰到手，游戏立刻终止，走开不理；教会宠物：咬手=游戏结束。',
  img:'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['behavior'],
  tags:['咬手纠正']
},

// -------------------------- 🏥医疗体检 medical
{
  id:40,
  tagName:'疫苗时间表',
  tagBg:'#FFF3D6',tagColor:'#D47500',
  date:'2026‑10‑14',
  title:'猫狗完整疫苗时间表，幼宠、成宠区分',
  desc:'幼宠完成基础免疫整套；满三月龄接种狂犬疫苗；疫苗前后一周不要洗澡。',
  img:'https://images.unsplash.com/photo-1628009362854-d1870b4553da?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
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
  img:'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['medical'],
  tags:['粪便自检']
},
{
  id:42,
  tagName:'血常规解读',
  tagBg:'#FFF3D6',tagColor:'#D47500',
  date:'2026‑10‑12',
  title:'宠物体检血常规快速看懂，白细胞红细胞含义',
  desc:'白细胞看感染炎症；红细胞看贫血；拿到报告优先交给兽医综合判断，不要自己网上对号入座。',
  img:'https://images.unsplash.com/photo-1628009362854-d1870b4553da?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['medical'],
  tags:['血常规解读']
},
{
  id:43,
  tagName:'基础体检项目',
  tagBg:'#FFF3D6',tagColor:'#D47500',
  date:'2026‑10‑11',
  title:'宠物年度基础体检清单，幼年老年不一样',
  desc:'青年宠物体检侧重基础筛查；7岁以上老年宠物，增加内脏生化、关节检查。',
  img:'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['medical'],
  tags:['基础体检项目']
},
{
  id:44,
  tagName:'耳螨检查',
  tagBg:'#FFF3D6',tagColor:'#D47500',
  date:'2026‑10‑10',
  title:'家庭自查耳螨，咖啡渣一样褐色分泌物是信号',
  desc:'耳道大量黑褐色碎屑、频繁挠耳朵；确诊耳螨要坚持疗程，不要好转就停药。',
    img:'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['medical'],
  tags:['耳螨检查']
},
{
  id:45,
  tagName:'皮肤镜检',
  tagBg:'#FFF3D6',tagColor:'#D47500',
  date:'2026‑10‑09',
  title:'宠物皮肤瘙痒、掉毛，皮肤镜检怎么看',
  desc:'皮肤红、痒、结痂、掉毛，可能是真菌、螨虫或过敏；镜检能帮助区分病因，不要乱涂人用药。',
  img:'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['medical'],
  tags:['皮肤镜检']
},

// -------------------------- 🚨疾病急救 firstaid
{
  id:46,
  tagName:'外伤包扎',
  tagBg:'#FFF0F5',tagColor:'#D64878',
  date:'2026‑10‑26',
  title:'宠物外伤应急处理，出血、擦伤、划伤怎么处理',
  desc:'先止血，再清洁伤口；深伤口、持续出血、疑似骨折，不要自行硬包扎，尽快就医。',
  img:'https://images.unsplash.com/photo-1601758124096-1fd661873b95?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['firstaid'],
  tags:['外伤包扎']
},
{
  id:47,
  tagName:'呛咳急救',
  tagBg:'#FFF0F5',tagColor:'#D64878',
  date:'2026‑10‑25',
  title:'宠物呛咳、卡喉急救，海姆立克法怎么做',
  desc:'突然咳、喘、呼吸困难，可能是异物卡喉；小型宠物和大型宠物操作不同，情况严重立即送医。',
  img:'https://images.unsplash.com/photo-1601758124096-1fd661873b95?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
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
  img:'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['firstaid'],
  tags:['中暑急救']
},
{
  id:49,
  tagName:'异物卡喉',
  tagBg:'#FFF0F5',tagColor:'#D64878',
  date:'2026‑10‑23',
  title:'宠物误食异物，骨头、玩具、线团卡喉怎么办',
  desc:'发现吞咽异物，不要盲目灌水催吐；记录异物大小和时间，尽快做影像检查。',
  img:'https://images.unsplash.com/photo-1601758124096-1fd661873b95?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['firstaid'],
  tags:['异物卡喉']
},
{
  id:50,
  tagName:'便血排查',
  tagBg:'#FFF0F5',tagColor:'#D64878',
  date:'2026‑10‑22',
  title:'宠物便血原因排查，哪些情况必须立刻就医',
  desc:'鲜红血、黑便、粘液血便都可能提示不同问题；频繁腹泻、精神差、便血要尽快就诊。',
  img:'https://images.unsplash.com/photo-1601758124096-1fd661873b95?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['firstaid'],
  tags:['便血排查']
},
{
  id:51,
  tagName:'脱肛处理',
  tagBg:'#FFF0F5',tagColor:'#D64878',
  date:'2026‑10‑21',
  title:'宠物脱肛应急处理，不要强行塞回',
  desc:'脱肛多见于幼宠、腹泻后；保持局部清洁湿润，避免缺血坏死，尽快找兽医处理。',
  img:'https://images.unsplash.com/photo-1601758124096-1fd661873b95?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['firstaid'],
  tags:['脱肛处理']
},

// -------------------------- 通用全品类文章（可被多个大分类检索到）
{
  id:52,
  tagName:'新宠到家',
  tagBg:'#FFECE8',tagColor:'#E34D59',
  date:'2026‑10‑20',
  title:'新宠到家7天适应期，猫狗异宠通用过渡方案',
  desc:'刚到家先静养，不急着洗澡、遛弯、频繁互动；观察吃喝拉撒和精神状态，异常及时就医。',
  img:'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['catdog','smallpet','bird','reptile'],
  tags:['新宠到家','寄养注意事项','多宠混养']
},
{
  id:53,
  tagName:'寄养注意事项',
  tagBg:'#FFECE8',tagColor:'#E34D59',
  date:'2026‑10‑19',
  title:'寄养前准备清单，疫苗、驱虫、用品、健康告知',
  desc:'寄养前确认疫苗驱虫完成，带熟悉的食物和用品；选择环境干净、管理规范的寄养方。',
  img:'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['catdog','smallpet','bird','reptile'],
  tags:['寄养注意事项','新宠到家']
},
{
  id:54,
  tagName:'多宠混养',
  tagBg:'#FFECE8',tagColor:'#E34D59',
  date:'2026‑10‑18',
  title:'多宠家庭混养注意事项，猫狗鼠鸟龟能否共处',
  desc:'混养要考虑体型、食性、领地和安全风险；必要时分区饲养，避免追逐、误食和应激。',
  img:'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['catdog','smallpet','bird','reptile'],
  tags:['多宠混养','笼子造景']
},
{
  id:55,
  tagName:'笼子造景',
  tagBg:'#FFECE8',tagColor:'#E34D59',
  date:'2026‑10‑17',
  title:'宠物笼子造景通用思路，丰容减少刻板行为',
  desc:'增加躲藏、攀爬、啃咬、挖掘空间；不同宠物按习性布置，避免过度拥挤和安全隐患。',
  img:'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=600&auto=format&fit=crop',
  link:'https://www.petfoodchina.com/',
  cate:['catdog','smallpet','bird','reptile'],
  tags:['笼子造景','宠物除臭']
},
  {
    id:56,
    tagName:'宠物除臭',
    tagBg:'#FFECE8',
    tagColor:'#E34D59',
    date:'2026-10-16',
    title:'宠物异味处理，尿味、屎味、体臭根源分析',
    desc:'异味先找原因：尿渍、耳道、口腔、皮肤、肠胃；不要只靠香水掩盖，容易刺激宠物呼吸道。',
    img:'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=600&auto=format&fit=crop',
    link:'https://www.petfoodchina.com/',
    cate:['catdog','smallpet','bird','reptile'],
    tags:['宠物除臭','用品避坑']
  },
  {
    id:57,
    tagName:'用品避坑',
    tagBg:'#FFECE8',
    tagColor:'#E34D59',
    date:'2026-10-15',
    title:'宠物用品避坑清单，网红爆款不一定安全',
    desc:'带铃铛项圈、劣质玩具、松木垫料、无温控加热灯，都可能带来安全隐患。',
    img:'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=600&auto=format&fit=crop',
    link:'https://www.petfoodchina.com/',
    cate:['catdog','smallpet','bird','reptile'],
    tags:['用品避坑','宠物除臭']
  }
])

// 头部精选4条热门
const topHotList = computed(()=> articleAll.value.slice(0,4))

// 侧边热门
const hotArticleList = ref([
  {title:'新手异宠选购避坑，哪些品种不适合新手？',link:'https://www.petfoodchina.com/'},
  {title:'猫狗呕吐腹泻，哪些情况需要立刻送医？',link:'https://www.petfoodchina.com/'},
  {title:'爬宠温度湿度怎么设置，温控设备选购指南',link:'https://www.petfoodchina.com/'},
  {title:'宠物家庭常见有毒植物清单，一定要远离',link:'https://www.petfoodchina.com/'},
])

// 侧边热门标签固定10个
const hotTagList = ref([
  '老年宠物照护',
  '守宫温控',
  '猪鼻蛇',
  '鹦鹉喂养',
  '家兔牧草',
  '宠物中毒急救',
  '猫咪应激',
  '疫苗时间表',
  '用品避坑',
  '新宠到家'
])

// =========核心过滤逻辑=========
const filterArticleList = computed(()=>{
  const tabKey = tabList.value[currentTab.value].filterKey
  let arr = articleAll.value
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

// 分页计算
const totalPage = computed(()=> Math.ceil(filterArticleList.value.length / pageSize.value))
const pageArticleList = computed(()=>{
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filterArticleList.value.slice(start, end)
})

// 切换tab：切全部百科清空搜索，其他分类保留搜索词
const handleTabChange = (idx)=>{
  currentTab.value = idx
  if(tabList.value[idx].filterKey === 'all'){
    searchText.value = ''
    aiQuestion.value = ''
  }
  currentPage.value = 1
  scrollToFeedTop()
}

// 搜索按钮，重置第一页
const doLocalSearch = ()=>{
  currentPage.value = 1
  scrollToFeedTop()
}

// 点击热门标签，保留当前tab，填入关键词
const handleClickTag = (tag)=>{
  searchText.value = tag
  aiQuestion.value = tag
  currentPage.value = 1
  scrollToFeedTop()
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

/* ----------------头部热门精选板块---------------- */
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

/* 🤖 AI问答区块 */
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

/* ✨文章列表：两列网格布局，一屏看4篇 */
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

/* ✨分页器样式 */
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
