import { useEffect, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { PrivateRoute } from './PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute';
import { refreshUser } from './redux/auth/operations';
import { useAuth } from '../components/hooks';
import ContactList from './ContactList';
import Filter from './Filter';
import { fetchContacts } from './ContactsSlice'; // Asegúrate de importar fetchContacts

const HomePage = lazy(() => import('./pages/Home'));
const RegisterPage = lazy(() => import('./pages/Register'));
const LoginPage = lazy(() => import('./pages/Login'));
const ContactForm = lazy(() => import('./ContactForm'));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
    dispatch(fetchContacts()); // Agrega esta línea para cargar los contactos al inicio
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectTo="/goit-react-hw-08-phonebook"
              component={<RegisterPage />}
            />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute
              redirectTo="/goit-react-hw-08-phonebook"
              component={<LoginPage />}
            />
          }
        />
        <Route
          path="/goit-react-hw-08-phonebook"
          element={
            <PrivateRoute redirectTo="/login" component={<ContactForm />}>
              <ContactList />
              <Filter />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
};
