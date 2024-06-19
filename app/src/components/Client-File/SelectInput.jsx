import React from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { Box, Chip } from '@mui/joy';

function SelectInput({ label, options, selectedValue, onChange }) {
  return (
    <Select
      multiple
      value={selectedValue}
      onChange={onChange}
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', gap: '0.25rem' }}>
          {selected.map((selectedOption) => (
            <Chip key={selectedOption} variant="soft" color="dark">
              {options.find(option => option.value === selectedOption).label}
            </Chip>
          ))}
        </Box>
      )}
      sx={{
        minWidth: '15rem',
      }}
      slotProps={{
        listbox: {
          sx: {
            width: '100%',
          },
        },
      }}
    >
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
}

export default SelectInput;
