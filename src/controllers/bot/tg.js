import request from '../net/request.js';

const {
    TG_BOT_TOKEN,
    TG_CHAT,
} = process.env;

/** @arg {string} text */
async function sendMessage(text){
    await request(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, JSON.stringify({
        chat_id: TG_CHAT,
        parse_mode: 'HTML',
        text,
    }), {
        'Content-Type': 'application/json'
    });
}

/** @arg {string} rawText */
function _(rawText){
    return rawText
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
}

function parseAmount(amount){
    if(amount > 0) return [true, amount];
    return [false, -amount];
}

function awc(amount, [ prefix, suffix ]){
    let res = `${_(prefix)}<b>${amount}</b>`;
    if(!prefix && suffix) res += ' ' + _(suffix);
    return res;
}

/** @arg {import('../txs/tx').default} tx */
export default async tx => {
    const [ incoming, amount ] = parseAmount(tx.amount);
    await sendMessage(`
        <b>${_(tx.provider)}</b>
        <code>${_(tx.description)}</code>: <b>${incoming ? '⇲' : '⇱'}</b> ${awc(amount, tx.currencySymbol)}
        Комиссия: ${awc(tx.comission, tx.currencySymbol)}
        Кешбэк: ${awc(tx.cashback, tx.currencySymbol)}
        Остаток на балансе: ${awc(tx.restBalance, tx.currencySymbol)}
    `);
}
