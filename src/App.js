import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppBar from './components/AppBar';
import Home from './components/Home';
import Store from './components/Store';
import FoodCourt from './components/FoodCourt';
import Saloon from './components/Saloon';
import Cart from './components/Cart';
import './css/main.min.css'
import CartMain from './components/CartMain';
const App = () => {
  return (
    <div className="App">
    <Router>
      <Routes basename="/web">
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/foodcourt" element={<FoodCourt />} />
        <Route path="/saloon" element={<Saloon />} />
        <Route path="/cart" element={<CartMain/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
