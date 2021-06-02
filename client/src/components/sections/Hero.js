import React from "react";
import classNames from "classnames";
import ThumbDownSharpIcon from "@material-ui/icons/ThumbDownSharp";
import ThumbUpSharpIcon from "@material-ui/icons/ThumbUpSharp";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { Link, withRouter } from "react-router-dom";
import DOMPurify from "dompurify";

import { SectionProps } from "../../utils/SectionProps";
import ButtonGroup from "../elements/ButtonGroup";
import Button from "../elements/Button";
//redux
import { useDispatch } from "react-redux";
import {
  getDeleteBlog,
  getDeleteComment,
  getDislike,
  getLike,
} from "../../store/blog";

const propTypes = {
  ...SectionProps.types,
};

const defaultProps = {
  ...SectionProps.defaults,
};

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  post,
  title,
  auth,
  ...props
}) => {
  const dispatch = useDispatch();
  const outerClasses = classNames(
    "hero section center-content",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "hero-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const likeHandler = (event) => {
    event.preventDefault();
    dispatch(getLike(title));
  };

  const dislikeHandler = (event) => {
    event.preventDefault();
    dispatch(getDislike(title));
  };

  const editHandler = (event) => {
    event.preventDefault();
    props.history.push(`/admin/${title.replace(/\s+/g, "-").toLowerCase()}`);
  };

  const deleteHandler = (event) => {
    event.preventDefault();
    dispatch(getDeleteBlog(post.post._id));
    props.history.push("/");
  };

  const deleteComment = (id) => {
    dispatch(getDeleteComment(id));
    props.history.push(`/`);
  };

  const style = { padding: "3px 10px" };

  return (
    <section
      {...props}
      className={outerClasses}
      style={{ paddingBottom: "0px" }}
    >
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h2 className="mt-0 mb-16" data-reveal-delay="200">
              <span className="text-color-primary">
                {auth ? (
                  <Link
                    to={`/admin/${title.replace(/\s+/g, "-").toLowerCase()}`}
                  >
                    {post.post.title}
                  </Link>
                ) : (
                  post.post.title
                )}
              </span>
            </h2>
            <div className="container-xs">
              <div className="m-0 mb-32" data-reveal-delay="400">
                <div
                  className="text"
                  dangerouslySetInnerHTML={createMarkup(post.post.blog)}
                ></div>
                {post.post.updateDate
                  ? `Updated on ${new Date(
                      post.post.updateDate
                    ).toDateString()}`
                  : `Posted on ${new Date(
                      post.post.publishedDate
                    ).toDateString()}`}
              </div>
              <div data-reveal-delay="2000">
                <ButtonGroup>
                  {post.post.like}
                  <Button tag="a" style={style} onClick={likeHandler}>
                    <ThumbUpSharpIcon />
                  </Button>
                  {post.post.dislike}
                  <Button tag="a" style={style} onClick={dislikeHandler}>
                    <ThumbDownSharpIcon />
                  </Button>
                  <Button tag="a" style={style}>
                    <FacebookShareButton url={post.url} quote={title}>
                      <FacebookIcon size={35} round={true} />
                    </FacebookShareButton>
                  </Button>
                  <Button tag="a" style={style}>
                    <TwitterShareButton ur5l={post.url} title={title}>
                      <TwitterIcon size={35} round={true} />
                    </TwitterShareButton>
                  </Button>
                  <Button tag="a" style={style}>
                    <WhatsappShareButton url={post.url} title={title}>
                      <WhatsappIcon round={true} size={35} />
                    </WhatsappShareButton>
                  </Button>
                  {auth ? (
                    <div>
                      <Button tag="a" style={style} onClick={editHandler}>
                        <EditIcon />
                      </Button>
                      .
                      <Button tag="a" style={style} onClick={deleteHandler}>
                        <DeleteForeverIcon />
                      </Button>
                    </div>
                  ) : (
                    ""
                  )}
                </ButtonGroup>
              </div>
              {post.post.comment
                ? post.post.comment.map((comment) => {
                    let date = new Date(comment.commentDate);
                    return (
                      <div data-reveal-delay="400" key={comment.commentId}>
                        {comment.comment} by{" "}
                        <em>
                          {comment.commentName} on {date.toDateString()}{" "}
                          {auth ? (
                            <Button
                              style={style}
                              onClick={() => deleteComment(comment.commentId)}
                            >
                              <DeleteForeverIcon />
                            </Button>
                          ) : (
                            ""
                          )}
                        </em>
                      </div>
                    );
                  })
                : ""}
            </div>
            {post.post.commentCount === 0
              ? ""
              : post.post.commentCount + " comments"}
          </div>
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default withRouter(Hero);
