import { ICreditCardStyle } from "./CreditCardStyle.interface";
import { ICreditCardProps } from "./CreditCardProps.interface";

export interface ICreditCardState extends ICreditCardProps {
    cardStyle: ICreditCardStyle
  }  