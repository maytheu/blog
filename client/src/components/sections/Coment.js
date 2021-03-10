import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import SendIcon from '@material-ui/icons/Send';

import { SectionProps } from "../../utils/SectionProps";
import Input from "../elements/Input";
import Button from "../elements/Button";

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

  const innerClasses = classNames(
    "cta-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider",
    split && "cta-split"
  );

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(id);
  };


  const style = { padding: "3px 10px" };

  return (
    <section {...props} className={outerClasses}>
      <div className="container" style={{ width: "50%" }}>
        <div className="cta-slogan">
          <div className="cta-action">
            <form>
            <Input id="CommentName" type="text" placeholder="Your name" />
            <Input id="comment" type="textarea" placeholder="Your thought here" />
            <Button tag="a" style={style} onClick={submitHandler}><SendIcon/></Button>
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
