// import { Home } from './components/Home'
import { CreditCard } from './components/CreditCard'

function App() {

  return (
    <>
     <CreditCard 
      cardNumber = '123'
      cardHolder = '123'
      expirationDate = '12/23'
      cvv = '123'
      cardType = 'Visa'
     />
    </>
  )
}

export default App
