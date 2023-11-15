import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from './Pages/Register';
import AdminDashboard from './Pages/AdminDashboard';
import Cart from './Pages/Cart';
import Products from './Pages/Products';
import Profile from './Pages/Profile';
import Header from './Components/Header';
import { UserContext } from './Context/UserContext';

import Checkout from './Pages/Checkout';
import SingleProduct from './Pages/SingleProduct';

function App () {


  const { loggedUser } = useContext(UserContext);






  const ProtectedRoute = ({ children }) => {
    if (loggedUser.length === 0) {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  };



  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/products' element={<Products />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/header' element={<Header />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/product/:id' element={<SingleProduct />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
