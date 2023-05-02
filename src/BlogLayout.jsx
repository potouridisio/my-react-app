import { BiUserCircle } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { useState, useEffect, useRef, useId } from "react";

const BlogLayout = () => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const userId = useId();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((resp) => resp.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((resp) => resp.json())
      .then((data) => setPosts(data));
  }, []);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((resp) => resp.json())
      .then((data) => setComments(data));
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 p-4">
        <h1 className="text-2xl font-bold mb-4">Users</h1>
        <ul className="divide-y divide-gray-200">
          {/* <li className="bg-gray-100 hover:bg-gray-100 py-2 px-4 cursor-pointer">
            <div className="flex items-center">
              <BiUserCircle className=r"mr-2" size={24} />
              <div>Leanne Graham</div>
            </div>
          </li> */}
          {/* <li className="hover:bg-gray-50 py-2 px-4 cursor-pointer">
            <div className="flex items-center">
            <BiUserCircle className="mr-2" size={24} />
            <div>Ervin Howell</div>
            </div>
          </li> */}
          {users.map((user) => (
            <li className="bg-gray-100 hover:bg-gray-100 py-2 px-4 cursor-pointer">
              <div className="flex items-center">
                <BiUserCircle className="mr-2" size={24} />
                <div key={userId}>{user.name}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full md:w-3/4 p-4">
        <h1 className="text-2xl font-bold mb-4">Posts</h1>
        {/* <div className="text-lg">No posts found for this user.</div> */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">
            sunt aut facere repellat provident occaecati excepturi optio
            reprehenderit
          </h2>
          <div className="text-gray-500 mb-4">by Leanne Graham</div>
          <p className="mb-4">
            quia et suscipit\nsuscipit recusandae consequuntur expedita et
            cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est
            autem sunt rem eveniet architecto
          </p>
          <div className="text-sm text-gray-500 flex items-center">
            <FaComment className="mr-2" size={16} />5 comments
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogLayout;
