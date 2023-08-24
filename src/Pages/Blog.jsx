import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentsContainer from "../components/Blog/commentsContainer";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlogs] = useState({
    title: "",
    BlogImg: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const getBlog = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://16.170.240.91:8080/blogs/${id}`);
      const { data } = res;
      setBlogs(data.blog);
    } catch (error) {
      console.log(`Error in fetching blogs ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlog(id);
  }, [id]);

  return (
    <div className="m-auto min-h-screen w-[80%] space-y-4 text-left">
      <img
        src={blog?.blogImg}
        alt="blog-post"
        className="h-[400px] w-full object-cover"
      />
      <div className="flex items-center gap-4">
        <img
          src="https://img.freepik.com/free-icon/user_318-159711.jpg"
          alt="profile"
          className="h-[50px] w-[50px]"
        />
        <div>
          <p>{blog?.username}</p>
          <span>{blog?.useremail}</span>
        </div>
      </div>
      <p className="text-4xl font-semibold">{blog?.title}</p>
      {blog?.description && (
        <div
          dangerouslySetInnerHTML={{ __html: blog?.description }}
          className=""
        ></div>
      )}
      <CommentsContainer />
    </div>
  );
};

export default Blog;
