import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

const Profile = () => {
  const { email, getUserProfile, logout } = useContext(UserContext);

   useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  return (
    <div className="container text-center">
      <h1>Perfil de Usuario</h1>
      <p>Email: {email || 'Cargando...'}</p>
      <button className="btn btn-danger" onClick={logout}>Cerrar Sesión</button>
    </div>
  );
};

export default Profile;

