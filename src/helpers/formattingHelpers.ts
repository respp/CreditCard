// helpers/formattingHelpers.ts
export const formatCardNumber = (value: string): string => {
    // Lógica para formatear el número de tarjeta
    const cleanedCardNumber = value.replace(/[^\d]/g, '').slice(0, 16);
  return cleanedCardNumber.replace(/(.{4})/g, '$1 ').trim();
  };
  
  export const formatExpirationDate = (value: string): string => {
    // Lógica para formatear la fecha de vencimiento
    const cleanedExpirationDate = value.replace(/[^\d]/g, '').slice(0, 4);//5
  return cleanedExpirationDate.replace(/(.{2})/, '$1/').trim();
  };
  