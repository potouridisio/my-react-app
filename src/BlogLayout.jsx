/* 
1.Προσπάθησα να κάνω και την είσοδο σε συγκεκριμένο post, 
αν θέλουμε, και το άνοιγμα και κλείσιμο των comments εκεί. 

2.Δεν κατάφερα (ακόμα) να μπορώ να ανοίγω, στην συνολική 
εικόνα των filteredPosts, τα comments συγκεκριμένου post 
και όχι από όλα. Θα το προσπαθήσω φυσικά μήπως το καταφέρω. 

3.Επίσης θα προσπαθήσω να μειώσω το duplication που υπάρχει. 
*/

import { BiUserCircle } from 'react-icons/bi';
import { FaComment } from 'react-icons/fa';
import {useState, useEffect, useId, useRef} from 'react';


const BlogLayout = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  
  const [selectedUserId, setSelectedUserId] = useState(1);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [selectedCommentsId, setSelectedCommentsId] = useState(0);

  const [commentsClick, setCommentsClick] = useState(false); 
  const [postClick, setPostClick] = useState(false);
  

  useEffect(()=>{                                           {/* FETCH USERS*/}
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((usersData) => setUsers(usersData));
  }, []);
  
  useEffect(() => {                                         {/* FETCH POSTS*/}
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((postsData) => setPosts(postsData));
  },[]);

  useEffect(() => {                                         {/* FETCH COMMENTS*/}
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then((response) => response.json())
      .then((commentsData) => setComments(commentsData));
  }, [])

  
  const filteredPosts = posts.filter((post) => post.userId === selectedUserId) ;      {/* POSTS FROM SPECIFIC USER*/}
  
  const clickedPost = filteredPosts.find((post) => post.id === selectedPostId );     {/* SELECTED POST FROM ALL THE POSTS OF A SPECIFIC USER*/}
  

  return (
     users.length === 0 ? <div>...Loading</div> :  

    <div className="flex flex-col md:flex-row">      
        
      <div className="w-full md:w-1/4 p-4 border">          {/* SIDE FILTER USING THE NAMES OF THE USERS*/}
        <h1 className="bg-gray-100 text-2xl font-bold mb-4 border rounded w-full py-2 px-3">Users <span className='text-xl font-normal pl-8 pr-0 '> (Total : {users.length})</span></h1>
        <ul className="divide-y divide-gray-200">
          {users.map((user) =>(
            <li key={user.id} 
                className= {`${selectedUserId === user.id ? 
                  "bg-gray-100 hover:bg-gray-100" : 
                  "hover:bg-gray-50"}
                   py-2 px-4 cursor-pointer `}
                onClick = {() => { 
                  setSelectedUserId(user.id); 
                } }
            >
              <div className="flex items-center">
                <BiUserCircle className="mr-2" size={24} />
                <div>{user.name}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="w-full md:w-3/4 p-4">                  {/* TOTAL POSTS AND POST DETAILS FOR SPECIFIC USER*/}
        <h1 className="bg-gray-100 text-2xl font-bold mb-4 border rounded w-full py-2 px-3">
                    {postClick ? "Post" : "Posts" }
                    <span className='text-xl font-normal pl-8 pr-0 '>  ({filteredPosts.length}) </span>                   
        </h1>
        {filteredPosts.length === 0 ? <div className="text-lg">No posts found for this user.</div> : ""}

                                      {/* OPEN SELECTED POST*/}
        { postClick   ?                                         
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2 cursor-pointer">
            {clickedPost.title.charAt(0).toUpperCase() + clickedPost.title.slice(1)}
          </h2>
          <div className="text-gray-500 mb-4">by {users.find( (user) => user.id === clickedPost.userId).name} </div>
          <p className="mb-4">
            {clickedPost.body}
          </p>
          
                                        {/* DISPLAY POST COMMENTS*/}
          { commentsClick  ?  
            <>
              <div className="text-sm text-gray-500 font-bold flex items-center cursor-pointer">
                <FaComment className="mr-2" size={16} /> 
                <span onClick = {(e) => {
                        e.stopPropagation();                                                                 
                        setCommentsClick(!commentsClick) ;
                      }}
                >       
                  {comments.filter((comment) => comment.postId === clickedPost.id).length } comments 
                </span>
              </div>

              { comments.filter((comment) => comment.postId === clickedPost.id).map( (comment) => (
                  <ul key={comment.id} className="text-sm text-black-500 border rounded w-full py-2 px-3 mb-4 ">
                    <li><span className="font-bold">Comment Title: </span> {comment.name}</li>
                    <li><span className="font-bold">Author: </span> {comment.email}</li>
                    <li><span className="font-bold">Comment: </span> </li>{comment.body}
                  </ul>              
              )  ) }
              <button className="text-sm bg-gray-50 hover:bg-gray-100 font-bold cursor-pointer border rounded p-4"
                      onClick = {() => setPostClick(false)}
              > {"<"} Back
              </button> 
            </>  
                         :          /* NOT DISPLAY POST COMMENTS*/
            <>
              <div className="text-sm mb-4 text-gray-500 flex items-center cursor-pointer">
                <FaComment className="mr-2" size={16} /> 
                <span className='border p-4 font-bold'
                      onClick = {(e) => { 
                        e.stopPropagation();                                         
                        setCommentsClick(!commentsClick) ;
                      }}
                >       
                  {comments.filter((comment) => comment.postId === clickedPost.id).length } comments 
                </span>
              </div>
              <button className="text-sm bg-gray-50 hover:bg-gray-100 font-bold cursor-pointer border rounded p-4"
                      onClick = {() => setPostClick(false)}
              > {"<"} Back
              </button>
            </>  
          }
        </div>
        
      :                    /* DISPLAY ALL FILTERED POSTS OR RETURN BACK FROM A SELECTED POST*/

        filteredPosts.map( (post, index) => (
        <div key={post.id} 
             id = {post.id}
             className="mb-8 p-4 border rounded shadow-xl" 
             onClick = {() => setSelectedPostId(post.id)}
             
        >
          <h2 className="text-xl font-bold mb-2 cursor-pointer"
              id = {post.id}
              onClick = { (e) => { 
                e.stopPropagation();
                setPostClick(true);
                setSelectedPostId(post.id) ;                                  
              }}
          >
            {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
          </h2>
          <div className="text-gray-500 mb-4"> by {users.find( (user) => user.id === post.userId).name} </div>
          <p className="mb-4">
            {post.body}
          </p>

                         {/* OPEN SPECIFIC POST COMMENTS INTO THE TOTAL POST LIST*/}
          { commentsClick && selectedCommentsId === selectedPostId && selectedUserId === post.userId ?  
            <>
              <div className="text-sm text-gray-500 font-bold flex items-center cursor-pointer"
                   id={index}                   
              >
                <FaComment className="mr-2" size={16} /> 
                <span id ={post.id}
                      onClick = {(e) => {
                        e.stopPropagation();                                                                 
                        setCommentsClick(!commentsClick) ;                                            
                        setSelectedCommentsId(e.target.id);                      
                    }}
                >       
                  {comments.filter((comment) => comment.postId === clickedPost.id).length } comments 
                </span>
              </div>

              { comments.filter((comment) => comment.postId === clickedPost.id).map( (comment) => (
                <ul key={comment.id} id = {index} className="text-sm text-black-500 border rounded w-full py-2 px-3 margin-100 ">
                  <li><span className="font-bold">Comment Title: </span> {comment.name}</li>
                  <li><span className="font-bold">Author: </span> {comment.email}</li>
                  <li><span className="font-bold">Comment: </span> </li>{comment.body}
                </ul>
              ) ) }             
            </> 

             :                            /* CLOSE SPECIFIC POST COMMENTS*/
             
            <div className="text-sm text-gray-500 flex items-center cursor-pointer">
              <FaComment className="mr-2" size={16} /> 
              <span id ={post.id}                      
                    className='hover:underline text-sm font-bold'
                    onClick = {(e) => { 
                      e.stopPropagation();
                      setCommentsClick(!commentsClick) ;
                      setSelectedCommentsId(e.target.id);                                                        
                      }}
              >       
                 {comments.filter((comment) => comment.postId === post.id).length } comments 
              </span>
            </div>
          }
        </div>
        ) ) }
      </div>  
    </div>
  );
};

export default BlogLayout;
