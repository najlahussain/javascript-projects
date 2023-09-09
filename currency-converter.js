const axios = require(`axios`);
const result = document.getElementById("result");
//currency converter using asyn-await

//install axios for fetching the data for the two APIs
//npm i --save axiosto
//Exchange rate API: http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1
//Countries API: https://restcountries.com/v3.1/currency/${currencyCode}

//1st function: getExchangeRate, with promise
/*const getExchangeRate = (fromCurrency,toCurrency) => {
    axios.get(`http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1`)
        .then((response)=>{
            const rate = response.data.rates;
            const euro = 1/rate[fromCurrency];
            const exchangeRate = euro * rate[toCurrency];
            console.log(exchangeRate);               
        });
}*/


//to make the function asynchronous we jsut need to add async before the parameters
const getExchangeRate = async (fromCurrency, toCurrency) => {
  const response = await axios.get(
    `http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1`
  );
  const rate = response.data.rates;
  const euro = 1 / rate[fromCurrency];
  const exchangeRate = euro * rate[toCurrency];
  if(isNaN(exchangeRate)){
    throw new Error(`Unable to get currency ${fromCurrency} and ${toCurrency}`);
  }
  return exchangeRate;
};
//2nd function: getCurrencies
const getCountries = async (toCurrency) => {
    try{
        const response = await axios.get(`https://restcountries.com/v3.1/currency/${toCurrency}`);
        return response.data.map(country => country.name.official);
    }catch(error){
        throw new Error(`Unable to get currency for ${toCurrency}`);
    }
};
//3rd function: convertCurrency
const convertCurrency = async(fromCurrency, toCurrency, amount) => {
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
    const countries = await getCountries(toCurrency);
    const convertAmount = (exchangeRate * amount).toFixed(2);
    return `${amount} in ${fromCurrency} is worth ${convertAmount} in ${toCurrency}. 
        You can spend it in the following countries: ${countries}`;
};

//calling function
result.innerHTML = convertCurrency(`PKR`,`SAR`,30)
    .then(response=>{ return `${response}`;})
    .catch((error) =>{
        return `${error.message}`;
    });





