import currencySymbols from '../../providers/currency-symbols.js';
import request from '../../providers/monobank.js';
import { getLastTxid, add } from '../db/txs.js';
import Tx from './tx.js'

const minReqInterval = 61000;
const provider = 'monobank';
let lastId;
const { MONOBANK_TOKEN } = process.env;

async function getTxs(){
    try{
        /** @type {{id: string, time: number, description: string, mcc: number, originalMcc: number, amount: number, operationAmount: number,currencyCode: number, commissionRate: number, cashbackAmount: number, balance: number, hold: boolean, receiptId: string}[]} */
        const txs = await request('personal/statement/0/' + (Math.floor(Date.now() / 1000) - 2678400), null, MONOBANK_TOKEN);
        return txs;
    } catch(e){
        console.log('[monobank]: Failed to update the data: ' + e.message);
        return [];
    }
}

async function getFormalTxs(){
    const txs = await getTxs();
    return txs.map(tx => new Tx(
        provider,
        tx.amount / 100,
        tx.description,
        tx.time * 1000,
        tx.id,
        tx.commissionRate / 100,
        tx.cashbackAmount / 100,
        tx.balance / 100,
        currencySymbols[tx.currencyCode] || ['', ''],
    ));
}

async function fetchTxs(){
    const txs = await getFormalTxs();
    const lastTx = txs.filter(v => v.id === lastId)[0];
    const newTxs = txs.slice(0, lastTx && txs.indexOf(lastTx)).reverse();
    for(const tx of newTxs){
        lastId = tx.id;
        add(tx);
    }
}

// hack to await for getLastTxid to be fully initialized
setTimeout(async () => {
    lastId = await getLastTxid(provider);
    fetchTxs();
    setInterval(fetchTxs, minReqInterval);
}, 10000);
