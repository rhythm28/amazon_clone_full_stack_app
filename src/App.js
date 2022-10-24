import './App.css';
import Header from './Header';
import Home from './Home'
import React, { Component, useEffect }  from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Checkout from './Checkout'
import { useStateValue } from './StateProvider'
import Login from './Login'
import { auth } from './firebase'
import Payment from './Payment'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import Orders from './Orders'

const promise = loadStripe('pk_test_51Lu1r7C4mEPmkwrjuVhLEVIlH4YnlbWbwrWIRBU5iNhyrWP3OoYOvt40DCBZfNrHUTOEcg5l53WSMrePf2m3cuaS00hYWUcXfU')


function App() {
  const rootElement = document.getElementById("root")
  const[{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    //BEM
    <BrowserRouter basename='/'>
    <div className="App">
        <Routes>
        <Route 
        path="/orders" element={<><Header/><Orders/></>}>
        </Route>
        <Route 
        path="/checkout" element={<><Header/><Checkout/></>}>
        </Route>
        <Route 
        path="/login" element={<Login />}>
        </Route>
        <Route 
        path="/payment" element={<><Header/><Elements stripe={promise}> <Payment/> </Elements></>}>
        </Route>
        <Route 
        path="/" element={<><Header/><Home/></>}>
        </Route>
    </Routes>
     </div>
     </BrowserRouter>
  );
}

export default App;
