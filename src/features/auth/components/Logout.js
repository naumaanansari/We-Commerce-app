import { useEffect } from "react";
import { selectLoggedInUser, signOutAsync } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(signOutAsync());
  });

  //Problem: UseEffect run after a render, so we have to delay navigate part
  return (
  <>
    {!user && <Navigate to="/login" replace={true}></Navigate>}
  </>);
}

export default Logout;
