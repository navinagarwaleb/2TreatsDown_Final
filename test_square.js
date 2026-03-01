const https = require('https');

const options = {
    hostname: 'connect.squareup.com',
    port: 443,
    path: '/v2/catalog/list?types=ITEM,IMAGE',
    method: 'GET',
    headers: {
        'Square-Version': '2024-02-22',
        'Authorization': 'Bearer EAAAl1gvzwIxzhApc7wlBGKwawPAtiCtyNWmR6nYKsgCFet7gaM69QBIVJXQhh5W',
        'Content-Type': 'application/json'
    }
};

const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log(JSON.stringify(JSON.parse(data), null, 2));
    });
});

req.on('error', (e) => {
    console.error(e);
});

req.end();
