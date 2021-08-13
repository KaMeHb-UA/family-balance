import db from './mongo.js';
import EventEmitterAsyncIterator from '../../helpers/event-emitter-async-iterator.js';
import '../txs/index.js';
//import sleep from '../../helpers/sleep.js';

/** @typedef {import('../txs/tx').default} Tx */

const collection = db.collection('txs');
/** @type {EventEmitterAsyncIterator<Tx>} */
const txs = new EventEmitterAsyncIterator;

/*
void async function(){
    let lastId = '';
    while(true){
        const buff = [];
        const count = await collection.countDocuments();
        await collection.find({}).sort({ time: -1 }).skip(count > 100 ? count - 100 : 0).forEach(tx => { buff.push(tx) });
        const found = buff.filter(v => v.id === lastId)[0];
        const toAdd = found ? buff.reverse().slice(buff.indexOf(found) + 1) : buff.reverse();
        if(toAdd.length) lastId = toAdd[toAdd.length - 1].id;
        for(const tx of toAdd) txs.pushValue(tx);
        await sleep(1000);
    }
}()
//*/

/** @arg {Tx} tx */
export async function add(tx){
    await collection.insertOne(tx);
    txs.pushValue(tx);
}

/**
 * @arg {string} provider
 * @return {Promise<string>}
 */
export async function getLastTxid(provider){
    const found = await collection.find({ provider }).sort({ time: -1 }).limit(1).toArray();
    return found.length ? found[0].id : '';
}

export default txs
