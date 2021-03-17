import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import FooterNav from "./partials/FooterNav";
import FooterSocial from "./partials/FooterSocial";
import Button from "../elements/Button";
import { getLogout } from "../../store/auth";

const propTypes = {
  topOuterDivider: PropTypes.bool,
  topDivider: PropTypes.bool,
};

const defaultProps = {
  topOuterDivider: false,
  topDivider: false,
};

const Footer = ({ className, topOuterDivider, topDivider, ...props }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const classes = classNames(
    "site-footer center-content-mobile",
    topOuterDivider && "has-top-divider",
    className
  );

  const logoutHandler = () => {
    dispatch(getLogout()).then(() => props.history.push("/"));
  };

  return (
    <footer {...props} className={classes}>
      <div className="container">
        <div
          className={classNames(
            "site-footer-inner",
            topDivider && "has-top-divider"
          )}
          style={{ padding: "0px", paddingBottom: "10px" }}
        >
          <div
            className="footer-top space-between text-xxs"
            style={{ paddingBottom: "0px" }}
          >
            <FooterSocial />
            <FooterNav />
          </div>
          {auth.auth.loginSuccess ? (
            <div className="footer-bottom space-between text-xxs invert-order-desktop">
              <Link to="/admin">
                <Button>Add New Article</Button>
              </Link>
              <Button onClick={logoutHandler}>Logout</Button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default withRouter(Footer);
