import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import AgeGroupSelect from '../AgeGroupSelect';
import PriceInput from '../PriceInput';
import getNumberIntervals from '../../utils/getNumberIntervals';

interface AgeGroupPriceListProps {
  onChange: (result: {}[]) => void;
}

function AgeGroupPriceList({ onChange }: AgeGroupPriceListProps) {
  const [ageGroups, setAgeGroups] = useState([{ ageGroup: [0, 20], price: '0' }]);
  const [error, setError] = useState<string | null | boolean[]>(null);
  const addAgeGroup = () => {
    setAgeGroups([...ageGroups, { ageGroup: [0, 20], price: '0' }]);
  };

  const validateGroups = (groups: { ageGroup: number[]; price: string }[]) => {
    const intervals = groups.map((group) => group.ageGroup);
    const { overlap } = getNumberIntervals(intervals);

    const overlapGroups = groups.map((group) =>
      overlap.some(
        (range) =>
          (group.ageGroup[0] >= range[0] && group.ageGroup[0] <= range[1]) ||
          (group.ageGroup[1] >= range[0] && group.ageGroup[1] <= range[1]) ||
          (group.ageGroup[0] <= range[0] && group.ageGroup[1] >= range[1]),
      ),
    );

    const hasEmptyPrice = groups.some((group) => group.price === '');

    if (overlapGroups) {
      setError(overlapGroups);
    } else if (hasEmptyPrice) {
      setError('hasEmptyPrice');
    } else {
      setError(null);
    }
  };
  const handleGroupChange = (index: number, newAgeGroup: number[]) => {
    const updatedGroups = [...ageGroups];
    updatedGroups[index].ageGroup = newAgeGroup;
    setAgeGroups(updatedGroups);
    validateGroups(updatedGroups);
    onChange(ageGroups);
  };

  const handlePriceChange = (index: number, newPrice: string) => {
    const updatedGroups = [...ageGroups];
    updatedGroups[index].price = newPrice;
    setAgeGroups(updatedGroups);
    onChange(ageGroups);
  };

  const allAgesCovered = () => {
    const intervals = ageGroups.map((group) => group.ageGroup);
    const { notInclude } = getNumberIntervals(intervals);
    return notInclude.length === 0;
  };

  return (
    <>
      {ageGroups.map((group, index) => (
        <Box textAlign='left' display='flex' gap='16px' flexDirection='column'>
          <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography variant='body2' color='text.primary'>
              價格設定 - {index + 1}
            </Typography>
            <Button
              onClick={() => setAgeGroups(ageGroups.filter((_, i) => i !== index))}
              color='error'
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
        </Box>
      ))}
      {error && <Typography color='error'>{error}</Typography>}

      <Button
        sx={{ color: '#00AEA4', width: 'fit-content' }}
        onClick={addAgeGroup}
        disabled={allAgesCovered()}
      >
        ＋新增價格設定
      </Button>
    </>
  );
}

export default AgeGroupPriceList;
