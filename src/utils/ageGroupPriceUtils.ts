import getNumberIntervals from './getNumberIntervals';

export const validateGroups = (groups: { ageGroup: number[]; price: string }[]) => {
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
    return overlapGroups;
  }
  if (hasEmptyPrice) {
    return 'hasEmptyPrice';
  }
  return null;
};

export const allAgesCovered = (groups: { ageGroup: number[]; price: string }[]) => {
  const intervals = groups.map((group) => group.ageGroup);
  const { notInclude } = getNumberIntervals(intervals);
  return notInclude.length === 0;
};
