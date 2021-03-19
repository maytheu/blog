import React, { useEffect, useState } from "react";
// import sections
import Testimonial from "../components/sections/Testimonial";
import Loader from "../components/layout/Loader";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getAllPostById, getViewPostById } from "../store/blog";
import Button from "../components/elements/Button";

const Home = () => {
  const blog = useSelector((state) => state.blog);
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [newerButton, setNewerButton] = useState(false);
  const [zero, setZero] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Welcome to my Blog";
    setDisabled(false);
    setNewerButton(false);
    setZero(false)
    if (auth.auth.loginSuccess) {
      dispatch(getAllPostById(page)).then((res) => {
        if (res.payload.post.length === 0 || res.payload.post.length < 10) {
          if (res.payload.post.length === 0) {
            setZero(true);
          }
          setDisabled(true);
        }
        setLoading(false);
      });
    } else {
      dispatch(getViewPostById(page)).then((res) => {
        if (res.payload.post.length === 0 || res.payload.post.length < 10) {
          if (res.payload.post.length === 0) {
            setZero(true);
          }
          setDisabled(true);
        }
        setLoading(false);
      });
    }
  }, [page]);

  function prev(e) {
    e.preventDefault();
    setLoading(true);
    setPage(page + 1);
  }

  const newer = (e) => {
    e.preventDefault();
    if (page === 1) return setNewerButton(true);
    setLoading(true);
    setPage(page - 1);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Testimonial topDivider post={blog.blog.post} />
          <div className="center-content">
            <div className="center-content">
              {zero ? "No content available at the moment" : ""}
            </div>
            <br />
            <Button onClick={newer} disabled={newerButton}>
              {"<"}
            </Button>
            <Button onClick={prev} disabled={disabled}>
              {">"}
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
