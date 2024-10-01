import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const RegisterPage = () => {
  const { register, message } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      register(email, password);
    } else {
      alert('Las contraseñas no coinciden');
    }
  };

  return (
    <div className="register-form-container">
      <div className="d-flex justify-content-center">
        <h2>Registro</h2>
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
        <div className="form-group">
          <label>Confirmar Contraseña:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-dark btn-lg" type="submit">Registrar</button>
        </div>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default RegisterPage;
