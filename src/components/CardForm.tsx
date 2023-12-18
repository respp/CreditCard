import React, { useState } from 'react';
import { ICardFormProps } from '../interfaces/CardFormProps.interface';

const CardForm: React.FC<ICardFormProps> = ({
  onInputChange,
  cardNumber,
  cardHolder,
  expirationDate,
  cvv,
  cardType,
  warning,
}) => {
  const [isCvvInputFocused, setIsCvvInputFocused] = useState(false);
  const [isCardRotated, setIsCardRotated] = useState(false);

  const handleCvvInputFocus = () => {
    setIsCvvInputFocused(true);
    setIsCardRotated(true);
    // console.log('isCvvInputFocused:', isCvvInputFocused);
    // console.log('isCardRotated:', isCardRotated);
  };
  
  const handleCvvInputBlur = () => {
    setIsCvvInputFocused(false);
    setIsCardRotated(false);
    console.log('isCvvInputFocused:', isCvvInputFocused);
    console.log('isCardRotated:', isCardRotated);
  };
  

  return (
    // <div className={`card-data ${isCvvInputFocused ? 'cvv-input-focused' : ''}`}>
    <div className={`card-data ${isCardRotated ? 'card-rotated' : ''}`}>
      <input
        type="text"
        name="cardNumber"
        value={cardNumber}
        onChange={onInputChange}
      />
      <label className={`pl-card-number ${cardNumber.trim() !== '' ? 'placeholder-active' : ''}`}>Card Number</label>
      {warning && <div className="warning">{warning}</div>}
      <input
        type="text"
        name="cardHolder"
        value={cardHolder}
        onChange={onInputChange}
      />
      <label className={`pl-holder ${cardHolder.trim() !== '' ? 'placeholder-active' : ''}`}>Card Holder</label>
      <input
        type="text"
        name="expirationDate"
        value={expirationDate}
        onChange={onInputChange}
      />
      <label className={`pl-expiration ${expirationDate.trim() !== '' ? 'placeholder-active' : ''}`}>Expiration Date</label>
      <input
        type="text"
        name="cvv"
        value={cvv}
        onChange={onInputChange}
        onFocus={handleCvvInputFocus}
        onBlur={handleCvvInputBlur}
      />
      <label className={`pl-cvv ${cvv.trim() !== '' ? 'placeholder-active' : ''}`}>CVV</label>
      <select
        name="cardType"
        value={cardType}
        onChange={onInputChange}
      >
        <option value="Visa">Visa</option>
        <option value="Mastercard">Mastercard</option>
        <option value="American Express">American Express</option>
      </select>
    </div>
  );
};

export default CardForm;
