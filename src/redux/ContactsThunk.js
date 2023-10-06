import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  const response = await fetch(
    'https://64fb594fcb9c00518f7aefed.mockapi.io/contacts/contacts'
  );
  return response.json();
});

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async contact => {
    return fetch(
      'https://64fb594fcb9c00518f7aefed.mockapi.io/contacts/contacts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      }
    ).then(response => response.json());
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async id => {
    return fetch(
      `https://64fb594fcb9c00518f7aefed.mockapi.io/contacts/contacts/${id}`,
      {
        method: 'DELETE',
      }
    ).then(() => id);
  }
);
