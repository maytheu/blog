import React, { useEffect, useState } from "react";
// import sections
// import Hero from "../components/sections/Hero";
// import FeaturesTiles from "../components/sections/FeaturesTiles";
// import FeaturesSplit from "../components/sections/FeaturesSplit";
import Testimonial from "../components/sections/Testimonial";
import Cta from "../components/sections/Cta";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getViewPost } from "../store/blog";

const Home = () => {
  const blog = useSelector((state) => state.blog);
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getViewPost()).then(() => setLoading(false));
  }, []);
  return (
    <>
      {/* <Hero className="illustration-section-01" />
      <FeaturesTiles />
      <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02" /> */}
      {loading ? "" : <Testimonial topDivider post={blog.blog.post} />}
      {/* <Cta split /> */}
    </>
  );
};

export default Home;
