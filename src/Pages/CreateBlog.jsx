import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { userContext } from "../context/UserContext";

const options = ["art", "science", "technology", "cinema", "design", "food"];

const CreateBlog = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const { user } = useContext(userContext);
  const [category, setCategory] = useState("art");
  const [blogImg, setBlogImg] = useState(
    "https://t3.ftcdn.net/jpg/02/68/55/60/360_F_268556011_PlbhKss0alfFmzNuqXdE3L0OfkHQ1rHH.jpg",
  );
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (event) => {
    const selectedFile = event.target.files[0];
    setUploading(true);
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "vmtbjhvd");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/megamart/image/upload",
          formData,
        );
        setBlogImg(response.data.secure_url);
      } catch (error) {
        console.error(error, "Error uploading image. Please try again.");
      } finally {
        setUploading(false);
      }
    }
  };

  const postBlog = async () => {
    setLoading(true);
    const token = localStorage.getItem("token") || "";
    const dataToPost = {
      title,
      blogImg,
      description: value,
      category,
      username: "rodax",
      useremail: "rodax40385@paxven.com",
    };
    try {
      const res = await axios.post(
        "http://16.170.240.91:8080/blogs",
        dataToPost,
        {
          headers: { "Content-Type": "application/json", Authorization: token },
        },
      );
      const { data } = res;
      if (data) toast.success("Blog successfully published");
    } catch (error) {
      console.log(`Error in fetching blogs ${error}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="m-auto min-h-screen w-[80%] space-y-4">
      <input
        type="file"
        className="hidden"
        id="thumbnail"
        onChange={uploadImage}
      />
      <label htmlFor="thumbnail" className="w-full cursor-pointer">
        {/*  */}
        <div class="relative m-auto items-center rounded-lg border border-gray-100 bg-white shadow-md dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img
            src={blogImg}
            alt="placeholder-img"
            className="h-[200px] w-full object-cover"
          />
          {uploading ? (
            <div
              role="status"
              class="absolute left-1/2 top-2/4 -translate-x-1/2 -translate-y-1/2"
            >
              <svg
                aria-hidden="true"
                class="mr-2 h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          ) : null}
        </div>
      </label>
      <input
        type="text"
        placeholder="enter blog title here"
        className="w-full border border-slate-300 p-2 focus:outline-none"
        onChange={(e) => setTitle(e.target.value)}
      />

      <label
        for="countries"
        class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Select a category
      </label>
      <select
        id="countries"
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      >
        {options.map((item) => (
          <option value={item.toLowerCase()} key={item}>
            {item}
          </option>
        ))}
      </select>

      <div className="min-h-[350px]">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          className="h-[300px] border-none"
        />
      </div>
      <div className="ml-auto w-fit">
        <button
          className="border border-[#97defc] px-4 py-2"
          onClick={postBlog}
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <p>processing...</p>
              <div role="status">
                <svg
                  aria-hidden="true"
                  class="mr-2 h-3 w-3 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            "Publish Blog"
          )}
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;
