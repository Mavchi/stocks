import loginServices from '../services/login';
import { setToken } from '../services/token'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'USER_SET':
      return action.data
    default:
      return state;
  }
};

export const initializeUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedStockUser_SW');
        let user = null
        if (loggedUserJSON) {
            user = JSON.parse(loggedUserJSON)
            setToken(user.token)
        }
        dispatch({
          type: 'USER_SET',
          data: user,
        });
    }
}

export const userLogin = (loginData) => {
  return async dispatch => {
    let user = null;
    try {
      user = await loginServices.login(loginData);

      window.localStorage.setItem('loggedStockUser_SW', JSON.stringify(user));
      setToken(user.token)
      dispatch({
        type: 'USER_SET',
        data: user,
      });
    } catch (error) {
      console.log('fail:', error);
      dispatch({
        type: 'USER_SET',
        data: null,
      });
    }
  };
};

export const userLogOut = () => {
    return async dispatch => {
        window.localStorage.removeItem('loggedStockUser_SW');
        setToken(null)
        dispatch({
            type: 'USER_SET',
            data: null,
        })
    }
}

export default userReducer;
