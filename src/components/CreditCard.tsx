import React, { useState, ChangeEvent, useEffect } from 'react';
import { formatCardNumber, formatExpirationDate } from '../helpers/formattingHelpers';
import { getCardType } from '../helpers/creditCardHelpers';
import { isValidCardHolder } from '../helpers/validationHelpers';
import CardForm from './CardForm';
import { ICreditCardStyle } from '../interfaces/CreditCardStyle.interface';
import { ICreditCardProps } from '../interfaces/CreditCardProps.interface';
import { ICreditCardState } from '../interfaces/CreditCardState.interface';
import chipImage from "../assets/chip.png";
import pattern from "../assets/pattern.png";

import logoVisa from "../assets/visa.png";
import bgVisa from "../assets/map.png";

import logoAmericanExpress from "../assets/logo-american-express.png"
import bgAmericanExpress from "../assets/american-bg.png"
import chipImageAmericanExpress from "../assets/chip2.png"

import bgMastercard from "../assets/globe.png"
import logoMastercard from "../assets/mastercard.png"

const preloadImages = (imageObj: Record<string, string>) => {
  for (const key in imageObj) {
    if (Object.prototype.hasOwnProperty.call(imageObj, key)) {
      const img = new Image();
      img.src = imageObj[key];
    }
  }
};

const allCardImages = {
  bgVisa: bgVisa,
  bgMastercard: bgMastercard,
  bgAmericanExpress: bgAmericanExpress,
  logoVisa: logoVisa,
  logoAmericanExpress: logoAmericanExpress,
  logoMastercard: logoMastercard,
  chipImage: chipImage,
  chipImageAmericanExpress: chipImageAmericanExpress,
  pattern: pattern
};

preloadImages(allCardImages)

const initialCardStyle: ICreditCardStyle = {
  backgroundColor: 'linear-gradient(45deg, #0045c7, #ff2c7d)',
  backgroundImage: bgVisa,
  logoImage: logoVisa,
  opacity: '.3',
  margin: '100px 0 40px 0',
  chip: chipImage
}

const getCardStyle = (cardType: string): ICreditCardStyle => {
  switch (cardType) {
    case 'Visa':
      return { 
        backgroundColor: 'linear-gradient(45deg, #0045c7, #ff2c7d)',
        backgroundImage: bgVisa,
        logoImage: logoVisa,
        opacity: '.3',
        margin: '100px 0 40px 0',
        chip: chipImage
        
      };
    case 'Mastercard':
      return {
        backgroundColor: '#729fce',
        backgroundImage: bgMastercard,
        logoImage:logoMastercard,
        widthLogo: '100px',
        margin: '80px 0 40px 0',
        chip: chipImage,
      };
    case 'American Express':
      return { 
        backgroundColor: 'linear-gradient(30deg, #0C0F26, #E5E4C3)',
        backgroundImage: bgAmericanExpress,
        logoImage: logoAmericanExpress,
        widthLogo: '250px',
        opacity:'.78',
        margin: '100px 0 40px 0',
        marginRow:'7px 96px 0 0', 
        marginChip: '0',
        chip: chipImageAmericanExpress,
        fontColor: '#c0c0c0',
        fontWeight: 'bold',
        textShadow: '1px 1px 2px rgba(255, 255, 255, 0.3), 0 0 3em rgba(255, 255, 255, 0.3)'
      };
    default:
      return initialCardStyle;
  }
};

export const CreditCard: React.FC<ICreditCardProps> = ({ cardNumber, cardHolder, expirationDate, cvv, cardType }) => {
  const [state, setState] = useState<ICreditCardState>({ cardNumber, cardHolder, expirationDate, cvv, cardType, cardStyle:initialCardStyle });
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
          console.log(newCardType)
          setState((prevState) => ({ ...prevState, cardType: newCardType, cardStyle: newCardStyle }));
        }
        break;
      default:
        break;
    }
  };

  return (
<div className="all">    
  <div className="container">
    <div className="card" style={{
      color: state.cardStyle.fontColor,
      fontWeight: state.cardStyle.fontWeight,
      textShadow: state.cardStyle.textShadow,
      }}>
        <div className="card-inner">
            <div className="front" style={{ 
            background: state.cardStyle.backgroundColor,
            }}>
                <img className='bg-image' 
                src={state.cardStyle.backgroundImage} 
                style={{opacity: state.cardStyle.opacity}} 
                alt="background-image"
                loading="lazy"  />          

                <div className="row" style={{margin: state.cardStyle.marginRow}}>
                    <img className='chip-image' src={state.cardStyle.chip} alt="chip" style={{margin: state.cardStyle.marginChip}}/>
                    <img className='logo-img'
                     src={state.cardStyle.logoImage} 
                     alt="chip" 
                     style={{
                      width:state.cardStyle.widthLogo,
                      }}/>
                </div>
            <div className="card-number">{state.cardNumber || '#### #### #### ####'}</div>
            <div className="card-info" style={{margin:state.cardStyle.margin}}>
                <div className="card-holder">{state.cardHolder || 'CARD HOLDER'}</div>
                <div className="expiration-date">{state.expirationDate || 'MM/YY'}</div>
            </div>
            {/* Cierre de front */}
            </div>

        <div className="back" style={{ 
            background: state.cardStyle.backgroundColor
            }}>
              <img className='bg-image' 
              src={state.cardStyle.backgroundImage} 
              style={{opacity: state.cardStyle.opacity}} 
              alt="background-image" />

            <div className="bar"></div>
                <div className="row">
                      <div>
                        <img className='pattern' src={pattern} alt="patterns" />
                      </div>
                      <div className="cvv">{state.cvv || 'CVV'}</div>
                </div>
                <div className="row-logo">
                     <img className='logo-img'
                     src={state.cardStyle.logoImage} 
                     alt="chip" 
                     style={{
                      width:state.cardStyle.widthLogo,
                      }}/>
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
</div>
  );
};