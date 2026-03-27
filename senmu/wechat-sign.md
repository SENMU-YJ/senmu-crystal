# 🌲 森木 · 微信公众号分享接入完整指南

## 整体流程图

```
用户手机打开页面
      ↓
前端请求你的后端签名接口 /api/wechat/sign?url=xxx
      ↓
后端用 AppID + AppSecret 换 access_token → jsapi_ticket → 生成 signature
      ↓
前端拿到签名调用 wx.config(...)
      ↓
wx.ready → 配置分享卡片（标题/图片/链接）
      ↓
用户点击右上角"..." → 分享给朋友 / 分享到朋友圈
      ↓
好友看到：「欢迎来到森木的宇宙寺庙 🌲」封面卡片，点击可打开页面 ✅
```

---

## 第一步：公众号后台配置

1. 登录 [微信公众平台](https://mp.weixin.qq.com)
2. **设置网页授权域名**：
   - 左侧菜单 → 设置与开发 → 公众号设置 → 功能设置
   - "网页授权域名" 填入你的域名（不带 http://），如：`www.senmu-crystal.com`
3. **获取 AppID 和 AppSecret**：
   - 左侧菜单 → 设置与开发 → 基本配置
   - 记录 AppID（开发者ID）和 AppSecret（开发者密码）
4. **配置 JS 接口安全域名**：
   - 左侧菜单 → 设置与开发 → 公众号设置 → 功能设置
   - "JS接口安全域名" 也填入你的域名

---

## 第二步：后端签名接口（Node.js 版）

### 安装依赖

```bash
npm install express axios crypto node-cache cors
```

### 完整代码 `server.js`

```javascript
const express = require('express');
const axios   = require('axios');
const crypto  = require('crypto');
const NodeCache = require('node-cache');
const cors    = require('cors');

const app   = express();
const cache = new NodeCache({ stdTTL: 6000 }); // 缓存 100 分钟

// ⬇ 替换为你的公众号信息
const APPID     = '你的AppID';
const APPSECRET = '你的AppSecret';

app.use(cors()); // 允许跨域（如前后端不同域名需要）
app.use(express.static('.')); // 同时托管前端静态文件

// 获取 access_token（有效期2小时，需缓存）
async function getAccessToken() {
  const cached = cache.get('access_token');
  if (cached) return cached;

  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`;
  const res  = await axios.get(url);
  const token = res.data.access_token;

  cache.set('access_token', token, 7000); // 提前失效避免边界问题
  return token;
}

// 获取 jsapi_ticket（有效期2小时，需缓存）
async function getJsapiTicket() {
  const cached = cache.get('jsapi_ticket');
  if (cached) return cached;

  const token  = await getAccessToken();
  const url    = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`;
  const res    = await axios.get(url);
  const ticket = res.data.ticket;

  cache.set('jsapi_ticket', ticket, 7000);
  return ticket;
}

// 签名接口 GET /api/wechat/sign?url=当前页面URL
app.get('/api/wechat/sign', async (req, res) => {
  try {
    const url       = decodeURIComponent(req.query.url || '');
    const ticket    = await getJsapiTicket();
    const timestamp = Math.floor(Date.now() / 1000);
    const nonceStr  = Math.random().toString(36).substring(2, 17);

    // 按字典序拼接签名字符串（固定格式，不能改顺序）
    const signStr = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`;
    const signature = crypto.createHash('sha1').update(signStr).digest('hex');

    res.json({
      appId:     APPID,
      timestamp: timestamp,
      nonceStr:  nonceStr,
      signature: signature,
    });
  } catch (err) {
    console.error('签名失败:', err.message);
    res.status(500).json({ error: '签名失败', detail: err.message });
  }
});

app.listen(3000, () => {
  console.log('森木签名服务已启动：http://localhost:3000');
});
```

### 运行

```bash
node server.js
```

---

## 第二步（PHP 版）：如果你的服务器是 PHP

```php
<?php
// sign.php - 放在你的服务器上，访问 /sign.php?url=xxx

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$appId     = '你的AppID';
$appSecret = '你的AppSecret';

