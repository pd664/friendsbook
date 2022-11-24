import React, { useState, useEffect } from "react";
import PostCard from "../postCard/PostCard";
import axios from "axios";
import "../../static/homeposts/homeposts.css";

function HomePost(props) {
  const { postDataprop } = props;
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    (() => {
      return setPostData(postDataprop);
    })();
  }, [postDataprop]);

  async function like(key, likes, keys) {
    let res = await axios.post("http://localhost:4000/updatelikes", {
      key: key,
      likes: likes + 1,
    })
    .then((response) => {
      let data = [...postData];
      let oneData = { ...data[keys] };
      oneData["likes"] = likes + 1;
      data[keys] = oneData;
      setPostData(data);
      return;
    });
  }

  return (
    <div className="homeposts">
      <h1>Your Feed</h1>
      {postData ? (
        postData.map((src, keys) => {
          return (
            <PostCard keys={keys} id={src.key} src={src.src} username={src.username} quote={src.quote}
              likes={src.likes}
              like={like}
            />
          );
        })
      ) : (
        <h1>No Posts found!</h1>
      )}
    </div>
  );
}

export default HomePost;
