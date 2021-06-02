import React, { useRef, useEffect } from "react";
import { useLocation, Switch } from "react-router-dom";
import AppRoute from "./utils/AppRoute";
import ScrollReveal from "./utils/ScrollReveal";
import ReactGA from "react-ga";
import "./App.css";

// Layouts
import LayoutDefault from "./layouts/LayoutDefault";

// Views
import Home from "./views/Home";
import Details from "./views/Details";
import Auth from "./views/admin/Auth";
import SecureRoute from "./utils/SecureRoute";
import Admin from "./views/admin/Admin";
import NotFound from "./views/NotFound";

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = (page) => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const App = () => {
  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add("is-loaded");
    childRef.current.init();
    trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
 
  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <Switch>
          <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
          <AppRoute
            exact
            path="/post/:post"
            component={Details}
            layout={LayoutDefault}
          />
          <AppRoute
            exact
            path="/post/:post/:id"
            component={Details}
            layout={LayoutDefault}
          />
          <AppRoute
            exact
            path="/admin/login"
            component={Auth}
            layout={LayoutDefault}
          />
          <SecureRoute
            exact
            path="/admin"
            component={Admin}
            layout={LayoutDefault}
          />
          <SecureRoute
            exact
            path="/admin/:post"
            component={Admin}
            layout={LayoutDefault}
          />
          <AppRoute component={NotFound} layout={LayoutDefault} />
        </Switch>
      )}
    />
  );
};

export default App;
