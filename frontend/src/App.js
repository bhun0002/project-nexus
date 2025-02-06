import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientInputForm from "./components/ClientInputForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProjectList from "./components/ProjectList";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ClientInputForm />} />
        <Route path="/projects" element={<ProjectList />} /> {/* New Route for Project List */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
