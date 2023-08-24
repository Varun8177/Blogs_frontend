import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Register = () => {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.remove();
    try {
      const res = await axios.post(
        "http://16.170.240.91:8080/users/register",
        userData,
      );
      const { data } = res;
      if (data) toast.success("User registered successfully");
    } catch (error) {
      if (error.response.data.error) toast.error(error.response.data.error);
      else toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="m-auto flex min-h-[70vh] w-[70%]">
      <img
        src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo="
        alt="Register-img"
        className="w-[40%] shrink object-contain base:hidden md:block"
      />
      <form className="w-3/5 min-w-[400px] grow p-6" onSubmit={handleSubmit}>
        <p className="text-3xl font-bold">Welcome to Dev Blogs</p>
        <p className="mb-8 text-sm">Create your account and start blogging</p>
        <label htmlFor="email" className="mb-1 block font-semibold">
          Email
        </label>
        <input
          type="email"
          required
          name="email"
          className="mb-4 w-full border p-2"
          placeholder="example@gmail.com"
          onChange={handleChange}
        />

        <label htmlFor="email" className="mb-1 block font-semibold">
          Username
        </label>
        <input
          type="text"
          required
          name="username"
          className="mb-4 w-full border p-2"
          placeholder="example123"
          onChange={handleChange}
        />

        <label htmlFor="password" className="mb-1 block font-semibold">
          Create Password
        </label>
        <input
          type="password"
          required
          name="password"
          className="w-full border p-2"
          placeholder="Enter your password"
          onChange={handleChange}
        />
        <div className="m-auto mt-4 w-fit">
          <button
            type="submit"
            className="min-w-[150px] border border-[#97defc] px-4 py-2 text-center disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-3">
                <p>processing</p>
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
              "Register"
            )}
          </button>
        </div>
        <hr className="mb-4 mt-8" />
        <p className="text-center">
          Already registered,{" "}
          <Link to={"/login"} className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
