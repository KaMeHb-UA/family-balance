import getCurrency from './controllers/currency/monobank.js';

const curr = await getCurrency();

console.log(curr);
