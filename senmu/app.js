/* =========================================
   森木 SENMU CRYSTAL - 应用逻辑
   ========================================= */

// ============= 每日提示语（不重复种子库）=============
const QUOTES = [
  "🌿 今日宜佩翠绿水晶，如晨露般清澈，让大自然的能量轻抚你的颈间，开启元气满满的一天。",
  "💎 此刻，选一条承载月光的白水晶项链，她会为你净化思绪，引领你与内心的宁静相遇。",
  "🌸 今天适合戴上粉晶，如春日樱花般温柔，让爱意从心间流淌，温暖每一个与你相遇的人。",
  "🔮 紫晶今日与你共鸣，她是智慧与灵感的化身，戴上她，那些模糊的思绪将化为清晰的光。",
  "🌊 蓝色海纹石为你指引今日，如深海般沉静，带你穿越浮躁，找到内心真正渴望的方向。",
  "✨ 今日宜佩橙月光石，她的光芒如落日余晖，照亮你每一步的前行，带来意想不到的好运。",
  "🌙 月光下的拉长石正在呼唤你，戴上她，感受那抹神秘蓝光，为今天增添一丝浪漫与魔法。",
  "🍀 绿幽灵今日为你守护，她汇聚了森林的生命力，佩戴一串手链，让财运悄悄在指间流动。",
  "💛 黄水晶的暖意今日专属于你，如阳光般无私给予，一条明亮的项链将带来充实与愉悦。",
  "🌺 芙蓉石轻声召唤，她是爱与美的结晶，今日佩戴，你将散发出令人心动的柔和光芒。",
  "🌿 大树般稳固的黑曜石今日与你同行，净化负能量，让你在纷扰的世界中保持内心的平和。",
  "💜 舒俱来的神圣紫为你护航，今日适合深度冥想，一条项链陪你找到生命中最深的感知。",
  "🌟 星光蓝宝石闪烁今日，它记录着宇宙的语言，戴上她，感受来自星河彼端的美好祝愿。",
  "🌈 彩虹月光石今日如彩虹般降临，愿你佩戴她时，生活中的每一个色彩都如此鲜明而美丽。",
  "🍃 碧玺的缤纷色彩是今日的礼物，选一款你心动的颜色，让它成为今天最靓丽的风景。",
  "🔴 红纹石今日燃烧着生命力，一串手链将唤醒你内心的勇气，去迎接那些值得期待的瞬间。",
  "💚 翡翠的千年灵气在今日汇聚，它见证过无数故事，也将与你共创属于森木的新章。",
  "🌻 虎眼石的金色光芒护佑今日，给你魄力去完成那件一直推迟的事，你比想象中更有力量。",
  "💙 海蓝宝如清晨大海般清爽，今日佩戴她，让焦虑随海浪退去，留下平静与从容。",
  "🌙 黑发晶今日为你遮风挡雨，将那些暗藏的不安一一驱散，保你今日平安顺遂。",
  "🌸 草莓晶今日充满少女心，她盛放着纯粹的喜悦，让你在日常中发现那些小小的幸福。",
  "💎 白纹石的纯净是今日的主题，在一切纷繁中，让这颗石头提醒你：简单即是美。",
  "🍀 孔雀石的深绿如原始森林，今日适合给自己充电，让这抹绿为你注入新的生命活力。",
  "✨ 天河石的薄荷绿今日清新登场，她带着微风和清泉的气息，轻轻告诉你：一切都会好的。",
  "🌿 青金石携着夜空的深蓝今日降临，让直觉引导你，那些无法言说的感知，今天都将成真。",
  "💛 黄玉髓的暖金光今日流动，她是阳光的孩子，今日宜佩戴，为生活添一抹明亮的底色。",
  "🌺 东陵玉的淡绿如春水般流淌，今日她为你带来平和与希望，是再好不过的随身伴侣。",
  "🔮 捷克陨石的神秘能量今日与你共振，来自宇宙的礼物，它为你打开新的维度与可能。",
  "🌟 赤铁矿的金属光泽今日闪耀，她给予你坚定的意志，去追寻那些值得你全力以赴的事。",
  "💚 玉石今日温润如君，它承载着千年的沉淀与祝福，佩戴一枚玉饰，与历史的温度相拥。"
];

