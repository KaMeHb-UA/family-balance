export default class Tx{
    /**
     * @param {string} provider
     * @param {number} amount
     * @param {string} description
     * @param {number} time
     * @param {string} id
     * @param {number} comission
     * @param {number} cashback
     * @param {number} restBalance
     * @param {[string, string]} currencySymbol
     */
    constructor(provider, amount, description, time, id, comission, cashback, restBalance, currencySymbol){
        this.amount = amount;
        this.description = description;
        this.time = time;
        this.id = id;
        this.comission = comission;
        this.cashback = cashback;
        this.restBalance = restBalance;
        this.currencySymbol = currencySymbol;
        this.provider = provider;
    }
}
