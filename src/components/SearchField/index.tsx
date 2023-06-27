import './index.scss';

import React from 'react';

type SearchFieldProps = React.InputHTMLAttributes<HTMLInputElement>;

const SearchField = ({ className, ...restProps }: SearchFieldProps) => {
  return (
    <input placeholder="Search" {...restProps} className={`search-field ${className}`} />
  );
};

export default SearchField;
