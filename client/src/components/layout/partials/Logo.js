import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

const Logo = ({ className, ...props }) => {
  const classes = classNames("brand", className);

  return (
    <div {...props} style={{ margin: "0 auto" }} className={classes}>
      <h1 className="m-0">
        <Link to="/">Welcome to my Blog</Link>
      </h1>
    </div>
  );
};

export default Logo;
