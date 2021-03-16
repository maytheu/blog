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
import { getComment } from "../../store/blog";

const propTypes = {
  ...SectionProps.types,
  split: PropTypes.bool,
};

const defaultProps = {
  ...SectionProps.defaults,
  split: false,
};

const Comment = ({
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

  function postComment() {
    const d = new Date();
    const data = {
      comment: values.comment,
      commentName: values.commentName,
      commentDate: d.getTime(),
    };
    dispatch(getComment(id, data)).then((res) => {
      if (res.payload.success) return alert("Your view has been aired");
    });
  }

  return (
    <section
      {...props}
      className={outerClasses}
      style={{ paddingBottom: "0px" }}
    >
      <div className="container" style={{ width: "50%" }}>
        <div className="cta-slogan">
          <div className="cta-action">
            <form onSubmit={handleSubmit}>
              <Input
                id="commentName"
                type="text"
                change={handleChange}
                placeholder="Your name"
              />
              <Input
                id="comment"
                type="textarea"
                change={handleChange}
                placeholder="Your thought here"
              />
              <Button tag="a" style={{ width: "100%" }} onClick={handleSubmit}>
                <SendIcon />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

Comment.propTypes = propTypes;
Comment.defaultProps = defaultProps;

export default Comment;
