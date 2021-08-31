let price = document.querySelector('#price');
let coinName = document.querySelector('#name');
let button = document.querySelector('#searchBtn');
let input = document.querySelector('#searchInput');

const searchCoin = () => {
let tickerValue = input.value.toLowerCase()
axios.get(`https://api.coingecko.com/api/v3/coins/${tickerValue}/tickers`)
.then(res => {
    coinName.innerText = res.data.name
    for(let i = 0; i < res.data.tickers.length; i++) {
        price.innerText = `$${res.data.tickers[i].converted_last.usd.toFixed(2)}`
    }
})};


button.addEventListener('click', searchCoin)