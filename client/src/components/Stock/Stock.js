import React from 'react';
import { container, section, section__title, section__item, section__itemLabel, section__itemData } from './Stock.module.scss';

const Stock = ({ stock }) => {
  return (
    <section className={container}>
      <div className={section}>
        <div className={section__item}>
          <table style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th className={section__title} colspan='4'>{`${stock.name}: (${stock.symbol}, ${stock.country}, ${stock.ipoYear})`}</th>
                <th colspan='2'>Last Updated: {new Date(stock.lastUpdated).toLocaleDateStrin()}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={section__itemLabel}>Sector</td>
                <td className={section__itemData}>{stock.sector}</td>
                <td className={section__itemLabel}>Industry</td>
                <td className={section__itemData} colspan='3'>
                  {stock.industry}
                </td>
              </tr>
              <tr>
                <td className={section__itemLabel}>Last Price</td>
                <td className={section__itemData}>{stock.lastPrice}</td>
                <td className={section__itemLabel}>Market Cap</td>
                <td className={section__itemData}>{stock.marketCap}</td>
                <td className={section__itemLabel}>Shares outstanding</td>
                <td className={section__itemData}>{stock.sharesOurstanding}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={section__item}>
          <table style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th className={section__title} colspan='4'>
                  Financials
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={section__itemLabel}>Profit Margin</td>
                <td className={section__itemData}>{stock.profitMargin} %</td>
                <td className={section__itemLabel}>Total Cash</td>
                <td className={section__itemData}>{stock.totalCash}</td>
                <td className={section__itemLabel}>Total debt</td>
                <td className={section__itemData}>{stock.totalDebt}</td>
                <td className={section__itemLabel}>Enterprise Value</td>
                <td className={section__itemData}>{stock.enterpriseValue}</td>
              </tr>
              <tr>
                <td className={section__itemLabel}>Last Price</td>
                <td className={section__itemData}>{stock.lastPrice}</td>
                <td className={section__itemLabel}>EPS (diluded)</td>
                <td className={section__itemData}>{stock.dEPS}</td>
                <td className={section__itemLabel}>Annual divident Yeild (t)</td>
                <td className={section__itemData}>{stock.tAnnualDividendYield} %</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={section__item}>
          <table style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th className={section__title} colspan='4'>
                  Statistics
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={section__itemLabel}>P/E (current)</td>
                <td className={section__itemData}>{stock.tPE}</td>
                <td className={section__itemLabel}>P/E (trailing)</td>
                <td className={section__itemData}>{stock.cPE}</td>
                <td className={section__itemLabel}>PLynch</td>
                <td className={section__itemData}>{stock.peter}</td>
              </tr>
              <tr>
                <td className={section__itemLabel}>Insiders</td>
                <td className={section__itemData}>{stock.insiders} %</td>
                <td className={section__itemLabel}>Revenue Growth</td>
                <td className={section__itemData}>{stock.qRevenueGrowth} %</td>
                <td className={section__itemLabel}>Short Ratio</td>
                <td className={section__itemData}>{stock.shortRatio}</td>
              </tr>
              <tr>
                <td className={section__itemLabel}>Insitutions</td>
                <td className={section__itemData}>{stock.institutions} %</td>
                <td className={section__itemLabel}>Earnings Growth (p)</td>
                <td className={section__itemData}>{stock.qEarningsGrowth} %</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Stock;

/*
Yleinen
	name (symbol, ipoyear, country)			lastUpdated
	sector industry
	lastPrice, marketCap, sharesOurstanding
Financials
	profitMargin, totalCash, totalDebt, enterpriseValue
	lastPrice, dEPS, tAnnualDividendYield
Statistic
	tPe, cPe, peter
	qRevenueGrowth, qEarningsGrowth
	insiders, institutions
	shortRatio
*/