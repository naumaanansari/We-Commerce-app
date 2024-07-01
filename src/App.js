import React, { useEffect } from 'react';
import './App.css';
import Homepage from './pages/Homepage';
import Loginpage from './pages/Loginpage';
import Signuppage from './pages/Signuppage';
import Cartpage from './pages/Cartpage';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CheckoutPage from './pages/Checkout';
import ProductDetailpage from './pages/ProductDetailpage';
import Protected from './features/auth/components/Protected';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrderPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

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
  {
    path: "/order-success/:id",
    element: (<Protected><OrderSuccessPage></OrderSuccessPage></Protected>),
  },
  {
    path: "/orders",
    element: (<Protected><UserOrdersPage></UserOrdersPage></Protected>),
  },
  {
    path: "/profile",
    element: (<Protected><UserProfilePage></UserProfilePage></Protected>),
  },
  {
    path: "/logout",
    element: (<Logout></Logout>),
  },
  {
    path: "/forgot-password",
    element: (<ForgotPasswordPage></ForgotPasswordPage>),
  },
  {
    path: "*",
    element: (<PageNotFound></PageNotFound>),
  },
]);



function App() {

  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)

  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))
    }
    
  },[dispatch, user])
  return (  
    <div className="App">
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
