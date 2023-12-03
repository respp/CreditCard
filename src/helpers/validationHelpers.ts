// helpers/validationHelpers.ts
export const isValidCardHolder = (value: string): boolean => {
    // Lógica para validar el titular de la tarjeta
    const isAlphabetic = /^[a-zA-Z\s]*$/.test(value);
    const isWithinMaxLength = value.length <= 26;
    return isAlphabetic && isWithinMaxLength;
  };
  