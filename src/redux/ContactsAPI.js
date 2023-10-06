// contactsAPI.js

export const getContacts = async () => {
  const response = await fetch(
    'https://64fb594fcb9c00518f7aefed.mockapi.io/contacts/contacts'
  );
  const data = await response.json();
  return data;
};

export const addContact = async newContact => {
  const response = await fetch(
    'https://64fb594fcb9c00518f7aefed.mockapi.io/contacts/contacts',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
    }
  );
  const data = await response.json();
  return data;
};

export const deleteContact = async id => {
  const response = await fetch(
    `https://64fb594fcb9c00518f7aefed.mockapi.io/contacts/contacts/${id}`,
    {
      method: 'DELETE',
    }
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(response.statusText);
  }
};
