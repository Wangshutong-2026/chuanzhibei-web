<template>
  <div class="news-page">
    <Header />

    <div class="main-container">
      <!-- 顶部胶带手账标题区：改用jiaotiao5.png胶条图片 -->
      <div class="page-header">
        <div class="header-left">
          <div class="tape-title-img">
            <img class="tape-bg-img" src="/jiaotiao5.png" alt="胶带背景" />
            <h1>养宠百科知识库</h1>
          </div>
          <p>猫狗｜小宠｜爬宠｜鸟类，全品类饲养科普与风险提示</p>
        </div>
        <div class="header-search">
          <input type="text" placeholder="搜索饲养知识、疾病、异宠注意事项..." />
          <button class="search-btn">🔍</button>
        </div>
      </div>

      <!-- 1. 焦点大图区 -->
      <section class="featured-news" @click="openExternalNews('https://www.petfoodchina.com/')">
        <div class="featured-img-box">
          <div class="featured-tag">📖 百科精选</div>
          <img src="/toutiao.jpg" alt="焦点资讯" />
        </div>
        <div class="featured-content">
          <div class="meta">
            <span class="tag">全品类科普</span>
            <span class="date">2026-10-28</span>
            <span class="source">平台知识库</span>
          </div>
          <h2>异宠饲养入门指南：仓鼠、守宫、鹦鹉新手容易踩的致命误区</h2>
          <p>现在越来越多家庭选择饲养小宠、爬宠与观赏鸟类，但很多新手沿用猫狗饲养逻辑，极易出现饲养失败。本文覆盖居住环境、温度湿度、喂食禁忌、常见疾病预警，帮助新手避开高危饲养操作，仓鼠合笼、守宫温控、鹦鹉饮食禁忌都有详细说明。</p>
          <button class="read-btn">阅读完整百科 →</button>
        </div>
      </section>

      <!-- 2.【优化拥挤】知识分类Tab导航栏，缩小内边距、缩小gap，自动换行 -->
      <div class="sub-nav-container">
        <div class="sub-nav-item" :class="{ active: currentTab === 0 }" @click="currentTab = 0">📚 全部百科</div>
        <div class="sub-nav-item" :class="{ active: currentTab === 1 }" @click="currentTab = 1">🐱🐶 犬猫养护</div>
        <div class="sub-nav-item" :class="{ active: currentTab === 2 }" @click="currentTab = 2">🐹 小宠饲养</div>
        <div class="sub-nav-item" :class="{ active: currentTab === 3 }" @click="currentTab = 3">🦜 鸟类饲养</div>
        <div class="sub-nav-item" :class="{ active: currentTab === 4 }" @click="currentTab = 4">🐍 爬宠专区</div>
        <div class="sub-nav-item" :class="{ active: currentTab === 5 }" @click="currentTab = 5">🍽️ 饮食营养</div>
        <div class="sub-nav-item" :class="{ active: currentTab === 6 }" @click="currentTab = 6">🧠 行为训练</div>
        <div class="sub-nav-item" :class="{ active: currentTab === 7 }" @click="currentTab = 7">🏥 医疗体检</div>
        <div class="sub-nav-item" :class="{ active: currentTab === 8 }" @click="currentTab = 8">🩹 疾病急救</div>
        <div class="sub-nav-item" :class="{ active: currentTab === 9 }" @click="currentTab = 9">⚠️ 饲养风险</div>
        <div class="sub-nav-item" :class="{ active: currentTab === 10 }" @click="currentTab = 10">🛒 用品避坑</div>
      </div>

      <!-- 3. 左右分栏布局 -->
      <div class="content-layout">
        <!-- 左侧：主资讯区 -->
        <div class="left-feed">
          <!-- Tab0：全部百科（聚合） -->
          <div v-if="currentTab === 0" class="tab-content">
            <div class="feed-list">
              <div class="feed-item-large" @click="openExternalNews('https://www.petfoodindustry.com/')">
                <div class="feed-img"><img src="https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?q=80&w=600&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag">犬猫养护</span><span class="date">2026-10-26</span></div>
                  <h3>老年宠物照护要点：猫狗进入高龄后该如何调整饮食与居住环境</h3>
                  <p>7岁以后猫狗逐步步入老年，关节退化、肾脏负担上升、感官衰退。需要调整喂食方案、地面防滑、减少剧烈运动，定期做老年专项体检，提早预防肾病、关节炎、认知退化。</p>
                  <span class="read-more">阅读全文 →</span>
                </div>
              </div>
              <div class="feed-item-small" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img-small"><img src="https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=400&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag green">鸟类饲养</span><span class="date">2026-10-24</span></div>
                  <h4>虎皮鹦鹉喂养避坑：这些人类食物绝对不能喂给鹦鹉</h4>
                  <p>牛油果、巧克力、含盐含糖零食对鹦鹉剧毒。很多家庭随手投喂，造成鸟类急性中毒。科普适合鹦鹉主食、辅食、补钙方式以及笼内环境布置。</p>
                </div>
              </div>
              <div class="feed-item-small" @click="openExternalNews('https://www.cngrain.com/')">
                <div class="feed-img-small"><img src="https://images.unsplash.com/photo-1452857297128-d9c29adba80b?q=80&w=400&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag purple">小宠饲养</span><span class="date">2026-10-22</span></div>
                  <h4>家兔饲养误区：兔子不能只喂蔬菜，无限提摩西草才是核心主食</h4>
                  <p>大量新手只给兔子喂青菜水果，引发肠胃胀气、腹泻死亡。讲解牧草配比、饮水、磨牙需求、笼舍空间与常见皮肤病预防。</p>
                </div>
              </div>
              <div class="feed-item-small" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img-small"><img src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=400&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag" style="background:#E1F0FF;color:#2B65B8">爬宠专区</span><span class="date">2026‑10‑21</span></div>
                  <h4>豹纹守宫全套饲养，冷热区与补钙的关键细节</h4>
                  <p>变温动物必须依靠加热制造温度梯度，UVB、钙粉、垫料选择直接关系爬宠寿命。</p>
                </div>
              </div>
              <div class="feed-item-small" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img-small"><img src="https://images.unsplash.com/photo-1601758124096-1fd661873b95?q=80&w=400&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag" style="background:#FFF0F5;color:#D64878">疾病急救</span><span class="date">2026‑10‑20</span></div>
                  <h4>宠物误食中毒家庭应急处理，什么情况绝对不能催吐</h4>
                  <p>巧克力、葡萄、洋葱中毒的基础处置。强酸强碱类物品误食，盲目催吐会二次灼伤食道。</p>
                </div>
              </div>
              <div class="feed-item-small" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img-small"><img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=400&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag" style="background:#FFF9EC;color:#C27900">用品避坑</span><span class="date">2026‑10‑19</span></div>
                  <h4>宠物网购用品黑名单：这些网红产品不要买</h4>
                  <p>带铃铛项圈、劣质猫薄荷玩具、木屑仓鼠垫料，盘点网红爆款用品背后安全隐患。</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab1：犬猫养护 -->
          <div v-if="currentTab === 1" class="tab-content">
            <div class="feed-list">
              <div class="feed-item-large" @click="openExternalNews('https://www.petfoodindustry.com/')">
                <div class="feed-img"><img src="https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?q=80&w=600&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag">犬猫养护</span><span class="date">2026‑10‑26</span></div>
                  <h3>老年宠物照护要点：猫狗进入高龄后该如何调整饮食与居住环境</h3>
                  <p>7岁以后猫狗逐步步入老年，关节退化、肾脏负担上升、感官衰退。需要调整喂食方案、地面防滑、减少剧烈运动，定期做老年专项体检。</p>
                  <span class="read-more">阅读全文 →</span>
                </div>
              </div>
              <div class="feed-item-small" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img-small"><img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=400&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag">犬猫养护</span><span class="date">2026‑10‑23</span></div>
                  <h4>猫咪换粮正确操作，7天换粮法完整步骤</h4>
                  <p>突然更换猫粮极易引发呕吐软便腹泻。讲解7天渐进换粮配比，肠胃敏感猫咪的额外注意事项。</p>
                </div>
              </div>
              <div class="feed-item-small" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img-small"><img src="https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=400&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag">犬猫养护</span><span class="date">2026‑10‑20</span></div>
                  <h4>狗狗洗澡频率与洗护误区，不要频繁给狗洗澡</h4>
                  <p>过度洗澡会破坏皮肤保护层，引发皮肤病。不同被毛长度的猫狗合适洗澡周期，人用沐浴露严禁给宠物使用。</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab2：小宠饲养：仓鼠、兔子、豚鼠、蜜袋鼯 -->
          <div v-if="currentTab === 2" class="tab-content">
            <div class="feed-list">
              <div class="feed-item-large" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img"><img src="https://images.unsplash.com/photo-1452857297128-d9c29adba80b?q=80&w=600&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag purple">小宠饲养</span><span class="date">2026‑10‑22</span></div>
                  <h3>家兔饲养误区：兔子不能只喂蔬菜，无限提摩西草才是核心主食</h3>
                  <p>大量新手只给兔子喂青菜水果，引发肠胃胀气、腹泻死亡。讲解牧草配比、饮水、磨牙需求、笼舍空间与常见皮肤病预防。</p>
                  <span class="read-more">阅读全文 →</span>
                </div>
              </div>
              <div class="feed-item-small" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img-small"><img src="https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=400&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag purple">小宠饲养</span><span class="date">2026‑10‑19</span></div>
                  <h4>仓鼠饲养避坑：笼舍、垫料、温度、跑轮完整要求</h4>
                  <p>仓鼠需要大空间笼子，不能用狭小亚克力笼；跑轮必须足够大，避免脊柱变形；垫料禁止松木、杉木木屑。</p>
                </div>
              </div>
              <div class="feed-item-small" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img-small"><img src="https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=400&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag purple">小宠饲养</span><span class="date">2026‑10‑16</span></div>
                  <h4>蜜袋鼯饲养要点：群居、夜行、补钙与滑翔防护</h4>
                  <p>蜜袋鼯是群居夜行动物，单独饲养容易自残；家中需要做好纱窗防护防止滑翔飞出。</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab3：鸟类饲养 -->
          <div v-if="currentTab === 3" class="tab-content">
            <div class="feed-list">
              <div class="feed-item-large" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img"><img src="https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=600&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag green">鸟类饲养</span><span class="date">2026‑10‑24</span></div>
                  <h3>虎皮鹦鹉喂养避坑：这些人类食物绝对不能喂给鹦鹉</h3>
                  <p>牛油果、巧克力、含盐含糖零食对鹦鹉剧毒。很多家庭随手投喂，造成鸟类急性中毒。科普适合鹦鹉主食、辅食、补钙方式以及笼内环境布置。</p>
                  <span class="read-more">阅读全文 →</span>
                </div>
              </div>
              <div class="feed-item-small" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img-small"><img src="https://images.unsplash.com/photo-1552728089-57bdde30beb3?q=80&w=400&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag green">鸟类饲养</span><span class="date">2026‑10‑21</span></div>
                  <h4>鹦鹉换羽期养护：营养补充与光照注意事项</h4>
                  <p>换羽期鹦鹉消耗大量营养，蛋白质、钙元素需要加强；避免直吹冷风，减少应激，过度啃羽啄毛要排查心理与疾病原因。</p>
                </div>
              </div>
              <div class="feed-item-small" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img-small"><img src="https://images.unsplash.com/photo-1544923246-77307dd628b5?q=80&w=400&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag green">鸟类饲养</span><span class="date">2026‑10‑18</span></div>
                  <h4>笼养鹦鹉环境禁忌：油烟、香水、蚊香都有致命风险</h4>
                  <p>鸟类呼吸系统极度脆弱，厨房油烟、蚊香、香薰、喷雾杀虫剂会造成急性中毒，饲养环境务必远离这些污染源。</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab4：爬宠专区（守宫、蜥蜴、蛇、龟） -->
          <div v-if="currentTab === 4" class="tab-content">
            <div class="feed-list">
              <div class="feed-item-large" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img"><img src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=600&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag" style="background:#E1F0FF;color:#2B65B8">爬宠专区</span><span class="date">2026‑10‑21</span></div>
                  <h3>豹纹守宫入门：温度、湿度、喂食全套饲养指南</h3>
                  <p>守宫是变温动物，需要加热垫制造冷热区；补钙维生素D3必不可少；不能使用松散沙质垫料，防止误食肠梗阻。</p>
                  <span class="read-more">阅读全文 →</span>
                </div>
              </div>
              <div class="feed-item-small" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img-small"><img src="https://images.unsplash.com/photo-1559253362-cd99b4f3d9a0?q=80&w=400&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag" style="background:#E1F0FF;color:#2B65B8">爬宠专区</span><span class="date">2026‑10‑17</span></div>
                  <h4>水龟饲养：晒台、水质、冬眠注意事项</h4>
                  <p>水质恶化极易腐皮腐甲；必须设置晒台；冬眠有风险，新手不建议强制冬眠。</p>
                </div>
              </div>
              <div class="feed-item-small" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img-small"><img src="https://images.unsplash.com/photo-1531386151447-fd76ad50012f?q=80&w=400&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag" style="background:#E1F0FF;color:#2B65B8">爬宠专区</span><span class="date">2026‑10‑14</span></div>
                  <h4>爬宠法律红线：哪些品种个人不能私自饲养</h4>
                  <p>很多蜥蜴、龟类属于保护动物，无证个人饲养涉嫌违法，购买前务必确认品种合法性。</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab5：饮食营养 -->
          <div v-if="currentTab === 5" class="tab-content">
            <div class="feed-list">
              <div class="feed-item-large" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img"><img src="https://images.unsplash.com/photo-1600240644413-4624a9bf1928?q=80&w=600&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag" style="background:#E8FFEA;color:#00B42A">饮食营养</span><span class="date">2026‑10‑23</span></div>
                  <h3>猫狗热量怎么算：不同体重、年龄每日喂食量参考</h3>
                  <p>幼宠、成宠、老年、绝育之后热量需求完全不同，盲目多喂极易肥胖，科学计算每日克数。</p>
                  <span class="read-more">阅读全文 →</span>
                </div>
              </div>
              <div class="feed-item-small" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img-small"><img src="https://images.unsplash.com/photo-1596464145517-5f92c6e20969?q=80&w=400&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag" style="background:#E8FFEA;color:#00B42A">饮食营养</span><span class="date">2026‑10‑20</span></div>
                  <h4>猫狗绝对禁食食物清单：葡萄、洋葱、巧克力中毒原理</h4>
                  <p>家庭常见人类食物很多对猫狗剧毒，整理完整禁食清单，以及误食之后初步判断方式。</p>
                </div>
              </div>
              <div class="feed-item-small" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img-small"><img src="https://images.unsplash.com/photo-1571867424488-4565932edb41?q=80&w=400&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag" style="background:#E8FFEA;color:#00B42A">饮食营养</span><span class="date">2026‑10‑17</span></div>
                  <h4>生骨肉喂养利弊，新手必须知道的风险点</h4>
                  <p>生骨肉并不是万能，细菌、寄生虫、营养配比失衡风险，适合哪些宠物，哪些宠物不建议尝试。</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab6：行为训练 -->
          <div v-if="currentTab === 6" class="tab-content">
            <div class="feed-list">
              <div class="feed-item-large" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img"><img src="https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?q=80&w=600&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag" style="background:#F5E8FF;color:#7B61FF">行为训练</span><span class="date">2026‑10‑22</span></div>
                  <h3>猫咪乱尿完整分析：到底是发情、应激还是泌尿系统疾病</h3>
                  <p>猫咪到处乱尿，优先排除疾病，再排查环境应激、猫砂盆数量问题，不要一味打骂。</p>
                  <span class="read-more">阅读全文 →</span>
                </div>
              </div>
              <div class="feed-item-small" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img-small"><img src="https://images.unsplash.com/photo-1551269901-5c5e14c25df7?q=80&w=400&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag" style="background:#F5E8FF;color:#7B61FF">行为训练</span><span class="date">2026‑10‑19</span></div>
                  <h4>狗狗社会化怎么做，幼犬关键窗口期科普</h4>
                  <p>3‑14周是狗狗社会化黄金时期，正确接触不同人和环境，减少成年后胆小、吠叫攻击行为。</p>
                </div>
              </div>
              <div class="feed-item-small" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img-small"><img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=400&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag" style="background:#F5E8FF;color:#7B61FF">行为训练</span><span class="date">2026‑10‑16</span></div>
                  <h4>宠物应激是什么？搬家、来客、医院如何减少应激伤害</h4>
                  <p>应激不只是害怕，会诱发膀胱炎、免疫力下降甚至猝死，教你减少环境变化带来的应激。</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab7：医疗体检（常规保健、疫苗、驱虫、绝育） -->
          <div v-if="currentTab === 7" class="tab-content">
            <div class="feed-list">
              <div class="feed-item-large" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img"><img src="https://images.unsplash.com/photo-1628009362854-d1870b4553da?q=80&w=600&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag" style="background:#FFF3D6;color:#D47500">医疗体检</span><span class="date">2026‑10‑21</span></div>
                  <h3>猫狗疫苗与驱虫完整时间表，幼宠和成宠分别怎么做</h3>
                  <p>区分核心疫苗和非核心疫苗；体内体外驱虫频率；疫苗间隔、过敏反应观察要点。</p>
                  <span class="read-more">阅读全文 →</span>
                </div>
              </div>
              <div class="feed-item-small" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img-small"><img src="https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=400&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag" style="background:#FFF3D6;color:#D47500">医疗体检</span><span class="date">2026‑10‑18</span></div>
                  <h4>宠物年度体检该查哪些项目，不要只做血常规</h4>
                  <p>年轻宠、老年宠体检项目差异；老年宠物务必增加生化、尿检、X光筛查内脏慢性病。</p>
                </div>
              </div>
              <div class="feed-item-small" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img-small"><img src="https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=400&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag" style="background:#FFF3D6;color:#D47500">医疗体检</span><span class="date">2026‑10‑15</span></div>
                  <h4>绝育全科普：最佳年龄、手术风险、术后护理注意事项</h4>
                  <p>公母宠物绝育利弊；什么情况不建议绝育；术前禁食禁水，术后伤口看护要点。</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab8：疾病急救（急性、中毒、外伤） -->
          <div v-if="currentTab === 8" class="tab-content">
            <div class="feed-list">
              <div class="feed-item-large" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img"><img src="https://images.unsplash.com/photo-1601758124096-1fd661873b95?q=80&w=600&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag" style="background:#FFF0F5;color:#D64878">疾病急救</span><span class="date">2026‑10‑20</span></div>
                  <h3>宠物误食中毒家庭应急处理，什么情况绝对不能催吐</h3>
                  <p>巧克力、葡萄、洋葱中毒的基础处置。强酸强碱类物品误食，盲目催吐会二次灼伤食道，分清居家急救和立刻送医边界。</p>
                  <span class="read-more">阅读全文 →</span>
                </div>
              </div>
              <div class="feed-item-small" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img-small"><img src="https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=400&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag" style="background:#FFF0F5;color:#D64878">疾病急救</span><span class="date">2026‑10‑17</span></div>
                  <h4>猫狗呕吐腹泻区分：什么时候必须马上就医</h4>
                  <p>偶尔软便可以观察；带血呕吐、持续不吃不喝、精神萎靡、腹痛，代表严重风险，不要在家拖延。</p>
                </div>
              </div>
              <div class="feed-item-small" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img-small"><img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=400&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag" style="background:#FFF0F5;color:#D64878">疾病急救</span><span class="date">2026‑10‑14</span></div>
                  <h4>异宠生病信号汇总：不爱吃不一定只是挑食</h4>
                  <p>仓鼠、兔子、守宫拒食、嗜睡、体重下降，大多是疾病，不要单纯换粮，排查温度、寄生虫、内脏问题。</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab9：饲养风险 -->
          <div v-if="currentTab === 9" class="tab-content">
            <div class="feed-list">
              <div class="feed-item-large" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img"><img src="https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?q=80&w=600&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag" style="background:#FFECE8;color:#E34D59">饲养风险</span><span class="date">2026‑10‑27</span></div>
                  <h3>家庭宠物高危植物清单，家中绿植哪些对宠物有毒</h3>
                  <p>百合对猫咪剧毒；滴水观音、绿萝、万年青会口腔灼伤；很多网红室内绿植看着好看，啃咬后会造成严重中毒。</p>
                  <span class="read-more">阅读全文 →</span>
                </div>
              </div>
              <div class="feed-item-small" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img-small"><img src="https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=400&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag" style="background:#FFECE8;color:#E34D59">饲养风险</span><span class="date">2026‑10‑25</span></div>
                  <h4>仓鼠严禁合笼饲养，领地斗殴伤亡案例警示</h4>
                  <p>无论公母、兄弟姐妹，仓鼠都必须一鼠一笼。合笼大概率发生咬伤、互吃，不要抱有侥幸心理。</p>
                </div>
              </div>
              <div class="feed-item-small" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img-small"><img src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=400&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag" style="background:#FFECE8;color:#E34D59">饲养风险</span><span class="date">2026‑10‑22</span></div>
                  <h4>爬宠低温致死风险，冬天加热设备必须配温控器</h4>
                  <p>单纯加热垫不加温控，容易过热烫伤或者低温拒食；断电保温预案，冬季异宠家庭必备常识。</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab10：用品避坑 -->
          <div v-if="currentTab === 10" class="tab-content">
            <div class="feed-list">
              <div class="feed-item-large" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img"><img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=600&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag" style="background:#FFF9EC;color:#C27900">用品避坑</span><span class="date">2026‑10‑20</span></div>
                  <h3>宠物网购用品黑名单：这些网红爆款不要盲目购买</h3>
                  <p>带铃铛项圈、劣质猫薄荷玩具、松木木屑仓鼠垫料、无温控陶瓷加热灯，解析网红用品背后的安全隐患与替代方案。</p>
                  <span class="read-more">阅读全文 →</span>
                </div>
              </div>
              <div class="feed-item-small" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img-small"><img src="https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=400&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag" style="background:#FFF9EC;color:#C27900">用品避坑</span><span class="date">2026‑10‑18</span></div>
                  <h4>猫砂怎么选：各类猫砂优缺点以及粉尘危害</h4>
                  <p>粉尘过大猫砂会诱发猫咪呼吸道问题；膨润土、豆腐砂、矿砂各自适合的场景，幼猫要避开哪些猫砂。</p>
                </div>
              </div>
              <div class="feed-item-small" @click="openExternalNews('https://www.petfoodchina.com/')">
                <div class="feed-img-small"><img src="https://images.unsplash.com/photo-1602765591552-38e3a32d6f90?q=80&w=400&auto=format&fit=crop" alt="图" /></div>
                <div class="feed-info">
                  <div class="meta"><span class="tag" style="background:#FFF9EC;color:#C27900">用品避坑</span><span class="date">2026‑10‑15</span></div>
                  <h4>异宠笼舍选购避坑：亚克力笼、网笼的利弊</h4>
                  <p>亚克力笼子通风极差不适合仓鼠；爬宠箱要重视通风；笼子不是越大越好，要匹配对应物种习性。</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 分页器：全部11个tab都显示分页 -->
          <div class="pagination" v-if="[0,1,2,3,4,5,6,7,8,9,10].includes(currentTab)">
            <button class="page-btn disabled" disabled> 上一页 </button>
            <span class="page-info">第 <strong>1</strong> 页 / 共 1 页</span>
            <button class="page-btn" @click="handleNextPage">下一页 </button>
          </div>
        </div>
        <!-- 右侧：情报侧边栏 -->
        <div class="right-sidebar">
          <div class="sidebar-widget">
            <div class="widget-header"><h3>🔥 热门百科</h3></div>
            <div class="hot-list">
              <div class="hot-item" @click="openExternalNews('https://www.petfoodchina.com/')"><span class="hot-num num-1">01</span><p>新手异宠选购避坑，哪些品种不适合新手？</p></div>
              <div class="hot-item" @click="openExternalNews('https://www.petfoodchina.com/')"><span class="hot-num num-2">02</span><p>猫狗呕吐腹泻，哪些情况需要立刻送医？</p></div>
              <div class="hot-item" @click="openExternalNews('https://www.petfoodchina.com/')"><span class="hot-num num-3">03</span><p>爬宠温度湿度怎么设置，温控设备选购指南</p></div>
              <div class="hot-item" @click="openExternalNews('https://www.petfoodchina.com/')"><span class="hot-num">04</span><p>宠物家庭常见有毒植物清单，一定要远离</p></div>
            </div>
          </div>
          <div class="sidebar-widget">
            <div class="widget-header"><h3>🏷️ 热门标签</h3></div>
            <div class="tag-cloud">
              <span class="cloud-tag">仓鼠饲养</span>
              <span class="cloud-tag">守宫温控</span>
              <span class="cloud-tag">鹦鹉喂养</span>
              <span class="cloud-tag">老年宠物照护</span>
              <span class="cloud-tag">家兔牧草</span>
              <span class="cloud-tag">宠物中毒急救</span>
              <span class="cloud-tag">行为应激</span>
              <span class="cloud-tag">绝育护理</span>
              <span class="cloud-tag">爬宠法律</span>
            </div>
          </div>
          <div class="sidebar-widget subscribe-widget">
            <h3>📬 订阅养宠简报</h3>
            <p>获取猫狗小宠爬宠的养护知识推送。</p>
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '../components/Header.vue'
// currentTab下标 0~10
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
  showToastMsg('演示版本：已加载全部百科数据')
}
const openExternalNews = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