// 缓存文件路径
$tokenCache  = sys_get_temp_dir() . '/wx_access_token.json';
$ticketCache = sys_get_temp_dir() . '/wx_jsapi_ticket.json';

function getCache($file) {
    if (!file_exists($file)) return null;
    $data = json_decode(file_get_contents($file), true);
    if ($data && $data['expires'] > time()) return $data['value'];
    return null;
}
function setCache($file, $value, $ttl = 7000) {
    file_put_contents($file, json_encode(['value' => $value, 'expires' => time() + $ttl]));
}

// 获取 access_token
function getAccessToken($appId, $appSecret, $tokenCache) {
    $cached = getCache($tokenCache);
    if ($cached) return $cached;
    $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={$appId}&secret={$appSecret}";
    $res = json_decode(file_get_contents($url), true);
    setCache($tokenCache, $res['access_token']);
    return $res['access_token'];
}

// 获取 jsapi_ticket
function getJsapiTicket($appId, $appSecret, $tokenCache, $ticketCache) {
    $cached = getCache($ticketCache);
    if ($cached) return $cached;
    $token = getAccessToken($appId, $appSecret, $tokenCache);
    $url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token={$token}&type=jsapi";
    $res = json_decode(file_get_contents($url), true);
    setCache($ticketCache, $res['ticket']);
    return $res['ticket'];
}

$url       = urldecode($_GET['url'] ?? '');
$ticket    = getJsapiTicket($appId, $appSecret, $tokenCache, $ticketCache);
$timestamp = time();
$nonceStr  = substr(md5(uniqid()), 0, 15);

$signStr   = "jsapi_ticket={$ticket}&noncestr={$nonceStr}&timestamp={$timestamp}&url={$url}";
$signature = sha1($signStr);

echo json_encode([
    'appId'     => $appId,
    'timestamp' => $timestamp,
    'nonceStr'  => $nonceStr,
    'signature' => $signature,
]);
```

---

## 第三步：上传封面图

1. 打开 `share-cover.html` 文件（浏览器中预览）
2. 使用浏览器截图工具截取 400×400 的封面区域
3. 保存为 `share-cover.png`
4. 上传到你服务器的 `/senmu/share-cover.png` 路径
5. 在 `index.html` 中把 `SHARE_COVER_URL` 替换为完整URL

---

## 第四步：修改 index.html 中的配置

打开 `index.html`，找到 `WECHAT_CONFIG` 对象，替换以下内容：

```javascript
const WECHAT_CONFIG = {
  SIGN_API_URL:     'https://www.你的域名.com/api/wechat/sign',  // ← Node.js
  // 或 PHP 版：'https://www.你的域名.com/sign.php'
  
  SHARE_COVER_URL:  'https://www.你的域名.com/senmu/share-cover.png',
  SHARE_TITLE:      '欢迎来到森木的宇宙寺庙 🌲',
  SHARE_DESC:       '新中式水晶首饰 · 来自大自然的能量馈赠',
  SHARE_LINK:       window.location.href.split('#')[0],
};
```

---

## 测试验证

1. 用手机微信打开你的页面URL
2. 点右上角「…」→「分享给朋友」→ 看到卡片标题和封面图 ✅
3. 点右上角「…」→「分享到朋友圈」→ 看到标题和封面图 ✅
4. 别人点卡片 → 跳转到森木页面 ✅

---

## 常见问题

| 问题 | 原因 | 解决 |
|------|------|------|
| config:invalid signature | URL不匹配 | 确保签名的URL和当前页面URL完全一致（含参数） |
| config:invalid url domain | 域名未配置 | 在公众号后台配置JS接口安全域名 |
| 图片不显示 | 图片URL不可访问 | 确保图片URL能被外网访问 |
| 本地测试无效 | 必须用线上域名 | JS-SDK只在已配置的域名下有效 |

---

## 文件清单

```
senmu/
├── index.html          ← 主页面（已集成JS-SDK代码）
├── styles.css          ← 样式
├── app.js              ← 交互逻辑
├── share-cover.html    ← 封面图预览（截图后保存为 share-cover.png）
├── share-cover.png     ← 封面图（截图后手动创建）
├── server.js           ← Node.js 后端签名服务（按需使用）
└── wechat-sign.md      ← 本文档
```
