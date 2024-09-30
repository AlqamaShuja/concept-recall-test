import React from 'react';
import { formatDate } from '../../../utils/date_time';

const EachPost = ({ user={}, post={} }) => {
  if(!post || !user) return null;
  return (
    <div key={post?.id} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <img
          src={user?.avatar}
          alt="User Avatar"
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <h4 className="text-lg font-medium text-gray-800">{user?.name}</h4>
          <p className="text-sm text-gray-500">{formatDate(post?.createdAt)}</p>
        </div>
      </div>
      <p className="text-gray-700">{post?.content}</p>
    </div>
  );
};

export default EachPost;
