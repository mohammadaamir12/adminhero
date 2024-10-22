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
  const [theme,setTheme]=useState('light')

  useEffect(()=>{
  if(theme === 'dark'){
    document.documentElement.classList.add('dark')
  }else{
    document.documentElement.classList.remove('dark')
  }
  },[theme])

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
              theme={theme} setTheme={setTheme}
            />
            <div>
              <Routes>
                <Route path="/login" exact element={<Login />} />
                <Route
                  path="/"
                  element={
                    isAuthenticated ? <Home theme={theme} setTheme={setTheme} /> : <Navigate to="/login" />
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
