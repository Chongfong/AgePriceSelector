import { Box, Button, Divider, Typography } from '@mui/material';
import React, { useState } from 'react';
import AgeGroupSelect from '../AgeGroupSelect';
import PriceInput from '../PriceInput';
import { validateGroups, allAgesCovered } from '../../utils/ageGroupPriceUtils';

interface AgeGroupPriceListProps {
  onChange: (result: { ageGroup: number[]; price: string }[]) => void;
}

function AgeGroupPriceList({ onChange }: AgeGroupPriceListProps) {
  const [ageGroups, setAgeGroups] = useState([{ ageGroup: [0, 20], price: '0' }]);
  const [error, setError] = useState<string | null | boolean[]>(null);

  const handleGroupChange = (index: number, newAgeGroup: number[]) => {
    const updatedGroups = [...ageGroups];
    updatedGroups[index].ageGroup = newAgeGroup;
    setAgeGroups(updatedGroups);
    const validationResult = validateGroups(updatedGroups);
    setError(validationResult);
    onChange(ageGroups);
  };

  const handlePriceChange = (index: number, newPrice: string) => {
    const updatedGroups = [...ageGroups];
    updatedGroups[index].price = newPrice;
    setAgeGroups(updatedGroups);
    onChange(ageGroups);
  };

  const addAgeGroup = () => {
    setAgeGroups([...ageGroups, { ageGroup: [20, 20], price: '0' }]);
    const validationResult = validateGroups([...ageGroups, { ageGroup: [20, 20], price: '0' }]);
    setError(validationResult);
  };

  const deleteAgeGroup = (index: number) => {
    setAgeGroups(ageGroups.filter((_, i) => i !== index));
    const validationResult = validateGroups(ageGroups.filter((_, i) => i !== index));
    setError(validationResult);
  };

  return (
    <Box display='flex' justifyContent='flex-start' flexDirection='column'>
      {ageGroups.map((group, index) => (
        <Box
          key={group.ageGroup.toString()}
          textAlign='left'
          display='flex'
          gap='16px'
          flexDirection='column'
          padding={1}
        >
          <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography variant='body1' color='text.primary'>
              價格設定 - {index + 1}
            </Typography>
            <Button
              onClick={() => deleteAgeGroup(index)}
              color='error'
              disabled={ageGroups.length === 1}
            >
              × 移除
            </Button>
          </Box>
          <Box mb={2} display='flex' gap='16px'>
            <AgeGroupSelect
              minValue={group.ageGroup[0]}
              maxValue={group.ageGroup[1]}
              onChange={(newAgeGroup) => handleGroupChange(index, newAgeGroup)}
              error={error && error[index] ? 'hasOverlap' : null}
            />
            <PriceInput
              cost={group.price}
              onChange={(newPrice) => handlePriceChange(index, newPrice)}
            />
          </Box>
          {index !== ageGroups.length - 1 && <Divider />}
        </Box>
      ))}
      {error && <Typography color='error'>{error}</Typography>}
      <Button
        sx={{ color: '#00AEA4', width: 'fit-content' }}
        onClick={addAgeGroup}
        disabled={allAgesCovered(ageGroups)}
      >
        ＋新增價格設定
      </Button>
    </Box>
  );
}

export default AgeGroupPriceList;
