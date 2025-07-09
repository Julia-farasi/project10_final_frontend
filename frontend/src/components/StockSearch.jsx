import Select from "react-select";
import tickerMap from "../data/tickerMap.json";
import "../styles/ReactSelect.css";
import "../styles/StockDisplay.css";
//--------
// MINIMALES override für dark-mode inline styles für react-select per JS-Override
const customStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#1e293b", // dunkelgrauer Hintergrund
    borderColor: state.isFocused ? "#81e4a7" : "#334155", // grün beim Fokus
    boxShadow: state.isFocused ? "0 0 0 2px #81e4a7" : "none",
    color: "white",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#1e293b", // Dropdown-Hintergrund dunkel
    zIndex: 20,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#334155" : "#1e293b",
    color: state.isFocused ? "#81e4a7" : "#f1f5f9", // grün beim Hover
  }),
  placeholder: (base) => ({
    ...base,
    color: "#81e4a7", // Platzhalter grünlich
  }),
  singleValue: (base) => ({
    ...base,
    color: "#81e4a7", // aktuell gewählter Wert
  }),
};
//-------
//  Komponente zum Auswählen eines Aktien-Symbols per Dropdown
const StockSearch = ({ onSymbolSelect }) => {
  //  Optionen bauen aus JSON-Daten (symbol & name)
  const options = Object.entries(tickerMap).map(([symbol, name]) => ({
    value: symbol,
    label: `${symbol} - ${name}`,
  }));
  //  Wenn Option gewählt wird ➝ nach oben weitergeben
  const handleChange = (selectedOption) => {
    if (selectedOption) {
      onSymbolSelect(selectedOption.value);
    }
  };

  return (
    <div className="select-container">
      <h2 className="font-mono">Wähle hier eine Aktien aus:</h2>
      {/*  React-Select Dropdown mit Styling & Datenbindung */}
      <Select
        options={options}
        onChange={handleChange}
        placeholder="Wähle eine Aktie..."
        isClearable
        className="select-container"
        classNamePrefix="select"
        styles={customStyles}
      />
    </div>
  );
};

export default StockSearch;

// tickerMap.json	Enthält "AAPL": "Apple Inc.", usw.
// options	Wandelt die JSON in Dropdown-Optionen um
// handleChange()	Gibt ausgewähltes Symbol an onSymbolSelect() weiter
// react-select	Modernes Dropdown mit Suchfunktion
// customStyles	Erzwingt Darkmode und Custom Look
