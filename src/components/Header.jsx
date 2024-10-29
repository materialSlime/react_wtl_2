import { useState, useEffect } from "react";
export default function Header({ changeMode, mode }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let root = document.querySelector("#root");
    if (darkMode) {
      root.classList.add("dark-mode");
    } else {
      root.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <div className="header">
      <h1 className="logo">WTR 2.0</h1>
      <div className="header-buttons">
        <button
          id={mode === "entry" ? "active-tab" : ""}
          value="entry"
          onClick={(event) => changeMode(event)}
        >
          Entry
        </button>
        <button
          id={mode === "search" ? "active-tab" : ""}
          value="search"
          onClick={(event) => changeMode(event)}
        >
          Search
        </button>
        <button
          id={mode === "clients" ? "active-tab" : ""}
          value="clients"
          onClick={(event) => changeMode(event)}
        >
          Clients
        </button>
        <button value="" onClick={"logOut"}>
          Log Out
        </button>
      </div>
      <div
        className="theme-toggle"
        onClick={() => {
          setDarkMode(!darkMode);
        }}
      >
        <div className={darkMode ? "circle dark" : "circle light"}></div>
      </div>
    </div>
  );
}
