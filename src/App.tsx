import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import "./assets/App.css";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import About from "./pages/About";
import Help from "./pages/Help";
import CaseDetails from "./pages/CaseDetails";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />
          <Route path="/case/:id" element={<CaseDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
