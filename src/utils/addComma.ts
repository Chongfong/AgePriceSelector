export default function addComma(number: string) {
  const cleanedNumber = number.replace(/[^\d.-]/g, '');
  const sanitizedNumber = cleanedNumber.replace(/(?!^)[-]/g, '');
  const parts = sanitizedNumber.split('.');
  const integerPart = parts[0];
  const decimalPart = parts.slice(1).join('');
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
}
