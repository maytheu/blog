import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";

const propTypes = {
  children: PropTypes.node,
  tag: PropTypes.oneOf(["h1", "h2", "h3"]),
};

const defaultProps = {
  children: null,
  tag: "h2",
};

const SectionHeader = ({
  className,
  data,
  detail,
  children,
  tag,
  ...props
}) => {
  const classes = classNames("section-header", className);
  const Component = tag;

  return (
    <>
      {data.map((post, i) => {
        let title = post.title.replace(/\s+/g, "-").toLowerCase();
        return (
          (post.title || post.paragraph) && (
            <div {...props} className={classes} key={i}>
              <div className="container-xs">
                {children}
                {post.title && (
                  <Component
                    className={classNames(
                      "mt-0",
                      post.paragraph ? "mb-16" : "mb-0"
                    )}
                  >
                    <Link
                      to={{
                        pathname: `/post/${title}`,
                        state: {
                          id: post._id,
                          title: post.title,
                        },
                      }}
                    >
                      {post.title}
                    </Link>
                  </Component>
                )}
                {post.paragraph && <p className="m-0">{post.paragraph}</p>}
              </div>
            </div>
          )
        );
      })}
    </>
  );
};

SectionHeader.propTypes = propTypes;
SectionHeader.defaultProps = defaultProps;

export default SectionHeader;
