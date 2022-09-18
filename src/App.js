import React from "react";
import Login from "./components/Login";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import LayoutDefault from "./components/Layout/LayoutDefault";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
