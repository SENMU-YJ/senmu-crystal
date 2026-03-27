/**
 * 森木 SENMU CRYSTAL
 * 微信 JS-SDK 签名服务（Node.js）
 *
 * 使用：
 *   1. npm install express axios node-cache cors
 *   2. 修改 APPID 和 APPSECRET
 *   3. node server.js
 */

const express    = require('express');
const axios      = require('axios');
const crypto     = require('crypto');
const NodeCache  = require('node-cache');
const cors       = require('cors');
const path       = require('path');

const app   = express();
const cache = new NodeCache({ stdTTL: 6000 });

// ⬇⬇⬇ 替换为你的公众号信息 ⬇⬇⬇
const APPID     = '你的AppID';
const APPSECRET = '你的AppSecret';
// ⬆⬆⬆ 替换为你的公众号信息 ⬆⬆⬆

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 托管静态文件（index.html, styles.css, app.js, share-cover.png）
app.use(express.static(path.join(__dirname, '.')));

// 获取 access_token
async function getAccessToken() {
  const cached = cache.get('access_token');
  if (cached) return cached;

  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`;
  const res  = await axios.get(url);

  if (res.data.errcode) {
    throw new Error(`获取access_token失败: ${res.data.errmsg}`);
  }

  cache.set('access_token', res.data.access_token, 7000);
  console.log('[森木] access_token 已刷新');
  return res.data.access_token;
}

// 获取 jsapi_ticket
async function getJsapiTicket() {
  const cached = cache.get('jsapi_ticket');
  if (cached) return cached;

  const token = await getAccessToken();
  const url   = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`;
  const res   = await axios.get(url);

  if (res.data.errcode !== 0) {
    throw new Error(`获取jsapi_ticket失败: ${res.data.errmsg}`);
  }

  cache.set('jsapi_ticket', res.data.ticket, 7000);
  console.log('[森木] jsapi_ticket 已刷新');
  return res.data.ticket;
}

// 签名接口
app.get('/api/wechat/sign', async (req, res) => {
  try {
    const pageUrl   = decodeURIComponent(req.query.url || '');
    if (!pageUrl) return res.status(400).json({ error: '缺少url参数' });

    const ticket    = await getJsapiTicket();
    const timestamp = Math.floor(Date.now() / 1000);
    const nonceStr  = Math.random().toString(36).substring(2, 17);

    // ⚠️ 签名字符串必须严格按字典序，不能调整顺序
    const signStr   = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${pageUrl}`;
    const signature = crypto.createHash('sha1').update(signStr, 'utf8').digest('hex');

    console.log(`[森木] 签名请求 url: ${pageUrl.substring(0, 60)}...`);

    res.json({
      appId:     APPID,
      timestamp: timestamp,
      nonceStr:  nonceStr,
      signature: signature,
    });
  } catch (err) {
    console.error('[森木] 签名失败:', err.message);
    res.status(500).json({ error: '签名失败', detail: err.message });
  }
});

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: '森木 SENMU CRYSTAL', time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`\n🌲 森木签名服务已启动`);
  console.log(`   本地地址：http://localhost:${PORT}`);
  console.log(`   页面访问：http://localhost:${PORT}/index.html`);
  console.log(`   签名接口：http://localhost:${PORT}/api/wechat/sign?url=xxx\n`);
});
