import React from 'react';
import { Link } from 'react-router-dom';
import appwriteService from "../appwrite/config";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="block w-full">
      <div className="text-xl text-center text-gray-700 hover:text-gray-900 dark:hover:text-white dark:text-gray-200  bg-gray-500 hover:scale-105 mx-3 hover:shadow-blue-600 dark:hover:shadow-orange-500 shadow-md px-1 pt-2  dark:bg-slate-400 rounded-xl  items-center overflow-hidden">
        <img
          src={appwriteService.getFilePreview(featuredImage)}
          alt={title}
          className="object-fit w-fit mx-auto h-36 md:h-48"
        />
        <div className="bg-blue-300 dark:text-white dark:bg-slate-600 scale-110 p-3">
          <h2 className="font-bold mb-2">{title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
