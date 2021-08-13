import request from '../../providers/monobank.js';
import { UAH, USD } from '../../providers/iso4217.js';

const defaultRate = 27;

export default async () => {
    try{
        /** @type {{[x in 'currencyCodeA' | 'currencyCodeB' | 'date' | 'rateBuy' | 'rateSell']: number}[]} */
        const currencies = await request('bank/currency');
        return currencies.filter(v => v.currencyCodeA === USD && v.currencyCodeB === UAH)[0].rateSell;
    } catch(e){
        return defaultRate;
    }
};
