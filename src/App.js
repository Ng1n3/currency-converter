import { useEffect, useState } from "react";

export default function App() {
  const [inputCurrency, setInputCurrency] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('GBP');
  const [output, setOutput] = useState('');

  useEffect(function () {
    async function fetchCurrency() {
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${inputCurrency}&from=${fromCurrency}&to=${toCurrency}`
        );
        const data = await res.json()
        const conversionRate = data.rates[toCurrency]
        setOutput(conversionRate)
      } catch (error) {
        console.error(error);
      }
    }
    fetchCurrency();
  }, [inputCurrency, fromCurrency, toCurrency]);
  return (
    <div>
      <input
        type="text"
        value={inputCurrency}
        onChange={(e) => setInputCurrency(Number(e.target.value))}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="NGN">NGN</option>
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="NGN">NGN</option>
      </select>
      <p>{output}{toCurrency}</p>
    </div>
  );
}
