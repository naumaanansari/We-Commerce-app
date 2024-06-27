import React, { useEffect } from 'react';
import './App.css';
import Homepage from './pages/Homepage';
import Loginpage from './pages/Loginpage';
import Signuppage from './pages/Signuppage';
import Cartpage from './pages/Cartpage';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CheckoutPage from './pages/Checkout';
import ProductDetailpage from './pages/ProductDetailpage';
import Protected from './features/auth/components/Protected';
import { fetchItemsByUserId } from './features/cart/cartAPI';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Protected>
      <Homepage></Homepage>
      </Protected>),
  },
  {
    path: "/login",
    element: (<Loginpage></Loginpage>),
  },
  {
    path: "/signup",
    element: (<Signuppage></Signuppage>),
  },
  {
    path: "/cart",
    element: (<Protected>
      <Cartpage></Cartpage>
    </Protected>),
  },
  {
    path: "/checkout",
    element: (<Protected>
      <CheckoutPage></CheckoutPage>
      </Protected>),
  },
  {
    path: "/product-detail/:id",
    element: (<Protected>
      <ProductDetailpage></ProductDetailpage>
    </Protected>),
  },
]);



function App() {

  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)

  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id))
    }
    
  },[dispatch, user])
  return (  
    <div className="App">
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
