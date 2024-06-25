import React from 'react';
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

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Homepage></Homepage>),
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
    element: (<Cartpage></Cartpage>),
  },
  {
    path: "/checkout",
    element: (<CheckoutPage></CheckoutPage>),
  },
  {
    path: "/product-detail/:id",
    element: (<ProductDetailpage></ProductDetailpage>),
  },
]);



function App() {
  return (
    <div className="App">
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
