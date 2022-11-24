import React, { useState, useEffect } from "react";
import "../../static/profile/profile.css";
import axios from "axios";
import { getUser } from "../../utils/token";
import PostCard from "../postCard/PostCard";

function Profile(props) {
  const { postDataprop } = props;
  const [userpost, setUserPost] = useState([]);
  const [postData, setPostData] = useState([]);
  const user = getUser();

  useEffect(() => {
    (() => {
      setPostData(postDataprop);
    })();
  }, [postDataprop]);

  useEffect(() => {
    (() => {
      postData.map((data) => {
        if (data.username === user.username) {
          if (postData.some((a) => a.key !== data.key)) {
            setUserPost((pdata) => [...pdata, data]);
          }
        }
      });
    })();
  }, [postData]);

  return (
    <div className="profile">
      <h1>Your Posts</h1>
      {userpost ? (
        userpost.map((src, keys) => {
          return (
            <PostCard
              keys={keys}
              key={src.key}
              src={src.src}
              username={src.username}
              quote={src.quote}
              likes={src.likes}
            />
          );
        })
      ) : (
        <h1>No Posts found!</h1>
      )}
    </div>
  );
}

export default React.memo(Profile);
