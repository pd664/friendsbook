import React from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { BiLike, BiComment } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { AiTwotoneLike } from "react-icons/ai";
import "../../static/postcard/postcard.css";

function PostCard(props) {
  const { keys, id, src, username, quote, likes, like } = props;

  return (
    <div>
      <div className="homepostcard" key={keys}>
        <div className="homepostcard_cont">
          <div className="hp_header">
            <div className="hp_dp">
              <MdOutlineAccountCircle size={40} />
            </div>
            <div className="hp_name">
              <p>{username}</p>
            </div>
          </div>
          <div className="hp_border"></div>
          <div className="mind_quote">
            <p>{quote}</p>
          </div>
          <div className="hp_post">
            <img src={src} className="hp_post_img" />
          </div>
          <div className="hp_footer">
            <div className="hp_footer_upper">
              <div className="likes">
                <p>
                  <AiTwotoneLike />
                  <span className="hp_footer_name">{likes} likes</span>
                </p>
              </div>
              <div className="comments">
                <p>5 comments</p>
              </div>
            </div>
            <div className="hp_border"></div>
            <div className="hp_footer_lower">
              <div className="like">
                <p>
                  <BiLike />
                  <button
                    className="hp_footer_name"
                    onClick={() => {
                      like(id, likes, keys);
                    }}
                  >
                    Like
                  </button>
                </p>
              </div>
              <div className="comment">
                <p>
                  <BiComment />
                  <span className="hp_footer_name">Comment</span>
                </p>
              </div>
              <div className="share">
                <p>
                  <RiShareForwardLine />
                  <span className="hp_footer_name">Share</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
