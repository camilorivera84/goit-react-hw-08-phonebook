// LoginForm.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, selectIsLoggedIn } from './UserSlice';

const LoginForm = ({ isVisible }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (isLoggedIn) {
      // El usuario ya está registrado
      return;
    }

    // Realizar la solicitud a la API para autenticar al usuario
    try {
      const response = await fetch(
        'https://connections-api.herokuapp.com/users/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: {
              name,
              password,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        dispatch(loginUser(name, token));
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al autenticar al usuario:', error);
      alert('Error al autenticar al usuario');
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
            <button onClick={handleLogin}>Login</button>
          </div>
        )}
      </div>
    )
  );
};

export default LoginForm;
