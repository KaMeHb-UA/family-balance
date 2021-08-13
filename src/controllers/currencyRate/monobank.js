import request from '../../providers/monobank.js';
import { UAH, USD } from '../../providers/iso4217.js';

export default async () => {
    /** @type {{[x in 'currencyCodeA' | 'currencyCodeB' | 'date' | 'rateBuy' | 'rateSell']: number}[]} */
    const currencies = await request('bank/currency');
    return currencies.filter(v => v.currencyCodeA === USD && v.currencyCodeB === UAH)[0].rateSell;
};
