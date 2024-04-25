import React from 'react';
import './App.css';
import AdminLogin from './pages/AdminLogin';
import Portfoliopage from './pages/Portfoliopage';
import Lightpages from './pages/Lightpages';
import Products from './pages/Products';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Createaccount from './pages/Createaccount';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Createaccount/>}></Route>
          <Route path='/AdminLogin' element={<AdminLogin />} />
          <Route path='/Portfoliopage' element={<Portfoliopage />} /> 
          <Route path='/Lightpages' element={<Lightpages/>}/>
          <Route path='/Products' element={<Products/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

