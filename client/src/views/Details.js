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

  useEffect(() => { 
    console.log(window.location.pathname)
    let param = window.location.pathname.split('/')
    console.log(param[2])
    document.title = props.location.state.title || param[2]
    dispatch(getPost(props.location.state.id)).then((res) => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <Hero
            className="illustration-section-01"
            post={post.blog}
            title={props.location.state.title}
            auth={auth.auth.loginSuccess}
          />
          <Comment split id={props.location.state.id} />
        </>
      ) : (
        <Loader/>
      )}
    </>
  );
};

export default Details;
