const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: 'f299ff01fdb54b3fab4a9c41ceeca549',
    captureUncaught: true,
    captureUnhandledRejections: true
})
const app = express()

app.use(express.json())

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
    rollbar.info('html file served successfully.')
})

app.get('/index.js', (req,res) => {
    res.sendFile(path.join(__dirname, '/index.js'))
})

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Take us to warp ${port}!`)) 