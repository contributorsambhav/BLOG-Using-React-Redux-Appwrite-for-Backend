import React from 'react';
import { Link } from 'react-router-dom';
import appwriteService from "../appwrite/config";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="block w-full">
      <div className="bg-gray-800 dark:bg-slate-500 rounded-xl  items-center shadow-lg shadow-red-600 dark:shadow-amber-500 overflow-hidden">
        <img
          src={appwriteService.getFilePreview(featuredImage)}
          alt={title}
          className="object-cover w-fit mx-auto h-48 md:h-64"
        />
        <div className="p-4">
          <h2 className="text-xl text-center text-gray-100 dark:text-white font-bold mb-2">{title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
