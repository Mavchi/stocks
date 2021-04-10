import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeUser } from './reducers/userReducer'
import { Switch, Route } from 'react-router-dom'

import Main from './pages/Main/Main'
import LogIn from './pages/LogIn/LogIn'
import Header from './components/Header/Header'

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  if (!user) {
    return <LogIn />
  }

  return (
    <React.Fragment>
        <Header />

        <Switch>
          <Route path="/">
            <Main />
          </Route>
        </Switch>

        
    </React.Fragment>
  )
};

export default App;
