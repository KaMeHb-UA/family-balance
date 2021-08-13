import currencySymbols from '../../providers/currency-symbols.js';
import request from '../../providers/monobank.js';

async function getTxs(){
    /** @type {{id: string, time: number, description: string, mcc: number, originalMcc: number, amount: number, operationAmount: number,currencyCode: number, commissionRate: number, cashbackAmount: number, balance: number, hold: boolean, receiptId: string}[]} */
    const txs = await request('personal/statement/0/' + (Math.floor(Date.now() / 1000) - 2678400), null, process.env.MONOBANK_TOKEN);
    return txs;
}

export default async () => {
    const txs = await getTxs();
    return txs.map(tx => ({
        amount: tx.amount / 100,
        description: tx.description,
        time: tx.time * 1000,
        id: tx.id,
        comission: tx.commissionRate / 100,
        cashback: tx.cashbackAmount / 100,
        restBalance: tx.balance / 100,
        /** @type {[string, string]} */
        currencySymbol: currencySymbols[tx.currencyCode] || ['', ''],
    }));
}
