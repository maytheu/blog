import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const SecureRoute = ({ component: Component, layout: Layout, ...rest }) => {
  const auth = useSelector((state) => state.auth);

  Layout = Layout === undefined ? (props) => <>{props.children}</> : Layout;

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.auth.loginSuccess ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to="/admin/login" />
        )
      }
    />
  );
};

export default SecureRoute;
