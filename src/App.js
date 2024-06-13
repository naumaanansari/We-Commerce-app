import React from 'react';
import './App.css';
import Homepage from './pages/Homepage';
import Loginpage from './pages/Loginpage';
import Signuppage from './pages/Signuppage';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

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
]);



function App() {
  return (
    <div className="App">
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
