import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { token, logout } = useContext(UserContext);
  const { total } = useContext(CartContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">Pizzería Mamma Mia!</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/home">Home</Link>
          </li>
          {token ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-dark" 
                  onClick={logout}
                  style={{
                    height: '36px',
                    padding: '0 15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0px'
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
        <span className="navbar-text ml-auto">
          <Link to="/cart" className="btn btn-outline-info">🛒 Total: ${total.toLocaleString('es-CL')}</Link>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
