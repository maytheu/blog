import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import SendIcon from "@material-ui/icons/Send";

import { SectionProps } from "../../utils/SectionProps";
import Input from "../elements/Input";
import Button from "../elements/Button";

//forms
import useForm from "../../formControls/useForm";
import formValidation from "../../formControls/formValidation";

//redux
import { useDispatch } from "react-redux";

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
    postComment,
    formValidation
  );

  const dispatch = useDispatch();

  const innerClasses = classNames(
    "cta-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider",
    split && "cta-split"
  );

  function postComment() {
    const d = new Date();
    const data = {
      comment: values.comment,
      commentName: values.commentName,
      commentDate: d.getTime(),
    };
    // dispatch(getComment(id, data)).then((res) => {
    //   if (res.payload.success) return alert("Your view has been aired");
    // });
  }

  const style = { padding: "3px 10px" };

  return (
    <section {...props} className={outerClasses}>
      <div className="container" style={{ width: "50%" }}>
        <div className="cta-slogan">
          <div className="cta-action">
            <form onSubmit={handleSubmit}>
              <Input
                id="email"
                type="email"
                change={handleChange}
                placeholder="Email"
              />
              <Input
                id="password"
                type="password"
                change={handleChange}
                placeholder="Password"
              />
              <Button tag="a" style={style} onClick={handleSubmit}>
                <SendIcon />
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

export default Login;
