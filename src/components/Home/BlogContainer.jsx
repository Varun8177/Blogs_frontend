import React from "react";
import { useNavigate } from "react-router-dom";

const BlogContainer = ({ index, title, description, BlogImg }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`flex w-full gap-4 base:flex-col-reverse ${
        index % 2 === 0 ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      <div className="space-y-4 base:w-full lg:w-[50%]">
        <p className="line-clamp-3 text-left text-4xl font-extrabold">
          {title}
        </p>
        {description && (
          <div
            dangerouslySetInnerHTML={{
              __html: description,
            }}
            className="line-clamp-6"
          ></div>
        )}
        <button
          className="border border-[#97defc] px-4 py-2"
          onClick={() => navigate(`/blog/${index}`)}
        >
          Read More
        </button>
      </div>
      <div className="base:w-full lg:w-[50%]">
        <img
          src={BlogImg}
          alt="blog-post"
          className="h-[400px] object-cover base:w-full lg:w-[600px]"
        />
      </div>
    </div>
  );
};

export default BlogContainer;
