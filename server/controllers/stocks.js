const stocksRouter = require('express').Router()
const Stock = require('../models/stock')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')

// model !!!!!!!!!!!!!

stocksRouter.get('/', async (request, response) => {
    const token = request.token;
    const decodedToken = jwt.verify(token, process.env.SECRET)
    console.log('Token: ', decodedToken)
    if(!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid'})
    }

    const stocks = (await Stock.find({})).map((stock) => stock.toJSON());
    
    const filtered = []

    stocks.forEach((stock) => {
        if (
          !stock.name.toLowerCase().includes('fund') &&
          !stock.name.toLowerCase().includes('trust') &&
          stock.industry !== 'Real Estate Investment Trusts' &&
          stock.industry !== 'Investment Managers'
        ) {
          filtered.push(stock);
        }
    })

    if (config.NODE_ENV = 'development') {
        console.log(`Returned longs: ${filtered.length}}`)
    }

    response.json(filtered);
})

module.exports = stocksRouter