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
    /*
    const filtered = {
        short: [],
        long: [],
    }

    stocks.forEach((stock) => {
        if (stock.shortRatio >= 6 ) {
            filtered.short.push(stock)
        }
        if ( (stock.cPE > 0 && stock.cPE <= 25) 
            && (stock.qRevenueGrowth > 0) 
            && (stock.peter >= 1)
            && (stock.industry !== 'Investment Managers')
        ) {
            filtered.long.push(stock)
        }
    })

    if (config.NODE_ENV = 'development') {
        console.log(`Returned longs: ${filtered.long.length}, shorts: ${filtered.short.length}`)
    }
    */
    response.json(stocks);
})

module.exports = stocksRouter