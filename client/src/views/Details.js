import React, { useEffect, useState } from "react";
// import sections
import Hero from "../components/sections/Hero";
import Comment from "../components/sections/Coment";

//redux
import { useSelector, useDispatch } from "react-redux";
import { getPost } from "../store/blog";

const Details = (props) => {
  const [loading, setLoading] = useState(true);
  const auth = useSelector((state) => state.auth);
  const post = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = props.location.state.title;
    dispatch(getPost(props.location.state.id)).then((res) => {
      setLoading(false);
    });
  }, []);

  return (
    <>{console.log(auth)}
      {!loading ? (
        <>
          <Hero
            className="illustration-section-01"
            post={post.blog}
            title={props.location.state.title}
            auth={false}
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
