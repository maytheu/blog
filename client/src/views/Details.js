import React, { useEffect, useState } from "react";
// import sections
import Hero from "../components/sections/Hero";
import Comment from "../components/sections/Coment";
import Loader from "../components/layout/Loader";

//redux
import { useSelector, useDispatch } from "react-redux";
import { getPost } from "../store/blog";

const Details = (props) => {
  const [loading, setLoading] = useState(true);
  const auth = useSelector((state) => state.auth);
  const post = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  let param = window.location.pathname.split("/");

  useEffect(() => {
    if (param.length >= 4) {
      document.title = param[2].replace(/-+/g, " ");
      dispatch(getPost(param[3])).then(() => {
        setLoading(false);
      });
    } else {
      document.title = props.location.state.title;
      dispatch(getPost(props.location.state.id)).then(() => {
        setLoading(false);
      });
    }
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <Hero
            className="illustration-section-01"
            post={post.blog}
            title={param.length >= 4 ? param[2] : props.location.state.title}
            auth={auth.auth.loginSuccess}
          />
          <Comment
            split
            id={param.length >= 4 ? param[3] : props.location.state.id}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Details;
