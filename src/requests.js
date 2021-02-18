const APIURL = 'https://api.exchangeratesapi.io';
const axios = require("axios");
const querystring = require('querystring');

export const getExchangeRate = () => {
    return axios.get(`${APIURL}/latest`);
}

export const getRateBetweenCurrencies = data => axios
    .get(`${APIURL}/history?${querystring.encode(data)}`);

export const getHistoricRates = data => axios
    .get(`${APIURL}/history?${querystring.encode(data)}`);

export const getHistoricRatesBetweenCurrencies = data => axios
    .get(`${APIURL}/history?${querystring.encode(data)}`);

//@TODO: Clean this up
export const getHistoricStuff = async (setHData) => await axios
    .get(`http://localhost:8081/api/history/BTC`)
    .then(async resp => {
        setHData(await resp.data);
    })
    .catch(err => err);