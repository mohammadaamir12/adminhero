import React, { useState, useEffect } from "react";
import Sidebar from "./component/Sidebar";
import Navbar from "./component/Navbar";
import Home from "./screens/Home";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./screens/Login";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  return (
    <BrowserRouter>
      <div className="bg-backgrd">
        {isAuthenticated ? (
          <>
            <Sidebar isOpen={isDrawerOpen} setAuth={setIsAuthenticated} />
            <Navbar
              onToggleDrawer={toggleDrawer}
              setAuth={setIsAuthenticated}
            />
            <div>
              <Routes>
                <Route path="/login" exact element={<Login />} />
                <Route
                  path="/"
                  element={
                    isAuthenticated ? <Home /> : <Navigate to="/login" />
                  }
                />
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route
              path="/login"
              element={<Login setAuth={setIsAuthenticated} />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
