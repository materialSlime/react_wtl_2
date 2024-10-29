import { useState } from "react";
import Clients from "./components/Clients";
import Entry from "./components/Entry";
import RecallDate from "./components/RecallDate";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [mode, setMode] = useState("entry");

  function changeMode(event) {
    setMode(event.target.value);
  }
  return (
    <>
      <Header changeMode={changeMode} mode={mode} />
      <div className="main">
        {mode === "entry" ? (
          <Entry />
        ) : mode === "search" ? (
          <RecallDate />
        ) : (
          mode === "clients" && <Clients />
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
