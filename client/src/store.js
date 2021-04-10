import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import stockReducer from './reducers/stockReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
    stocks: stockReducer,
    user: userReducer,
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store