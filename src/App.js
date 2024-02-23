import { useEffect, useState } from "react";

export default function App() {
  const [inputCurrency, setInputCurrency] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(
    function () {
      async function fetchCurrency() {
        try {
          setLoading(true);
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${inputCurrency}&from=${fromCurrency}&to=${toCurrency}`
          );
          const data = await res.json();
          const conversionRate = data.rates[toCurrency];
          setOutput(conversionRate);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
      if (fromCurrency === toCurrency) return setOutput(inputCurrency);
      fetchCurrency();
    },
    [inputCurrency, fromCurrency, toCurrency]
  );
  return (
    <div>
      <input
        type="text"
        value={inputCurrency}
        onChange={(e) => setInputCurrency(Number(e.target.value))}
        disabled={loading}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        disabled={loading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="NGN">NGN</option>
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        disabled={loading}
      >
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="CAD">CAD</option>
        <option value="NGN">NGN</option>
      </select>
      <p>
        {output}
        {toCurrency}
      </p>
    </div>
  );
}
