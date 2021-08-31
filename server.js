const express = require('express')
const path = require('path')

const app = express()

app.use(express.json())

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/index.js', (req,res) => {
    res.sendFile(path.join(__dirname, '/index.js'))
})

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Take us to warp ${port}!`)) 