<style scoped>
/* ========== 大背景换成home_bg.jpg，和Home页面保持一致 ========== */
.news-page {
  min-height: 100vh;
  background-image: url('/home_bg.jpg');
  background-size: cover;
  background-attachment: fixed;
  background-color:rgba(253, 250, 245, 0.82);
  background-blend-mode: overlay;
  font-family: -apple-system, sans-serif;
  position: relative;
}
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 20px 80px;
}

/* ========== 顶部标题：使用胶条图片jiaotiao5.png ========== */
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
  margin-bottom:12px;
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

/* ========== 焦点大图卡片：手账虚线边框 ========== */
.featured-news {
  display: flex;
  background: #FFFDF9;
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0,0,0,0.04);
  border:3px dashed #D4A373;
  margin-bottom: 40px;
  transition: 0.3s;
}
.featured-news:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
  border-color:#5C3A21;
}
.featured-img-box {
  flex: 1.2;
  position: relative;
  overflow: hidden;
  height: 340px;
}
.featured-img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.5s;
}
.featured-news:hover img {
  transform: scale(1.05);
}
.featured-tag {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(92,58,33,0.75);
  color: #fff;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: bold;
  z-index: 2;
  backdrop-filter: blur(4px);
}
.featured-content {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.meta {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.tag {
  font-size: 12px;
  font-weight: bold;
  padding: 4px 10px;
  border-radius: 8px;
  background: #E8F3FF;
  color: #0052D9;
}
.tag.green {
  background: #E0F6E9;
  color: #3DBE7B;
}
.tag.purple {
  background: #F1EAFF;
  color: #9365FF;
}
.date {
  font-size: 13px;
  color: #8892A0;
}
.source {
  font-size: 13px;
  color: #B4B9C3;
}
.featured-content h2 {
  font-size: 24px;
  color: #1A2B4C;
  margin: 0 0 16px 0;
  line-height: 1.4;
  font-weight: 800;
}
.featured-content p {
  font-size: 15px;
  color: #5E6B82;
  line-height: 1.7;
  margin-bottom: 30px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.read-btn {
  align-self: flex-start;
  background: transparent;
  border: none;
  color: #D4A373;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  padding: 0;
  transition: 0.3s;
}
.read-btn:hover {
  letter-spacing: 1px;
  color:#5C3A21;
}

/* ========== tab导航【优化拥挤】缩小gap、缩小内边距，自动换行 ========== */
.sub-nav-container {
  display: flex;
  gap: 25px; /* 原来10px，缩小间隙 */
  margin-bottom: 30px;
  position: sticky;
  top: 80px;
  z-index: 100;
  flex-wrap: wrap;
}
.sub-nav-item {
  padding: 8px 12px; /* 缩小上下左右内边距，解决拥挤 */
  background: #fff;
  border-radius: 30px;
  font-size: 16px; /* 字号略微缩小 */
  font-weight: 600;
  color: #5E6B82;
  cursor: pointer;
  border:2px dashed #E6D0B3;
  transition: 0.3s;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
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
  box-shadow: 0 8px 20px rgba(92,58,33,0.25);
}

/* ========== 整体布局 ========== */
.content-layout {
  display: flex;
  gap: 30px;
  align-items: flex-start;
}
.left-feed {
  flex: 1;
  min-width: 0;
}
.right-sidebar {
  width: 320px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ========== feed列表卡片 ========== */
.feed-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.feed-item-large {
  display: flex;
  background: #FFFDF9;
  border-radius: 20px;
  padding: 20px;
  border:2px dashed #D4A373;
  cursor: pointer;
  transition: 0.3s;
  gap: 24px;
}
.feed-item-large:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.06);
  border-color:#5C3A21;
}
.feed-img {
  width: 240px;
  height: 160px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
}
.feed-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.5s;
}
.feed-item-large:hover .feed-img img {
  transform: scale(1.05);
}
.feed-info h3 {
  margin: 10px 0;
  font-size: 20px;
  color: #1A2B4C;
  font-weight: 700;
  line-height: 1.4;
}
.feed-info p {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: #5E6B82;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.read-more {
  font-size: 14px;
  color: #D4A373;
  font-weight: bold;
}
.feed-item-small {
  display: flex;
  background: #FFFDF9;
  border-radius: 20px;
  padding: 20px;
  border:2px dashed #D4A373;
  cursor: pointer;
  transition: 0.3s;
  gap: 20px;
}
.feed-item-small:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.06);
  border-color:#5C3A21;
}
.feed-img-small {
  width: 160px;
  height: 110px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
}
.feed-img-small img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.5s;
}
.feed-item-small:hover .feed-img-small img {
  transform: scale(1.05);
}
.feed-item-small h4 {
  margin: 8px 0;
  font-size: 17px;
  color: #1A2B4C;
  font-weight: 700;
  line-height: 1.5;
}
.feed-item-small p {
  margin: 0;
  font-size: 14px;
  color: #5E6B82;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ========== 分页器 ========== */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
}
.page-btn {
  background: #fff;
  border:2px dashed #D4A373;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  color: #5E6B82;
  font-weight: 500;
  transition: 0.3s;
}
.page-btn:hover {
  color: #5C3A21;
  border-color:#5C3A21;
}
.page-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.page-info {
  font-size: 14px;
  color: #8892A0;
}
.page-info strong {
  color: #5C3A21;
  font-size: 16px;
}

