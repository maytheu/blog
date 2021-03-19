import React, { useEffect, useState } from "react";
// import sections
import Hero from "../components/sections/Hero";
import Comment from "../components/sections/Coment";
import Loader from "../components/layout/Loader";
import NotFound from "./NotFound";
import Testimonial from "../components/sections/Testimonial";

//redux
import { useSelector, useDispatch } from "react-redux";
import { getPost } from "../store/blog";
import { getRecent } from "../store/recent";

const Details = (props) => {
  const [loading, setLoading] = useState(true);
  const [not, setNot] = useState(false);
  const recent = useSelector((state) => state.recent);
  const auth = useSelector((state) => state.auth);
  const post = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  let param = window.location.pathname.split("/");

  useEffect(() => {
    if (param.length >= 4) {
      document.title = param[2].replace(/-+/g, " ");
      dispatch(getPost(param[3])).then((res) => {
        dispatch(getRecent()).then(() => {
          if (res.payload.success) return setLoading(false);
          return setNot(true);
        });
      });
    } else {
      document.title = props.location.state.title;
      dispatch(getPost(props.location.state.id)).then(() => {
        dispatch(getRecent()).then(() => setLoading(false));
      });
    }
  }, [post]);

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
          {recent.recent.post.length > 0 ? (
            <div className='center-content'>Most viewed Article
            <Testimonial topDivider post={recent.recent.post} /></div>
          ) : (
            ""
          )}
        </>
      ) : not ? (
        <NotFound topDivider />
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Details;
