import React, { useState } from 'react';
import { TextField, Typography, Box } from '@mui/material';
import addComma from '../../utils/addComma';
import { validatePrice, formatPrice } from '../../utils/validatePrice';

interface PriceInputProps {
  cost: string;
  onChange: (price: string) => void;
}
function PriceInput({ cost, onChange }: PriceInputProps) {
  const [price, setPrice] = useState(cost);
  const [warning, setWarning] = useState('');

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const warningMessage = validatePrice(inputValue);

    setWarning(warningMessage);

    const formattedPrice = formatPrice(inputValue, addComma);
    setPrice(formattedPrice);
    onChange(formattedPrice);
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', textAlign: 'left' }}>
      <Typography variant='body2' gutterBottom color='text.secondary'>
        入住費用 (每人每晚)
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <Box
          sx={{
            bgcolor: '#F5F5F5',
            p: 1,
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            mr: '-9px',
            border: '1px solid #CECECE',
            color: '#646464',
            boxSizing: 'border-box',
            height: 40,
          }}
        >
          <Typography variant='body1'>TWD</Typography>
        </Box>
        <TextField
          error={Boolean(warning)}
          fullWidth
          variant='outlined'
          placeholder='請輸入費用'
          value={price}
          onChange={handlePriceChange}
          size='small'
          sx={{ marginLeft: '8px' }}
          slotProps={{ input: { sx: { borderRadius: '0 4px 4px 0' } } }}
        />
      </Box>
      {warning && (
        <Box
          sx={{
            bgcolor: '#F6EBE8',
            borderRadius: '4px',
            padding: '4px 0px 4px 8px',
            textAlign: 'left',
          }}
        >
          <Typography variant='body2' color='error'>
            {warning === 'noEmpty' ? '不可以為空白' : '小數點最後一位不能為 0'}
          </Typography>
        </Box>
      )}

      <Box display='flex' justifyContent='flex-end'>
        <Typography variant='body2' color='text.secondary'>
          輸入 0 表示免費
        </Typography>
      </Box>
    </Box>
  );
}

export default PriceInput;
