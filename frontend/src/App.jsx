import { useState } from "react";
import "./App.css";
import { BrowserRouter, Router, Route, Routes, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import Home from "./pages/Home";
import Code_editor from "./pages/Code_editor";

function App() {

  return (
      <Routes>
        <Route path = "/" element={<Home />} />
        <Route path = "/code/:id" element={<Code_editor />} />
      </Routes>
  );
}

export default App;
