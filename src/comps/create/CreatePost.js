import React, { useState, useEffect } from "react";
import "../../static/create/createpost.css";
import { SlClose } from "react-icons/sl";
import axios from "axios";
import { getUser } from "../../utils/token";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState();
  const [img, setImg] = useState([]);
  const [convertedFile, setConvertedFile] = useState();
  const [keyName, setKeyName] = useState();
  const [mind, setMind] = useState("");
  let navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = async (event) => {
    event.preventDefault();
    const file = await event.target.files[0];
    setSelectedFile(file);
    const convertedFile = await convertToBase64(file);
    var currentdate = new Date();
    let keyName = `${user.username}-${currentdate.getDate()}-${
      currentdate.getMonth() + 1
    }-${currentdate.getFullYear()}-${currentdate.getHours()}-${currentdate.getMinutes()}-${currentdate.getSeconds()}`;
    setConvertedFile(convertedFile);
    setKeyName(keyName);
  };

  const postfile = async () => {
    const s3URL = await axios
      .post("http://localhost:4000/api/file/upload", {
        image: convertedFile,
        imageName: keyName,
        mind: mind,
        username: user.username,
      })
      .then((response) => {
        setSelectedFile(null);
        window.alert("Your post has been posted.");
        navigate("/");
      });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
    });
  };

  function getImg() {
    let res = axios
      .get("http://localhost:4000/api/file/get")
      .then((response) => {
        console.log(response.data);
        setImg(response.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="createPost">
      <div className="createPost_cont">
        <div className="cp_header">
          <h3 className="cp_header_title">Create post</h3>
        </div>
        <div className="cp_body">
          <textarea
            className="cp_body_text"
            placeholder="What's on your mind?"
            onChange={(e) => {
              setMind(e.target.value);
            }}
          />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={onSelectFile}
          />
        </div>
        <div className="preview">
          {selectedFile && <img src={preview} className="preview_img" />}
        </div>
        <div className="cp_footer">
          <button className="cp_btn" onClick={postfile}>
            Post
          </button>
        </div>
      </div>
      {img
        ? img.map((src, key) => {
            for (key in src) {
              return (
                <div key={key}>
                  <img src={src[key]} className="post_img" alt="img" />
                </div>
              );
            }
          })
        : console.log("img", img)}
    </div>
  );
}

export default CreatePost;
