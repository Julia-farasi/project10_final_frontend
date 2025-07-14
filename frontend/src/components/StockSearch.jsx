import AsyncSelect from "react-select/async";
import axios from "axios";
import "../styles/ReactSelect.css";

const customStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#1e293b",
    borderColor: state.isFocused ? "#81e4a7" : "#334155",
    boxShadow: state.isFocused ? "0 0 0 2px #81e4a7" : "none",
    color: "white",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#1e293b",
    zIndex: 20,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#334155" : "#1e293b",
    color: state.isFocused ? "#81e4a7" : "#f1f5f9",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#81e4a7",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#81e4a7",
  }),
};

const StockSearch = ({ onSymbolSelect }) => {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const loadOptions = async (inputValue) => {
    const search = inputValue || "AAPL"; // Wenn kein Input, z. B. AAPL als Default

    // const loadOptions = async (inputValue) => {
    //   if (!inputValue) return [];

    try {
      const res = await axios.get(
        `https://api.twelvedata.com/symbol_search?symbol=${search}&apikey=${API_KEY}`
      );

      if (!res.data || !res.data.data) return [];

      return res.data.data.map((item) => ({
        value: item.symbol,
        label: `${item.symbol} - ${item.instrument_name}`,
      }));
    } catch (error) {
      console.error("❌ Fehler beim Laden der Symbolsuche:", error);
      return [];
    }
  };

  const handleChange = (selectedOption) => {
    if (selectedOption) {
      onSymbolSelect(selectedOption.value);
    }
  };

  return (
    <div className="select-container">
      <h3 className="font-mono text-white mb-2">Wähle dein Wertpapier:</h3>
      <AsyncSelect
        loadOptions={loadOptions}
        defaultOptions
        onChange={handleChange}
        placeholder="Suche Aktie..."
        isClearable
        styles={customStyles}
        className="text-sm font-mono"
      />
    </div>
  );
};

export default StockSearch;
