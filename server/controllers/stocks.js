const stocksRouter = require('express').Router()
const Stock = require('../models/stock')

// model !!!!!!!!!!!!!

stocksRouter.get('/', async (request, response) => {
    const stocks = await Stock.find({})
    response.json(stocks.map((stock) => stock.toJSON()))
})

module.exports = stocksRouter