import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts, deleteContact } from './ContactsSlice';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => {
    const filter = state.contacts.filter.toLowerCase();
    console.log('Lista de contactos actualizada:', state.contacts.items);
    return state.contacts.items.filter(
      contact =>
        contact.name.toLowerCase().includes(filter) ||
        contact.phone.includes(filter)
    );
  });

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <div>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.name} - {contact.phone}
            <button onClick={() => handleDeleteContact(contact.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
