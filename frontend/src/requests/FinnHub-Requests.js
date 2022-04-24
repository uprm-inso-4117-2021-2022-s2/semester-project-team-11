
export function stockPricesRequest(symbol, range, start, end, setFunction) {
    const finnhub = require('finnhub');
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = process.env.FINNHUB_API_KEY;
    const finnhubClient = new finnhub.DefaultApi()
    finnhubClient.stockCandles(symbol, range, start, end, (error, data, response) => {
        if (error === null) setFunction(data);
        else console.log('error', error);
    });
};


export function stockSearch(symbol, setFunction) {
    const finnhub = require('finnhub');
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = process.env.FINNHUB_API_KEY;
    const finnhubClient = new finnhub.DefaultApi()
    finnhubClient.symbolSearch(symbol, (error, data, response) => {
        if (error === null) setFunction(data);
        else console.log('error', error);
    });
};

export function marketNews(category, minId, setFunction) {
    const categories = ['general', 'forex', 'crypto', 'merger']
    const finnhub = require('finnhub');
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = process.env.FINNHUB_API_KEY;
    const finnhubClient = new finnhub.DefaultApi()
    finnhubClient.marketNews(category in categories ? category : 'general', minId, (error, data, response) => {
        if (error === null) setFunction(data);
        else console.log('error', error);
    });
}

export function stockProfile(symbol, setFunction) {
    const finnhub = require('finnhub');
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = process.env.FINNHUB_API_KEY;
    const finnhubClient = new finnhub.DefaultApi()
    finnhubClient.companyProfile2({ symbol }, (error, data, response) => {
        if (error === null) setFunction(data);
        else console.log('error', error);
    });
};

export function stockQuote(symbol, setFunction) {
    const finnhub = require('finnhub');
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = process.env.FINNHUB_API_KEY;
    const finnhubClient = new finnhub.DefaultApi()
    finnhubClient.quote(symbol, (error, data, response) => {
        if (error === null) setFunction(data);
        else console.log('error', error);
    });
};



