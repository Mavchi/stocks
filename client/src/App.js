import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeStocks } from './reducers/stockReducer';

import Stock from './components/Stock/Stock'

const App = () => {
  const dispatch = useDispatch();
  const stocks = useSelector((state) => state.stocks);

  useEffect(() => {
    dispatch(initializeStocks());
  }, [dispatch]);

  //console.log(stocks);

  return (
    <React.Fragment>
        <h1>Stocks</h1>
        {stocks.map((stock) => 
            <Stock key={stock.id} stock={stock} />
        )}
    </React.Fragment>
  )
};

export default App;
