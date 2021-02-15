const APIURL = 'https://api.exchangeratesapi.io';
const axios = require("axios");
const querystring = require('querystring');

export const getExchangeRate = () => {
    return axios.get(`${APIURL}/latest`);
}

export const getRateBetweenCurrencies = data => axios.get(`${APIURL}/history?${querystring.encode(data)}`);

export const getHistoricRates = data => axios.get(`${APIURL}/history?${querystring.encode(data)}`);

export const getHistoricRatesBetweenCurrencies = data => axios.get(`${APIURL}/history?${querystring.encode(data)}`);

