import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeStocks } from '../../reducers/stockReducer';
import Search from '../../components/Search/Search'

const Main = () => {
  const dispatch = useDispatch();
  const stocks = useSelector((state) => state.stocks);

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
      <Search stocks={stocks} />
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