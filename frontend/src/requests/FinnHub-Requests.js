
export async function stockPricesRequest(symbol, range, start, end, setFunction) {
    const request = {
        method: 'GET',
        headers: {
        },
    };
    try {
        const response = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${range}&from=${start}&to=${end}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`, request);
        const data = await response.json();

        if (data) setFunction(data);
        else {
            console.log(data);
        }
    }
    catch (e) {
        console.log("Error");
        console.log(e)
    }
};


export async function stockSearch(symbol, setFunction) {
    const request = {
        method: 'GET',
        headers: {
        },
    };
    try {
        const response = await fetch(`https://finnhub.io/api/v1/search?q=${symbol}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`, request);
        const data = await response.json();

        if (data) setFunction(data);
        else {
            console.log(data);
        }
    }
    catch (e) {
        console.log("Error");
        console.log(e)
    }
};

export async function marketNews(category, minId, setFunction) {
    const request = {
        method: 'GET',
        headers: {
        },
    };
    try {
        const response = await fetch(`https://finnhub.io/api/v1/news?category=${category}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`, request);
        const data = await response.json();

        if (data) setFunction(data);
        else {
            console.log(data);
        }
    }
    catch (e) {
        console.log("Error");
        console.log(e)
    }
}

export async function stockProfile(symbol, setFunction) {
    const request = {
        method: 'GET',
        headers: {
        },
    };
    try {

        const response = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`, request);
        const data = await response.json();

        if (data) setFunction(data);
        else {
            console.log(data);
        }
    }
    catch (e) {
        console.log("Error");
        console.log(e)
    }
};

export async function stockQuote(symbol, setFunction) {
    const request = {
        method: 'GET',
        headers: {
        },
    };
    try {

        const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`, request);
        const data = await response.json();

        if (data) setFunction(data);
        else {
            console.log(data);
        }
    }
    catch (e) {
        console.log("Error");
        console.log(e)
    }
};