/* ========== 侧边栏 ========== */
.sidebar-widget {
  background: #FFFDF9;
  border-radius: 20px;
  padding: 24px;
  border:2px dashed #D4A373;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
}
.widget-header {
  margin-bottom: 20px;
}
.widget-header h3 {
  margin: 0;
  font-size: 18px;
  color: #1A2B4C;
}
.hot-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.hot-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  cursor: pointer;
  padding-bottom: 12px;
  border-bottom: 1px dashed #E6D0B3;
}
.hot-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.hot-item p {
  margin: 0;
  font-size: 14px;
  color: #5E6B82;
  line-height: 1.5;
  transition: color 0.3s;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.hot-item:hover p {
  color: #5C3A21;
}
.hot-num {
  font-size: 16px;
  font-weight: 900;
  color: #B4B9C3;
  font-family: monospace;
  flex-shrink: 0;
}
.hot-num.num-1 {
  color: #E34D59;
}
.hot-num.num-2 {
  color: #FF7D00;
}
.hot-num.num-3 {
  color: #FFB400;
}
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.cloud-tag {
  background: #FDFAF5;
  border:1px dashed #D4A373;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 13px;
  color: #5E6B82;
  cursor: pointer;
  transition: 0.3s;
}
.cloud-tag:hover {
  background: #F3E9DD;
  color: #5C3A21;
  border-color:#5C3A21;
}
.subscribe-widget {
  background: linear-gradient(135deg, #8C5E38 0%, #D4A373 100%);
  color: #fff;
  border: none;
  box-shadow: 0 10px 30px rgba(92,58,33,0.2);
}
.subscribe-widget h3 {
  color: #fff;
  margin: 0 0 10px 0;
  font-size: 18px;
}
.subscribe-widget p {
  font-size: 13px;
  opacity: 0.9;
  margin-bottom: 20px;
}
.subscribe-widget input {
  width: 100%;
  box-sizing: border-box;
  height: 44px;
  border-radius: 8px;
  border: none;
  padding: 0 16px;
  margin-bottom: 12px;
  outline: none;
}
.subscribe-widget button {
  width: 100%;
  height: 44px;
  border-radius: 8px;
  border: none;
  background: #1A2B4C;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}
.subscribe-widget button:hover {
  background: #000;
}

/* ========== Toast提示框 ========== */
.custom-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(29, 33, 41, 0.9);
  color: #fff;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 15px;
  z-index: 9999;
  backdrop-filter: blur(4px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translate(-50%, -40%);
}
</style>
