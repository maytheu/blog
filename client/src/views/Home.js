import React, { useEffect, useState } from "react";
// import sections
import Testimonial from "../components/sections/Testimonial";
import Loader from "../components/layout/Loader";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getAllPost, getViewPost } from "../store/blog";

const Home = () => {
  const blog = useSelector((state) => state.blog);
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Welcome to my Blog";
    if (auth.auth.loginSuccess) {
      dispatch(getAllPost()).then(() => setLoading(false));
    } else {
      dispatch(getViewPost()).then(() => setLoading(false));
    }
  }, [blog]);

  return (
    <>
      {loading ? <Loader /> : <Testimonial topDivider post={blog.blog.post} />}
    </>
  );
};

export default Home;
