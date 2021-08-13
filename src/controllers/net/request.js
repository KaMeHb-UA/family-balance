import { request } from 'https';

export default (url, data) => new Promise((resolve, reject) => {
    const req = request(params, res => {
        if(res.statusCode < 200 || res.statusCode >= 300){
            return reject(new Error('request returned bad status code ' + res.statusCode));
        }
        const body = [];
        res.on('data', chunk => body.push(chunk));
        res.on('end', () => resolve(Buffer.concat(body).toString()));
    });
    req.on('error', err => reject(err));
    if(data) req.write(postData);
    req.end();
});
