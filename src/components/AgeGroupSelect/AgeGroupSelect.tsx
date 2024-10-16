import React, { useState } from 'react';
import { Box, Select, Typography, MenuItem, SelectChangeEvent } from '@mui/material';

interface AgeGroupSelectProps {
  minValue: number;
  maxValue: number;
  onChange: (result: number[]) => void;
  error: string | null;
}

function AgeGroupSelect({ minValue, maxValue, onChange, error }: AgeGroupSelectProps) {
  const [minAge, setMinAge] = useState<number>(minValue);
  const [maxAge, setMaxAge] = useState<number>(maxValue);
  const handleMinChange = (event: SelectChangeEvent<number>) => {
    const newMinValue = event.target.value;
    setMinAge(parseFloat(newMinValue.toString()));
    onChange([parseFloat(newMinValue.toString()), maxAge]);
  };

  const handleMaxChange = (event: SelectChangeEvent<number>) => {
    const newMaxValue = event.target.value;
    setMaxAge(parseFloat(newMaxValue.toString()));
    onChange([minAge, parseFloat(newMaxValue.toString())]);
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
          error={error === 'hasOverlap'}
          value={minAge}
          onChange={handleMinChange}
          size='small'
          sx={{ borderRadius: '4px 0 0 4px', marginRight: '-1px', width: 100 }}
        >
          {generateOptions(0, maxAge).map((value) => (
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
          error={error === 'hasOverlap'}
          value={maxAge}
          onChange={handleMaxChange}
          size='small'
          sx={{ borderRadius: '0 4px 4px 0', marginLeft: '-1px', width: 100 }}
        >
          {generateOptions(minAge, 20).map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </Box>
      {error === 'hasOverlap' && (
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
