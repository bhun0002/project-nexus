import React, { useState } from "react";
// import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ClientInputForm from "./components/ClientInputForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProjectList from "./components/ProjectList";
import Signup from "./components/Signup";  
import Login from "./components/Login"; // ✅ Import Login Component


function App() {
  const [user, setUser] = useState(null); // ✅ Store logged-in user details

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Default Route - Signup */}
        {/* Pass `setUser` to Signup and Login */}
        <Route path="/" element={<Signup setUser={setUser} />} />  

        <Route path="/login" element={<Login setUser={setUser} />} />

        {/* Protect /submit route: Redirect if user is not signed in */}
        <Route path="/submit" element={user ? <ClientInputForm user={user} /> : <Navigate to="/login" />} />
        
        {/* Project List Route */}
        <Route path="/projects" element={<ProjectList />} />

        {/* Old Submit Code -  Protect /submit route: Redirect if user is not signed in
        <Route path="/submit" element={user ? <ClientInputForm user={user} /> : <Navigate to="/" />} /> */}

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
