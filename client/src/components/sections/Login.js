import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { withRouter } from "react-router-dom";

import { SectionProps } from "../../utils/SectionProps";
import Input from "../elements/Input";
import Button from "../elements/Button";

//forms
import useForm from "../../formControls/useForm";
import formValidation from "../../formControls/formValidation";

//redux
import { useDispatch } from "react-redux";
import { getLogin } from "../../store/auth";

const propTypes = {
  ...SectionProps.types,
  split: PropTypes.bool,
};

const defaultProps = {
  ...SectionProps.defaults,
  split: false,
};

const Login = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  split,
  id,
  ...props
}) => {
  const outerClasses = classNames(
    "cta section center-content-mobile",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const { values, handleChange, handleSubmit, errors } = useForm(
    login,
    formValidation
  );

  const dispatch = useDispatch();

  function login() {
    if (!errors) return alert("Check your Values");
    const data = { user: values.user, password: values.password };
    dispatch(getLogin(data)).then((res) => {
      if (res.payload.loginSuccess) {
        props.history.push("/");
      } else {
        alert("Invalid User or Password");
      }
    });
  }

  return (
    <section
      {...props}
      className={outerClasses}
      style={{ paddingBottom: "0px" }}
    >
      <div className="container" style={{ width: "50%", marginTop: "40px" }}>
        <h3 className="mt-0 mb-16">Login to post Article</h3>
        <div className="cta-slogan">
          <div className="cta-action">
            <form onSubmit={handleSubmit}>
              <Input
                id="user"
                type="text"
                change={handleChange}
                placeholder="Username oe Email"
              />
              <Input
                id="password"
                type="password"
                change={handleChange}
                placeholder="Password"
              />
              <Button tag="a" style={{ width: "100%" }} onClick={handleSubmit}>
                <ExitToAppIcon />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default withRouter(Login);
