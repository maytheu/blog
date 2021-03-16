import React, { useEffect } from "react";
// import sections
import Login from "../../components/sections/Login";

const Auth = () => {
  useEffect(() => {
    document.title = "Admin Login";
  });

  return (
    <>
      <Login split />
    </>
  );
};

export default Auth;
