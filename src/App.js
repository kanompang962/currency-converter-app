import logo from './images/money.png';
import './App.css';
import Currency from './components/Currency';
import { useEffect, useState } from 'react';

function App() {
  const [currencyGenre, setCurrencyGenre] = useState([]);
  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('THB');
  const [amount, setAmount] = useState(1);
  const [rates, setRates] = useState(0);
  const [checkFromCurrency, setCheckFromCurrency] = useState(true);
  let amount1, amount2;

  const api = 'https://api.exchangerate-api.com/v4/latest/' + currency1;

  if (checkFromCurrency) {
    amount1 = amount;
    amount2 = (amount * rates).toFixed(2);
  } else {
    amount2 = amount;
    amount1 = (amount / rates).toFixed(2);
  }

  useEffect(() => {
    getApi();
  }, [currency1, currency2]);

  const getApi = () => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setCurrencyGenre([...Object.keys(data.rates)])
        setRates(data.rates[currency2]);
      })
  };

  const amount1Change = (e) => {
    setCheckFromCurrency(true);
    setAmount(e.target.value);
  }

  const amount2Change = (e) => {
    setCheckFromCurrency(false);
    setAmount(e.target.value);
  }

  return (
    <div className="App">
      <img src={logo} alt='logo'></img>
      <h1>แปลงสกุลเงิน (API)</h1>
      <div className='container'>
        <Currency
          currencyGenre={currencyGenre}
          selectCurrency={currency1}
          changeCurrency={(e) => setCurrency1(e.target.value)}
          amount={amount1}
          onChangeAmount={amount1Change}
        />
        <div className='equal'>=</div>
        <Currency
          currencyGenre={currencyGenre}
          selectCurrency={currency2}
          changeCurrency={(e) => setCurrency2(e.target.value)}
          amount={amount2}
          onChangeAmount={amount2Change}
        />
      </div>
    </div>
  );
}

export default App;
