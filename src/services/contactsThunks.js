import { createAsyncThunk } from '@reduxjs/toolkit';
import * as contactsAPI from '../path-to/contactsAPI';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    try {
      const data = await contactsAPI.getContacts();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const addNewContact = createAsyncThunk(
  'contacts/addNewContact',
  async newContact => {
    try {
      const data = await contactsAPI.addContact(newContact);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const removeContact = createAsyncThunk(
  'contacts/removeContact',
  async contactId => {
    try {
      await contactsAPI.deleteContact(contactId);
      return contactId;
    } catch (error) {
      throw error;
    }
  }
);
