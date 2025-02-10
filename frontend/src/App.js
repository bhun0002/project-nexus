import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ClientInputForm from "./components/ClientInputForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProjectList from "./components/ProjectList";
import Signup from "./components/Signup";  
import { useState } from "react";  // ✅ Store authentication state

function App() {
  const [user, setUser] = useState(null); // ✅ Store logged-in user data

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Default Route - Signup */}
        <Route path="/" element={<Signup setUser={setUser} />} />  
        
        {/* Protect /submit route: Redirect if user is not signed in */}
        <Route path="/submit" element={user ? <ClientInputForm user={user} /> : <Navigate to="/" />} />

        {/* Project List Route */}
        <Route path="/projects" element={<ProjectList />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
