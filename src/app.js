import getTxs from './controllers/txs/monobank.js';

const txs = await getTxs();

console.log(txs);
