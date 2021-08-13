import EventEmitterAsyncIterator from '../../helpers/event-emitter-async-iterator.js';
import mono from './monobank.js';

export class Tx{
    /**
     * @param {number} amount
     * @param {string} description
     * @param {number} time
     * @param {string} id
     * @param {number} comission
     * @param {number} cashback
     * @param {number} restBalance
     * @param {[string, string]} currencySymbol
     */
    constructor(amount, description, time, id, comission, cashback, restBalance, currencySymbol){
        this.amount = amount;
        this.description = description;
        this.time = time;
        this.id = id;
        this.comission = comission;
        this.cashback = cashback;
        this.restBalance = restBalance;
        this.currencySymbol = currencySymbol;
    }
}

/** @type {EventEmitterAsyncIterator<Tx>} */
const iterator = new EventEmitterAsyncIterator;

void async function(){
    for await(const tx of mono) iterator.pushValue(tx);
}()

export default iterator;
