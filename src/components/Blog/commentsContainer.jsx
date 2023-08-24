import React, { useEffect, useState } from "react";
import PostComment from "./PostComment";
import axios from "axios";
import { useParams } from "react-router-dom";
import Comment from "./comment";

const CommentsContainer = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const handlePost = (data) => {
    setComments([data, ...comments]);
  };
  const getBlogs = async (id) => {
    setLoading(true);
    let url = `http://16.170.240.91:8080/comments/${id}`;
    try {
      const res = await axios.get(url);
      const { data } = res;
      setComments(data.comments);
    } catch (error) {
      console.log(`Error in fetching comments ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs(id);
  }, [id]);
  return (
    <>
      <PostComment handlePost={handlePost} />
      <div className="space-y-4 divide-y-2">
        {comments.length &&
          comments?.map((item) => (
            <Comment text={item.text} username={item.username} key={item.id} />
          ))}
      </div>
    </>
  );
};

export default CommentsContainer;
