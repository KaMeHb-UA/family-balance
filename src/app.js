import txs from './controllers/db/txs.js';
import sendTg from './controllers/bot/tg.js';

for await (const tx of txs){
    await sendTg(tx);
}
