import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/UserSlice'; // Asumiendo que tienes un slice para el usuario

const UserMenu = ({ email }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser()); // Acción para cerrar sesión
  };

  return (
    <div>
      <p>{email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserMenu;
