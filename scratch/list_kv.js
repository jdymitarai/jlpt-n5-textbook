const https = require('https');

const token = "cfoat_k19uywoSPtlcoEx3_pi_C4Q03RvC7WsSQRreY2s2L-U.5KG3mVdSswzt-MyjfNLyLwDAI7KBvuXhxgPrccV41mg";
const accountId = "aca27b6ae0d9a3c59955a2920487a76a";

const options = {
  hostname: 'api.cloudflare.com',
  port: 443,
  path: `/client/v4/accounts/${accountId}/storage/kv/namespaces`,
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log(data);
  });
});

req.end();
