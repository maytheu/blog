import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// import sections
import AdminPage from "../../components/sections/AdminPage";

const Admin = (props) => {
  const blog = useSelector((state) => state.blog);
  let post = props.match.params.post;

  useEffect(() => {
    post = props.match.params.post;
    if (post !== undefined) {
      document.title = "Edit Article";
    } else {
      document.title = "Add New Article";
    }
  }, []);

  return (
    <>
      <AdminPage split post={post} blog={blog.blog} />
    </>
  );
};

export default Admin;
