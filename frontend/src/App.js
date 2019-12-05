import React from "react";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import "./style.css";
function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
