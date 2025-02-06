import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientInputForm from "./components/ClientInputForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ClientInputForm />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
