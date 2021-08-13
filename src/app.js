import getCurrency from './controllers/currencyRate/monobank.js';

const curr = await getCurrency();

console.log(curr);
