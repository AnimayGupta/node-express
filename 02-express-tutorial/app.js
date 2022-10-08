const express = require('express');
const path = require('path')
const app = express()
const {products} = require('./data.js')
const logger = require('./logger')
const authorize = require('./authorize')
// app.use(express.static('./public'))
// req => middleware => res
app.use([authorize, logger])



app.get('/', (req,res) => {
    res.send('Home')
})

app.get('/about', (req,res) => {
    res.send('About')
})

app.get('/api/products', (req,res) => {
    res.send('Products')
})
app.get('/api/items', (req,res) => {
    res.send('Items')
})

app.listen(5000, () => {
    console.log('server is listening on port 5000...')
})