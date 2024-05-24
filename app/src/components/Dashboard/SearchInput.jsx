import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const SearchInput = ({ options, onFilter }) => {
  // onFilter('e', 'v');


  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      sx={{ width: 800 }}
      onChange={(e, v) => {onFilter(e, v)}}
      renderInput={(params) => <TextField {...params} label="Les Communes" />}
    />
  );
};

export default SearchInput;
