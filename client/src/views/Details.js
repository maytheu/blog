import React, { useEffect, useState } from "react";
// import sections
import Hero from "../components/sections/Hero";
import Comment from "../components/sections/Coment";

//redux
import { useSelector, useDispatch } from "react-redux";
import { getPost } from "../store/blog";

const Details = (props) => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = props.location.state.title;
    dispatch(getPost(props.location.state.id)).then((res) => {
      setPost(res.payload);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <Hero
            className="illustration-section-01"
            post={post}
            title={props.location.state.title}
            auth={true}
          />
          <Comment split id={props.location.state.id} />
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Details;
