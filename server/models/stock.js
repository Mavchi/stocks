const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    minlength: 1,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    minlength: 1,
    unique: true,
    required: true,
  },
  country: {
    type: String,
    minlength: 1,
    required: true,
  },
  ipoYear: {
    type: mongoose.Schema.Types.Mixed,
  },
  sector: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  marketCap: {
    type: Number,
    required: true,
  },
  lastPrice: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: Number,
    required: true,
  },
  tPE: {
    type: mongoose.Schema.Types.Mixed,
  },
  insiders: {
    type: mongoose.Schema.Types.Mixed,
  },
  institutions: {
    type: mongoose.Schema.Types.Mixed,
  },
  shortRatio: {
    type: Number,
  },
  tAnnualDividendYield: {
    type: mongoose.Schema.Types.Mixed,
  },
  profitMargin: {
    type: mongoose.Schema.Types.Mixed,
  },
  qRevenueGrowth: {
    type: Number,
  },
  dEPS: { type: mongoose.Schema.Types.Mixed },
  qEarningsGrowth: { type: Number },
  totalCash: { type: mongoose.Schema.Types.Mixed },
  cashPerShare: { type: mongoose.Schema.Types.Mixed },
  totalDebt: { type: mongoose.Schema.Types.Mixed },
  sharesOurstanding: { type: Number },
  cPE: { type: mongoose.Schema.Types.Mixed },
  peter: { type: mongoose.Schema.Types.Mixed },
});

stockSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Stock', stockSchema)