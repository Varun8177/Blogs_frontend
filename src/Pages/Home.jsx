import React, { useEffect, useState } from "react";
import BlogContainer from "../components/Home/BlogContainer";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setsearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const getBlogs = async () => {
    setLoading(true);
    let url = "http://16.170.240.91:8080/blogs";
    if (searchParams.get("q")) url += `?category=${searchParams.get("q")}`;
    try {
      const res = await axios.get(url);
      const { data } = res;
      setBlogs(data.blogs);
    } catch (error) {
      console.log(`Error in fetching blogs ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, [searchParams.get("q")]);

  return (
    <div className="m-auto min-h-screen w-[80%] space-y-[100px]">
      {loading
        ? new Array(4).fill(0).map((post, i) => (
            <div class="animate-pulse space-x-4 bg-slate-400" key={i}>
              <div className="opacity-0">
                <BlogContainer
                  title={"xyz"}
                  description={"xyz"}
                  BlogImg={"xyz"}
                  index={1}
                />
              </div>
            </div>
          ))
        : blogs?.map((post, i) => (
            <BlogContainer
              key={i}
              title={post.title}
              description={post.description}
              BlogImg={post.blogImg}
              index={post.id}
            />
          ))}
    </div>
  );
};

export default Home;
