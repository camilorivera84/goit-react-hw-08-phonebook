import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts, selectIsLoading, selectError } from '../ContactsSlice';

import ContactForm from '../ContactForm';
import Filter from '../Filter';
import ContactList from '../ContactList';

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>
        Contacts
        {isLoading && <span> [Loading...]</span>}
        {error && <span> [Error:{error}.not Found]</span>}
      </h2>
      <Filter />
      <ContactList />
    </div>
  );
}

export default App;
