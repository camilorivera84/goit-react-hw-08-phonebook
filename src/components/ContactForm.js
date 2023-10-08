import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from './ContactsSlice';
import { addContact as addContactAPI } from '../components/ContactsAPI'; // Importa la función addContact de contactsAPI

const ContactForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const formatPhoneNumber = value => {
    // Eliminar guiones y espacios en blanco existentes
    const phoneNumber = value.replace(/[-\s]/g, '');

    // Aplicar el formato xxx-xxx-xxxx
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 6) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    } else {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
        3,
        6
      )}-${phoneNumber.slice(6, 10)}`;
    }
  };

  const handleNumberChange = e => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    setNumber(formattedNumber);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const phoneNumberRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (!phoneNumberRegex.test(number.trim())) {
      setErrorMessage('El número debe estar en el formato xxx-xxx-xxxx');
      return;
    }

    const newContact = { name, phone: number };
    console.log('Nuevo contacto:', newContact);
    try {
      // Llama a la función addContact de contactsAPI
      const data = await addContactAPI(newContact);
      console.log('Respuesta de la API:', data);
      dispatch(addContact(data)); // Dispatch la acción para agregar el contacto en Redux
    } catch (error) {
      console.error('Error al agregar el contacto:', error);
    }

    setName('');
    setNumber('');
    setErrorMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <label htmlFor="number">Phone Number:</label>
        <input
          type="text"
          id="number"
          value={number}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">Add Contact</button>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default ContactForm;
