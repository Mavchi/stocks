import stockServices from '../services/stocks';

const stockReducer = (state = [], action) => {
  switch (action.type) {
    case 'STOCK_INIT':
      return action.data;
    default:
      return state;
  }
};

export const initializeStocks = () => {
  return async dispatch => {
    const stocks = await stockServices.getAll();
    dispatch({
      type: 'STOCK_INIT',
      data: stocks,
    });
  };
};

export default stockReducer;
