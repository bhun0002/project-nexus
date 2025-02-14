import React, { useState, useEffect } from "react";
// import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ClientInputForm from "./components/ClientInputForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProjectList from "./components/ProjectList";
import Signup from "./components/Signup";
import Login from "./components/Login"; // ✅ Import Login Component
import ProjectDetail from "./components/ProjectDetail"; // ✅ Import Project Detail component


function App() {

  const [user, setUser] = useState(() => {
    // ✅ Restore user from sessionStorage on first render
    const storedUser = sessionStorage.getItem("loggedInUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // ✅ Ensure `user` is correctly restored after first render
  useEffect(() => {
    const storedUser = sessionStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
        {/* <Route path="/projects" element={<ProjectList />} /> */}
        {/* ✅ Pass `user` as a prop to `ProjectList` */}
        <Route path="/projects" element={user ? <ProjectList user={user} /> : <Navigate to="/login" />} />

        {/* Project View Route */}
        <Route path="/project/:id" element={<ProjectDetail />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
