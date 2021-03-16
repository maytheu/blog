import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { withRouter } from "react-router-dom";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { convertFromHTML } from "draft-convert";
import axios from "axios";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { SectionProps } from "../../utils/SectionProps";
import Input from "../elements/Input";
import Button from "../elements/Button";

//forms
import useForm from "../../formControls/useForm";
import formValidation from "../../formControls/formValidation";

//redux
import { useDispatch } from "react-redux";
import { getEditBlog, getPostBlog } from "../../store/blog";

const propTypes = {
  ...SectionProps.types,
  split: PropTypes.bool,
};

const defaultProps = {
  ...SectionProps.defaults,
  split: false,
};

const AdminPage = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  split,
  post,
  blog,
  ...props
}) => {
  const outerClasses = classNames(
    "cta section center-content-mobile",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const { values, handleChange, handleSubmit, errors } = useForm(
    login,
    formValidation
  );

  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(blog.post);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [convertToHTML, setConvertToHTML] = useState(null);
  const [upload, setUpload] = useState(null);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (post !== undefined) {
      const editor = convertFromHTML(isEdit.blog);
      setEditorState(EditorState.createWithContent(editor));
    }
  }, []);

  function onEditorStateChange(editorState) {
    setEditorState(editorState);
    setConvertToHTML(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  }

  function login() {
    let d = new Date();
    if (!errors) return alert("Check your Values");
    const data = {
      title: values.title,
      headline: values.headline,
      publish: values.publish,
      blog: convertToHTML,
      publishedDate: d.getTime(),
    };
    dispatch(getPostBlog(data)).then((res) => {
      if (res.payload.success) return props.history.push("/");
      alert("can't post blog, check your data");
    });
  }

  function editSubmit(event) {
    event.preventDefault();
    let d = new Date();
    const data = {
      title: isEdit.title,
      headline: isEdit.headline,
      publish: isEdit.publish,
      blog: convertToHTML,
      updateDate: d.getTime(),
    };
    dispatch(getEditBlog(data, isEdit._id)).then((res) => {
      if (res.payload.success) return props.history.push("/");
      alert("can't post blog, check your data");
    });
  }

  function editChange(event) {
    setIsEdit({ ...isEdit, [event.target.id]: event.target.value });
  }

  function uploadChange(e) {
    setUpload(e.target.files[0]);
  }

  function uploadFile(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("file", upload);
    axios.post("/api/user/upload", data).then((res) => setUrl(res.data.url));
  }

  const style = { padding: "3px 10px" };

  return (
    <section
      {...props}
      className={outerClasses}
      style={{ paddingBottom: "0px" }}
    >
      <div className="container" style={{ width: "75%", marginTop: "40px" }}>
        <h3 className="mt-0 mb-16">
          {post === undefined ? "Add New Article" : `Edit ${post}`}
        </h3>
        <div className="cta-slogan">
          <div className="cta-action">
            <form onSubmit={post === undefined ? handleSubmit : editSubmit}>
              <Input
                id="title"
                type="text"
                change={post === undefined ? handleChange : editChange}
                value={isEdit.title}
                placeholder="Article title"
              />
              <Input
                id="headline"
                type="text"
                value={isEdit.headline}
                change={post === undefined ? handleChange : editChange}
                placeholder="Headline here"
              />
              <Input
                id="publish"
                type="text"
                value={isEdit.publish}
                change={post === undefined ? handleChange : editChange}
                placeholder="true or false for publish"
              />
              <Editor
                editorState={editorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                onEditorStateChange={onEditorStateChange}
              />
              <Button
                tag="a"
                style={style}
                onClick={post === undefined ? handleSubmit : editSubmit}
              >
                <ExitToAppIcon />
              </Button>
            </form>
          </div>
          <div className="cta-action">
            Upload File
            <Input type="file" name="file" change={uploadChange} />
            <Button onClick={uploadFile} />
            <div>{url}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

AdminPage.propTypes = propTypes;
AdminPage.defaultProps = defaultProps;

export default withRouter(AdminPage);
