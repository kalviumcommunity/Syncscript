import { useState } from "react";
import "./App.css";
import { BrowserRouter, Router, Route, Routes, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import AuthPage from "./pages/Register/AuthPage";
import userAtom from "./atoms/userAtoms";
import HomePage from "./pages/Dashboard/HomePage";
function App() {
  const user = useRecoilValue(userAtom);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
