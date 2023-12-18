import { ChangeEvent } from "react";

export interface ICardFormProps {
    onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    cardNumber: string;
    cardHolder: string;
    expirationDate: string;
    cvv: string;
    cardType: string;
    warning: string;
  }