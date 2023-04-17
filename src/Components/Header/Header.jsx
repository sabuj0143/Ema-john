import React, { useContext } from 'react';
import './Header.css'
import logo from '../..//../images/Logo.svg'
import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
const Header = () => {
    const {user, logOut} = useContext(AuthContext)

    const handleLogOut = () => {
        logOut()
        .then(result => { })
        .catch(error => {
            console.error(error);
        })
    }
     return (
        <div className='header'>
              <img src={logo} alt=""/>
           <nav>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                {
                    user && <span>Welcome{user.email} <button onClick={handleLogOut}>Sign Out</button></span>
                }
           </nav>
        </div>
    );
};

export default Header;