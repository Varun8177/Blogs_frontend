import React from "react";

const Comment = ({ text, username }) => {
  return (
    <figure class="max-w-screen-md">
      <blockquote>
        <p class="text-2xl font-semibold text-gray-900 dark:text-white">
          "{text}"
        </p>
      </blockquote>
      <figcaption class="mt-6 flex items-center space-x-3">
        <img
          class="h-6 w-6 rounded-full"
          src="https://img.freepik.com/free-icon/user_318-159711.jpg"
          alt="profile_picture"
        />
        <div class="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700">
          <cite class="pr-3 font-medium text-gray-900 dark:text-white">
            {username}
          </cite>
        </div>
      </figcaption>
    </figure>
  );
};

export default Comment;
