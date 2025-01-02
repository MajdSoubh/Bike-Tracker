import React from "react";
import "./assets/App.css";
import Home from "./components/Home";
import MainLayout from "./layouts/MainLayout";

import { BrowserRouter, Routes, Route } from "react-router";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
