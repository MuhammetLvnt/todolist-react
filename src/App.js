import React from "react";
import Header from "./components/Layout/Header";
import Login from "./components/Login";
import Home from "./pages/Home";
import Test from "./components/Test";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="Login" element={<Login />} />
        <Route index path="/" element={<Home />} />
      </Routes>

      {/* <Login /> */}
      {/* <Home /> */}
      {/* <Test></Test> */}
    </>
  );
}

export default App;
