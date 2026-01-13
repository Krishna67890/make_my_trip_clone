// Components
import React from 'react';
import AdvancedSearchWidget from './AdvancedSearchWidget';

const SearchWidget = ({ type = 'flights', onSearch }) => {
  return (
    <AdvancedSearchWidget type={type} onSearch={onSearch} />
  );
};

export default SearchWidget;