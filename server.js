const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: '27a17fa91be242c585117698b52f0ebb',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const app = express()

app.use(express.json())
app.use('/js', express.static('./public/index.js'))

let coins = [];

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
    rollbar.info('html file served successfully.')
})

app.post('/api/coinName', (req, res) => {
    let {coinName} = req.body
    rollbar.info('sent successfully')
    for(let i = 0; i < coins.length; i++){
        let coin = coins[i]
        rollbar.log('before if', {coin, coinName})
        if(coins[i] === coinName){
            rollbar.critical("Name exsists");
            rollbar.critical('freak out')
            res.status(400).send('you have entered this already')
            }else if (coins[i] !== coinName){
                coins.push(coinName)
                rollbar.warning("added");
                res.status(200).send('careful, do not double enter')
            }  
}
})


const port = process.env.PORT || 4545

app.use(rollbar.errorHandler())

app.listen(port, () => console.log(`Take us to warp ${port}!`)) 