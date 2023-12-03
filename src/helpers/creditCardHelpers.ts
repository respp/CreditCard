// helpers/creditCardHelpers.ts
export const getCardType = (cleanedCardNumber: string, firstDigit: string): string => {
    // Lógica para determinar el tipo de tarjeta (Visa, Mastercard, etc.)
  
    if (cleanedCardNumber.length === 16 && firstDigit === '4') {
      return 'Visa';
    } else if (cleanedCardNumber.length === 16 && firstDigit === '5') {
      return 'Mastercard';
    } else if (cleanedCardNumber.length === 15 && firstDigit === '3') {
      return 'American Express';
    }
  
    return 'Unknown'; // Devuelve 'Desconocido' si no coincide con ningún tipo conocido
  };
  