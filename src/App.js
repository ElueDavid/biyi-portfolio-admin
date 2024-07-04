import React from 'react';
import './App.css';
import AdminLogin from './pages/AdminLogin';
import Portfoliopage from './pages/Portfoliopage';
import Lightpages from './pages/Lightpages';
import Products from './pages/Products';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Createaccount from './pages/Createaccount';
import Clients from './pages/Clients';

// product categories

import Allproducts from './pages/productpages/Allproducts';
import Ebooks from './pages/productpages/Ebooks';
import Services from './pages/productpages/Services';
import Ecourses from './pages/productpages/Ecourses';
import Solutions from './pages/productpages/Solutions';

// product categories

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
          <Route path='/Clients' element={<Clients/>}/>
          
          {/* product categories */}

          <Route path='/Allproducts' element={<Allproducts/>}/>
          <Route path='/Ebooks' element={<Ebooks/>}/>
          <Route path='/Services' element={<Services/>}/>
          <Route path='/Ecourses' element={<Ecourses/>}/>
          <Route path='/Solutions' element={<Solutions/>}/>

          {/* product categories */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

