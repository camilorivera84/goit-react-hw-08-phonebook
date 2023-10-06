import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilterValue } from '../redux/ContactsSlice';

const Filter = () => {
  const dispatch = useDispatch();

  const handleFilterChange = e => {
    dispatch(setFilterValue(e.target.value)); // Esto debe actualizar el filtro en el estado de Redux
  };

  return (
    <div>
      <label htmlFor="filter">Filter contacts by name or number:</label>
      <input type="text" id="filter" onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
