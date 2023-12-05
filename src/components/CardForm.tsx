import React, { ChangeEvent, useState } from 'react';

interface CardFormProps {
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  cardNumber: string;
  cardHolder: string;
  expirationDate: string;
  cvv: string;
  cardType: string;
  warning: string;
}

const CardForm: React.FC<CardFormProps> = ({
  onInputChange,
  cardNumber,
  cardHolder,
  expirationDate,
  cvv,
  cardType,
  warning,
}) => {
  const [isCvvInputFocused, setIsCvvInputFocused] = useState(false);

  // Cuando el input asociado al CVV recibe el foco
  const handleCvvInputFocus = () => {
    setIsCvvInputFocused(true);
  };
  
  // Cuando el input asociado al CVV pierde el foco
  const handleCvvInputBlur = () => {
    setIsCvvInputFocused(false);
  };

  return (
    <div className={`card-data ${isCvvInputFocused ? 'cvv-input-focused' : ''}`}>
      <input
        type="text"
        name="cardNumber"
        placeholder="Card Number"
        value={cardNumber}
        onChange={onInputChange}
      />
      <input
        type="text"
        name="cardHolder"
        placeholder="Card Holder"
        value={cardHolder}
        onChange={onInputChange}
      />
      {warning && <div className="warning">{warning}</div>}
      <input
        type="text"
        name="expirationDate"
        placeholder="Expiration Date"
        value={expirationDate}
        onChange={onInputChange}
      />
      <input
        type="text"
        name="cvv"
        placeholder="CVV"
        value={cvv}
        onChange={onInputChange}
        onFocus={handleCvvInputFocus}
        onBlur={handleCvvInputBlur}
      />
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

