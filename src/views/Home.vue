<script setup>
import Header from '../components/Header.vue'
const showDemo = () => alert("演示：后续这里会跳转到完整的工作台报告页！")
</script>

<template>
  <div class="app-container">
    <Header />
    <div class="main-content">
      <div class="background-dog">
        <img src="/public/dog.jpg" alt="宠物背景" />
      </div>

      <div class="hero-section">
        <div class="tag">AI 驱动 · 宠物食品供应链审计引擎</div>
        <h1 class="main-title">别为营销买单<br>扒开宠物粮的底裤</h1>
        <p class="sub-title">
          依托<strong>国家部委公开许可数据</strong>与<strong>实时大宗农产品价格</strong>，构建成本反推模型。<br>
          AI 深度审计配料逻辑，拆穿虚假宣传，一键穿透代工厂。
        </p >

        <div class="action-panel">
          <div class="upload-box">
            <span class="plus-icon">+</span>
            <p>拖拽或点击上传配料表截图</p >
          </div>
          <div class="input-box">
            <span class="currency">￥</span>
            <input type="number" placeholder="输入售价 (元/斤)" />
          </div>
          <button class="audit-btn" @click="$router.push('/workspace')">启动深度审计</button>
        </div>
        
        <!-- 统一的提示条 -->
        <div class="hint-banner" @click="showDemo">
          💡 第一次使用？<span class="highlight">点击这里体验标准测试用例</span>
        </div>
      </div>

      <div class="guide-section">
        <div class="cards-container">
          <div class="guide-card">
            <div class="icon-bg icon-blue">📸</div>
            <h3>多模态配方提取</h3>
            <p>上传包装图，AI 自动提取配料表与粗蛋白、粗脂肪等关键指标。</p >
          </div>
          <div class="guide-card">
            <div class="icon-bg icon-cyan">⚖️</div>
            <h3>动态成本反推</h3>
            <p>结合今日全国农产品批发价与营养学公式，精准计算真实出厂成本。</p >
          </div>
          <div class="guide-card">
            <div class="icon-bg icon-purple">🕸️</div>
            <h3>供应链穿透图谱</h3>
            <p>联动国家工商数据，一键扒出背后代工厂，寻找极致同源平替。</p >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
body {
  margin: 0; padding: 0; background-color: #F4F6F9; 
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", Arial, sans-serif;
  color: #1D2129; overflow-x: hidden; 
}
.app-container { min-height: 100vh; position: relative; }
.main-content {
  max-width: 1100px; margin: 0 auto; padding: 140px 20px 80px; 
  position: relative; z-index: 10;
}

/* 狗狗背景 */
.background-dog {
  position: absolute; top: 120px; right: -50px;
  width: 600px; height: 600px; z-index: 1; pointer-events: none;
}
.background-dog img {
  width: 100%; height: 100%; object-fit: cover; border-radius: 50%; 
  opacity: 0.15; box-shadow: 0 0 100px 50px rgba(244, 246, 249, 0.9);
}

/* Hero */
.hero-section {
  display: flex; flex-direction: column; align-items: center;
  text-align: center; margin-bottom: 60px; position: relative; z-index: 5;
}
.tag {
  display: inline-block; color: #0052D9; border: 1px solid rgba(0, 82, 217, 0.2);
  padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: 500;
  margin-bottom: 24px; background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(4px);
}
.main-title {
  font-size: 56px; font-weight: 800; margin: 0 0 20px 0;
  line-height: 1.25; color: #1D2129; letter-spacing: 1px;
}
.sub-title { color: #4E5969; font-size: 18px; line-height: 1.7; margin-bottom: 50px; }

/* 操作面板 */
.action-panel {
  display: flex; align-items: center; background-color: #FFFFFF;
  border: 1px solid #E5E6EB; padding: 12px; border-radius: 16px;
  box-shadow: 0 12px 32px rgba(29, 33, 41, 0.08); gap: 12px;
}
.upload-box {
  display: flex; align-items: center; justify-content: center;
  width: 280px; height: 64px; border: 1px dashed #0052D9;
  border-radius: 10px; color: #0052D9; cursor: pointer;
  background: #F4F6F9; transition: all 0.3s;
}
.upload-box:hover { background: #E8F3FF; }
.upload-box p { margin: 0 0 0 10px; font-size: 15px; font-weight: 500; white-space: nowrap; }
.plus-icon { font-size: 20px; font-weight: bold; }
.input-box {
  display: flex; align-items: center; background-color: #F4F6F9;
  border: 1px solid #E5E6EB; border-radius: 10px;
  height: 64px; padding: 0 20px; width: 220px;
}
.currency { color: #86909C; font-size: 18px; margin-right: 8px; }
.input-box input { background: transparent; border: none; color: #1D2129; font-size: 16px; outline: none; width: 100%; }
.audit-btn {
  height: 64px; padding: 0 36px; background: #0052D9; color: #FFFFFF;
  font-size: 18px; font-weight: 600; border: none; border-radius: 10px;
  cursor: pointer; white-space: nowrap; transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(0, 82, 217, 0.3);
}
.audit-btn:hover { background: #0043B2; transform: translateY(-2px); }

/* 提示条 */
.hint-banner {
  margin-top: 24px; background-color: #E8F3FF; color: #4E5969;
  padding: 12px 24px; border-radius: 8px; font-size: 14px; cursor: pointer;
  display: inline-block; transition: all 0.3s; border: 1px solid rgba(0, 82, 217, 0.1);
}
.hint-banner:hover { background-color: #D4E8FF; }
.hint-banner .highlight { color: #0052D9; font-weight: bold; text-decoration: underline; }

/* 底部卡片 */
.guide-section { margin-top: 40px; padding-top: 40px; border-top: 1px solid #E5E6EB; }
.cards-container { display: flex; gap: 24px; }
.guide-card {
  flex: 1; background: #FFFFFF; border: 1px solid #E5E6EB; padding: 30px;
  border-radius: 16px; transition: all 0.3s; box-shadow: 0 4px 12px rgba(0,0,0,0.02);
  text-align: left; cursor: pointer; position: relative;
}
.guide-card:hover {
  border-color: #0052D9; transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0, 82, 217, 0.08);
}
.guide-card:hover::after {
  content: '→'; position: absolute; bottom: 20px; right: 20px;
  color: #0052D9; font-weight: bold;
}
.icon-bg {
  display: inline-flex; align-items: center; justify-content: center;
  width: 48px; height: 48px; border-radius: 12px; font-size: 24px; margin-bottom: 20px;
}
.icon-blue { background: #E8F3FF; }
.icon-cyan { background: #E6FFFB; }
.icon-purple { background: #F5E8FF; }
.guide-card h3 { color: #1D2129; font-size: 18px; font-weight: bold; margin: 0 0 12px 0; }
.guide-card p { color: #4E5969; font-size: 14px; line-height: 1.6; margin: 0; }
</style>