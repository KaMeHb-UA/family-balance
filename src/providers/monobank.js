import request from '../controllers/net/request.js';

const apiEndpoint = 'https://api.monobank.ua/';

export default async (method, data) => JSON.parse(await request(apiEndpoint + method, data));
