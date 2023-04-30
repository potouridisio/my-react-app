import { useState, useEffect } from "react";
import { BiUserCircle } from "react-icons/bi";
import { FaComment } from "react-icons/fa";

const BlogLayout = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      });
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 p-4">
        <h1 className="text-2xl font-bold mb-4">Users</h1>
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li
              key={user.id}
              className="bg-gray-100 hover:bg-gray-100 py-2 px-4 cursor-pointer"
            >
              <div className="flex items-center">
                <BiUserCircle className="mr-2" size={24} />
                <div>{user.name}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full md:w-3/4 p-4">
        <h1 className="text-2xl font-bold mb-4">Posts</h1>
        {posts.map((post) => (
          <div key={post.id} className="mb-8">
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <div className="text-gray-500 mb-4">
              by {users[post.userId - 1]?.name}
            </div>
            <p className="mb-4">{post.body}</p>
            <div className="text-sm text-gray-500 flex items-center">
              <FaComment className="mr-2" size={16} />
              {
                comments.filter((comment) => comment.postId === post.id).length
              }{" "}
              comments
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogLayout;
