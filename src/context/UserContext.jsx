import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [email, setEmail] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Función para obtener el perfil del usuario
  const getUserProfile = async () => {
    if (!token) return;

    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setEmail(data.email);
      } else {
        console.error('Error obteniendo perfil:', data.message);
        setMessage('Error obteniendo perfil');
      }
    } catch (error) {
      console.error('Error en el servidor:', error);
      setMessage('Error en el servidor');
    }
  };

  // Función para hacer login
  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        setEmail(data.email);
        navigate('/home');
      } else {
        setMessage(data.message || 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      setMessage('Error en la conexión con el servidor');
    }
  };

  // Función para hacer registro
  const register = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        setEmail(data.email);
        navigate('/home');
      } else {
        setMessage(data.message || 'Error al registrarse');
      }
    } catch (error) {
      setMessage('Error en la conexión con el servidor');
    }
  };

  // Función para hacer logout
  const logout = () => {
    setToken(null);
    setEmail(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Efecto para obtener el perfil si hay un token válido
  useEffect(() => {
    if (token) {
      getUserProfile();
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ token, email, message, login, register, getUserProfile, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
