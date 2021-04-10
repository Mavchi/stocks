import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userLogin } from '../../reducers/userReducer'

const LogIn = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogIn = async (event) => {
        event.preventDefault()
        await dispatch(userLogin({ username, password }))
        if (!user) {
            console.log('couldnt log in')
        } else {
            setUsername('');
            setPassword('');
        }
    }

    return (
      <React.Fragment>
        <form onSubmit={handleLogIn}>
          Username: <input type="email" value={username} onChange={(event) => setUsername(event.target.value)} />
          Password: <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          <button type="submit">Log In</button>
        </form>
      </React.Fragment>
    );
}

export default LogIn