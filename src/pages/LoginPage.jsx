import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const LoginPage = () => {
  const { login, message } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="login-form-container">
      <div className="d-flex justify-content-center">
        <h2>Login</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-dark btn-lg" type="submit">Iniciar Sesión</button>
        </div>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default LoginPage;
