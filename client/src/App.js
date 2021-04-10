import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeStocks } from './reducers/stockReducer';

import Main from './pages/Main'
import Stock from './components/Stock/Stock'

const App = () => {
  const dispatch = useDispatch();
  const longs = useSelector((state) => state.stocks.long);
  const short = useSelector((state) => state.stocks.short);

  useEffect(() => {
    dispatch(initializeStocks());
  }, [dispatch]);

  console.log(longs);

  if(!longs) {
    return <div>Loading...</div>
  }

  return (
    <React.Fragment>
        <h1>Stocks</h1>
        {longs.map((stock) => 
            <Stock key={stock.id} stock={stock} />
        )}
    </React.Fragment>
  )
};

export default App;
