// api/wechat/sign.js
// Vercel Serverless Function - 微信 JS-SDK 签名接口
// 部署到 Vercel 后，访问地址：https://你的域名/api/wechat/sign?url=xxx

const axios  = require('axios');
const crypto = require('crypto');

// ⬇⬇⬇ 替换为你的公众号信息 ⬇⬇⬇
const APPID     = '你的AppID';      // 例如：wx1234567890abcdef
const APPSECRET = '你的AppSecret';  // 在公众号后台 → 开发 → 基本配置 中获取
// ⬆⬆⬆ 替换为你的公众号信息 ⬆⬆⬆

// 内存缓存（Serverless 函数实例存活期间有效）
let tokenCache  = { value: '', expires: 0 };
let ticketCache = { value: '', expires: 0 };

async function getAccessToken() {
  if (tokenCache.value && tokenCache.expires > Date.now()) {
    return tokenCache.value;
  }
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`;
  const r   = await axios.get(url);
  if (!r.data.access_token) throw new Error('获取access_token失败: ' + JSON.stringify(r.data));
  tokenCache = { value: r.data.access_token, expires: Date.now() + 7000 * 1000 };
  return tokenCache.value;
}

async function getJsapiTicket() {
  if (ticketCache.value && ticketCache.expires > Date.now()) {
    return ticketCache.value;
  }
  const token = await getAccessToken();
  const url   = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`;
  const r     = await axios.get(url);
  if (r.data.errcode !== 0) throw new Error('获取jsapi_ticket失败: ' + r.data.errmsg);
  ticketCache = { value: r.data.ticket, expires: Date.now() + 7000 * 1000 };
  return ticketCache.value;
}

module.exports = async (req, res) => {
  // 允许跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    const pageUrl = decodeURIComponent(req.query.url || '');
    if (!pageUrl) {
      return res.status(400).json({ error: '缺少 url 参数' });
    }

    const ticket    = await getJsapiTicket();
    const timestamp = Math.floor(Date.now() / 1000);
    const nonceStr  = Math.random().toString(36).substring(2, 17);

    // 签名字符串（严格字典序，不能改顺序）
    const signStr   = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${pageUrl}`;
    const signature = crypto.createHash('sha1').update(signStr, 'utf8').digest('hex');

    res.json({
      appId:     APPID,
      timestamp: timestamp,
      nonceStr:  nonceStr,
      signature: signature,
    });
  } catch (err) {
    console.error('[森木签名] 错误:', err.message);
    res.status(500).json({ error: '签名失败', detail: err.message });
  }
};
