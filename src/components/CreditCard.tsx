import React, { useState, ChangeEvent } from 'react';
import { formatCardNumber, formatExpirationDate } from '../helpers/formattingHelpers';
import { getCardType } from '../helpers/creditCardHelpers';
import { isValidCardHolder } from '../helpers/validationHelpers';
import CardForm from './CardForm';


// Credit Card Styles
interface CreditCardStyle{
  backgroundColor: string
}

// Card Images
interface CardImages {
  [key: string]: string;
}


//Credit Card Props
interface CreditCardProps {
  cardNumber: string;
  cardHolder: string;
  expirationDate: string;
  cvv: string;
  cardType: string;
  cardStyle: CreditCardStyle;
  cardImage: string
  warning: string;
}

// Initialization Styles for card
const initialCardStyle: CreditCardStyle = {
  backgroundColor: 'linear-gradient(45deg, #0045c7, #ff2c7d)',
}


const getCardStyle = (cardType: string): CreditCardStyle => {
  switch (cardType) {
    case 'Visa':
      return { 
        backgroundColor: 'linear-gradient(45deg, #0045c7, #ff2c7d)',
        
      };
    case 'Mastercard':
      return {
        backgroundColor: 'linear-gradient(45deg, #ffcc00, #cc0000)',
      };
    case 'American Express':
      return { 
        backgroundColor: 'linear-gradient(45deg, #3498db, #e74c3c)', 
      };
    default:
      return initialCardStyle;
  }
};

export const CreditCard: React.FC<CreditCardProps> = ({
  cardNumber, 
  cardHolder, 
  expirationDate, 
  cvv, 
  cardType,
  cardStyle,
}) => {
  const [state, setState] = useState<CreditCardProps>({
     cardNumber,
     cardHolder, 
     expirationDate, 
     cvv, 
     cardType, 
     cardStyle: cardStyle || getCardStyle(cardType),
     cardImage: cardImage || cardImages[cardType] || '',
    });
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
          const newCardType = e.target.value
          const newCardStyle = getCardStyle(newCardType);
        }
        break;
      default:
        break;
    } 
  };

  console.log('imagen:'+ state.cardImage)
  return (
  <div className="container">
    <div className="card">
        <div className="card-inner">
            <div className="front" style={{ 
            background: state.cardStyle.backgroundColor //Color
            }}>
                <img className='map-image' alt="map" style={{
                  backgroundImage: state.cardImage //Background Image
                  }} />
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

        <div className="back" style={{ 
            background: state.cardStyle.backgroundColor 
            }}>
           <img className='map-image' src={mapImage} alt="map" />
            <div className="bar"></div>
                <div className="row">
                      <div>
                        <img className='pattern' src={pattern} alt="patterns" />
                      </div>
                      <div className="cvv">{state.cvv || 'CVV'}</div>
                </div>
                <div className="row-logo">
                      <img className='logo-visa' src={logoVisa} alt="chip" />
                </div>
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
