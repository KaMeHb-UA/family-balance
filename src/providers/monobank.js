import request from '../controllers/net/request.js';

const apiEndpoint = 'https://api.monobank.ua/';

export default async (method, data, token) => JSON.parse(await request(apiEndpoint + method, data, token ? { 'X-Token': token } : {}));
