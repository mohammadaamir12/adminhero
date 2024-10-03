import React, { useState } from 'react'
import Sidebar from './component/Sidebar'
import Navbar from './component/Navbar'
import Home from './screens/Home'
import {BrowserRouter, Route,Routes} from 'react-router-dom'

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(prevState => !prevState);
  };
  return (
    <BrowserRouter>
    <div className='bg-backgrd'>
          <Sidebar isOpen={isDrawerOpen} />
          <Navbar onToggleDrawer={toggleDrawer} />
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
        </BrowserRouter>
  )
}

export default App
