import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeStocks } from '../../reducers/stockReducer';
import Stock from '../../components/Stock/Stock';

const Main = () => {
  const dispatch = useDispatch();
  const stocks = useSelector((state) => state.stocks);
  const [filteredStocks, setFilteredStocks] = useState([])

  useEffect(() => {
    dispatch(initializeStocks());
  }, [dispatch]);

  if (!stocks) {
    return <div>...Loading</div>;
  }

  console.log(stocks);

  return (
    <React.Fragment>
      <h1>Stocks</h1>
      {filteredStocks.map((stock) => (
        <Stock key={stock.id} stock={stock} />
      ))}
    </React.Fragment>
  );
};

export default Main;

/*
name/symbol
CPE: min / max
institutions: min / max
shortRatio: min / max
tAnnualDividendYield: min / max
profitMargin: min / max
qRevenueGrowth: min / max
qEarningsGrowth: min / max
peter: min / max



(country)
(sector/industry)
(market cap : min / max)
*/