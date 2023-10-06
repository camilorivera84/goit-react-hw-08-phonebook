// App.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn, logoutUser } from './UserSlice';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm'; // Asegúrate de tener un componente llamado LoginForm
import ContactList from './ContactList';

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleShowRegisterForm = e => {
    e.preventDefault();
    setShowRegisterForm(true);
    setShowLoginForm(false);
  };

  const handleShowLoginForm = e => {
    e.preventDefault();
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setShowRegisterForm(false);
    setShowLoginForm(false);
  };

  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          {!isLoggedIn && (
            <>
              <li>
                <a href="/register" onClick={handleShowRegisterForm}>
                  Register
                </a>
              </li>
              <li>
                <a href="/login" onClick={handleShowLoginForm}>
                  Login
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>

      <RegisterForm isVisible={showRegisterForm} />
      <LoginForm isVisible={showLoginForm} />

      {!isLoggedIn && !showRegisterForm && !showLoginForm && <div></div>}

      {isLoggedIn && (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <ContactList />
        </div>
      )}
    </div>
  );
};

export default App;