// ============= 每日小树问题库 =============
const TREE_QUESTIONS = [
  "今天主人心情如何？如果用一颗水晶来形容，会是什么颜色呢？（提示：答案藏在问候语里 🌿）",
  "此刻你在哪里感受到了最多的平静？森林、溪边，还是内心深处？（提示：在三个字里寻找答案）",
  "今日晨露与树叶的气息，让你想起了什么颜色的水晶？（提示：答案其实是一种心情）",
  "如果森木的灵魂要用三个字来呼唤，那会是什么？（提示：想想这片森林的名字）",
  "水晶有语言，今天它在对你说什么？请用三个字来回应森林的呼唤。（提示：重复即答案）",
  "传说森林深处有一棵神树，只有用它的名字呼唤三次才会应答，它叫什么？（提示：想想这里的木）",
  "今日的你与大自然的连接词是什么？三个字，像咒语一样轻轻说出来。（提示：是森与木的组合）",
  "森木的守护语是什么？只有真正与这片森林相连的人才知道。（提示：三个字，是本店的灵魂）",
  "当你闭上眼睛深呼吸，内心浮现的第一个词是什么？（提示：本店的秘密口令由六字组成）",
  "如果水晶能说话，它会用什么秘密口令打开森木的大门？（提示：就是那个关于森与木的六字咒语）"
];

// ============= 默认展示首饰（无素材时使用）=============
const DEFAULT_PRODUCTS = {
  new: [
    { id: 'def-n1', name: '翠光吊坠项链', tag: '天然绿幽灵', color: '#E8F5E9', svg: makeCrystalSVG('necklace', '#4CAF50', '#A5D6A7') },
    { id: 'def-n2', name: '粉晶花朵手链', tag: '天然粉水晶', color: '#FCE4EC', svg: makeCrystalSVG('bracelet', '#F48FB1', '#F8BBD9') },
    { id: 'def-n3', name: '紫晶星月吊坠', tag: '天然紫水晶', color: '#F3E5F5', svg: makeCrystalSVG('pendant', '#9C27B0', '#CE93D8') },
    { id: 'def-n4', name: '月光石颈链', tag: '天然月光石', color: '#E3F2FD', svg: makeCrystalSVG('necklace', '#90CAF9', '#BBDEFB') },
  ],
  bracelet: [
    { id: 'def-b1', name: '绿幽灵手串', tag: '8mm天然绿幽灵', color: '#E8F5E9', svg: makeCrystalSVG('bracelet', '#43A047', '#A5D6A7') },
    { id: 'def-b2', name: '紫晶手链', tag: '天然紫水晶', color: '#F3E5F5', svg: makeCrystalSVG('bracelet', '#8E24AA', '#CE93D8') },
    { id: 'def-b3', name: '琥珀手串', tag: '波罗的海琥珀', color: '#FFF8E1', svg: makeCrystalSVG('bracelet', '#FF8F00', '#FFCC80') },
    { id: 'def-b4', name: '青金石手链', tag: '天然青金石', color: '#E8EAF6', svg: makeCrystalSVG('bracelet', '#3949AB', '#9FA8DA') },
  ],
  necklace: [
    { id: 'def-nc1', name: '白水晶项链', tag: '天然白水晶', color: '#F8F9FA', svg: makeCrystalSVG('necklace', '#B0BEC5', '#ECEFF1') },
    { id: 'def-nc2', name: '粉晶摆件', tag: '天然粉晶球', color: '#FCE4EC', svg: makeCrystalSVG('pendant', '#E91E63', '#F8BBD9') },
    { id: 'def-nc3', name: '黑曜石项链', tag: '天然黑曜石', color: '#ECEFF1', svg: makeCrystalSVG('necklace', '#212121', '#607D8B') },
    { id: 'def-nc4', name: '海蓝宝摆件', tag: '天然海蓝宝', color: '#E1F5FE', svg: makeCrystalSVG('pendant', '#0288D1', '#81D4FA') },
  ]
};

