import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeStocks } from '../../reducers/stockReducer';
import Stock from '../../components/Stock/Stock';

const Main = () => {
  const dispatch = useDispatch();
  const longs = useSelector((state) => state.stocks.long);
  const shorts = useSelector((state) => state.stocks.short);

  useEffect(() => {
    dispatch(initializeStocks());
  }, [dispatch]);

  if(!(longs || shorts)) {
      return <div>...Loading</div>
  }

  console.log(longs);

  return (
    <React.Fragment>
      <h1>Stocks</h1>
      {longs.map((stock) => (
        <Stock key={stock.id} stock={stock} />
      ))}
    </React.Fragment>
  );
};

export default Main;
