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
    coinName = coinName.trim()
    coins.push(coinName)

for(let i = 0; i < coins.length; i++){
    if(coinName === coins[i]){
        rollbar.info('Post request successful')
        res.sendStatus(200)
        }else if (coinName){
            Rollbar.critical("Name exsists")
            res.status(400).send('you have entered this already')
        }
}
})


const port = process.env.PORT || 4545

app.use(rollbar.errorHandler())

app.listen(port, () => console.log(`Take us to warp ${port}!`)) 