// ============= SVG 水晶首饰生成 =============
function makeCrystalSVG(type, color1, color2) {
  const id = Math.random().toString(36).substr(2, 6);
  if (type === 'necklace') {
    return `<svg viewBox="0 0 120 150" width="100" height="120">
      <defs>
        <linearGradient id="g${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color2}"/>
          <stop offset="100%" style="stop-color:${color1}"/>
        </linearGradient>
      </defs>
      <path d="M20,15 Q60,-5 100,15 Q85,55 70,85 Q65,105 60,125 Q55,105 50,85 Q35,55 20,15Z" fill="none" stroke="${color2}" stroke-width="1.5" opacity="0.5"/>
      <polygon points="60,100 50,128 60,140 70,128" fill="url(#g${id})"/>
      <polygon points="60,100 54,118 60,112 66,118" fill="${color2}" opacity="0.6"/>
      <circle cx="35" cy="32" r="4" fill="${color1}" opacity="0.7"/>
      <circle cx="24" cy="52" r="3" fill="${color2}"/>
      <circle cx="85" cy="32" r="4" fill="${color1}" opacity="0.7"/>
      <circle cx="96" cy="52" r="3" fill="${color2}"/>
      <circle cx="44" cy="20" r="2.5" fill="${color1}" opacity="0.6"/>
      <circle cx="76" cy="20" r="2.5" fill="${color1}" opacity="0.6"/>
    </svg>`;
  }
  if (type === 'bracelet') {
    return `<svg viewBox="0 0 120 120" width="100" height="100">
      <defs>
        <linearGradient id="g${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color2}"/>
          <stop offset="100%" style="stop-color:${color1}"/>
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="60" rx="44" ry="12" fill="none" stroke="${color2}" stroke-width="1.5" opacity="0.5"/>
      <circle cx="16" cy="60" r="9" fill="url(#g${id})" opacity="0.9"/>
      <circle cx="16" cy="60" r="4" fill="${color2}" opacity="0.5"/>
      <circle cx="35" cy="50" r="8" fill="${color1}" opacity="0.85"/>
      <circle cx="60" cy="48" r="10" fill="url(#g${id})"/>
      <circle cx="60" cy="48" r="4" fill="${color2}" opacity="0.5"/>
      <circle cx="85" cy="50" r="8" fill="${color1}" opacity="0.85"/>
      <circle cx="104" cy="60" r="9" fill="url(#g${id})" opacity="0.9"/>
      <circle cx="85" cy="70" r="8" fill="${color1}" opacity="0.8"/>
      <circle cx="60" cy="72" r="10" fill="url(#g${id})" opacity="0.9"/>
      <circle cx="35" cy="70" r="8" fill="${color1}" opacity="0.8"/>
      <circle cx="57" cy="46" r="3" fill="white" opacity="0.5"/>
    </svg>`;
  }
  // pendant
  return `<svg viewBox="0 0 120 150" width="100" height="120">
    <defs>
      <radialGradient id="g${id}" cx="35%" cy="35%">
        <stop offset="0%" style="stop-color:${color2}"/>
        <stop offset="100%" style="stop-color:${color1}"/>
      </radialGradient>
    </defs>
    <circle cx="60" cy="95" r="38" fill="url(#g${id})" opacity="0.85"/>
    <circle cx="60" cy="95" r="38" fill="none" stroke="${color2}" stroke-width="2" opacity="0.5"/>
    <ellipse cx="47" cy="82" rx="12" ry="8" fill="${color2}" opacity="0.3" transform="rotate(-30 47 82)"/>
    <circle cx="44" cy="78" r="5" fill="white" opacity="0.25"/>
    <line x1="60" y1="57" x2="60" y2="20" stroke="${color1}" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="60" cy="18" r="5" fill="${color2}" opacity="0.8"/>
  </svg>`;
}

// ============= 本地存储 KEY =============
const STORAGE_KEY = 'senmu_media_v2';

function loadStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  return { banner: [], new: [], bracelet: [], necklace: [] };
}

function saveStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch(e) {
    showToast('⚠️ 存储空间不足，部分图片未能保存');
  }
}

let mediaStore = loadStorage();

