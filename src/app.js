import txs from './controllers/txs/index.js';

for await (const tx of txs){
    console.log(tx);
}
