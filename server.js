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
app.use('/js', express.static(path.join(__dirname, '/index.js')))

let coins = [];

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
    rollbar.info('html file served successfully.')
})

// app.get('/index.js', (req,res) => {
//     res.sendFile(path.join(__dirname, '/index.js'))
//     rollbar.info('html file served successfully.')
// })

app.post('/api/coinName', (req, res) => {
    let {coinName} = req.body
    coins.push(coinName)
    rollbar.info('Post request successful')
    res.sendStatus(200)
})


const port = process.env.PORT || 4545

app.use(rollbar.errorHandler())

app.listen(port, () => console.log(`Take us to warp ${port}!`)) 