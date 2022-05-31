var express = require('express');
var app = express();
var redis = require('redis');

const client = redis.createClient({ url: 'redis://redis:6379' });
client.on('error', (err) => console.log('Redis Client Error', err));

app.get('/', function (_req, res) {
    res.redirect('/index.html');
});

app.get('/json', async (_req, res) => {
    try {
        await client.connect();
        const coins = await client.HLEN('wallet')
        const hashes = await client.GET('hashes')
        const now = Date.now() / 1000;
        const transactionCoin = {
            coins: coins,
            hashes: hashes,
            now: now
        }
        res.json(transactionCoin);
    } catch (error) {
        console.log(error)
        const transactionCoinError = {
            coins: 0,
            hashes: 0,
            now: 0
        }
        res.json(transactionCoinError)
    } finally {
        await client.disconnect();
    }
});

app.use(express.static('files'));
app.listen(80,  () => {
    console.log('WEBUI running on port 80');
});

