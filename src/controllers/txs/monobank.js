import EventEmitterAsyncIterator from '../../helpers/event-emitter-async-iterator.js';
import currencySymbols from '../../providers/currency-symbols.js';
import request from '../../providers/monobank.js';
import { Tx } from './index.js'

const minReqInterval = 61000;
let lastId = '';

/** @type {EventEmitterAsyncIterator<Tx>} */
const asyncIterator = new EventEmitterAsyncIterator;

async function getTxs(){
    /** @type {{id: string, time: number, description: string, mcc: number, originalMcc: number, amount: number, operationAmount: number,currencyCode: number, commissionRate: number, cashbackAmount: number, balance: number, hold: boolean, receiptId: string}[]} */
    const txs = await request('personal/statement/0/' + (Math.floor(Date.now() / 1000) - 2678400), null, process.env.MONOBANK_TOKEN);
    return txs;
}

async function getFormalTxs(){
    const txs = await getTxs();
    return txs.map(tx => new Tx(
        tx.amount / 100,
        tx.description,
        tx.time * 1000,
        tx.id,
        tx.commissionRate / 100,
        tx.cashbackAmount / 100,
        tx.balance / 100,
        currencySymbols[tx.currencyCode] || ['', '']
    ));
}

async function fetchTxs(){
    const txs = await getFormalTxs();
    const lastTx = txs.filter(v => v.id === lastId)[0];
    const newTxs = txs.slice(0, lastTx && txs.indexOf(lastTx)).reverse();
    for(const tx of newTxs){
        lastId = tx.id;
        asyncIterator.pushValue(tx);
    }
}

fetchTxs();

setInterval(fetchTxs, minReqInterval);

export default asyncIterator;