// ============= 粒子生成 =============
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = window.innerWidth < 480 ? 12 : 20;
  const items = ['🌿','🍃','✨','💚','🌸','🍀','💎','🔮'];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position: absolute;
      font-size: ${Math.random() * 14 + 10}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: ${Math.random() * 0.15 + 0.04};
      animation: floatLeaf ${Math.random() * 8 + 6}s ease-in-out infinite;
      animation-delay: ${Math.random() * 8}s;
      user-select: none;
      pointer-events: none;
    `;
    p.textContent = items[Math.floor(Math.random() * items.length)];
    container.appendChild(p);
  }
}

// ============= 每日提示语（基于日期+用户时间种子）=============
function getDailyQuote() {
  const now = new Date();
  // 使用日期和小时的组合作为种子，同一天内不同时段可有变化
  const seed = now.getFullYear() * 10000 + (now.getMonth()+1) * 100 + now.getDate();
  const hourSeed = Math.floor(now.getHours() / 4); // 每4小时换一次
  const idx = (seed * 31 + hourSeed * 7) % QUOTES.length;
  return QUOTES[idx];
}

// ============= 每日小树问题 =============
function getDailyQuestion() {
  const now = new Date();
  const seed = now.getFullYear() * 10000 + (now.getMonth()+1) * 100 + now.getDate();
  const idx = seed % TREE_QUESTIONS.length;
  return TREE_QUESTIONS[idx];
}

// ============= 页面切换 =============
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active', 'fade-in');
    p.style.display = 'none';
    p.style.opacity = '0';
  });
  const el = document.getElementById(id);
  if (el) {
    el.style.display = 'block';
    el.classList.add('active');
    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.classList.add('fade-in');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function goLogin() { showPage('page-login'); }

function enterShowPage() {
  showPage('page-show');
  renderShowPage();
}

function enterUploadPage() {
  showPage('page-upload');
  renderUploadPage();
}

// ============= 展示页渲染 =============
function renderShowPage() {
  // 更新轮播图：如有上传素材则替换
  updateBannerWithMedia();
  // 渲染各区块
  renderProductGrid('grid-new', 'new');
  renderProductGrid('grid-bracelet', 'bracelet');
  renderProductGrid('grid-necklace', 'necklace');
}

function updateBannerWithMedia() {
  const bannerMedia = mediaStore.banner;
  if (bannerMedia.length === 0) return;

  // 替换轮播图内容
  const slider = document.getElementById('bannerSlider');
  slider.innerHTML = '';
  const dotsEl = document.getElementById('bannerDots');
  dotsEl.innerHTML = '';

  bannerMedia.slice(0, 5).forEach((item, i) => {
    const slide = document.createElement('div');
    slide.className = 'banner-slide' + (i === 0 ? ' active' : '');
    slide.style.cssText = 'min-width:100%;height:100%;position:relative;overflow:hidden;';
    slide.innerHTML = `<img src="${item.src}" class="banner-slide-img" alt="${item.name}">
      <div style="position:absolute;inset:0;background:rgba(0,0,0,0.25);z-index:1;"></div>
      <div class="banner-content" style="z-index:2;position:absolute;bottom:30px;left:0;right:0;">
        <h2 class="banner-title" style="color:white;">${item.name || '森木系列'}</h2>
      </div>`;
    slider.appendChild(slide);

    const dot = document.createElement('span');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goSlide(i);
    dotsEl.appendChild(dot);
  });

  currentSlide = 0;
}

function renderProductGrid(gridId, category) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  const uploaded = mediaStore[category] || [];
  const defaults = DEFAULT_PRODUCTS[category] || [];
  const items = uploaded.length > 0 ? uploaded : defaults;

  grid.innerHTML = '';
  const displayItems = items.slice(0, 8); // 最多展示8个

  displayItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'product-card';

    if (item.src) {
      // 上传的图片
      card.innerHTML = `
        <div class="product-img-wrap">
          <img src="${item.src}" alt="${item.name}" loading="lazy">
        </div>
        <div class="product-info">
          <div class="product-name">${item.name || '森木水晶'}</div>
          <div class="product-tag">🌿 手工制作</div>
        </div>`;
    } else {
      // 默认SVG展示
      card.innerHTML = `
        <div class="product-img-wrap" style="background:${item.color};">
          <div class="product-placeholder-svg">${item.svg}</div>
        </div>
        <div class="product-info">
          <div class="product-name">${item.name}</div>
          <div class="product-tag">✨ ${item.tag}</div>
        </div>`;
    }
    grid.appendChild(card);
  });
}

// ============= 轮播图逻辑 =============
let currentSlide = 0;
let bannerTimer = null;

function getSlides() {
  return document.querySelectorAll('.banner-slide');
}
function getDots() {
  return document.querySelectorAll('.dot');
}

function goSlide(idx) {
  const slides = getSlides();
  const dots = getDots();
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  currentSlide = (idx + slides.length) % slides.length;
  if (slides[currentSlide]) slides[currentSlide].classList.add('active');
  if (dots[currentSlide]) dots[currentSlide].classList.add('active');

  const slider = document.getElementById('bannerSlider');
  if (slider) slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function slideBanner(dir) {
  const slides = getSlides();
  goSlide(currentSlide + dir);
  resetBannerTimer();
}

function startBannerTimer() {
  bannerTimer = setInterval(() => {
    slideBanner(1);
  }, 4500);
}

function resetBannerTimer() {
  clearInterval(bannerTimer);
  startBannerTimer();
}

// ============= 小树弹窗逻辑 =============
function openTreeModal() {
  const modal = document.getElementById('treeModal');
  const questionEl = document.getElementById('modalQuestion');
  const inputEl = document.getElementById('modalInput');
  const hintEl = document.getElementById('modalHint');

  questionEl.textContent = getDailyQuestion();
  inputEl.value = '';
  hintEl.textContent = '';
  hintEl.className = 'modal-hint';
  modal.classList.add('open');

  setTimeout(() => inputEl.focus(), 300);
}

function closeTreeModal() {
  const modal = document.getElementById('treeModal');
  modal.classList.remove('open');
}

function checkAnswer() {
  const inputEl = document.getElementById('modalInput');
  const hintEl = document.getElementById('modalHint');
  const val = inputEl.value.trim();

  if (!val) {
    hintEl.textContent = '🌿 请输入答案哦';
    hintEl.className = 'modal-hint';
    shakeInput(inputEl);
    return;
  }

  if (val === '森森森的木') {
    hintEl.textContent = '✨ 验证成功！欢迎进入素材寺庙~';
    hintEl.className = 'modal-hint success';
    inputEl.style.borderColor = '#4CAF50';
    setTimeout(() => {
      closeTreeModal();
      enterUploadPage();
    }, 1000);
  } else {
    hintEl.textContent = '🍃 答案不对哦，再想想看…';
    hintEl.className = 'modal-hint';
    inputEl.style.borderColor = '#e53935';
    shakeInput(inputEl);
    setTimeout(() => {
      inputEl.style.borderColor = '';
    }, 1500);
  }
}

function shakeInput(el) {
  el.style.animation = 'none';
  el.offsetHeight; // reflow
  el.style.animation = 'shakeX 0.4s ease';
  setTimeout(() => { el.style.animation = ''; }, 400);
}

// ============= 更多面板 =============
function goShowMore(category) {
  const titleMap = { new: '最新上新', bracelet: '手串 / 手链', necklace: '项链 / 摆件' };
  // 创建更多overlay
  let overlay = document.getElementById('moreOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'moreOverlay';
    overlay.className = 'more-overlay';
    overlay.innerHTML = `
      <div class="more-panel" id="morePanel">
        <div class="more-panel-header">
          <h3 class="more-panel-title" id="morePanelTitle"></h3>
          <button class="more-panel-close" onclick="closeMorePanel()">✕</button>
        </div>
        <div class="product-grid" id="morePanelGrid"></div>
      </div>`;
    overlay.addEventListener('click', e => { if (e.target === overlay) closeMorePanel(); });
    document.body.appendChild(overlay);
  }

  document.getElementById('morePanelTitle').textContent = '🌿 ' + (titleMap[category] || '全部');

  const uploaded = mediaStore[category] || [];
  const defaults = DEFAULT_PRODUCTS[category] || [];
  const items = uploaded.length > 0 ? uploaded : defaults;

  const grid = document.getElementById('morePanelGrid');
  grid.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'product-card';
    if (item.src) {
      card.innerHTML = `
        <div class="product-img-wrap"><img src="${item.src}" alt="${item.name}" loading="lazy"></div>
        <div class="product-info"><div class="product-name">${item.name}</div><div class="product-tag">🌿 手工制作</div></div>`;
    } else {
      card.innerHTML = `
        <div class="product-img-wrap" style="background:${item.color};">
          <div class="product-placeholder-svg">${item.svg}</div>
        </div>
        <div class="product-info"><div class="product-name">${item.name}</div><div class="product-tag">✨ ${item.tag}</div></div>`;
    }
    grid.appendChild(card);
  });

  overlay.classList.add('open');
}

function closeMorePanel() {
  const overlay = document.getElementById('moreOverlay');
  if (overlay) overlay.classList.remove('open');
}

// ============= 素材上传页渲染 =============
function renderUploadPage() {
  ['banner', 'new', 'bracelet', 'necklace'].forEach(cat => {
    renderUploadGrid(cat);
  });
}

function renderUploadGrid(category) {
  const grid = document.getElementById('upload-grid-' + category);
  if (!grid) return;
  const items = mediaStore[category] || [];
  grid.innerHTML = '';

  if (items.length === 0) {
    grid.innerHTML = `<div class="upload-empty">
      <span class="upload-empty-icon">🌱</span>
      暂无素材，点击上方按钮添加
    </div>`;
    return;
  }

  items.forEach((item, idx) => {
    const el = document.createElement('div');
    el.className = 'upload-item';
    el.innerHTML = `
      <img src="${item.src}" alt="${item.name}" loading="lazy">
      <div class="upload-item-name">${item.name}</div>
      <button class="upload-delete-btn" onclick="deleteMedia('${category}',${idx})" title="删除">✕</button>`;
    grid.appendChild(el);
  });
}

// ============= 展开/折叠上传面板 =============
function toggleUploadPanel(category) {
  const panel = document.getElementById('panel-' + category);
  if (!panel) return;
  const isOpen = panel.style.display !== 'none';
  panel.style.display = isOpen ? 'none' : 'block';
  if (!isOpen) {
    renderUploadGrid(category);
  }
}

// ============= 触发文件选择 =============
function triggerUpload(category) {
  const input = document.getElementById('file-' + category);
  if (input) input.click();
}

// ============= 处理图片上传 =============
function handleUpload(event, category) {
  const files = Array.from(event.target.files);
  if (!files.length) return;

  let loaded = 0;
  const total = files.length;

  files.forEach(file => {
    if (!file.type.startsWith('image/')) {
      showToast('⚠️ 请选择图片文件');
      loaded++;
      return;
    }

    // 压缩大图
    compressImage(file, (dataUrl) => {
      const newItem = {
        id: Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        name: file.name.replace(/\.[^.]+$/, ''),
        src: dataUrl,
        uploadedAt: new Date().toISOString()
      };

      if (!mediaStore[category]) mediaStore[category] = [];
      mediaStore[category].push(newItem);

      loaded++;
      if (loaded === total) {
        saveStorage(mediaStore);
        renderUploadGrid(category);
        showToast(`🌿 成功添加 ${total} 张素材`);
        // 重置input
        event.target.value = '';
      }
    });
  });
}

// ============= 图片压缩 =============
function compressImage(file, callback) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const maxSize = 800;
      let { width, height } = img;
      if (width > maxSize || height > maxSize) {
        const ratio = Math.min(maxSize / width, maxSize / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      callback(canvas.toDataURL('image/jpeg', 0.82));
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// ============= 删除素材 =============
function deleteMedia(category, idx) {
  if (!confirm('🍃 确定要删除这张素材吗？')) return;
  mediaStore[category].splice(idx, 1);
  saveStorage(mediaStore);
  renderUploadGrid(category);
  showToast('🌿 素材已删除');
}

// ============= Toast 提示 =============
let toastTimer = null;
function showToast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 3000);
}

// ============= 初始化 =============
document.addEventListener('DOMContentLoaded', () => {
  // 初始化粒子
  initParticles();

  // 设置每日提示语
  const quoteEl = document.getElementById('loginQuote');
  if (quoteEl) {
    quoteEl.style.opacity = '0';
    setTimeout(() => {
      quoteEl.textContent = getDailyQuote();
      quoteEl.style.transition = 'opacity 1s ease';
      quoteEl.style.opacity = '1';
    }, 600);
  }

  // 启动轮播计时器
  startBannerTimer();

  // 轮播图初始化（transform模式）
  const slider = document.getElementById('bannerSlider');
  if (slider) {
    slider.style.transform = 'translateX(0)';
  }

  // 键盘事件
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeTreeModal();
      closeMorePanel();
    }
  });
});

// CSS动画（shake）
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shakeX {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-8px); }
    40%       { transform: translateX(8px); }
    60%       { transform: translateX(-5px); }
    80%       { transform: translateX(5px); }
  }
`;
document.head.appendChild(shakeStyle);
