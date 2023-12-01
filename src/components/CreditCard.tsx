import React, { useState, ChangeEvent } from 'react';

interface CreditCardProps {
  cardNumber: string;
  cardHolder: string;
  expirationDate: string;
  cvv: string;
  cardType: string
}

export const CreditCard: React.FC<CreditCardProps> = ({ cardNumber, cardHolder, expirationDate, cvv, cardType }) => {
  const [state, setState] = useState<CreditCardProps>({ cardNumber, cardHolder, expirationDate, cvv, cardType });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    switch (name) {
      case 'cardNumber':
        const cleanedCardNumber = value.replace(/[^\d]/g, '').slice(0, 16);
        const formattedCardNumber = cleanedCardNumber.replace(/(.{4})/g, '$1 ').trim()
        setState((prevState) => ({ ...prevState, cardNumber: formattedCardNumber }));
        break;
      case 'cardHolder':
        setState((prevState) => ({ ...prevState, cardHolder: value.toUpperCase() }));
        break;
      case 'expirationDate':
        setState((prevState) => ({ ...prevState, expirationDate: value.replace(/[^\d]/g, '').replace(/(.{2})/, '$1/') }));
        break;
      case 'cvv':
        setState((prevState) => ({ ...prevState, cvv: value.replace(/[^\d]/g, '') }));
        break;
      case 'cardType':
        setState((prevState) => ({ ...prevState, cardType: value }));
      break;
      default:
        break;
    }
  };

  return (
    <div className="credit-card">
      <div className="card-number">{state.cardNumber || '#### #### #### ####'}</div>
      <div className="card-info">
        <div className="card-holder">{state.cardHolder || 'CARD HOLDER'}</div>
        <div className="expiration-date">{state.expirationDate || 'MM/YY'}</div>
      </div>
      <div className="cvv">{state.cvv || 'CVV'}</div>
      <input
        type="text"
        name="cardNumber"
        placeholder="Card Number"
        value={state.cardNumber}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="cardHolder"
        placeholder="Card Holder"
        value={state.cardHolder}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="expirationDate"
        placeholder="Expiration Date"
        value={state.expirationDate}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="cvv"
        placeholder="CVV"
        value={state.cvv}
        onChange={handleInputChange}
      />
      <select
        name="cardType"
        value={state.cardType}
        onChange={handleInputChange}
        >
            <option value="Visa">Visa</option>
            <option value="Mastercard">Mastercard</option>
            <option value="American Express">American Express</option>
        </select>

    </div>
  );
};
