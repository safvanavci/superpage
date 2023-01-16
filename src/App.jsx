import React from "react";
import { Home, Login, Product, Register } from "./pages/index";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="h-full">
      <Routes>
        <Route
          path="/*"
          element={
            <LoginControl>
              <Home />
            </LoginControl>
          }
        />
        <Route
          path="/login"
          element={
            <Redirect>
              <Login />
            </Redirect>
          }
        />
        <Route
          path="/register"
          element={
            <Redirect>
              <Register />
            </Redirect>
          }
        />
        <Route path="/" element={<Product />} />
      </Routes>
    </div>
  );
}

export const Redirect = ({ children }) => {
  if (localStorage.getItem("user")) {
    return <Navigate to="/home" />;
  } else {
    return children;
  }
};

export const LoginControl = ({ children }) => {
  if (!localStorage.getItem("user")) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};
export default App;
