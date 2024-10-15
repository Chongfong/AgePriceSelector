import React, { useState } from 'react';
import { Box, Select, Typography, MenuItem, SelectChangeEvent } from '@mui/material';

function AgeGroupSelect() {
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(6);
  const [warningMin] = useState(true);
  const [warningMax] = useState(false);

  const handleMinChange = (event: SelectChangeEvent<number>) => {
    setMinValue(event.target.value as number);
  };

  const handleMaxChange = (event: SelectChangeEvent<number>) => {
    setMaxValue(event.target.value as number);
  };

  const generateOptions = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Typography variant='body2' gutterBottom color='text.secondary'>
        年齡
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Select
          value={minValue}
          onChange={handleMinChange}
          error={warningMin}
          size='small'
          sx={{ borderRadius: '4px 0  0 4px', marginRight: '-1px' }}
        >
          {generateOptions(0, maxValue).map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
        <Typography
          variant='body1'
          sx={{
            bgcolor: '#F5F5F5',
            p: 1,
            border: '1px solid #CECECE',
            color: '#646464',
            boxSizing: 'border-box',
            height: 40,
          }}
        >
          ~
        </Typography>
        <Select
          value={maxValue}
          onChange={handleMaxChange}
          size='small'
          sx={{ borderRadius: '0 4px 4px 0', marginLeft: '-1px' }}
          error={warningMax}
        >
          {generateOptions(minValue, 20).map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </Box>
      {(warningMin || warningMax) && (
        <Box
          sx={{
            bgcolor: '#F6EBE8',
            borderRadius: '4px',
            padding: '4px 0px 4px 8px',
            textAlign: 'left',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Typography variant='body2' color='error'>
            年齡區間不可重疊
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default AgeGroupSelect;
