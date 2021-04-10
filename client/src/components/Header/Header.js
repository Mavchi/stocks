import React from 'react'
import { useDispatch } from 'react-redux'
import { userLogOut } from '../../reducers/userReducer'
import { container, btn } from './Header.module.scss'

const Header = () => {
    const dispatch = useDispatch()

    return (
        <React.Fragment>
            <div className={container}>
                <button className={btn}onClick={() => dispatch(userLogOut())}>Log Out</button>
            </div>
        </React.Fragment>
    )
}

export default Header