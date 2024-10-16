export const validatePrice = (inputValue: string): string => {
  if (
    !inputValue.trim() ||
    inputValue.trim() === '-' ||
    !/^[0-9.-]/.test(inputValue) ||
    (inputValue.trim() === '-' && !/[0-9]$/.test(inputValue))
  )
    return 'noEmpty';
  if (inputValue.includes('.')) {
    const decimalPart = inputValue.split('.')[1];
    if (
      decimalPart.endsWith('0') ||
      (decimalPart.slice(-2, -1) === '0' && !/[1-9]$/.test(decimalPart))
    ) {
      return 'decimalPartEndsWithZero';
    }
  }
  return '';
};

export const formatPrice = (inputValue: string, addComma: (value: string) => string): string => {
  if (!(inputValue.slice(0, 1) === '0' && inputValue.slice(1, 2) === '0')) {
    if (/^-?0+\d+(\.\d+)?$/.test(inputValue)) {
      return inputValue.replace(/^(-?)0+(\d)/, '$1$2');
    }
    if (
      inputValue === '-' ||
      inputValue === '' ||
      (inputValue.slice(-1) === '.' && inputValue.split('.').length <= 2)
    ) {
      return inputValue;
    }
    return addComma(inputValue.replaceAll(',', ''));
  }
  return '0';
};
