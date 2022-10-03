const express = require('express');
const path = require('path')
const app = express()
const {products} = require('./data.js')
// app.use(express.static('./public'))

app.get('/', (req,res) => {
    res.send('<h1> Home Page </h1> <a href = "/api/products">Products</a>')
})

app.get('/api/products', (req,res) => {
    const newProducts = products.map((product) => {
        const {id,name,image} = product
        return {id,name,image}
    })
    res.json(newProducts)
})

app.get('/api/products/:productID', (req,res) => {
    // console.log(req.params)
    const {productID} = req.params
    const singleProduct = products.find((product) => product.id === Number(productID))
    if(!singleProduct){
        res.status(404).send('Product does not exist')
    }else{
        res.json(singleProduct)
    }
})

app.get('/api/v1/query', (req,res) => {
    // console.log(req.query)
    const {search,limit} = req.query
    let sortedProducts = [...products]
    if(search){
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search)
        })
    }
    if(limit){
        sortedProducts = sortedProducts.slice(0,Number(limit))
    }
    if(sortedProducts.length < 1){
       return res.status(200).json({success: true, data: []})
    }
    return res.status(200).json(sortedProducts)
    // res.send('hello world')
})

// app.all('*', (req,res) => {
//     res.status(404).send('Resource not found')
// })

app.listen(5000, () => {
    console.log('server is listening on port 5000...')
})