import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getContacts,
  addContact as addContactAPI,
  deleteContact as deleteContactAPI,
} from '../components/ContactsAPI';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await getContacts();
    return response;
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async newContact => {
    const response = await addContactAPI(newContact);
    return response;
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async id => {
    const response = await deleteContactAPI(id);
    return response;
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    filter: '',
    loading: false,
    error: null,
  },
  reducers: {
    setFilterValue: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
      });
  },
});

export const { setFilterValue } = contactsSlice.actions;

export const selectContacts = state => state.contacts.items;
export const selectFilter = state => state.contacts.filter;
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;

export default contactsSlice.reducer;
