import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, loginUser } from './UserSlice';

const RegisterForm = ({ isVisible }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (isLoggedIn) {
      // El usuario ya está registrado
      return;
    }

    // Aquí deberías tener tu lógica real de validación
    // Por ejemplo, podrías hacer una llamada a una API para verificar los datos

    const validUser = true; // Reemplaza esto con tu lógica de validación de usuario

    if (validUser) {
      dispatch(loginUser(name));
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    isVisible && (
      <div>
        {!isLoggedIn && (
          <div>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button onClick={handleRegister}>Register</button>
          </div>
        )}

        {isLoggedIn && (
          <div>
            <p>Welcome, {name}!</p>
          </div>
        )}
      </div>
    )
  );
};

export default RegisterForm;
