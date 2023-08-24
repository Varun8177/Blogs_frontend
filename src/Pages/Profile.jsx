import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Modal from "../components/Modal";

const Profile = () => {
  const { user } = useContext(userContext);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const deleteBlog = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://16.170.240.91:8080/blogs/${id}`);
      const updatedData = blogs.filter((item) => item.id !== id);
      toast.success("successfully deleted the blog");
      setBlogs(updatedData);
    } catch (error) {
      console.log(`Error in deleting blogs ${error}`);
      toast.error("something went wrong please try again");
    } finally {
      setLoading(false);
    }
  };

  const updateBlog = async (id, data) => {
    setLoading(true);
    try {
      await axios.patch(`http://16.170.240.91:8080/blogs/${id}`, data);
      const updatedData = blogs.map((item) => {
        return item.id !== id ? item : { ...item, ...data };
      });
      toast.success("successfully updated the blog");
      setBlogs(updatedData);
      closeModal();
    } catch (error) {
      console.log(`Error in updating blogs ${error}`);
      toast.error("something went wrong please try again");
    } finally {
      setLoading(false);
    }
  };

  const getBlogs = async () => {
    setLoading(true);
    const token = localStorage.getItem("token") || "";
    try {
      const res = await axios.get("http://16.170.240.91:8080/blogs/personal", {
        headers: { "Content-Type": "application/json", Authorization: token },
      });
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
  }, []);

  return (
    <div className="m-auto min-h-screen w-[80%]">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          User Profile
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Personal details and application.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Username
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.username}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.email}
            </dd>
          </div>
          <div className="px-4 py-6">
            <dt className="text-center text-sm font-medium leading-6 text-gray-900">
              Blogs
            </dt>
            <div className="flex flex-wrap justify-between gap-x-8">
              {blogs?.length > 0 &&
                blogs?.map((post, i) => (
                  <div key={i} className="h-[500px] w-[300px] grow">
                    <img
                      src={post.blogImg}
                      alt=""
                      className="h-[300px] w-full object-cover"
                    />
                    <p className="line-clamp-1 font-semibold">{post.title}</p>
                    {post.description && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: post.description,
                        }}
                        className="line-clamp-3"
                      ></div>
                    )}
                    <Modal
                      isOpen={modalOpen}
                      onClose={closeModal}
                      post={post}
                      updateBlog={updateBlog}
                    />
                    <Link to={`/blog/${post.id}`}>Read More</Link>
                    <div className="mt-2 flex gap-4">
                      <button
                        className="rounded-md bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                        onClick={openModal}
                      >
                        Edit
                      </button>

                      <button
                        className="rounded-md bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                        onClick={() => deleteBlog(post.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Profile;
