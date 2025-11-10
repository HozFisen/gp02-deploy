// src/App.jsx

import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router';
// Import pages below
import Home from './views/Home';
import Detail from './views/Detail';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<Detail />} />
      {/* You can add more pages here */}

    </Routes>
    </BrowserRouter>
  );
}

export default App;