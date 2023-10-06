import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from '../redux/ContactsSlice';
import userReducer from '../components/UserSlice'; // Asegúrate de importar el reducer del usuario

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    user: userReducer, // Agrega el reducer del usuario
  },
});
