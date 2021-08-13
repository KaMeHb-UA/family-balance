import txs from './controllers/db/txs.js';

let i = 0;
for await (const tx of txs){
    console.log(tx, i++);
}
