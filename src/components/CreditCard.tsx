import React, { useState, ChangeEvent } from 'react';
import { formatCardNumber, formatExpirationDate } from '../helpers/formattingHelpers';
import { getCardType } from '../helpers/creditCardHelpers';
import { isValidCardHolder } from '../helpers/validationHelpers';
import CardForm from './CardForm';
import chipImage from "../assets/chip.png";
import logoVisa from "../assets/visa.png";
import mapImage from "../assets/map.png";
import pattern from "../assets/pattern.png";

interface CreditCardProps {
  cardNumber: string;
  cardHolder: string;
  expirationDate: string;
  cvv: string;
  cardType: string
}

export const CreditCard: React.FC<CreditCardProps> = ({ cardNumber, cardHolder, expirationDate, cvv, cardType }) => {
  const [state, setState] = useState<CreditCardProps>({ cardNumber, cardHolder, expirationDate, cvv, cardType });
  const [warning, setWarning] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    switch (name) {
      case 'cardNumber':
        if (e.target instanceof HTMLInputElement) {
        const cleanedCardNumber: string = formatCardNumber(value);
        const firstDigit = cleanedCardNumber.charAt(0);

        let newCardType = getCardType(cleanedCardNumber, firstDigit);

        setState((prevState) => ({ ...prevState, cardNumber: cleanedCardNumber, cardType: newCardType }));
        }
        break;
      case 'cardHolder':
        if (e.target instanceof HTMLInputElement) {
          const trimmedCardHolder: string = value.slice(0, 26)

          if (isValidCardHolder(trimmedCardHolder) !== true) {
            setWarning('You cannot input numbers');
          } else {
            setWarning('');
            setState((prevState) => ({ ...prevState, cardHolder: trimmedCardHolder.toUpperCase() }));
          }

        }
        break;
      case 'expirationDate': //MICA ME HIZO ACORDAR QUE TENGO QUE PONERLE LIMITE
        if (e.target instanceof HTMLInputElement) {
          const trimmedExpirationDate: string = formatExpirationDate(value)

        setState((prevState) => ({ ...prevState, expirationDate:trimmedExpirationDate }));
        }
        break;
      case 'cvv':
        if (e.target instanceof HTMLInputElement) {
        setState((prevState) => ({ ...prevState, cvv: value.replace(/[^\d]/g, '').slice(0, 3) }));
        }
        break;
      case 'cardType':
        if (e.target instanceof HTMLSelectElement) {
        console.log(e.target.value)
        setState((prevState) => ({ ...prevState, cardType: value }));
        }
        break;
      default:
        break;
    }
  };

  return (
  <div className="container">
    <div className="card">
        <div className="card-inner">
            <div className="front">
                <img className='map-image' src={mapImage} alt="map" />
                <div className="row">
                    <img className='chip-image' src={chipImage} alt="chip" />
                    <img className='logo-visa' src={logoVisa} alt="chip" />
                </div>
            <div className="card-number">{state.cardNumber || '#### #### #### ####'}</div>
            <div className="card-info">
                <div className="card-holder">{state.cardHolder || 'CARD HOLDER'}</div>
                <div className="expiration-date">{state.expirationDate || 'MM/YY'}</div>
            </div>
            {/* Cierre de front */}
            </div>

        <div className="back">
           <img className='map-image' src={mapImage} alt="map" />
            <div className="bar"></div>
                <div className="row">
                      <div>
                        <img className='pattern' src={pattern} alt="patterns" />
                      </div>
                      <div className="cvv">{state.cvv || 'CVV'}</div>
                </div>
                      <img className='logo-visa' src={logoVisa} alt="chip" />
        </div>


      {/* Cierre de card-inner */}
      </div>
    </div>

      <CardForm
        onInputChange={handleInputChange}
        cardNumber={state.cardNumber}
        cardHolder={state.cardHolder}
        expirationDate={state.expirationDate}
        cvv={state.cvv}
        cardType={state.cardType}
        warning={warning}
      />

      </div>
  );
};
