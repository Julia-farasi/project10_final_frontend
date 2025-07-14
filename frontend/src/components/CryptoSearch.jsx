import Select from "react-select";
import cryptoMap from "../data/cryptoTickerMap.json";
import "../styles/ReactSelect.css";
import "../styles/StockDisplay.css";

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

const CryptoSearch = ({ onSymbolSelect }) => {
  const options = cryptoMap.cryptocurrencies.flatMap((coin) => [
    {
      value: `${coin.symbol.split("/")[0]}/EUR`,
      label: `${coin.symbol.split("/")[0]}/EUR - ${coin.name}`,
    },
    {
      value: `${coin.symbol.split("/")[0]}/USD`,
      label: `${coin.symbol.split("/")[0]}/USD - ${coin.name}`,
    },
  ]);

  const handleChange = (selectedOption) => {
    if (selectedOption) {
      onSymbolSelect(selectedOption.value);
    }
  };

  return (
    <div className="select-container font-mono">
      <h3>Wähle eine Kryptowährung:</h3>
      <Select
        options={options}
        onChange={handleChange}
        placeholder="Suche Kryptowährung..."
        isClearable
        className="select-container text-sm"
        classNamePrefix="select"
        styles={customStyles}
      />
    </div>
  );
};

export default CryptoSearch;
